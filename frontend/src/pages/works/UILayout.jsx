import React, { useState } from "react";
import WorksManagement from "./Index";
import InputSearch from "../../components/common/input/InputSearch";
import BtnSubmit from "../../components/common/button/BtnSubmit";
import { useWorkContext, WorkProvider } from "../../context/workContext";
import { format } from "date-fns";

const UILayoutContext = () => {
    const { works, loadWorks } = useWorkContext();

    const [searchCode, setSearchCode] = useState("");
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [listWork, setListWork] = useState(false);

    const workData = works || [];

    const handleSearch = async () => {
        const keyword = searchCode.trim().toLowerCase();
        if (!keyword) return;

        setSearchTriggered(true);
        try {
            await loadWorks({ page: 1, keyword, searchField: "both" });
        } catch (error) {
            console.error("Search Error:", error);
        }
    };

    const handleSearchByEmployee = async () => {
        const keyword = searchCode.trim().toLowerCase();
        if (!keyword) return;

        setListWork(true);

        setSearchTriggered(true);
        try {
            const result = await loadWorks({ page: 1, keyword, searchField: "both" });
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="size-full flex flex-col items-center justify-center">
            {/* search */}
            <div className="gap-2 flex flex-col items-center">
                <InputSearch placeholder="Nhập mã" value={searchCode} onChange={(e) => setSearchCode(e.target.value)} />
                <BtnSubmit onClick={handleSearchByEmployee} className="bg-green-600 text-white py-2.5 px-4 whitespace-nowrap">
                    Nhấn
                </BtnSubmit>
            </div>

            {/* cards */}
            {listWork ? (
                workData?.docs?.length > 0 ? (
                    workData.docs.map((item, index) => (
                        <div key={index} className="max-w-xl mt-10 bg-white rounded-lg shadow-[0px_0px_20px_0px_#e2e8f0] p-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center border-b pb-2">
                                    <span className="font-semibold w-32">Mã nhân viên:</span>
                                    <span className="text-gray-700">{item.name.code}</span>
                                </div>
                                <div className="flex items-center border-b pb-2">
                                    <span className="font-semibold w-32">Nhân viên:</span>
                                    <span className="text-gray-700 capitalize">{item.name.name}</span>
                                </div>
                                <div className="flex items-center border-b pb-2">
                                    <span className="font-semibold w-32">Ca làm:</span>
                                    <span className="text-gray-700">
                                        {item.shift.shift} - {item.shift.time}
                                    </span>
                                </div>
                                <div className="flex items-center border-b pb-2">
                                    <span className="font-semibold w-32">Thời gian làm:</span>
                                    <span className="text-gray-700">
                                        {(() => {
                                            const dayTime = item?.dayTime || [];
                                            const validDates = dayTime.filter(Boolean);
                                            const formatted = validDates.map((date) => format(new Date(date), "dd/MM/yyyy"));
                                            if (formatted.length >= 2) return `${formatted[0]} - ${formatted[formatted.length - 1]}`;
                                            if (formatted.length === 1) return formatted[0];
                                            return "";
                                        })()}
                                    </span>
                                </div>
                                <div className="flex items-center border-b pb-2">
                                    <span className="font-semibold w-32">Xưởng:</span>
                                    <span className="text-gray-700">{item.factory}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="font-semibold w-32">Máy sản xuất:</span>
                                    <span className="text-gray-700 text-wrap">{item.machines?.join(", ")}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="mt-5 text-gray-500">Không tìm thấy mã nhân viên phù hợp.</p>
                )
            ) : null}
        </div>
    );
};

const UILayout = () => {
    return (
        <WorkProvider>
            <WorksManagement>
                <UILayoutContext />
            </WorksManagement>
        </WorkProvider>
    );
};

export default UILayout;
