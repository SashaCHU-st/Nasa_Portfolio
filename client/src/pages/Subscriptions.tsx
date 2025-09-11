import Mercury from "../backgrounds/Mercury"
import MySubscriptions from "../components/MySubscriptions"
const Subscriptions = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Mercury />
      <div className="absolute top-1/2  transform -translate-y-1/2  max-w-[95%] px-4">
          <MySubscriptions />
      </div>
    </div>
  );
}

export default Subscriptions