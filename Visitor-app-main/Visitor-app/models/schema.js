const mongoose = require('mongoose');


const DB="mongodb+srv://sahilbanwala2002:sahil@cluster0.6y96tdf.mongodb.net/visitor";

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Sucessful");
}).catch((err)=>{
    console.log(err.message);
})

const alertSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        trim: true,
        required: true,
    },
    LastName: {
        type: String,
        trim: true,
        required: true,
    },
    Gender: {
        type: String,
        trim: true,
        required: false,
    },
    Email: {
        type: String,
        trim: true,
        required: true,
    },
    PhoneNumber: Number,
    Status: String,
    Date: {
        type: Date,
        default: Date.now
    },

})


const Alert = new mongoose.model('Alert', alertSchema);


module.exports = Alert;