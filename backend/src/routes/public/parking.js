const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');

router.get('/api/parkings',async(req, res) => {
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



module.exports = router;