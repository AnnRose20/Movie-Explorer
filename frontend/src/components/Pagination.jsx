import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}) {
  return (
    <div className="mt-12 flex items-center justify-center gap-6">

      <Link
        href={
          currentPage > 1
            ? `${basePath}?page=${currentPage - 1}`
            : "#"
        }
        className={`rounded-lg px-5 py-3 font-medium transition ${
          currentPage === 1
            ? "pointer-events-none bg-slate-700 text-gray-400"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        ← Previous
      </Link>

      <span className="text-lg font-semibold text-white">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={
          currentPage < totalPages
            ? `${basePath}?page=${currentPage + 1}`
            : "#"
        }
        className={`rounded-lg px-5 py-3 font-medium transition ${
          currentPage === totalPages
            ? "pointer-events-none bg-slate-700 text-gray-400"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        Next →
      </Link>

    </div>
  );
}