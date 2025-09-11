import Mercury from "../backgrounds/Mercury"
import MySubscriptions from "../components/MySubscriptions"
const Subscriptions = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Mercury />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
          <MySubscriptions />
      </div>
    </div>
  );
}

export default Subscriptions