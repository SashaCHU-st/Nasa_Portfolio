import React, { useState } from "react";
import type { Item } from "../types/types";
const NASA_API = import.meta.env.VITE_NASA_IMAGES;

const ITEMS_PER_PAGE = 8;

const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearchNasaAPI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${NASA_API}${search}`);
      const data = await res.json();
      setItems(data.collection.items);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full pb-4">
      <form
        className="flex gap-4 items-center justify-center mb-8"
        onSubmit={handleSearchNasaAPI}
      >
        <input
          className="border-2 border-white w-full md:w-96 h-16 text-white px-4 text-xl rounded-xl bg-transparent"
          placeholder="Start typing something"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="border-2 border-blue-800 bg-blue-800 text-white text-2xl rounded-xl px-8 py-4 h-16"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
        {paginatedItems.map((item, index) => (
          <div
            key={index}
            className="text-white border-2 border-white p-4 flex flex-col items-center rounded-xl w-full h-[400px]"
          >
            <h2 className="mb-2 font-bold text-center text-sm sm:text-base md:text-lg">
              {item.data[0].title}
            </h2>
            {item.links?.[0]?.href && (
              <div className="w-full h-60 mb-2">
                <img
                  src={item.links[0].href}
                  alt={item.data[0].title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
            <button className="border-2 border-blue-500 bg-blue-500 text-white rounded-xl px-4 py-2 mt-auto w-full">
              More details
            </button>
          </div>
        ))}
      </div>
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

export default SearchInput;
