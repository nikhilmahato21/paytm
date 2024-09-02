import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex  flex-col items-center justify-center min-h-screen bg-moneyYellow p-4">
      <img
        src="https://res.cloudinary.com/dynbpb9u0/image/upload/v1725082647/hq720_gkrzjx.jpg"
        alt="Top Image"
        className="w-full max-w-lg h-52 object-cover object-center mb-6 rounded-lg"
      />
      <h1 className="text-3xl md:text-5xl font-bold text-center text-moneyBlack mb-4">
        "We Get It, You're Broke!"😜
      </h1>
      <p className=" flex mb-6 text-center font-bold  font-mono text-slate-600 text-xl md:text-2xl max-w-lg">
        Send some to your friends—they’re probably just as broke. Time to learn
        how to spread the wealth, even if it's fake! 💸
      </p>
      <Link to={"/signin"}><button className="border-2 border-slate-700 text-slate-700 font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition duration-300">
        Sign In 
      </button></Link>
      
      <p className="text-sm tracking-wide font-semibold pt-2  text-center text-gray-600 ">Time to Sign In. <br/>Who knows, maybe today’s the day your demo rupees turn real (or not).<br/> Or maybe it’ll work in Universe 616—anything's possible in a multiverse! 🌌</p>
    </div>
  );
};

export default Home;
