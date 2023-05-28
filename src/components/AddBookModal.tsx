export default function AddBookModal() {
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-full">
          <h3 className="mb-5 text-lg font-bold">Add a new book</h3>

          <div className="modal-action">
            <label htmlFor="my-modal" className="btn-sm btn">
              Cancel
            </label>
            <label htmlFor="my-modal" className="btn-sm btn">
              Confirm
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
