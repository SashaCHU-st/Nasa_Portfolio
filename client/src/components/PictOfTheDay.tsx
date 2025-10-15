import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const API_KEY = import.meta.env.VITE_API_KEY;
const NASA_API = import.meta.env.VITE_NASA_API;

const PictOfTheDay = () => {
  const [picture, setPicture] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let upload = true;
    const MIN_LOADING_MS = 700;
    const FETCH_TIMEOUT_MS = 3000;

    const fetchPicture = async () => {
      setLoading(true);
      const start = Date.now();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      try {
        const res = await fetch(`${NASA_API}${API_KEY}`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error(`Fetch failed: ${res.status}`);
        }

        const data = await res.json();
        if (!upload) return;

        if (data && data.url) {
          setPicture(data.url);
          setDescription(data.explanation);
          setTitle(data.title);
          setDate(data.date);
        } else {
          setPicture(null);
        }
      } catch (error) {
        if ((error as any)?.name !== 'AbortError') console.error(error);
        if (upload) setPicture(null);
      } finally {
        const elapsed = Date.now() - start;
        const wait = Math.max(0, MIN_LOADING_MS - elapsed);
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));
        if (upload) setLoading(false);
      }
    };

    fetchPicture();

    return () => {
      upload = false;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col justify-center items-center text-center px-2 md:px-0">
          <h2 className="font-sans uppercase text-white text-lg sm:text-l md:text-l mb-4">
            {title}
          </h2>
          <p className="font-orbitron uppercase text-white text-lg sm:text-l md:text-l mb-4 text-right w-full">
            {date}
          </p>
          {picture ? (
            <>
              <img
                src={picture}
                alt="NASA Picture of the Day"
                className="w-46 md:w-[28rem] lg:w-[36rem] h-46 rounded shadow-lg mb-6"
              />

              <button
                className="cursor-pointer font-orbitron text-white underline mb-4"
                onClick={() => setShowDescription((prev) => !prev)}
              >
                {showDescription ? 'Hide description' : 'Show description'}
              </button>

              <div
                className={`transition-all duration-500 overflow-hidden w-full max-w-3xl ${
                  showDescription ? 'max-h-[500px]' : 'max-h-0'
                }`}
              >
                <p className="font-sans text-white text-xl text-center">
                  {description}
                </p>
              </div>
            </>
          ) : (
            <p className="font-sans text-white text-xl text-center">Today no picture of the day :(</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PictOfTheDay;
