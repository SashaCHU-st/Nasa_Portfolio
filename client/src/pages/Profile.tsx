import { useParams } from "react-router-dom";
import Neptune from "../backgrounds/Neptune";
import ProfileComponent from "../components/ProfileComponent";

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black">
      <Neptune />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <ProfileComponent id={id!} />
      </div>
    </div>
  );
};

export default Profile;
