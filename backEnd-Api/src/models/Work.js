const mongoose = require('mongoose');
const mongoosePageinte = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    shift: {
        type: Schema.Types.ObjectId,
        ref: "Shifts"
    },
    machines:[{
        type: String,
        required: [true , "Máy móc là bắt buộc!"]
    }],
    factory:{
        type: String,
        required: [true , "Nhà máy là bắt buộc!"]
    },
    dayTime:[{
        type: Date,
        required: [true , "Giờ làm là bắt buộc!"]
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

WorkSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
})

WorkSchema.plugin(mongoosePageinte);
module.exports = mongoose.model('Work', WorkSchema);