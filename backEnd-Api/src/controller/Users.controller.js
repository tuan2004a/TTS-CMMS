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
            query.name = {$regex: new RegExp(keyword, "i")};
        }

        const User = await Users.paginate(query, {...optionsPaginations, page});

        return res.send({
            result: true,
            msg: 'lấy danh sách thành công',
            ...User
        });
        
    } catch (error) {
        console.log(error)
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
        const newUsers = new Users({code, name,email,phone,password,status,roleId,shiftsId,departmentId});
        const saveUsers = await newUsers.save();

        
        return res.send({
            result: true,
            msg: 'Tạo mới thành công',
            ...saveUsers
        });
    } catch (error) {
        // console.log(error)
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
        const {code, name, email, phone, password, status, roleId, shiftsId, departmentId} = req.body;
        const updateUsers = await Users.findByIdAndUpdate(UserId, {code, name, email, phone, password, status, roleId, shiftsId, departmentId},{new:true}).exec();

        

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