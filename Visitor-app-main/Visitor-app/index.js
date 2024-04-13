const express=require('express');
const app= express();
const path=require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

const Alert= require('./models/schema.js');
const { name } = require('ejs');
const d = new Date();

const nodemailer = require('nodemailer');
 
let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'riyadhingra248@gmail.com',
                pass: 'fkrn qyag ldsh vhrz'
            }
        }
    );

app.get('/',(req,res)=>{
    res.render('form');
})

app.post('/new',(req,res)=>{
    const result= new Alert({
        FirstName:req.body.fname,
        LastName:req.body.lname,
        Email:req.body.email,
        PhoneNumber:req.body.number,
        Status:req.body.check,
    })
    result.save();
    const name= req.body.fname;
    const mail= req.body.email;
    const check=req.body.check;
    const message={
        from:"riyadhingra248@gmail.com",
        to: mail,
        subject:`Hello,${name}`,
        html:`<h2>You ${check} the office at ${d.getHours()}:${d.getMinutes()} IST</h2>`,
    }  

    mailTransporter
    .sendMail(message,
        function (err, data) {
            if (err) {
                console.log('Error Occurs ' + err);
            } else {
                console.log('Email sent successfully');
            }
        });

    
    res.render('enter');
    
})
app.post('/enter',(req,res)=>{
    res.redirect('/');
})

const port = 2000;
app.listen(port,()=>{
    console.log(`Sever connect at port ${port}`);
})