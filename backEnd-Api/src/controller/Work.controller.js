const Work = require("../models/Work");

const optionsPaginations = {
    limit: 10,
    populate: { path: "name shift" },
    collation: {
        locale: "en",
    },
    sort: { createdAt: -1 },
};

exports.getAll = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const keyword = req.query.keyword;
        const searchField = req.query.searchField;
        let query = {};

        if (keyword) {
            if (searchField === "name" || searchField === "code" || searchField === "both") {
                // Since name is a reference to Users collection, we need to use populate and filter differently
                // This will be handled by the aggregation pipeline after getting the results
                query = {}; // Empty query for now, we'll filter after populate
            } else {
                query = {
                    $or: [{ machines: { $regex: new RegExp(keyword, "i") } }, { factory: { $regex: new RegExp(keyword, "i") } }],
                };
            }
        }

        const works = await Work.paginate(query, { ...optionsPaginations, page });

        // Filter by name or code if searchField is 'name' or 'code' and keyword exists
        let finalResults = works;
        if (keyword && (searchField === "name" || searchField === "code" || searchField === "both")) {
            const keywordLower = keyword.toLowerCase();
            let filteredDocs;

            if (searchField === "code") {
                // Filter by employee code
                filteredDocs = works.docs.filter((work) => work.name && work.name.code && work.name.code.toLowerCase().includes(keywordLower));
            } else if (searchField === "name") {
                // Filter by employee name
                filteredDocs = works.docs.filter((work) => work.name && work.name.name && work.name.name.toLowerCase().includes(keywordLower));
            } else {
                // Filter by both code and name (default behavior or when searchField is 'both')
                filteredDocs = works.docs.filter((work) => work.name && ((work.name.code && work.name.code.toLowerCase().includes(keywordLower)) || (work.name.name && work.name.name.toLowerCase().includes(keywordLower))));
            }

            finalResults = {
                ...works,
                docs: filteredDocs,
                totalDocs: filteredDocs.length,
                totalPages: Math.ceil(filteredDocs.length / works.limit),
            };
        }

        return res.send({
            result: true,
            msg: "Lấy danh sách công việc thành công",
            ...finalResults,
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            msg: "Lỗi lấy danh sách công việc",
            error: error.message,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, shift, machines, factory, dayTime } = req.body;

        // Validate required fields
        if (!name || !shift || !machines || !factory || !dayTime) {
            return res.status(400).send({
                result: false,
                msg: "Vui lòng điền đầy đủ thông tin công việc",
            });
        }

        const newWork = new Work({
            name,
            shift,
            machines,
            factory,
            dayTime,
        });

        const savedWork = await newWork.save();

        return res.status(201).send({
            result: true,
            msg: "Tạo công việc mới thành công",
            data: savedWork,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            result: false,
            msg: "Lỗi tạo công việc mới",
            error: error.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const WorkId = req.params.id;
        const { name, shift, machines, factory, dayTime } = req.body;
        const updateWork = await Work.findByIdAndUpdate(
            WorkId,
            {
                name,
                shift,
                machines,
                factory,
                dayTime,
            },
            { new: true }
        ).exec();

        return res.send({
            result: true,
            msg: "Cập nhật công việc thành công",
            data: updateWork,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            result: false,
            msg: "Lỗi cập nhật công việc",
            error: error.message,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedWork = await Work.findByIdAndDelete(id);
        if (!deletedWork) {
            return res.status(404).send({
                result: false,
                msg: "Không tìm thấy công việc cần xóa",
            });
        }

        return res.send({
            result: true,
            msg: "Xóa công việc thành công",
            data: deletedWork,
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            msg: "Lỗi xóa công việc",
            error: error.message,
        });
    }
};
