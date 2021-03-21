const knex = require('../knex');
const jwt_decode = require("jwt-decode");
function validateAppSession(req) {
  if (!req.session.user_id) {
    return { success: false, msg: 'Bạn cần đăng nhập!' };
  }
  return { success: true };
}

function validateAdmin(req){
  if(!req.session.userrole || req.session.userrole!=2){
    return { success: false, msg: 'Bạn không có quyền truy cập' };
  }
  return { success: true };
}

function validateStudent(req){
  if(!req.session.userrole || req.session.userrole!=1){
    return { success: false, msg: 'Bạn không có quyền truy cập' };
  }
  return { success: true };
}

function validateAppAPI(req, res, next) {
  const validateRes = validateAppSession(req);
  if (validateRes.success) return next();
  return res.status(401).json(validateRes);
}

function validateAdminAPI(req, res, next) {
  const validateRes = validateAdmin(req);
  if (validateRes.success) return next();
  return res.status(401).json(validateRes);
}

function validateStudentAPI(req, res, next) {
  const validateRes = validateStudent(req);
  if (validateRes.success) return next();
  return res.status(401).json(validateRes);
}

async function validateUser(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).json({ success: false, msg: 'Bạn cần đăng nhập!' });
  }
  console.log(req.headers);
  var obj = await jwt_decode(req.headers.authorization);
  // var obj = parseJwt(req.headers.authorization);
  console.log(obj);
  let roles = null;
  if(!obj) return res.status(401).json({ success: false, msg: 'Bạn cần đăng nhập!' });
  obj.list_roles.split('|').forEach(element => {
    if(element.search('G5') > 0){
      roles = element.split('/')[0];
    }
  });
  console.log(roles);
  if(!roles) {
    return res.status(401).json({ success: false, msg: 'Bạn cần đăng nhập!' });
  }
  if(roles == 'GROUP_ADMIN') {
    console.log(obj);
    let [admin] = await knex('admin').where({ username: obj.user_name});
    admin = Object.assign(admin, {
      user_id: admin.id,
      userrole: 2
    });
    console.log(admin);
    req.session.user_id = admin.user_id;
    req.session.username = admin.username;
   
    req.session.fullname = admin.fullname;
    req.session.userrole = admin.userrole;
    // req.session= Object.assign(req.session,admin);
  }
  if(roles == 'GROUP_USER') {
    let [student] = await knex('student').where({ studentcode: obj.user_name});
    student = Object.assign(student, {
      user_id: student.id,
      userrole: 1
    });
    console.log(student);
    req.session.user_id = student.id;
    req.session.studentcode = student.studentcode;
    req.session.fullname = student.fullname;
    req.session.datebirth = student.datebirth;
    req.session.gender = student.gender;
    req.session.hometown = student.hometown;
    req.session.class = student.class;
    req.session.email = student.email;
    req.session.userrole = student.userrole;
    // req.session= Object.assign(req.session,student);
  }
  next();
}


module.exports = {
  validateAppAPI,
  validateStudentAPI,
  validateAdminAPI,
  validateUser
};
