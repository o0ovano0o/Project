const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const Enum = require('../../common/Enum');
const sha1 = require('sha1');
const { validateOwnerAPI } = require('../../middlewares/validateAPIAuthentication');

router.post('/api/owner/guard', validateOwnerAPI, async(req, res) => {
    try {
        const { username, password, phonenumber,address,email,parkingid } = req.body;
        const ownerid = req.session.userid;
        const role = Enum.Role.guard;
        if (!username || !password || !phonenumber || !parkingid) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        if (password.length < 8) {
          return res.json({ success: false, msg: 'Mật khẩu phải dài hơn 6 ký tự' });
        }
        const rows = await knex('user').where({ phonenumber }).count('*', { as: 'count' });
        if (rows[0].count > 0) return res.json({ success: false, msg: 'Tài khoản đã tồn tại' });
        const result = await knex('user').insert({ username, phonenumber,ownerid, password: sha1(password),address,email, role, parkingid });
        if (!result) return res.json({ success: false, msg: 'Đăng ký tài khoản bảo vệ thất bại' });
        return res.status(200).json({ success: true, msg: 'Đăng ký tài khoản bảo vệ thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.delete('/api/owner/guard/:userid',validateOwnerAPI, async(req, res) => {
    try {
        const { userid } = req.params;
        const ownerid = req.session.userid;
        if (!userid || !ownerid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const check = await knex('user')
            .delete()
            .where({ userid, ownerid });
        if (!check) return res.json({ success: false, msg: 'Xóa tài khoản bảo vệ thất bại' });
        return res.status(200).json({
            success: true,
            msg: `Xóa tài khoản bảo vệ thành công`,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.put('/api/owner/guard/:userid', validateOwnerAPI, async(req, res) => {
    try {
        const { userid } = req.params;
        const ownerid = req.session.userid;
        const { username, password, phonenumber,address,email,parkingid } = req.body;
        const role = Enum.Role.guard;
        if (!username || !password || !phonenumber || !parkingid || !ownerid) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        if (password.length < 8) {
          return res.json({ success: false, msg: 'Mật khẩu phải dài hơn 6 ký tự' });
        }
        const rows = await knex('user').where({ phonenumber }).count('*', { as: 'count' });
        if (rows[0].count == 0) return res.json({ success: false, msg: 'Tài khoản không tồn tại' });
        const result = await knex('user').update({ username, phonenumber, password: sha1(password),address,email, role, parkingid }).where({ userid, ownerid });
        if (!result) return res.json({ success: true, msg: 'Sửa thông tin tài khoản bảo vệ thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin tài khoản bảo vệ thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.get('/api/owner/guards',validateOwnerAPI, async(req, res) => {
    try {
        const ownerid = req.session.userid;
        const guards = await knex('user').select('user.*','parking.parkingname', 'parking.address as parkingaddress').leftJoin('parking','parking.parkingid','user.parkingid').where({ ownerid }).orderBy('user.userid', "desc");
        return res.status(200).json({
            success: true,
            data: guards,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.get('/api/owner/guard/:id',validateOwnerAPI, async(req, res) => {
    try {
        const { id } = req.params;
        const ownerid = req.session.userid;
        if (!id) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const guard = await knex('user')
            .first()
            .where({ user: id, ownerid  });
        if (!guard) return res.json({ success: false, msg: 'Lấy thông tin bải vệ thất bại' });
        return res.status(200).json({
            success: true,
            data: guard,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});


module.exports = router;