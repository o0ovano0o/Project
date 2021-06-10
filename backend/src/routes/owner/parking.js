const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const { validateOwnerAPI } = require('../../middlewares/validateAPIAuthentication');
var moment = require('moment');
// tạo bãi đỗ
router.post('/api/owner/parking', validateOwnerAPI, async(req, res) => {
    try {
        const { parkingname, TotalParkingCar,TotalParkingMotoBike,latitude,longitude,description, TotalParkingBike,address } = req.body;
        const userid = req.session.userid;
        const TotalPackingTime = 0, UsedPackingBike = 0, UsedPackingCar = 0,UsedPackingMotoBike=0;
        if (!parkingname || !latitude || !longitude) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        const result = await knex('parking')
        .insert({ parkingname, TotalParkingCar,TotalParkingBike,address,TotalParkingMotoBike,UsedPackingMotoBike, TotalPackingTime,latitude,longitude,description,address,UsedPackingBike, UsedPackingCar, userid });
        if (!result) return res.json({ success: true, msg: 'Đăng ký bãi đỗ thất bại' });
        return res.status(200).json({ success: true, msg: 'Đăng ký bãi đỗ thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});
//xóa bãi đỗ
router.delete('/api/owner/parking/:parkingid',validateOwnerAPI, async(req, res) => {
    try {
        const { parkingid } = req.params;
        const userid = req.session.userid;
        if (!userid || !parkingid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const checkTransaction = await knex('transaction').select().where({
            parkingid
        });
        if(checkTransaction && checkTransaction.length > 0) {
            return res.json({ success: false, msg: 'Bãi đỗ vẫn đang có giao dịch chưa hoàn thành. Không thể xóa !' });
        }
        const check = await knex('parking')
            .delete()
            .where({ userid, parkingid });
        if (!check) return res.json({ success: false, msg: 'Xóa bãi đỗ thất bại' });
        return res.status(200).json({
            success: true,
            msg: `Xóa bãi đỗ thành công`,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// chỉnh sửa bãi đỗ
router.put('/api/owner/parking/:parkingid', validateOwnerAPI, async(req, res) => {
    try {
        const { parkingname, TotalParkingCar,TotalParkingMotoBike,UsedPackingMotoBike,latitude,longitude,description, TotalParkingBike,address,TotalPackingTime,UsedPackingBike,UsedPackingCar } = req.body;
        const userid = req.session.userid;
        const { parkingid } = req.params;
        if (!parkingname || !TotalParkingCar || !TotalParkingBike) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
        }
        const result = await knex('parking')
        .update({ parkingname, TotalParkingCar,TotalParkingMotoBike,UsedPackingMotoBike,TotalParkingBike,address, latitude,longitude,description,TotalPackingTime,address,UsedPackingBike, UsedPackingCar }).where({ userid, parkingid});
        if (!result) return res.json({ success: true, msg: 'Sửa thông tin bãi đỗ thất bại' });
        return res.status(200).json({ success: true, msg: 'Sửa thông tin bãi đỗ thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// lấy bãi đổ của chủ bãi đỗ
router.get('/api/owner/parkings',validateOwnerAPI, async(req, res) => {
    try {
        const userid = req.session.userid;
        const parkings = await knex('parking').select().where({ userid }).orderBy('parkingid', "desc");
        return res.status(200).json({
            success: true,
            data: parkings,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});
// lấy chi tiết bãi đỗ
router.get('/api/owner/parking/:parkingid',validateOwnerAPI, async(req, res) => {
    try {
        const { parkingid } = req.params;
        const userid = req.session.userid;
        if (!parkingid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const parking = await knex('parking')
            .first()
            .where({ parkingid, userid  });
        if (!parking) return res.json({ success: false, msg: 'Lấy thông tin bãi đỗ thất bại' });
        return res.status(200).json({
            success: true,
            data: parking,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

// Thống kê doanh thu theo thời gian
router.get('/api/owner/analys-amount/:typetime', validateOwnerAPI, async(req, res) => {
    try {
        let { typetime } = req.params;
        if (!typetime) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc', data: req.body });
        }
        const ownerid = req.session.userid;
        let parkings = await knex('parking').where({userid : ownerid});
        let filtertransaction = await knex('transaction').whereIn('parkingid', parkings.map(item => item.parkingid));
        if(typetime == 'day') {
          filtertransaction = filtertransaction.filter((item)=>{
            if(!item.Timeout) return false;
            var timeout = moment(item.Timeout, "hh:mm DD/MM/YYYY");
            var now = moment();
            var duration = timeout.diff(now,'days');
            if(Math.abs(parseInt(duration))==0){
              return true;
            }
            return false;
          });
        }
        else if(typetime == 'month'){
          filtertransaction = filtertransaction.filter((item)=>{
            if(!item.Timeout) return false;
            var timeout = moment(item.Timeout, "hh:mm DD/MM/YYYY");
            var now = moment();
            var duration = timeout.diff(now,'months');
            if(Math.abs(parseInt(duration))==0){
              return true;
            }
            return false;
          });
        }
        else {
          return res.status(200).json({ success: false, msg: 'Gửi sai thông tin' });
        }
        let transtotal = await knex('transaction').select('parkingid').whereIn('transactionid', filtertransaction.map(item => item.transactionid)).sum({ total: 'TotalAmount' }).groupBy('parkingid')
        console.log(transtotal);
        parkings = parkings.map(item => {
          var TotalAmount = transtotal.find(el => el.parkingid == item.parkingid);
          if(TotalAmount)
          return Object.assign(item, { ...TotalAmount });
          else
          return Object.assign(item, { total: 0 });
        });

        return res.status(200).json({ success: true, data: parkings });
    } catch (err) {
        handleAPIError(err, res);
    }
});

// thống kê doanh thu theo bãi đỗ
router.get('/api/owner/analys-amount/:parkingid', validateOwnerAPI, async(req, res) => {
  try {
      let { typetime } = req.params;
      if (!typetime) {
        return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc', data: req.body });
      }
      const ownerid = req.session.userid;
      let parkings = await knex('parking').where({userid : ownerid});
      let filtertransaction = await knex('transaction').whereIn('parkingid', parkings.map(item => item.parkingid));
      if(typetime == 'day') {
        filtertransaction = filtertransaction.filter((item)=>{
          if(!item.Timeout) return false;
          var timeout = moment(item.Timeout, "hh:mm DD/MM/YYYY");
          var now = moment();
          var duration = timeout.diff(now,'days');
          if(Math.abs(parseInt(duration))==0){
            return true;
          }
          return false;
        });
      }
      else if(typetime == 'month'){
        filtertransaction = filtertransaction.filter((item)=>{
          if(!item.Timeout) return false;
          var timeout = moment(item.Timeout, "hh:mm DD/MM/YYYY");
          var now = moment();
          var duration = timeout.diff(now,'months');
          if(Math.abs(parseInt(duration))==0){
            return true;
          }
          return false;
        });
      }
      else {
        return res.status(200).json({ success: false, msg: 'Gửi sai thông tin' });
      }
      let transtotal = await knex('transaction').select('parkingid').whereIn('transactionid', filtertransaction.map(item => item.transactionid)).sum({ total: 'TotalAmount' }).groupBy('parkingid')
      console.log(transtotal);
      parkings = parkings.map(item => {
        var TotalAmount = transtotal.find(el => el.parkingid == item.parkingid);
        if(TotalAmount)
        return Object.assign(item, { ...TotalAmount });
        else
        return Object.assign(item, { total: 0 });
      });

      return res.status(200).json({ success: true, data: parkings });
  } catch (err) {
      handleAPIError(err, res);
  }
});


module.exports = router;