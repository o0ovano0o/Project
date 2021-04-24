const router = require('express').Router();
const knex = require('../../knex');
const handleAPIError = require('../../common/handleAPIError');
const { validateCustomerAPI } = require('../../middlewares/validateAPIAuthentication');
const Enum = require('../../common/Enum');
router.get('/api/customer/transaction/:status', validateCustomerAPI, async(req, res) => {
    try {
        let { status } = req.params;

        const userid = req.session.userid;
        var transactions = await knex('transaction').where({ userid, Status: parseInt(status)});
        return res.status(200).json({ success: true, data: transactions});
    } catch (err) {
        handleAPIError(err, res);
    }
});


module.exports = router;