const mongoose = require('mongoose');
const mongoosePageinte = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    code: {
        type: String,
        trim: true,
        required: [true, "code is require!"]
    },
    name: {
        type: String,
    },
    email:{
        type: String,
        require:[true, "Email is require!"],
        trim: true,
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
    },  
    status:{
        type: String,   
        enum: ['isActive', 'isInActive'],
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