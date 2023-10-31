import React from "react";
import Testimonials from "./components/Testimonials";
import reviews from "./data";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Our Testimonials</h1>
        <div className="bg-violet-400 h-[4px] w-[1/5] mt-1"></div>
      </div>
      <Testimonials reviews={reviews}/>
    </div>
  );
};

export default App;
