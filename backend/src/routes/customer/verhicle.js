const router = require('express').Router();
const knex = require('../../knex');
const Enum = require('../../common/Enum');
const handleAPIError = require('../../common/handleAPIError');
const { validateCustomerAPI } = require('../../middlewares/validateAPIAuthentication');
//tạo xe
router.post('/api/customer/vehicle', validateCustomerAPI, async(req, res) => {
    try {
        let { color, code,brand, type,description,QRCode,isDefault } = req.body;
        const userid = req.session.userid;
        if (!color || !code || !type || !brand) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        // type = type == Enum.TypeVehicle.car ?  Enum.TypeVehicle.car :  Enum.TypeVehicle.bike;
        // reset lại giá trị default
        if(isDefault)
        await knex('vehicle').update({ isDefault : false });
        else isDefault = true;
        const result = await knex('vehicle')
        .insert({ color, code, type,description,brand,QRCode,isDefault ,userid});
        if (!result) return res.json({ success: true, msg: 'Tạo thông tin xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Tạo thông tin xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// chọn xe mặc định
router.post('/api/customer/vehicle/default/:vehicleid', validateCustomerAPI, async(req, res) => {
    try {
        let { vehicleid } = req.params;
        const userid = req.session.userid;
        if (!vehicleid) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        await knex('vehicle').update({ isDefault : false });
        let isDefault = true;
        const result = await knex('vehicle')
        .update({ isDefault}).where({ userid, vehicleid });
        if (!result) return res.json({ success: true, msg: 'Sửa thông tin xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// xóa xe
router.delete('/api/customer/vehicle/:vehicleid',validateCustomerAPI, async(req, res) => {
    try {
        const { vehicleid } = req.params;
        const userid = req.session.userid;
        if (!userid || !vehicleid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const checkTransaction = await knex('transaction').select().where({
            vehicleid
        });
        if(checkTransaction && checkTransaction.length > 0) {
            return res.json({ success: false, msg: 'Xe vẫn đang có giao dịch chưa hoàn thành. Không thể xóa !' });
        }
        const check = await knex('vehicle')
            .delete()
            .where({ userid, vehicleid });
        if (!check) return res.json({ success: false, msg: 'Xóa xe thất bại' });
        return res.status(200).json({
            success: true,
            msg: `Xóa xe thành công`,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// sửa thông tin xe
router.put('/api/customer/vehicle/:vehicleid', validateCustomerAPI, async(req, res) => {
    try {
        let { color, code,brand, type,description,QRCode,isDefault } = req.body;
        let { vehicleid } = req.params;
        const userid = req.session.userid;
        if (!color || !code || !type ) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        // type = type == Enum.TypeVehicle.car ?  Enum.TypeVehicle.car :  Enum.TypeVehicle.bike;
        // reset lại giá trị default
        if(isDefault)
        await knex('vehicle').update({ isDefault : false });
        else isDefault = true;
        const result = await knex('vehicle')
        .update({ color, code, type,brand,description,QRCode,isDefault}).where({ vehicleid, userid });
        if (!result) return res.json({ success: true, msg: 'Sửa thông tin xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// danh sách xe của người dùng
router.get('/api/customer/vehicles',validateCustomerAPI, async(req, res) => {
    try {
        const userid = req.session.userid;
        const vehicles = await knex('vehicle').select().where({ userid }).orderBy('vehicleid', "desc");
        return res.status(200).json({
            success: true,
            data: vehicles,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// lấy chi tiết xe
router.get('/api/customer/vehicle/:vehicleid',validateCustomerAPI, async(req, res) => {
    try {
        const { vehicleid } = req.params;
        const userid = req.session.userid;
        if (!vehicleid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const vehicle = await knex('vehicle')
            .first()
            .where({ vehicleid, userid  });
        if (!vehicle) return res.json({ success: false, msg: 'Lấy thông tin xe thất bại' });
        return res.status(200).json({
            success: true,
            data: vehicle,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});


module.exports = router;