const Users = require('../models/Users');

const optionsPaginations = {
    limit: 10,
    populate: {
        path: 'roleId',
    },
    collation: {
        locale: "en",
    },
};

exports.getAll = async(req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const keyword = req.query.keyword;
        let query = {};

        if(keyword){
            // Tìm kiếm theo nhiều trường: tên, email và số điện thoại
            query = {
                $or: [
                    { name: { $regex: new RegExp(keyword, "i") } },
                    { email: { $regex: new RegExp(keyword, "i") } },
                    { phone: { $regex: new RegExp(keyword, "i") } }
                ]
            };
        }

        const User = await Users.paginate(query, {...optionsPaginations, page});

        return res.send({
            result: true,
            msg: 'lấy danh sách thành công',
            ...User
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            msg: 'lỗi lấy danh sách',
            error: error.message
        });
    }
}; 

exports.createUsers = async(req, res) => {
    try {
        const {code, name, email, phone, password, status, roleId, shiftsId, departmentId} = req.body;
        const newUsers = new Users({code, name, email, phone, password, status, roleId, shiftsId, departmentId});
        const saveUsers = await newUsers.save();

        return res.send({
            result: true,
            msg: 'Tạo mới thành công',
            ...saveUsers
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            msg: 'lỗi tạo mới',
            error: error.message
        });
    }
};

exports.updateUsers = async(req, res) => {
    try {
        const UserId = req.params.id;
        
        // Get current user to preserve fields not provided in the request
        const currentUser = await Users.findById(UserId);
        if (!currentUser) {
            return res.status(404).send({
                result: false,
                msg: 'Không tìm thấy User cần update',
            });
        }
        
        // Destructure request body
        const {code, name, email, phone, password, status, roleId, shiftsId, departmentId} = req.body;
        
        // Build update object with current values as fallback
        const updateData = {
            code: code || currentUser.code,
            name: name || currentUser.name,
            email: email || currentUser.email,
            phone: phone || currentUser.phone,
            // Keep current password if not provided
            password: password || currentUser.password,
            status: status || currentUser.status,
            roleId: roleId || currentUser.roleId,
            shiftsId: shiftsId || currentUser.shiftsId,
            departmentId: departmentId || currentUser.departmentId
        };
        
        const updateUsers = await Users.findByIdAndUpdate(
            UserId, 
            updateData,
            {new: true}
        ).exec();

        if(!updateUsers){
            return res.status(404).send({
                result: false,
                msg: 'Không tìm thấy User cần update',
            });
        }
        
        return res.send({
            result: true,
            msg: 'Cập nhật thành công',
            ...updateUsers
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            msg: 'lỗi cập nhật',
            error: error.message
        });
    }
};

exports.deleteUsers = async(req, res) => {
    try {
        const UserId = req.params.id;
        const deleteUsers = await Users.findByIdAndDelete(UserId);
        if(!deleteUsers){
            return res.status(404).send({
                result: false,
                msg: 'Không tìm thấy User cần xóa',
            });
        }
        return res.send({
            result: true,
            msg: 'Xóa thành công',
            ...deleteUsers
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            msg: 'lỗi xóa',
            error: error.message
        });
    }
};