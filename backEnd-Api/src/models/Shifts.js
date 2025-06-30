const mongoose = require('mongoose');
const mongoosePageinte = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
    shift: {
        type: String,
        required: [true, "Shift name is required!"],
        trim: true,
        unique: [true, "Shift name must be unique"]
    },
    time:{
        type: String
    },
    description:{
        type: String,
        required: [true, "Shift name is required!"]
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

ShiftSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
})

ShiftSchema.plugin(mongoosePageinte);
module.exports = mongoose.model('Shifts', ShiftSchema);