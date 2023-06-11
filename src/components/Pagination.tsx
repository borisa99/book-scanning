interface Pagination {
  currentPage: number;
  totalCount?: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (page: number) => void;
}

const pageSizeOptions = [20, 50, 100, 200, 500];

export default function Pagination({
  handlePageChange,
  handlePageSizeChange,
  currentPage,
  totalCount,
  pageSize,
}: Pagination) {
  const handlePrevClick = () =>
    currentPage !== 1 && handlePageChange(currentPage - 1);

  const handleNextClick = () => {
    if (!totalCount) return;
    const lastPage = Math.ceil(totalCount / pageSize);

    if (currentPage >= lastPage) {
      handlePageChange(lastPage);
    } else {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-2 flex justify-end">
      <div className="dropdown-top dropdown">
        <label tabIndex={0} className="btn mr-2">
          per page {pageSize}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box  w-28  bg-base-100 p-4 shadow"
        >
          {pageSizeOptions.map((option) => (
            <li
              onClick={() => {
                handlePageSizeChange(option);
              }}
              className="w-full cursor-pointer py-2 hover:opacity-30"
              key={option}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="btn-group">
        <button className="btn" onClick={handlePrevClick}>
          Prev
        </button>
        <button className="btn-active btn">{currentPage}</button>
        <button className="btn" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}
