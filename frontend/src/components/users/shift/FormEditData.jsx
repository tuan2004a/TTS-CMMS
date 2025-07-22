import React, { useEffect, useState } from "react";
import BtnSubmit from "../../common/button/BtnSubmit";
import BtnClostX from "../../common/button/BtnClostX";
import { useShiftContext } from "../../../context/shiftContext";
import { showSuccess, showError } from "../../../utils/toast";

const FormEditData = ({ isOpen, handleCloseForm, shiftData }) => {
    const { updateShift } = useShiftContext();

    const allDays = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];

    const [formData, setFormData] = useState({
        shift: "",
        time: "",
        description: [],
    });

    const [showDayDropdown, setShowDayDropdown] = useState(false);

    useEffect(() => {
        if (shiftData) {
            const daysArray = Array.isArray(shiftData.description) ? shiftData.description : typeof shiftData.description === "string" ? shiftData.description.split(",").map((d) => d.trim()) : [];
            setFormData({
                shift: shiftData.shift || "",
                time: shiftData.time || "",
                description: daysArray,
            });
        }
    }, [shiftData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDayChange = (e) => {
        const { value, checked } = e.target;
        const updated = checked ? [...formData.description, value] : formData.description.filter((day) => day !== value);
        setFormData((prev) => ({ ...prev, description: updated }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderedDays = allDays.filter((day) => formData.description.includes(day));
            await updateShift(shiftData._id, { ...formData, description: orderedDays });
            handleCloseForm();
            showSuccess("Cập nhật thành công");
        } catch (error) {
            console.error(error);
            showError("Cập nhật thất bại");
        }
    };

    return (
        <div className={`${isOpen ? "flex" : "hidden"} fixed top-0 left-0 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] items-center justify-center`}>
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Chỉnh sửa ca làm</h1>
                    <BtnClostX onClick={handleCloseForm} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full" />
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Ca làm */}
                    <label>
                        <span className="block mb-1 text-base font-medium text-gray-500">Ca làm</span>
                        <input name="time" value={formData.shift} onChange={handleChange} type="text" placeholder="Nhập ca làm" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-600 focus:outline-none" />
                        {formData.shift === "" && <p className="text-red-500 text-sm">Vui lòng chọn ca làm</p>}
                    </label>

                    {/* Thời gian */}
                    <label className="mt-4 block">
                        <span className="block mb-1 text-base font-medium text-gray-500">Thời gian</span>
                        <input name="time" value={formData.time} onChange={handleChange} type="text" placeholder="Nhập thời gian" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-600 focus:outline-none" />
                    </label>

                    {/* Ngày làm */}
                    <label className="mt-4 block">
                        <span className="block mb-1 text-base font-medium text-gray-500">Ngày làm</span>
                        <div className="relative">
                            <div onClick={() => setShowDayDropdown((prev) => !prev)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2.5 cursor-pointer select-none hover:ring-1 hover:ring-blue-400">
                                {formData.description.length > 0 ? formData.description.join(", ") : <span className="text-gray-400">-- Chọn ngày làm --</span>}
                            </div>

                            {showDayDropdown && (
                                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md max-h-[220px] overflow-y-auto">
                                    {allDays.map((day) => (
                                        <label key={day} className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <input type="checkbox" value={day} checked={formData.description.includes(day)} onChange={handleDayChange} className="mr-2 accent-blue-600" />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                </form>

                <div className="flex items-center justify-end space-x-3 mt-6">
                    <BtnSubmit onClick={handleCloseForm} className="border border-gray-300 py-2.5 px-5 hover:bg-gray-50">
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
