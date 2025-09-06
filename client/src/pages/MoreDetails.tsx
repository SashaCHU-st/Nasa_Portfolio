import Saturn from "../backgrounds/Saturn";
import Details from "../components/Details";

const MoreDetails = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Saturn />
      <div className="absolute top-1/2  transform -translate-y-1/2  max-w-[95%] px-4">
          <Details />
      </div>
    </div>
  );
};

export default MoreDetails;
