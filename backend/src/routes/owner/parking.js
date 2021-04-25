const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const { validateOwnerAPI } = require('../../middlewares/validateAPIAuthentication');

router.post('/api/owner/parking', validateOwnerAPI, async(req, res) => {
    try {
        const { parkingname, TotalParkingCar,TotalParkingMotoBike,latitude,longitude,description, TotalParkingBike,address } = req.body;
        const userid = req.session.userid;
        const TotalPackingTime = 0, UsedPackingBike = 0, UsedPackingCar = 0,UsedPackingMotoBike=0;
        if (!parkingname || !TotalParkingCar || !TotalParkingBike) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        const result = await knex('parking')
        .insert({ parkingname, TotalParkingCar,TotalParkingBike,address,TotalParkingMotoBike,UsedPackingMotoBike, TotalPackingTime,latitude,longitude,description,address,UsedPackingBike, UsedPackingCar, userid });
        if (!result) return res.json({ success: true, msg: 'Đăng ký bãi đỗ thất bại' });
        return res.status(200).json({ success: true, msg: 'Đăng ký bãi đỗ thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.delete('/api/owner/parking/:parkingid',validateOwnerAPI, async(req, res) => {
    try {
        const { parkingid } = req.params;
        const userid = req.session.userid;
        if (!userid || !parkingid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const checkTransaction = await knex('transaction').select().where({
            parkingid
        });
        if(checkTransaction && checkTransaction.length > 0) {
            return res.json({ success: false, msg: 'Bãi đỗ vẫn đang có giao dịch chưa hoàn thành. Không thể xóa !' });
        }
        const check = await knex('parking')
            .delete()
            .where({ userid, parkingid });
        if (!check) return res.json({ success: false, msg: 'Xóa bãi đỗ thất bại' });
        return res.status(200).json({
            success: true,
            msg: `Xóa bãi đỗ thành công`,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.put('/api/owner/parking/:parkingid', validateOwnerAPI, async(req, res) => {
    try {
        const { parkingname, TotalParkingCar,TotalParkingMotoBike,UsedPackingMotoBike,latitude,longitude,description, TotalParkingBike,address,TotalPackingTime,UsedPackingBike,UsedPackingCar } = req.body;
        const userid = req.session.userid;
        const { parkingid } = req.params;
        if (!parkingname || !TotalParkingCar || !TotalParkingBike) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        const result = await knex('parking')
        .update({ parkingname, TotalParkingCar,TotalParkingMotoBike,UsedPackingMotoBike,TotalParkingBike,address, latitude,longitude,description,TotalPackingTime,address,UsedPackingBike, UsedPackingCar }).where({ userid, parkingid});
        if (!result) return res.json({ success: true, msg: 'Sửa thông tin bãi đỗ thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin bãi đỗ thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.get('/api/owner/parkings',validateOwnerAPI, async(req, res) => {
    try {
        const userid = req.session.userid;
        const parkings = await knex('parking').select().where({ userid }).orderBy('parkingid', "desc");
        return res.status(200).json({
            success: true,
            data: parkings,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.get('/api/owner/parking/:parkingid',validateOwnerAPI, async(req, res) => {
    try {
        const { parkingid } = req.params;
        const userid = req.session.userid;
        if (!parkingid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const parking = await knex('parking')
            .first()
            .where({ parkingid, userid  });
        if (!parking) return res.json({ success: false, msg: 'Lấy thông tin bãi đỗ thất bại' });
        return res.status(200).json({
            success: true,
            data: parking,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});


module.exports = router;