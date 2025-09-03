import Moon from "../backgrounds/Moon"
import UsersCard from "../components/UsersCard"

const Users = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Moon/>
      <div className="absolute top-1/2 right-[40%] transform -translate-y-1/2 w-11/12 md:w-[36rem] lg:w-[34rem] xl:w-[52rem] max-w-[60vw]">
        <UsersCard/>
      </div>
    </div>
  )
}

export default Users