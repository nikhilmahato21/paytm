export function Button({ label, type, onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full text-black sm:text-md text-xl font-semibold tracking-wide border-2 border-black      rounded-lg  hover:shadow-xl  py-2.5 px-1 md:px-2 me-2 mb-2"
    >
      {label}
    </button>
  );
}
