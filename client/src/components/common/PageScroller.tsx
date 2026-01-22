import type { PageScrollerProps } from "../../types/types";

const PageScroller = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PageScrollerProps) => {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="cursor-pointer relative flex flex-col items-center justify-between rounded-2xl p-2
                         bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white"
          >
            Prev
          </button>
          <span className="text-white px-2 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="cursor-pointer relative flex flex-col items-center justify-between rounded-2xl p-2
                         bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PageScroller;
