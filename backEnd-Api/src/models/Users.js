const mongoose = require('mongoose');
const mongoosePageinte = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    code: {
        type: String,
        trim: true,
        required: [true, "code is require!"],
        unique: true
    },
    name: {
        type: String,
    },
    email:{
        type: String,
        required: [true, "Email is require!"],
        trim: true,
        unique: true
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
        required: [true, "Password is require!"]
    },  
    status:{
        type: String,   
        enum: ['isActive', 'isInActive'],
        default: 'isActive'
    },
    roleId:{
        type: Schema.Types.ObjectId,
        ref: "Roles"
    },
    shiftsId:[{
        type: Schema.Types.ObjectId,
        ref: "Shifts"
    }],
    departmentId:[{
        type: Schema.Types.ObjectId,
        ref: "OfficeDepartments"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
})

UserSchema.plugin(mongoosePageinte);
module.exports = mongoose.model('Users', UserSchema);