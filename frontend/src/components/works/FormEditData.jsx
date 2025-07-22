import React, { useEffect, useState, useMemo } from "react";
import BtnSubmit from "../common/button/BtnSubmit";
import BtnClostX from "../common/button/BtnClostX";
import { useWorkContext } from "../../context/workContext";
import { showSuccess, showError } from "../../utils/toast";
import { DatePicker, Select, Space } from "antd";
import dayjs from "dayjs";
import { useShiftContext } from "../../context/shiftContext";
import { useAccountContext } from "../../context/accountContext";

const FormEditData = ({ handleCloseForm, isOpenFormEdit, worksData }) => {
    const { updateWork } = useWorkContext();
    const { RangePicker } = DatePicker;
    const { shifts, loadShifts } = useShiftContext();
    const { accounts, loadAccount } = useAccountContext();
    const [initialData, setInitialData] = useState(null);


    const [formData, setFormData] = useState({
        name: '' ,
        shift: '',
        machines: '',
        factory: '',
        dayTime: ''
    });

    useEffect(() => {
        if (worksData) {
            const init = {
                name: worksData.name?._id || '' ,
                shift: worksData.shift?._id || '',
                machines: worksData.machines || '',
                factory: worksData.factory || '',
                dayTime: worksData.dayTime
                ? [dayjs(worksData.dayTime[0]), dayjs(worksData.dayTime[1])]
                : null
            };

            setInitialData(init);
            setFormData(init);
        }

        const fetchData = async () => {
            try {
                await loadShifts();
                await loadAccount();
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, [worksData]);

    const shiftOptions = useMemo(() => {
        if (!shifts || !shifts.docs) return [];
        
        return shifts.docs.map(shift => {
            return {
                label: `${ shift.shift || 'Unknown'} (${ shift.time || 'No code'})`,
                value: shift._id || shift.id
            };
        });
    }, [shifts]);

    const employeeOptions = React.useMemo(() => {
        if (!accounts || !accounts.docs) return [];
        
        return accounts.docs.map(account => ({
            label: `${account.name} (${account.code})`,
            value: account._id,
        }));
    }, [accounts]); 

    const handleCancel = () => {
        if (initialData) {
            setFormData(initialData);
        }
        handleCloseForm();
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateWork(worksData._id, formData);
            handleCloseForm();
            showSuccess("Cập nhật thành công");
        } catch (error) {
            console.error(error);
            // showError("Cập nhật thất bại");
        }
    };

    const factoryOptions = [
        { label: 'xưởng 1', value: 'xưởng 1' },
        { label: 'xưởng 2', value: 'xưởng 2' },
        { label: 'xưởng 3', value: 'xưởng 3' },
        { label: 'xưởng 4', value: 'xưởng 4' },
        { label: 'xưởng 5', value: 'xưởng 5' },
        { label: 'xưởng 6', value: 'xưởng 6' },
        { label: 'xưởng 7', value: 'xưởng 7' }, 
        { label: 'xưởng 8', value: 'xưởng 8' }, 
    ];

    const options = [];
    for (let i = 1; i <= 200; i++) {
        options.push({
            label: `Máy ${i}`,
            value: `Máy ${i}`,
        });
    }



    return (
        <div className={`${isOpenFormEdit ? "flex" : "hidden"} fixed top-0 left-0 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] items-center justify-center`}>
            <div className="relative w-full max-w-xl bg-white rounded-lg shadow-lg p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Chỉnh sửa</h1>
                    <BtnClostX onClick={handleCancel} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full" />
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Nhân viên */}
                    <label className="block">
                        <span className="block text-base font-medium text-gray-500 mt-4 mb-1">Nhân viên</span>
                        <Select name="name" allowClear showSearch placeholder="Chọn nhân viên" optionFilterProp="label" onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))} onSearch={null} value={formData.name} options={employeeOptions} className="!h-10 !rounded-lg w-full" />
                    </label>

                    {/* Ca làm */}
                    <label className="block">
                        <span className="block text-base font-medium text-gray-500 mt-4 mb-1">Ca làm</span>
                        <Select name="shift" allowClear showSearch placeholder="Chọn ca làm" optionFilterProp="label" onChange={(value) => setFormData((prev) => ({ ...prev, shift: value }))} onSearch={null} value={formData.shift} options={shiftOptions} className="!h-10 !rounded-lg w-full" />
                    </label>

                    {/* Xưởng */}
                    <label className="block">
                        <span className="block text-base font-medium text-gray-500 mt-4 mb-1">Xưởng</span>
                        <Select allowClear showSearch placeholder="Chọn xưởng" optionFilterProp="label" onChange={(value) => setFormData((prev) => ({ ...prev, factory: value }))} onSearch={null} value={formData.factory} options={factoryOptions} className="!h-10 !rounded-lg w-full" />
                    </label>

                    {/* Máy sản xuất */}
                    <label className="block">
                        <span className="block text-base font-medium text-gray-500 mt-4 mb-1">Máy sản xuất</span>
                        <Space className="!h-10" style={{ width: "100%" }} direction="vertical">
                            <Select allowClear onChange={(value) => setFormData((prev) => ({ ...prev, machines: value }))} onSearch={null} value={formData.machines} options={options} mode="multiple" placeholder="Chọn máy sản xuất" className=" !rounded-lg w-full" />
                        </Space>
                    </label>

                    {/* Thời gian */}
                    <label htmlFor="">
                        <span className="block text-base font-medium text-gray-500 mt-4 mb-1">Thời gian ngày làm</span>
                        <RangePicker format="DD MMM" onChange={(value) => setFormData((prev) => ({ ...prev, dayTime: value }))} onSearch={null} value={formData.dayTime} options={null} className="w-1/2" />
                    </label>

                </form>

                <div className="flex items-center justify-end space-x-3 mt-6">
                    <BtnSubmit onClick={handleCancel} className="border border-gray-300 py-2.5 px-5 hover:bg-gray-50">
                        Hủy
                    </BtnSubmit>
                    <BtnSubmit onClick={handleSubmit} className="bg-blue-600 text-white py-2.5 px-5">
                        Lưu
                    </BtnSubmit>
                </div>
            </div>
        </div>
    );
};

export default FormEditData;