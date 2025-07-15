const ShiftsModels = require('../models/Shifts');

const optionsPaginations = {
    limit: 20,
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

        const Shifts = await ShiftsModels.paginate(query, { ...optionsPaginations, page });

        return res.send({
            result: true,
            ...Shifts
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi lấy danh sách Shifts',
            error: error.message
        });
    }
}

exports.getAllShifts = async(req, res)=>{
    try {
        const Shifts = await ShiftsModels.find();
     
        return res.send({
            result: true,
            ...Shifts
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi lấy danh sách Shifts',
            error: error.message
        });
    }
}

exports.createShifts = async(req, res)=>{
    try {
        const {shift, time, description} = req.body;
        const ShiftsData = {shift, time, description};
        const Shifts = await ShiftsModels.create(ShiftsData);
        return res.send({
            result: true,
            msg: "tạo Shifts thành công",
            ...Shifts
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi tạo Shifts',
            error: error.message
        });
    }
}

exports.updateShifts = async(req, res)=>{
    try {
        const ShiftId = req.params.id;
        const {shift, time, description} = req.body;
        const updateShift = await ShiftsModels.findByIdAndUpdate(ShiftId, {shift, time, description},{new:true}).exec();
        
        if(!updateShift){
            return res.status(404).send({
                result: false,
                msg: 'Không tìm thấy Shift cần update',
            });
        }

        return res.send({
            result: true,
            msg: "cập nhập Shifts thành công",
            ...updateShift
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi cập nhập Shifts',
            error: error.message
        });
    }
}

exports.deleteShift = async(req, res)=>{
    try {
        const ShiftId = req.params.id;
        const deleteShift = await ShiftsModels.findByIdAndDelete(ShiftId)
        if(!deleteShift){
            return res.status(404).send({
                result: false,
                msg: 'Không tìm thấy Shift cần xóa',
            });
        }
        return res.send({
            result: true,
            msg: "Xóa Shift thành công",
            ...deleteShift
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            result: false,
            msg: 'Có lỗi khi xóa Shift',
            error: error.message
        });
    }
}
