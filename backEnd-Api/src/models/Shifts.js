const mongoose = require('mongoose');
const mongoosePageinte = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
    shift: {
        type: String,
        required: [true, "Shift name is required!"],
    },
    time:{
        type: String,
        required: [true, "Time is required!"],
    },
    description:{
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

ShiftSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
})

ShiftSchema.plugin(mongoosePageinte);
module.exports = mongoose.model('Shifts', ShiftSchema);