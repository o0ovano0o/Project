const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const { validateCustomerAPI, validateGuardAPI } = require('../../middlewares/validateAPIAuthentication');
const moment = require('moment');
router.get('/api/guard/parking',validateGuardAPI, async(req, res) => {
    try {
        const { parkingid, ownerid } = req.session;
        if (!parkingid) return res.json({ success: false, msg: 'Thông tin bắt buộc bị thiếu' });
        const parking = await knex('parking')
            .first()
            .where({ parkingid  });
        let total = await knex('transaction')
                            .where({ parkingid: parseInt(parkingid), Status:2 });
        let totalamount=0;
        total = total.filter(item => {
            if(item.Timeout&&moment().isSame(moment(item.Timeout,'hh:mm DD-MM-YYYY'),'months')) {
                if(item.TotalAmount&&parseInt(item.TotalAmount)) {
                    totalamount += parseInt(item.TotalAmount);
                } else if(item.priceticket&&parseInt(item.priceticket)) {
                    totalamount += parseInt(item.priceticket);
                }
                return true;
            } else return false;
        });
        if (!parking) return res.json({ success: false, msg: 'Lấy thông tin bãi đỗ thất bại' });
        return res.status(200).json({
            success: true,
            data: {
                ...parking,
                totalticket:total.length,
                totalamount:totalamount
            },
        });
    } catch (err) {
        handleAPIError(err, res);
    }
});


module.exports = router;