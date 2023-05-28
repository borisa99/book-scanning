import AddBookModal from "./AddBookModal";

export default function BooksSearch() {
  // const handleClick = () => {};
  return (
    <>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search"
          className="input-bordered input w-full max-w-xs"
        />
        <div className="flex gap-x-2">
          <input
            type="text"
            placeholder="ISBN"
            className="input-bordered input w-full max-w-xs"
          />
          <label htmlFor="my-modal" className="btn-primary btn">
            Add New
          </label>
        </div>
      </div>
      <AddBookModal />
    </>
  );
}
