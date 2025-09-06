import EditProfile from "../components/EditProfile";
import Venus from "../backgrounds/Venus";

const MyProfile = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Venus />
      <div className="absolute top-1/2 transform -translate-y-1/2 w-11/12 md:w-[36rem] lg:w-[34rem] xl:w-[52rem] max-w-[60vw]">
        <EditProfile />
      </div>
    </div>
  );
};

export default MyProfile;
