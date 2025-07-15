const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, "Tên vai trò không được để trống"],
        unique: [true, "Tên vai trò phải là duy nhất"]
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

RoleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Roles', RoleSchema);
