import { useState } from "react";
import ReactPaginate from "react-paginate";

const TablePagination = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;
    const totalItems = 100;
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // const startItem = currentPage * itemsPerPage + 1;
    // const endItem = Math.min((currentPage + 1) * itemsPerPage, totalItems);

    return (
        <div className="flex items-center mt-5 flex-col justify-center space-y-4 min-[525px]:space-y-0 min-[525px]:justify-between min-[525px]:flex-row">
            <div>
                Trang - {currentPage + 1}/{itemsPerPage}
            </div>
            <div>
                <ReactPaginate
                    onPageChange={handlePageChange}
                    pageCount={pageCount}
                    forcePage={currentPage}
                    breakLabel="..."
                    nextLabel={<i className="fa-solid fa-angle-right"></i>}
                    previousLabel={<i className="fa-solid fa-angle-left"></i>}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    containerClassName="flex justify-center items-center rounded-lg"
                    pageLinkClassName='flex items-center justify-center size-9 rounded-lg hover:!bg-[#deebff]'
                    previousLinkClassName="flex items-center justify-center size-9 font-medium rounded-lg hover:!bg-[#deebff]"
                    nextLinkClassName="flex items-center justify-center size-9 font-medium rounded-lg hover:!bg-[#deebff]"
                    breakLinkClassName='flex items-center justify-center size-10'
                    activeLinkClassName="!bg-blue-500 !text-white hover:!bg-blue-500 rounded-lg font-semibold"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};

export default TablePagination;
