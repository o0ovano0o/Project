const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const { validateAppAPI,validateOwnerAPI,validateCustomerAPI,validateGuardAPI } = require('../../middlewares/validateAPIAuthentication');

router.get('/api/me', validateAppAPI, async(req, res) => {
    try {
        const userid = req.session.userid;
        if (!userid) {
          return res.status(400).json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        const result = await knex('user')
        .where({userid});
        if (!result) return res.status(400).json({ success: true, msg: 'Lỗi thiếu dữ liệu' });
        return res.status(200).json({ success: true, result });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.put('/api/user',validateAppAPI,async (req, res) => {
  try {
    const { username, password, phonenumber,address,email } = req.body;
    const userid = req.session.userid;
    if (!username || !password || !phonenumber) {
      return res.status(400).json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, msg: 'Mật khẩu phải dài hơn 6 ký tự' });
    }
    const rows = await knex('user').where({ phonenumber }).count('*', { as: 'count' });
    if (rows[0].count <= 0) return res.status(400).json({ success: false, msg: 'Tài khoản không tồn tại' });
    const result = await knex('user').update({ username, phonenumber, password: sha1(password),address,email }).where({userid});
    if (!result) return res.status(400).json({ success: true, msg: 'Đăng ký tài khoản thất bại' });
    return res.status(200).json({ success: true, msg: 'Cập nhật thông tin tài khoản thành công' });
  } catch (err) {
    handleAPIError(err, res);
  }
});


module.exports = router;