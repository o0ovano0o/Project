const router = require('express').Router();
const knex = require('../../knex');
const redis = require('redis');

const handleAPIError = require('../../common/handleAPIError');
// danh sách bãi đỗ
router.get('/api/parkings', async (req, res) => {
    try {
        const parkings = await knex('parking').select();
        return res.status(200).json({
            success: true,
            data: parkings,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// tìm bãi đỗ
router.get('/api/parkings/nearst', async (req, res) => {
    try {
        const client = await redis.createClient({
            host: 'herring.redistogo.com'
            , port: '9006'
            , password: '8105c5955151f72073472a4a1cfe81a1'
            , retry_strategy: function (options) {
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    return new Error('The server refused the connection');
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    return new Error('Retry time exhausted');
                }
                if (options.attempt > 10) {
                    return undefined;
                }
                // reconnect after
                return Math.min(options.attempt * 100, 3000);
            }

        });
        const { lat, long, locationname } = req.query;
        let parkinglist = new Array();
        let parkings = await knex('parking').select();
        if (!lat || !long) {
            if(locationname) parkings = parkings.filter(item=> item.parkingname.includes(locationname) ||item.address.includes(locationname));
            return res.status(200).json({
                success: true,
                data: parkings,
                msg: "Thiếu vị trí hiện tại"
            });
        }
        const geo = require('georedis').initialize(client);
        await new Promise((resole, reject) =>
            geo.delete(() => resole(true))
        )
        for (let index = 0; index < parkings.length; index++) {
            const element = parkings[index];
            var mark = element.parkingname + ';' + element.address + ';' + element.parkingid;
            await new Promise((resole, reject) =>
                geo.addLocation(mark, { latitude: element.latitude, longitude: element.longitude }, function (err, reply) {
                    if (err) resole(false)
                    else {
                        console.log('added location:', reply)
                        resole(true);
                    }
                })
            )
        }
        await new Promise((resole, reject) =>

            geo.nearby({ latitude: lat, longitude: long }, 5000, {
                order: 'ASC',
                withCoordinates: true, // Will provide coordinates with locations, default false
                withHashes: true, // Will provide a 52bit Geohash Integer, default false
                withDistances: true, // Will provide distance from query, default false
                accurate: true,
                units: 'km'
            }, async function (err, locations) {
                if (err) {
                    console.error(err);
                    resole();
                }
                else {
                    console.log('nearby locations:', locations)
                    parkinglist = await Promise.all(locations.map(item => {
                        var arr = item.key.split(';');
                        if (!arr || !arr.length || !arr[2]) return undefined;
                        var parking = parkings.find(item => item.parkingid == parseInt(arr[2]));
                        if(locationname){
                            if(item.key.includes(locationname))
                            return {
                                distance:item.distance, ...parking
                            };
                            else return undefined;
                        } else {
                            return {
                                distance:item.distance, ...parking
                            }
                        }
                    }).filter(item => item));
                    resole();
                }
            })
        )
        return res.status(200).json({
            success: true,
            data: parkinglist,
            msg: "Dữ liệu sắp xếp"
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});



module.exports = router;