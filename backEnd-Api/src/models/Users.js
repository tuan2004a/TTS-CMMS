const mongoose = require('mongoose');
const mongoosePageinte = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
        require:[true, "Email is require!"],
        trim: true,
        unique: [true, "Email must be unique"]
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
    },  
    status:{
        type: String,   
        enum: ['Hoạt động', 'Ngưng hoạt động'],
    },
    roleId:[{
        type: Schema.Types.ObjectId,
        ref: "Roles"
    }],
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