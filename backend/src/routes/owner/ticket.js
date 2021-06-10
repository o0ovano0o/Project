const router = require('express').Router();
const knex = require('../../knex');
const Enum = require('../../common/Enum');
const handleAPIError = require('../../common/handleAPIError');
const { validateOwnerAPI, validateAppAPI } = require('../../middlewares/validateAPIAuthentication');
// tạo vé cho bãi
router.post('/api/owner/ticket', validateOwnerAPI, async(req, res) => {
    try {
        let { name, price, typetime,typeverhicle,drescription,isDefault,isSystem } = req.body;
        const ownerid = req.session.userid;
        if (!name || !typeverhicle ) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        // reset lại giá trị default
        if(isDefault)
        await knex('ticket').update({ isDefault : 0 });
        else isDefault = 1;
        const result = await knex('ticket')
        .insert({ name, price,typetime,typeverhicle, drescription,isDefault,ownerid,isSystem});
        if (!result) return res.json({ success: false, msg: 'Tạo thông tin vé xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Tạo thông tin vé xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

// chỉnh vé mặc định cho bãi
router.post('/api/owner/ticket/default/:ticketid', validateOwnerAPI, async(req, res) => {
    try {
        let { ticketid } = req.params;
        const ownerid = req.session.userid;
        if (!ticketid) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        await knex('ticket').update({ isDefault : false });
        let isDefault = true;
        const result = await knex('ticket')
        .update({ isDefault}).where({ ownerid, ticketid });
        if (!result) return res.json({ success: false, msg: 'Sửa thông tin vé xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin vé xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// xóa vé
router.delete('/api/owner/ticket/:ticketid',validateOwnerAPI, async(req, res) => {
    try {
        const { ticketid } = req.params;
        const ownerid = req.session.userid;
        if (!ownerid || !ticketid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const checkTransaction = await knex('transaction').select().where({
            ticketID:ticketid
        });
        if(checkTransaction && checkTransaction.length > 0) {
            return res.json({ success: false, msg: 'Loại vé vẫn đang có giao dịch chưa hoàn thành. Không thể xóa !' });
        }
        const check = await knex('ticket')
            .delete()
            .where({ ownerid, ticketid });
        if (!check) return res.json({ success: false, msg: 'Xóa vé thất bại' });
        return res.status(200).json({
            success: true,
            msg: `Xóa vé thành công`,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

// chỉnh thông tin vé
router.put('/api/owner/ticket/:ticketid', validateOwnerAPI, async(req, res) => {
    try {
        let { name, price, typetime,typeverhicle,drescription,isDefault, isSystem } = req.body;
        let { ticketid } = req.params;
        const ownerid = req.session.userid;
        if (!name || !typetime || !typeverhicle ) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        // reset lại giá trị default
        if(isDefault)
        await knex('ticket').update({ isDefault : 0 });
        else isDefault = 1;
        const result = await knex('ticket')
        .update({ name, price,typetime,typeverhicle, drescription,isDefault, isSystem}).where({ ticketid, ownerid });
        if (!result) return res.json({ success: false, msg: 'Sửa thông tin vé xe thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin vé xe thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// lấy danh sách vé
router.get('/api/owner/tickets',validateOwnerAPI, async(req, res) => {
    try {
        const ownerid = req.session.userid;
        let tickets = await knex('ticket').select().where({ ownerid }).orderBy('ticketid', "desc");
        tickets =tickets.map(item => {
            var typeverhicle = 'motobike';
            if(item.typeverhicle == 1)
            typeverhicle = 'motobike';
            if(item.typeverhicle == 2)
            typeverhicle = 'car';
            if(item.typeverhicle == 3)
            typeverhicle = 'bike';
            return Object.assign(item, { typeverhicle});
        })
        let ticketSystem = tickets.filter(item => item.isSystem == 1);
        let ticketNormal = tickets.filter(item => item.isSystem != 1);
        return res.status(200).json({
            success: true,
            data: tickets,
            ticketSystem,
            ticketNormal
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// lấy chi tiết vé
router.get('/api/owner/ticket/:ticketid',validateOwnerAPI, async(req, res) => {
    try {
        const { ticketid } = req.params;
        const ownerid = req.session.userid;
        if (!ticketid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const ticket = await knex('ticket')
            .first()
            .where({ ticketid, ownerid  });
        if (!ticket) return res.json({ success: false, msg: 'Lấy thông tin vé xe thất bại' });
        return res.status(200).json({
            success: true,
            data: ticket,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// tạo thông tin xe
router.post('/api/vehicle',validateAppAPI, async(req, res) => {
    try {
        const { QRCode } = req.body;
        if (!QRCode) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const vehicle = await knex('vehicle')
            .first()
            .where({ QRCode });

        if (!vehicle) return res.json({ success: false, msg: 'Không tìm được xe tương ứng' });
        const [user] = await knex('user').where({userid: vehicle.userid});
        return res.status(200).json({
            success: true,
            data: {
                ...vehicle,
                username: user.username
            },
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});


module.exports = router;