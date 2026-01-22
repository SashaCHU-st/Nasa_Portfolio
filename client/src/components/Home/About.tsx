import github from "../../../public/logo/github.png";
import linkedIn from "../../../public/logo/linkedIn.png";

const About = () => {
  return (
    <div
      className="sm:top-2/3 w-6/12 sm:w-11/12 relative flex flex-col items-center rounded-2xl p-6
             bg-[#0d1b2a]/90 border border-cyan-500 shadow-[0_0_20px_#0ff]
             text-white font-sans text-center backdrop-blur-md"
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
        Hello, I’m{" "}
        <a
          href="https://www.linkedin.com/in/aleksandra-heinanen-a63108193/"
          target="_blank"
        >
          <span className="text-cyan-400 font-semibold">
            Aleksandra Heinänen
          </span>
        </a>
        , and I’m excited to present my{" "}
        <a href="https://github.com/SashaCHU-st/Nasa_Portfolio" target="_blank">
          <span className="text-cyan-300">Full Stack Project</span>.
        </a>
      </h2>
      <p className="text-lg sm:text-xl md:text-xl  mt-2">
        Built with
        <span className="font-semibold"> React</span>,
        <span className="font-semibold"> Three.js</span>,
        <span className="font-semibold"> TypeScript</span>,
        <span className="font-semibold"> Node.js</span>,
        <span className="font-semibold"> Fastify</span>, and
        <span className="font-semibold"> PostgreSQL</span>.
      </p>
      <div className="flex flex-col items-start space-y-2 text-lg sm:text-xl md:text-xl">
        <span className="text-cyan-400 font-semibold">When Not Logged In:</span>
        <p className="text-left">
          Users can view the "Picture of the Day" on the home page, browse a
          list of users and their favorite items, search for NASA articles,
          check article details, interact with a 3D universe by rotating and
          moving it, and log in or sign up. <br /> The NASA articles and images
          are fetched from the official{" "}
          <a
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-600"
          >
            NASA API
          </a>
          , which you can visit to learn more about the data source.
        </p>

        <span className="text-cyan-400 font-semibold">When Logged In:</span>
        <p className="text-left">
          Users can search for NASA articles, add or remove articles from their
          favorites, check their own favorites, follow other users, update their
          profile including name, password, and profile picture, and log out.
        </p>
      </div>

      <div className="flex justify-end gap-4 w-full mt-4">
        <a
          className="cursor-pointer"
          href="https://github.com/SashaCHU-st/Nasa_Portfolio"
          target="_blank"
        >
          <img src={github} alt="github" className="h-8" />
        </a>
        <a
          className="cursor-pointer"
          href="https://www.linkedin.com/in/aleksandra-heinanen-a63108193/"
          target="_blank"
        >
          <img src={linkedIn} alt="linkedIn" className="  w-10 h-8" />
        </a>
      </div>
    </div>
  );
};

export default About;
