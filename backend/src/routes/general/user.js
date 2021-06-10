const router = require('express').Router();
const sha1 = require('sha1');
const axios = require('axios')
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const Enum = require('../../common/Enum');
const { validateAppAPI,validateOwnerAPI,validateCustomerAPI,validateGuardAPI } = require('../../middlewares/validateAPIAuthentication');
// lấy thông tin người dùng
router.get('/api/me', validateAppAPI, async(req, res) => {
    try {
        const userid = req.session.userid;
        if (!userid) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        const result = await knex('user')
        .where({userid});
        if (!result) return res.json({ success: false, msg: 'Lỗi thiếu dữ liệu' });
        return res.status(200).json({ success: true, result });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// chỉnh sửa thông tin người dùng
router.put('/api/user',validateAppAPI,async (req, res) => {
  try {
    const { username, password, phonenumber,address,email } = req.body;
    const userid = req.session.userid;
    if (password && password.length < 8) {
      return res.json({ success: false, msg: 'Mật khẩu phải dài hơn 6 ký tự' });
    }
    const rows = await knex('user').where({ userid }).count('*', { as: 'count' });
    if (rows[0].count <= 0) return res.json({ success: false, msg: 'Tài khoản không tồn tại' });
    var param ={};
    if(password) param.password = sha1(password);
    if(username) param.username = username;
    if(phonenumber) param.phonenumber = phonenumber;
    if(address) param.address = address;
    if(email) param.email = email;
    const result = await knex('user').update(param).where({userid});
    if (!result) return res.json({ success: false, msg: 'Đăng ký tài khoản thất bại' });
    const user = await knex('user')
      .first('userid', 'username','address','email', 'password', 'phonenumber','role', 'parkingid')
      .where({ userid });
    return res.status(200).json({ success: true, msg: 'Cập nhật thông tin tài khoản thành công',data:user });
  } catch (err) {
    handleAPIError(err, res);
  }
});


module.exports = router;