import type { PageScrollerProps } from "../types/types";

const PageScroller = ({totalPages, currentPage, setCurrentPage}:PageScrollerProps) => {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="border px-4 py-2 rounded disabled:opacity-50 text-white"
          >
            Prev
          </button>
          <span className="text-white px-2 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="border px-4 py-2 rounded disabled:opacity-50 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PageScroller;
