const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

//static files
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}));



app.post('/sendmail',async(req,res)=>{

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user:'contact.byzon@gmail.com',
            pass:'devops07'
        }
    });

    let mailOptions = {
        from: req.body.email,
        to: "juanrm.works07@gmail.com",
        subject: req.body.subject,
        text:req.body.email + " says: " + req.body.message
    }

    transporter.sendMail(mailOptions)
        .then(()=>{
            res.sendFile(path.join(__dirname,'public/success.html'));        
        })
        .catch(err =>{
            console.log(err);
            res.sendFile(path.join(__dirname,'public/error.html'));
        });
});

app.listen(3000,()=>{
    console.log("server ON");
});