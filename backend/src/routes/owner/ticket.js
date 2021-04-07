const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const { validateOwnerAPI } = require('../../middlewares/validateAPIAuthentication');

router.post('/api/owner/ticket', validateOwnerAPI, async(req, res) => {
    try {
        let { name, price, typetime,typeverhicle,drescription,isDefault } = req.body;
        const ownerid = req.session.userid;
        if (!name || !price || !typetime || !typeverhicle ) {
          return res.status(400).json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        typetime = typetime == Enum.TypeTime.hour ?  Enum.TypeTime.hour :  Enum.TypeTime.day;
        typeverhicle = typeverhicle == Enum.TypeVehicle.car ?  Enum.TypeVehicle.car :  Enum.TypeVehicle.bike;
        // reset lại giá trị default
        if(isDefault)
        await knex('ticket').update({ isDefault : false });
        else isDefault = true;
        const result = await knex('ticket')
        .insert({ name, price,typetime,typeverhicle, drescription,isDefault,ownerid});
        if (!result) return res.status(400).json({ success: true, msg: 'Tạo thông tin vé xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Tạo thông tin vé xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.post('/api/owner/ticket/default/:ticketid', validateOwnerAPI, async(req, res) => {
    try {
        let { ticketid } = req.params;
        const ownerid = req.session.userid;
        if (!ticketid) {
          return res.status(400).json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        await knex('ticket').update({ isDefault : false });
        let isDefault = true;
        const result = await knex('ticket')
        .update({ isDefault}).where({ ownerid, ticketid });
        if (!result) return res.status(400).json({ success: true, msg: 'Sửa thông tin vé xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin vé xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.delete('/api/owner/ticket/:ticketid',validateOwnerAPI, async(req, res) => {
    try {
        const { ticketid } = req.params;
        const ownerid = req.session.userid;
        if (!ownerid || !ticketid) return res.status(400).json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const checkTransaction = await knex('transaction').select().where({
            ticketid
        });
        if(checkTransaction && checkTransaction.length > 0) {
            return res.status(400).json({ success: false, msg: 'Loại vé vẫn đang có giao dịch chưa hoàn thành. Không thể xóa !' });
        }
        const check = await knex('ticket')
            .delete()
            .where({ userid, ticketid });
        if (!check) return res.status(400).json({ success: false, msg: 'Xóa vé thất bại' });
        return res.status(200).json({
            success: true,
            msg: `Xóa vé thành công`,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.put('/api/owner/ticket/:ticketid', validateOwnerAPI, async(req, res) => {
    try {
        let { name, price, typetime,typeverhicle,drescription,isDefault } = req.body;
        let { ticketid } = req.params;
        const ownerid = req.session.userid;
        if (!name || !price || !typetime || !typeverhicle ) {
          return res.status(400).json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        typetime = typetime == Enum.TypeTime.hour ?  Enum.TypeTime.hour :  Enum.TypeTime.day;
        typeverhicle = typeverhicle == Enum.TypeVehicle.car ?  Enum.TypeVehicle.car :  Enum.TypeVehicle.bike;
        // reset lại giá trị default
        if(isDefault)
        await knex('ticket').update({ isDefault : false });
        else isDefault = true;
        const result = await knex('ticket')
        .update({ name, price,typetime,typeverhicle, drescription,isDefault}).where({ ticketid, ownerid });
        if (!result) return res.status(400).json({ success: true, msg: 'Sửa thông tin vé xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin vé xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.get('/api/owner/tickets',validateOwnerAPI, async(req, res) => {
    try {
        const ownerid = req.session.userid;
        const tickets = await knex('ticket').select().where({ ownerid }).orderBy('ticketid', "desc");
        return res.status(200).json({
            success: true,
            data: tickets,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.get('/api/owner/ticket/:ticketid',validateOwnerAPI, async(req, res) => {
    try {
        const { ticketid } = req.params;
        const ownerid = req.session.userid;
        if (!ticketid) return res.status(400).json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const ticket = await knex('ticket')
            .first()
            .where({ ticketid, ownerid  });
        if (!ticket) return res.status(400).json({ success: false, msg: 'Lấy thông tin vé xe thất bại' });
        return res.status(200).json({
            success: true,
            data: ticket,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});


module.exports = router;