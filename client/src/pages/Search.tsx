import Sun from "../backgrounds/Sun";
import SearchInput from "../components/SearchInput";

const Search = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black">
      <Sun />
      {/* <div className="absolute top-1/5 left-1/7 transform translate-x-1/4 w-full max-w-[90rem] px-4"> */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9/12 sm:max-w-[95%] px-4">
        <SearchInput />
      </div>
    </div>
  );
};

export default Search;
