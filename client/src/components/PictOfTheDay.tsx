import { useEffect, useState } from "react";
import Spinner from "./Spinner";

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
    const fetchPicture = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${NASA_API}${API_KEY}`);
        const data = await res.json();
        if (data.url) {
          setPicture(data.url);
          setDescription(data.explanation);
          setTitle(data.title);
          setDate(data.date);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPicture();
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
            <img
              src={picture}
              alt="NASA Picture of the Day"
              className="w-46 md:w-[28rem] lg:w-[36rem] h-46 rounded shadow-lg mb-6"
            />
          ) : (
            <p className="text-white">Today no picture of the day :(</p>
          )}
          <button
            className="cursor-pointer cursor-pointer font-orbitron text-white underline mb-4"
            onClick={() => setShowDescription((prev) => !prev)}
          >
            {showDescription ? "Hide description" : "Show description"}
          </button>

          <div
            className={`transition-all duration-500 overflow-hidden w-full max-w-3xl ${
              showDescription ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <p className="font-sans text-white text-xl text-center">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PictOfTheDay;
