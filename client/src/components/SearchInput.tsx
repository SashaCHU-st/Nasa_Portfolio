import React, { useState, useEffect } from "react";
import type { Item } from "../types/types";
import Cards from "./Cards";
const NASA_API = import.meta.env.VITE_NASA_IMAGES;

const ITEMS_PER_PAGE = 4;

const SearchInput = () => {
  const [search, setSearch] = useState<string>(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem("searchResults");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPage, setCurrentPage] = useState<number>(() => {
    return Number(localStorage.getItem("currentPage")) || 1;
  });
  useEffect(() => {
    localStorage.setItem("searchQuery", search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("currentPage", String(currentPage));
  }, [currentPage]);

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
    <div >
      <form
        className="flex flex-col sm:flex-row justify-center items-center my-6 gap-4"
        onSubmit={handleSearchNasaAPI}
      >
        <input
          className="font-orbitron uppercase w-full max-w-sm sm:max-w-[384px] rounded-2xl p-3
               bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
          placeholder="Start typing something"
          type="text"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            if (value.trim() === "") {
              setItems([]);
              setCurrentPage(1);
              localStorage.removeItem("searchQuery");
              localStorage.removeItem("searchResults");
              localStorage.removeItem("currentPage");
            }
          }}
        />
        <button
          className="font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
               bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
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
