interface Pagination {
  currentPage: number;
  totalCount?: number;
  pageSize: number;
  handleChange: (page: number) => void;
}
export default function Pagination({
  handleChange,
  currentPage,
  totalCount,
  pageSize,
}: Pagination) {
  const handlePrevClick = () =>
    currentPage !== 1 && handleChange(currentPage - 1);

  const handleNextClick = () => {
    if (!totalCount) return;
    const lastPage = Math.ceil(totalCount / pageSize);

    if (currentPage >= lastPage) {
      handleChange(lastPage);
    } else {
      handleChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-2 flex justify-end">
      <div className="btn-group">
        <button className="btn-sm btn" onClick={handlePrevClick}>
          Prev
        </button>
        <button className="btn-active btn-sm btn">{currentPage}</button>
        <button className="btn-sm btn" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}
