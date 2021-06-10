const router = require('express').Router();
const sha1 = require('sha1');
const axios = require('axios')
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const Enum = require('../../common/Enum');
// đăng ký tài khoản
router.post('/api/customer/register',async (req, res) => {
  try {
    const { username, password, phonenumber,address,email } = req.body;
    const role = Enum.Role.customer;
    if (!username || !password || !phonenumber) {
      return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
    }
    if (password.length < 8) {
      return res.json({ success: false, msg: 'Mật khẩu phải dài hơn 6 ký tự' });
    }
    const rows = await knex('user').where({ phonenumber }).count('*', { as: 'count' });
    if (rows[0].count > 0) return res.json({ success: false, msg: 'Tài khoản đã tồn tại' });
    const result = await knex('user').insert({ username, phonenumber, password: sha1(password),address,email, role });
    if (!result) return res.json({ success: false, msg: 'Đăng ký tài khoản thất bại' });
    return res.status(200).json({ success: true, msg: 'Đăng ký tài khoản thành công' });
  } catch (err) {
    handleAPIError(err, res);
  }
});
router.post('/api/owner/register',async (req, res) => {
  try {
    const { username, password, phonenumber,address,email } = req.body;
    const role = Enum.Role.owner;
    if (!username || !password || !phonenumber) {
      return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
    }
    if (password.length < 8) {
      return res.json({ success: false, msg: 'Mật khẩu phải dài hơn 6 ký tự' });
    }
    const rows = await knex('user').where({ phonenumber }).count('*', { as: 'count' });
    if (rows[0].count > 0) return res.json({ success: false, msg: 'Tài khoản đã tồn tại' });
    const [result] = await knex('user').insert({ username, phonenumber, password: sha1(password),address,email, role }).returning("*");
    console.log(result);
    await knex('ticket').insert(
      [
        {
          typeverhicle:1,
          isSystem:1,
          name:"vé lượt",
          price:5000,
          typetime:0,
          drescription:"Vé mặc định",
          ownerid:result.userid,
          isDefault:0
        },
        {
          typeverhicle:3,
          isSystem:1,
            name:"vé lượt",
            price:3000,
            typetime:0,
            drescription:"Vé mặc định",
            ownerid:result.userid,
            isDefault:0
        },
        {
          typeverhicle:2,
          isSystem:1,
            name:"vé lượt",
            price:10000,
            typetime:0,
            drescription:"Vé mặc định",
            ownerid:result.userid,
            isDefault:0
        }
      ]
    );
    if (!result) return res.json({ success: false, msg: 'Đăng ký tài khoản thất bại' });
    return res.status(200).json({ success: true, msg: 'Đăng ký tài khoản thành công' });
  } catch (err) {
    handleAPIError(err, res);
  }
});
router.post('/api/guard/register',async (req, res) => {
  try {
    const { username, password, phonenumber,address,email,parkingid, ownerid } = req.body;
    const role = Enum.Role.guard;
    if (!username || !password || !phonenumber) {
      return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
    }
    if (password.length < 8) {
      return res.json({ success: false, msg: 'Mật khẩu phải dài hơn 6 ký tự' });
    }
    const rows = await knex('user').where({ phonenumber }).count('*', { as: 'count' });
    if (rows[0].count > 0) return res.json({ success: false, msg: 'Tài khoản đã tồn tại' });
    const result = await knex('user').insert({ username, phonenumber, password: sha1(password),address,email, role, parkingid,ownerid });
    if (!result) return res.json({ success: false, msg: 'Đăng ký tài khoản thất bại' });
    return res.status(200).json({ success: true, msg: 'Đăng ký tài khoản thành công' });
  } catch (err) {
    handleAPIError(err, res);
  }
});

router.get('/heathz', async (req, res) => {
  console.log(req.headders);
  console.log("-==============---------------======================");
  res.status(200).json({ msg:'Service hoạt động', success: true});
});

module.exports = router;
