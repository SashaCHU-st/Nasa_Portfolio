import { useState } from "react";
import PageScroller from "./PageScroller";
import Followers from "./Followers";
import Spinner from "./Spinner";
import type { SubFollowProps } from "../types/types";
import { paginate } from "../utils/paginatedItems";
import NotYetItems from "./NotYetItems";

const SubAndFollow = ({ users, loading }: SubFollowProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { items, totalPages } = paginate(users, currentPage);
  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center items-center col-span-full h-64">
          <Spinner />
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {items.map((item) => (
            <Followers key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[320px] mt-4">
          <NotYetItems item="Not yet Users" />
        </div>
      )}

      <PageScroller
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SubAndFollow;
