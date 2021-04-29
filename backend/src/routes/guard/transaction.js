const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const { validateGuardAPI } = require('../../middlewares/validateAPIAuthentication');
const Enum = require('../../common/Enum');
router.post('/api/guard/transaction', validateGuardAPI, async(req, res) => {
    try {
        let { vehicleid,parkingid,ticketID,Timein,Timeout,TotalAmount,Status, userid,typetimeticket,priceticket,nameticket } = req.body;
        if (!vehicleid || !parkingid || !ticketID) {
          return res.status(400).json({ success: false, msg: 'Thiếu thông tin bắt buộc', data: req.body });
        }
        const guarid = req.session.userid;
        const vehicle = await knex('vehicle').first().where({vehicleid});
        const parking = await knex('parking').first().where({parkingid});
        const user = await knex('user').first().where({userid});
        const guard = await knex('user').first().where({userid:guarid});
        const transactionid = await knex('transaction').insert({
          vehicleid,parkingid,ticketID,Timein,Timeout,TotalAmount,Status,guarid, userid,
          color:vehicle.color,
          code:vehicle.code,
          type:vehicle.type,
          description:vehicle.description,
          QRCode:vehicle.QRCode,
          addressparking:parking.address,
          parkingname:parking.parkingname,

          username:user.username,
          phonenumber:user.phonenumber,
          addressuser:user.address,

          guardname:guard.username,
          typetimeticket,priceticket,nameticket
        }).returning('transactionid');


        if (!transactionid) return res.json({ success: false, msg: 'Tạo vé giao dịch thất bại' });
        const parkinglt = await knex('parking').where({ parkingid });
        if(transaction.type == 'motobike') {
            var UsedPackingMotoBike = parseInt(parkinglt.UsedPackingMotoBike) +1 ;
            if(UsedPackingMotoBike > parseInt(parkinglt.TotalParkingMotoBike)) {
                return res.json({ success: false, msg: 'Số chỗ dành cho xe máy đã đầy' });
            }
            await knex('parking').update({ UsedPackingMotoBike }).where({parkingid});
        } else if(transaction.type == 'car') {
            var UsedPackingCar =parseInt(parkinglt.UsedPackingCar) + 1;
            if(UsedPackingCar > parseInt(parkinglt.TotalParkingCar)) {
                return res.json({ success: false, msg: 'Số chỗ dành cho ô tô đã đầy' });
            }
            await knex('parking').update({ UsedPackingCar }).where({parkingid});
        } else if(transaction.type == 'bike') {
            var UsedPackingBike =parseInt(parkinglt.UsedPackingBike) + 1;
            if(UsedPackingBike > parseInt(parkinglt.TotalParkingBike)) {
                return res.json({ success: false, msg: 'Số chỗ dành cho xe đạp đã đầy' });
            }
            await knex('parking').update({ UsedPackingBike }).where({parkingid});
        }
        return res.status(200).json({ success: true, msg: 'Tạo vé giao dịch thành công' });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.post('/api/guard/transaction/active', validateGuardAPI, async(req, res) => {
    try {
        let { vehicleid,parkingid,Timeout } = req.body;
        if (!vehicleid || !parkingid) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc', data: req.body });
        }
        const guarid = req.session.userid;
        const transaction = await knex('transaction').first().where({vehicleid, parkingid, guarid, Status:1});
        if (!transaction||!transaction.transactionid) return res.json({ success: false, msg: 'Chưa có vé cho xe này trong bãi' });
        var amount = 0;
        if(!transaction.typetimeticket) {
            amount=transaction.priceticket;
        }
        else if(transaction.typetimeticket == 1) { // day
            var dayout = moment(Timeout, "hh:mm DD/MM/YYYY");
            var dayin = moment(transaction.Timein, "hh:mm DD/MM/YYYY");
            var duration = dayout.diff(dayin,'days');
            if(parseInt(duration)>1){
                amount = transaction.priceticket*parseInt(duration);
            } else amount =transaction.priceticket;
        } else if(transaction.typetimeticket == 2) { // hours
            var dayout = moment(Timeout, "hh:mm DD/MM/YYYY");
            var dayin = moment(transaction.Timein, "hh:mm DD/MM/YYYY");
            var duration = dayout.diff(dayin,'hours');
            if(parseInt(duration)>1){
                amount = transaction.priceticket*parseInt(duration);
            } else amount =transaction.priceticket;
        }
        return res.status(200).json({ success: true, msg: 'Vé đã có trong bãi', data:{
            ...transaction,
            Amount:amount
        } });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.post('/api/guard/transaction/close', validateGuardAPI, async(req, res) => {
    try {
        let { vehicleid,parkingid,Timeout } = req.body;
        if (!vehicleid || !parkingid ) {
          return res.json({ success: false, msg: 'Thiếu thông tin bắt buộc', data: req.body });
        }
        const guarid = req.session.userid;
        const transaction = await knex('transaction').update({
            Timeout,Status:2
        }).where({vehicleid, parkingid, guarid}).returning('*');
        var amount = 0;
        if(!transaction.typetimeticket) {
            amount=transaction.priceticket;
        }
        else if(transaction.typetimeticket == 1 || transaction.typetimeticket=='1') { // day
            var dayout = moment(Timeout, "hh:mm DD/MM/YYYY");
            var dayin = moment(transaction.Timein, "hh:mm DD/MM/YYYY");
            var duration = dayout.diff(dayin,'days');
            if(parseInt(duration)>1){
                amount = transaction.priceticket*parseInt(duration);
            } else amount =transaction.priceticket;
        } else if(transaction.typetimeticket == 2  || transaction.typetimeticket=='2') { // hours
            var dayout = moment(Timeout, "hh:mm DD/MM/YYYY");
            var dayin = moment(transaction.Timein, "hh:mm DD/MM/YYYY");
            var duration = dayout.diff(dayin,'hours');
            if(parseInt(duration)>1){
                amount = transaction.priceticket*parseInt(duration);
            } else amount =transaction.priceticket;
        }
        if(!amount) amount = 0;
        const transactionid = await knex('transaction').update({
           TotalAmount:amount
        }).where({vehicleid, parkingid, guarid}).returning('*');

        if (!transactionid) return res.json({ success: false, msg: 'Trả vé giao dịch thất bại' });
        const parking = await knex('parking').where({ parkingid });
        if(transaction.type == 'motobike') {
            var UsedPackingMotoBike =parseInt(parking.UsedPackingMotoBike) - 1 ;
            UsedPackingMotoBike = UsedPackingMotoBike>=0 ? UsedPackingMotoBike : 0;
            await knex('parking').update({ UsedPackingMotoBike }).where({parkingid});
        } else if(transaction.type == 'car') {
            var UsedPackingCar =parseInt(parking.UsedPackingCar) - 1 ;
            UsedPackingCar = UsedPackingCar>=0 ? UsedPackingCar : 0;
            await knex('parking').update({ UsedPackingCar }).where({parkingid});
        } else if(transaction.type == 'bike') {
            var UsedPackingBike =parseInt(parking.UsedPackingBike) - 1 ;
            UsedPackingBike = UsedPackingBike>=0 ? UsedPackingBike : 0;
            await knex('parking').update({ UsedPackingBike }).where({parkingid});
        }
        return res.status(200).json({ success: true, msg: 'Trả vé giao dịch thành công',data:transactionid });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.delete('/api/guard/transaction/:transactionid',validateGuardAPI, async(req, res) => {
    try {
        const { transactionid } = req.params;
        const guardid = req.session.userid;
        if (!transactionid || !guardid) return res.status(400).json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const check = await knex('transaction')
            .delete()
            .where({ guardid, transactionid });
        if (!check) return res.status(400).json({ success: false, msg: 'Xóa vé giao dịch thất bại' });
        return res.status(200).json({
            success: true,
            msg: `Xóa vé giao dịch thành công`,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.put('/api/guard/transaction/:transactionid', validateGuardAPI, async(req, res) => {
  try {
    const { transactionid }= req.params;
    let { vehicleid,parkingid,ticketID,Timein,Timeout,TotalAmount,Status, userid } = req.body;
    if (!vehicleid || !parkingid || !ticketID || !transactionid) {
      return res.status(400).json({ success: false, msg: 'Thiếu thông tin bắt buộc' });
    }
    const guarid = req.session.userid;
    const vehicle = await knex('vehicle').first().where({vehicleid});
    const parking = await knex('parking').first().where({parkingid});
    const user = await knex('user').first().where({userid});
    const guard = await knex('user').first().where({userid:guarid});
    await knex('transaction').update({
      vehicleid,parkingid,ticketID,Timein,Timeout,TotalAmount,Status,guardid, userid
    }).where({transactionid});
    await knex('transaction').update({
      color:vehicle.color,
      code:vehicle.code,
      type:vehicle.type,
      description:vehicle.description,
      QRCode:vehicle.QRCode,
      addressparking:parking.address,
      parkingname:parking.parkingname,

      username:user.username,
      phonenumber:user.phonenumber,
      addressuser:user.address,

      guardname:guard.guardname,
    }).where({transactionid});

    if (!transactionid) return res.status(400).json({ success: true, msg: 'Tạo vé giao dịch thất bại' });
    return res.status(200).json({ success: true, msg: 'Tạo vé giao dịch thành công' });
} catch (err) {
    handleAPIError(err, res);
}
});

router.get('/api/guard/transactions',validateGuardAPI, async(req, res) => {
    try {
        const guarid = req.session.userid;
        const transactions = await knex('transaction').select('transaction.*', 'vehicle.brand').innerJoin('vehicle','transaction.vehicleid','vehicle.vehicleid').where({ guarid }).orderBy('transactionid', "desc");
        var transactionNotPaid = transactions.filter(item => item.Status == 1 || item.Status == '1');
        var transactionPaid = transactions.filter(item => item.Status == 2 || item.Status == '2');
        return res.status(200).json({
            success: true,
            data: transactions,
            transactionNotPaid,
            transactionPaid
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.get('/api/guard/transaction/:transactionid',validateGuardAPI, async(req, res) => {
    try {
        const { transactionid } = req.params;
        const guardid = req.session.userid;
        if (!transactionid) return res.status(400).json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const transaction = await knex('transaction')
            .first()
            .where({ transactionid, guardid  });
        if (!transaction) return res.status(400).json({ success: false, msg: 'Lấy thông tin vé giao dịch thất bại' });
        return res.status(200).json({
            success: true,
            data: transaction,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});

router.get('/api/default-ticket/:type',validateGuardAPI, async(req, res) => {
    try {
        const userid = req.session.userid;
        const {type} = req.params;
        var typeverhicle = type=='motobike' ? 1 : (type=='car' ? 2 : 3);
        const owner = await knex('user').first().where({ userid });
        let tickets = await knex('ticket')
            .where({ typeverhicle, ownerid: owner.ownerid  });
        let priceex = type=='car' ? 10000:5000;
        if(!tickets||!tickets.length) tickets.push({
            typeverhicle,
            ticketid:1,
            name:"vé lượt",
            price:priceex,
            typetime:0,
            drescription:"Vé mặc định"
        })
        return res.status(200).json({
            success: true,
            data: tickets,
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});


module.exports = router;