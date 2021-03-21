const router = require('express').Router();
const sha1 = require('sha1');
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');

router.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    if (!username || !password) return res.status(400).json({ success: false, msg: 'Tài khoản hoặc mật khẩu thiếu' });
    const user = await knex('admin')
      .first('id', 'username', 'password', 'fullname')
      .where({ username, password: sha1(password) });
    if (!user) return res.status(400).json({ success: false, msg: 'Tài khoản hoặc mật khẩu không chính xác' });
    req.session.user_id = user.id;
    req.session.username= user.username;
    req.session.password= user.password;
    req.session.fullname= user.fullname;
    req.session.userrole = 2;
    return res.status(200).json({
      success: true,
      msg: `Đăng nhập thành công`,
    });
  } catch (err) {
    handleAPIError(err, res);
  }
});

router.post('/api/student/login', async (req, res) => {
  try {
    const { studentcode, password } = req.body;
    if (!studentcode || !password) return res.status(400).json({ success: false, msg: 'Tài khoản hoặc mật khẩu thiếu' });
    const user = await knex('student')
      .first('id', 'studentcode','fullname','datebirth', 'gender', 'hometown', 'class')
      .where({ studentcode, password: sha1(password) });
    if (!user) return res.status(400).json({ success: false, msg: 'Tài khoản hoặc mật khẩu không chính xác' });
    req.session.user_id = user.id;
    req.session.studentcode= user.studentcode;
    req.session.password= user.password;
    req.session.fullname= user.fullname;
    req.session.datebirth= user.datebirth;
    req.session.gender= user.gender;
    req.session.hometown= user.hometown;
    req.session.class= user.class;
    req.session.userrole = 1;
    return res.status(200).json({
      success: true,
      msg: `Đăng nhập thành công`,
    });
  } catch (err) {
    handleAPIError(err, res);
  }
});

module.exports = router;
