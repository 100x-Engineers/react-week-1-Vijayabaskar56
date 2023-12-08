export default function Loader({ dark }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`w-5 h-5 rounded-full border-2 ${
          dark
            ? "border-slate-200 border-t-primary"
            : "border-white border-t-transparent"
        } animate-spin`}
      ></div>
    </div>
  );
}
