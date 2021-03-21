const nodemailer = require("nodemailer");
const knex = require('../knex');
var moment = require('moment');

async function reminderSendMail() {
    const listresult = await knex('result')
        .join('subject', 'subject.id', 'subjectid')
        .join('classes', 'classes.id', 'classesid')
        .select('subject.*', 'classes.*', 'result.*');
    await Promise.all(listresult.map(async(item) => {
        var date = moment(item.date, 'YYYY-MM-DD');
        const tomorow = moment().add(1, 'days').diff(date, 'days');
        console.log('tomorow', tomorow);
        if (tomorow == 0 && item.status == 0) {
            var id = item.studentid;
            const [student] = await knex('student').where({ id });
            await sendmail(student, item);
        }
    }));

}

async function sendmail(student, result) {
    const { email, fullname } = student;
    const { subjecname, subjectcode, start, date } = result;
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            // user: "17020584@vnu.edu.vn",
            // pass: "11111999"
            user: "van005618@gmail.com",
            pass: "duong2710"
        }
    });
    var mailOptions = {
        from: 'van005618@gmail.com',
        to: email,
        subject: `Nhắc nhở lịch thi môn ${subjecname}`, // Subject line
        html: `<h5>Xin chào ${fullname},</h5>
              <p>Hệ thống đăng ký lịch thi chúng tôi xin gửi tới bạn lời nhắc nhở về lịch thi môn ${subjecname} - ${subjectcode}. Diễn ra vào ngày ${date} bắt đầu lúc ${start} giờ.
              </p>
              <p>Mail Test môn các vấn đề</p>`, // plain text body
    }
    smtpTransport.sendMail(mailOptions, async function(error, response) {
        if (error) {
            console.log(error);
        } else {
            await knex('result')
                .update({ status: 1 }).where({ id: result.id });
        }
    });
}


module.exports = reminderSendMail;