const router = require("express").Router();
const nodemailer = require("nodemailer");


// Matches with "/api/email"
router.post("/", (req, res) => {
   
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3> Contact Details</h3>
            <ul>
                <li> Name: ${req.body.name} </li>
                <li> Email: ${req.body.email} </li>
            </ul>
        <h3> Message </h3>
            <p> ${req.body.message} </p>
          `

    let transporter = nodemailer.createTransport({
    name: "http://localhost:3000/",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'marcelle.schinner@ethereal.email', // generated ethereal user
        pass: 'tMyRSxUhQEJu1ERHwK' // generated ethereal password
    }
    });

    let mailOptions = {
        from: req.body.email, // sender address
        to: req.body.email, // list of receivers
        subject: "Job Post Title", // Subject line
        replyTo: req.body.email,
        text: "req.body.message", // plain text body
        html: htmlEmail // html body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            return console.log(err);
        }

        console.log('Message sent: %s', info.message);
        console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
    })

})
})


module.exports = router;