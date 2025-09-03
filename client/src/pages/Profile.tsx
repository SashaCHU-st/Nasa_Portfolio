import { useParams } from "react-router-dom";
import Neptune from "../backgrounds/Neptune"
import ProfileComponent from "../components/ProfileComponent";

const Profile = () => {
  const { id } = useParams<{ id: string }>();


  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Neptune/>
      <div className="absolute top-1/5 left-[20%] transform -translate-y-1/2 w-11/12 md:w-[36rem] lg:w-[34rem] xl:w-[52rem] max-w-[60vw] text-white">
          <ProfileComponent
          id={id!}/>
      </div>
    </div>
  )
}

export default Profile