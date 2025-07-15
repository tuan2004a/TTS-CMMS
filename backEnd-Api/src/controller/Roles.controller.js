const RolesModels = require('../models/Roles');

const optionsPaginations = {
    limit: 10,
    collation: { locale: "en" },
};

exports.getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page || '1');
        const keyword = req.query.keyword;
        const query = {};

        if (keyword) {
            query.name = { $regex: keyword, $options: 'i' };
        }

        const Role = await RolesModels.paginate(query, { ...optionsPaginations, page });

        return res.status(200).json({
            result: true,
            data: Role,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            msg: 'Có lỗi khi lấy danh sách vai trò',
            error: error.message,
        });
    }
};

exports.getAllRole = async (req, res) => {
    try {
        const Role = await RolesModels.find();

        return res.status(200).json({
            result: true,
            data: Role,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            msg: 'Có lỗi khi lấy danh sách',
            error: error.message,
        });
    }
};

exports.CreateRole = async (req, res) => {
    try {
        const { name, description } = req.body; // chỉnh lại tên field đúng logic
        const newRole = new RolesModels({ name, description });
        const createdRole = await newRole.save();

        return res.status(201).json({
            result: true,
            msg: "Tạo vai trò thành công",
            data: createdRole,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            msg: 'Có lỗi khi tạo vai trò',
            error: error.message,
        });
    }
};

exports.UpdateRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const { name, description } = req.body;

        const updatedRole = await RolesModels.findByIdAndUpdate(
            roleId,
            { name, description },
            { new: true }
        );

        if (!updatedRole) {
            return res.status(404).json({
                result: false,
                msg: 'Không tìm thấy vai trò cần cập nhật',
            });
        }

        return res.status(200).json({
            result: true,
            msg: 'Cập nhật vai trò thành công',
            data: updatedRole,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            msg: 'Có lỗi khi cập nhật vai trò',
            error: error.message,
        });
    }
};

exports.DeleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const deletedRole = await RolesModels.findByIdAndDelete(roleId);

        if (!deletedRole) {
            return res.status(404).json({
                result: false,
                msg: 'Không tìm thấy vai trò cần xóa',
            });
        }

        return res.status(200).json({
            result: true,
            msg: "Xóa vai trò thành công",
            data: deletedRole,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            msg: 'Có lỗi khi xóa vai trò',
            error: error.message,
        });
    }
};
