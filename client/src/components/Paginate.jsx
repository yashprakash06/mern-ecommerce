import { useSearchParams } from "react-router-dom";

function Paginate({ pages, page }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (pages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-[#382B66] bg-white dark:bg-[#100C24] text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-[#1A1438] transition-colors"
      >
        Previous
      </button>
      
      {[...Array(pages).keys()].map((x) => (
        <button
          key={x + 1}
          onClick={() => handlePageChange(x + 1)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
            x + 1 === page
              ? "bg-indigo-600 text-white"
              : "border border-slate-200 dark:border-[#382B66] bg-white dark:bg-[#100C24] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A1438]"
          }`}
        >
          {x + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pages}
        className="px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-[#382B66] bg-white dark:bg-[#100C24] text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-[#1A1438] transition-colors"
      >
        Next
      </button>
    </div>
  );
}

export default Paginate;
