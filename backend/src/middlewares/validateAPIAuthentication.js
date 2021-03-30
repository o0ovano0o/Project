const knex = require('../knex');
const jwt_decode = require("jwt-decode");
const Enum = require('../common/Enum');
function validateAppSession(req) {
  if (!req.session.userid) {
    return { success: false, msg: 'Bạn cần đăng nhập!' };
  }
  return { success: true };
}

function validateOwner(req){
  if(!req.session.role || req.session.role!=Enum.Role.owner){
    return { success: false, msg: 'Bạn không có quyền truy cập' };
  }
  return { success: true };
}

function validateCustomer(req){
  if(!req.session.role || req.session.role!=Enum.Role.customer){
    return { success: false, msg: 'Bạn không có quyền truy cập' };
  }
  return { success: true };
}
function validateGuard(req){
  if(!req.session.role || req.session.role!=Enum.Role.guard){
    return { success: false, msg: 'Bạn không có quyền truy cập' };
  }
  return { success: true };
}

function validateAppAPI(req, res, next) {
  const validateRes = validateAppSession(req);
  if (validateRes.success) return next();
  return res.status(401).json(validateRes);
}

function validateOwnerAPI(req, res, next) {
  const validateRes = validateOwner(req);
  if (validateRes.success) return next();
  return res.status(401).json(validateRes);
}

function validateCustomerAPI(req, res, next) {
  const validateRes = validateCustomer(req);
  if (validateRes.success) return next();
  return res.status(401).json(validateRes);
}

function validateGuardAPI(req, res, next) {
  const validateRes = validateGuard(req);
  if (validateRes.success) return next();
  return res.status(401).json(validateRes);
}


module.exports = {
  validateAppAPI,
  validateGuardAPI,
  validateCustomerAPI,
  validateOwnerAPI
};
