const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const { validateGuardAPI } = require('../../middlewares/validateAPIAuthentication');
const Enum = require('../../common/Enum');
router.post('/api/guard/transaction', validateGuardAPI, async(req, res) => {
    try {
        let { vehicleid,parkingid,ticketID,Timein,Timeout,TotalAmount,Status, userid } = req.body;
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
        }).returning('transactionid');


        if (!transactionid) return res.status(400).json({ success: false, msg: 'Tạo vé giao dịch thất bại' });
        return res.status(200).json({ success: true, msg: 'Tạo vé giao dịch thành công' });
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
        const userid = req.session.userid;
        const transactions = await knex('transaction').select().where({ userid }).orderBy('transactionid', "desc");
        return res.status(200).json({
            success: true,
            data: transactions,
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