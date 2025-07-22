import React, { useEffect, useState } from "react";
import BtnClostX from "../common/button/BtnClostX";
import BtnSubmit from "../common/button/BtnSubmit";
import { useWorkContext } from "../../context/workContext";
import { useAccountContext } from "../../context/accountContext";
import { useShiftContext } from "../../context/shiftContext";
import { Select, Space, DatePicker } from "antd";
import { WorkValidate } from "../../form/Validations/Work.validate";

const FormNewAdd = ({ isOpenFormAddNew, handleCloseFormAddNew }) => {
    const { createWork } = useWorkContext();
    const { accounts, loadAccount } = useAccountContext();
    const { shifts, loadShifts } = useShiftContext();
    const [error, setError] = useState({ name: "", message: "" });


    const { RangePicker } = DatePicker;

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadShifts();
                // await loadAccount();
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [loadShifts]);

    
    useEffect(() => {
        // console.log("Updated accounts:", accounts);
    }, [accounts]);

    useEffect(() => {
        // console.log("Updated shifts:", shifts);
    }, [shifts]);

    const initialFormData = {
        name: "",
        shift: "",
        machines: "",
        factory: "",
        dayTime: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    // console.log(formData)

    // Generate employee options from accounts data
    const employeeOptions = React.useMemo(() => {
        if (!accounts || !accounts.docs) return [];
        
        return accounts.docs.map(account => ({
            label: `${account.name} (${account.code})`,
            value: account._id,
        }));
    }, [accounts]);

    // Generate shift options from shifts data
    const shiftOptions = React.useMemo(() => {
        if (!shifts || !shifts.docs) return [];
        
        return shifts.docs.map(shift => {
            // console.log("Processing shift:", shift);
            return {
                label: `${ shift.shift || 'Unknown'} (${ shift.time || 'No code'})`,
                value: shift._id || shift.id
            };
        });
    }, [shifts]);

    // Handle employee selection
    const handleEmployeeChange = (value, option) => {
        setFormData(prev => ({ 
            ...prev, 
            name: value,
            // employeeName: option.label 
        }));
    };

    // Handle shift selection
    const handleShiftChange = (value, option) => {
        setFormData(prev => ({ 
            ...prev, 
            shift: value,
            // shiftName: option.label 
        }));
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

    // Handle search functionality
    const onSearch = (value) => {
        console.log("search:", value);
    };

    const handleCloseForm = () => {
        handleCloseFormAddNew();
        setFormData(initialFormData);
        setError({ name: "", message: "" });
    };

    const handleSubmit = async(e) => {
        const errorValidate = WorkValidate(formData);
        if (errorValidate) {
            setError(errorValidate);
            return;
        }
        e.preventDefault();
        try {
            await loadAccount();
            createWork(formData);
            handleCloseForm();
            setFormData(initialFormData)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={`${isOpenFormAddNew ? "block" : "hidden"} fixed top-0 left-0 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] flex items-center justify-center`}>
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Thêm mới ca làm</h1>
                    <BtnClostX onClick={handleCloseForm} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nhân viên */}
                    <label className="block">
                        <span className="block text-base font-medium text-gray-500">Nhân viên</span>
                        <Select 
                            allowClear
                            showSearch 
                            placeholder="Chọn nhân viên"
                            optionFilterProp="label"
                            onChange={handleEmployeeChange}
                            onSearch={onSearch}
                            value={formData.name || undefined}
                            options={employeeOptions}
                            className="!h-10 !rounded-lg w-full"
                        />
                        {error.name === "name" && <p className="text-red-500 text-sm">{error.message}</p>}
                    </label>

                    {/* Ca làm */}
                    <label className="block">
                        <span className="block text-base font-medium text-gray-500">Ca làm</span>
                        <Select 
                            allowClear
                            showSearch 
                            placeholder="Chọn ca làm"
                            optionFilterProp="label"
                            onChange={handleShiftChange}
                            onSearch={onSearch}
                            value={formData.shift || undefined}
                            options={shiftOptions}
                            className="!h-10 !rounded-lg w-full"
                        />
                        {error.name === "shift" && <p className="text-red-500 text-sm">{error.message}</p>}
                    </label>

                    {/* Xưởng */}
                    <label className="block">
                        <span className="block text-base font-medium text-gray-500">Xưởng</span>
                        <Select 
                            allowClear
                            showSearch 
                            placeholder="Chọn xưởng"
                            optionFilterProp="label"
                            onChange={(value, option) => setFormData((prev) => ({ ...prev, factory: value }))}
                            onSearch={onSearch}
                            value={formData.factory || undefined}
                            options={factoryOptions}
                            className="!h-10 !rounded-lg w-full"
                        />
                        {error.name === "factory" && <p className="text-red-500 text-sm">{error.message}</p>}
                    </label>

                    {/* Máy sản xuất */}
                    <label className="block">
                        <span className="block text-base font-medium text-gray-500">Máy sản xuất</span>
                        <Space className="!h-10" style={{ width: '100%' }} direction="vertical">
                            <Select allowClear value={formData.machines || undefined} onChange={(value, option) => setFormData((prev) => ({ ...prev, machines: value }))} options={options} mode="multiple" placeholder="Chọn máy sản xuất" className=" !rounded-lg w-full"   />
                            {error.name === "machines" && <p className="text-red-500 text-sm">{error.message}</p>}
                        </Space>
                    </label>

                    {/* Thời gian */}
                    <label htmlFor="">
                        <span className="block text-base font-medium text-gray-500">Thời gian ngày làm</span>
                        <RangePicker format="DD MMM" value={formData.dayTime || undefined} onChange={(value, option) => setFormData((prev) => ({ ...prev, dayTime: value }))} className="w-1/2" />
                        {error.name === "dayTime" && <p className="text-red-500 text-sm">{error.message}</p>}
                    </label>

                </form>
                <div className="flex items-center justify-end space-x-3 mt-6">
                    <BtnSubmit type="button" onClick={handleCloseForm} className="border border-gray-300 py-2.5 px-5 hover:bg-gray-50">
                        Hủy
                    </BtnSubmit>
                    <BtnSubmit onClick={handleSubmit} type="submit" className="bg-blue-600 text-white py-2.5 px-5">
                        Lưu
                    </BtnSubmit>
                </div>
            </div>
        </div>
    );
};

export default FormNewAdd;
