const router = require('express').Router();
const sha1 = require('sha1');
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');

router.post('/api/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, msg: 'Tài khoản hoặc mật khẩu thiếu' });
    const user = await knex('user')
      .first('userid', 'username', 'password', 'phonenumber','role', 'parkingid')
      .where({ username, password: sha1(password) });
    if (!user) return res.status(400).json({ success: false, msg: 'Tài khoản hoặc mật khẩu không chính xác' });
    req.session.userid = user.userid;
    req.session.username= user.username;
    req.session.phonenumber= user.phonenumber;
    req.session.role= user.role;
    return res.status(200).json({
      success: true,
      data: user,
      msg: `Đăng nhập thành công`,
    });
  } catch (err) {
    handleAPIError(err, res);
  }
});

module.exports = router;
