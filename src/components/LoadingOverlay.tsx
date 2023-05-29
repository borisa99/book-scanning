export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-20 rounded-md opacity-50">
      <button className="loading btn-square btn"></button>
    </div>
  );
}
