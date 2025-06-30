const RolesModels = require('../models/Roles');

const optionsPaginations = {
    limit: 10,
    // populate: {
    //     path: 'parent',
    // },
    collation: {
        locale: "en",
    },
};

exports.getAll = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const keyword = req.query.keyword;
        let query = {}

        if (keyword) {
            query.name = { $regex: new RegExp(keyword, "i") };
        }

        const Role = await RolesModels.paginate(query, { ...optionsPaginations, page });

        return res.send({
            result: true,
            ...Role
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi lấy danh sách vai trò',
            error: error.message
        });
    }
}

exports.getAllRole = async(req, res)=>{
    try {
        const Role = await RolesModels.find();
    
        return res.send({
            result: true,
            ...Role
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi lấy danh sách',
            error: error.message
        });
    }
}

exports.CreateRole = async(req,res)=>{
    try {
        const {role, derscription} =  req.body
        const RoleData = {role, derscription}
        const newRole = new RolesModels(RoleData);
        const createdRole = await newRole.save();

        return res.send({
            result: true,
            msg: "tạo Role thành công",
            ...createdRole
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi tạo Role',
            error: error.message
        });
    }
}

exports.UpdateRole = async(req,res)=>{
    try {
        const RoleId = req.params.id
        const {role, derscription} = req.body
        const updateRole = await RolesModels.findByIdAndUpdate(RoleId,{role,derscription},{new:true}).exec();
        
        if(!updateRole){
            return res.send({
                result: false,
                msg: 'Không tìm thấy Role cần update',
            })
        }

        return res.send({
            result: true,
            msg: 'Cập nhật Role thành công',
            ...updateRole
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi cập nhập Role',
            error: error.message
        });
    }
}

exports.DeleteRole = async(req, res)=>{
    try {
        const RoleId = req.params.id
        const deleteRole = await RolesModels.findByIdAndDelete(RoleId)
        
        if(!deleteRole){
            return res.send({
                result: false,
                msg: 'Không tìm thấy Role cần xóa',
            })
        }

        return res.send({
            result: true,
            msg: "xóa Role thành công",
            ...deleteRole
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi xóa',
            error: error.message
        });
    }
}