import React, { useState } from "react";
import type { Item } from "../types/types";
import Cards from "./Cards";
const NASA_API = import.meta.env.VITE_NASA_IMAGES;

const ITEMS_PER_PAGE = 6;

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
          className="font-orbitron uppercase w-96 rounded-2xl p-4
                    bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
          placeholder="Start typing something"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="font-orbitron uppercase w-32 rounded-2xl p-4
                    bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
          type="submit"
        >
          Search
        </button>
      </form>
      <Cards
        paginatedItems={paginatedItems}
        pages={{
          totalPages,
          currentPage,
          setCurrentPage,
        }}
      />
    </div>
  );
};

export default SearchInput;
