import Sun from "../backgrounds/Sun";
import SearchInput from "../components/SearchInput";

const Search = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black">
      <Sun  /> 
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7/12 sm:max-w-[85%] px-2">
        <SearchInput /> 
      </div>
    </div>
  );
};

export default Search;
