const mongoose = require('mongoose');
const mongoosePageinte = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, "Role name is required!"],
        unique: [true, "Role name must be unique"]
    },
    derscription: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

RoleSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
})

RoleSchema.plugin(mongoosePageinte);
module.exports = mongoose.model('Roles', RoleSchema);