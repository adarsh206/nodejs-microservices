

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type : String,
        require : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user', 'admin', 'superadmin'], // only allow 'user', 'admin', or 'superadmin'
        default : 'user'
    }
},{timestamps : true}
);


module.exports = mongoose.model('User', UserSchema);