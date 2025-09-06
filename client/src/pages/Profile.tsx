import { useParams } from "react-router-dom";
import Neptune from "../backgrounds/Neptune";
import ProfileComponent from "../components/ProfileComponent";

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black">
      <Neptune />
      <div className="absolute  left-1/2 transform -translate-x-1/2 w-11/12 sm:w-9/12 md:w-7/12 max-w-[95%] px-4">
        <ProfileComponent id={id!} />
      </div>
    </div>
  );
};

export default Profile;
