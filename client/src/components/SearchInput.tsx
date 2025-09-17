import React, { useState, useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import type { Item } from '../types/types';
import Cards from './Cards';

const NASA_API = import.meta.env.VITE_NASA_IMAGES;
const ITEMS_PER_PAGE = 4;

const SearchInput = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  const [searchPressed, setSearchPressed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (navigationType === 'POP') {
      const savedQuery = localStorage.getItem('searchQuery');
      const savedResults = localStorage.getItem('searchResults');
      const savedPage = localStorage.getItem('currentPage');

      if (savedQuery) {
        setSearch(savedQuery);
      }
      if (savedResults) {
        setItems(JSON.parse(savedResults));
      }
      if (savedPage) {
        setCurrentPage(Number(savedPage));
      }
      if (savedResults) {
        setSearchPressed(true);
      }
    } else {
      localStorage.removeItem('searchQuery');
      localStorage.removeItem('searchResults');
      localStorage.removeItem('currentPage');
      setSearch('');
      setItems([]);
      setCurrentPage(1);
      setSearchPressed(false);
    }
  }, [location.key, navigationType]);

  useEffect(() => {
    if (items.length)
      localStorage.setItem('searchResults', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (search) localStorage.setItem('searchQuery', search);
  }, [search]);

  useEffect(() => {
    if (currentPage > 1)
      localStorage.setItem('currentPage', String(currentPage));
  }, [currentPage]);

  const handleSearchNasaAPI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setSearchPressed(true);

    try {
      const res = await fetch(`${NASA_API}${search}`);
      const data = await res.json();
      if (!res.ok) throw new Error('Nothing found');

      setItems(data.collection.items);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <div>
      <form
        className="flex flex-col sm:flex-row justify-center items-center my-6 gap-4"
        onSubmit={handleSearchNasaAPI}
      >
        <input
          className="font-orbitron uppercase w-full max-w-sm sm:max-w-[384px] rounded-2xl p-3
               bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
          placeholder="start search... e.g. mars"
          type="text"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            setSearchPressed(false);
            setLoading(false);

            if (value.trim() === '') {
              setItems([]);
              setCurrentPage(1);
              localStorage.removeItem('searchQuery');
              localStorage.removeItem('searchResults');
              localStorage.removeItem('currentPage');
            }
          }}
        />
        <button
          className=" cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
               bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
          type="submit"
        >
          Search
        </button>
      </form>

      <Cards
        loading={loading}
        search={search}
        searchPressed={searchPressed}
        paginatedItems={paginatedItems}
        pages={{ totalPages, currentPage, setCurrentPage }}
      />
    </div>
  );
};

export default SearchInput;
