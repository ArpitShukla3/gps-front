import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "../components/comp/google-gemini-effect";
import { Link, useNavigate } from "react-router-dom";
import { Vortex } from "../components/ui/vortex";

export default function FrontPage() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const navigateTo=useNavigate();
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  const handleGetStarted = () => {
    const loginToken = localStorage.getItem("authToken");
    if (loginToken) {
      navigateTo("/dashboard");
    } else {
      navigateTo("/auth");
    }
  }
  return (
    // <>
    //   <div
    //     className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip "
    //     ref={ref}
    //   >
    //     <div className="fixed top-4 right-4">
    //         <button className="px-12 py-4 rounded-full bg-white font-bold text-black tracking-widest uppercase transform hover:scale-105 hover:bg-gray-500 active:bg-blue-700 transition-colors duration-200" onClick={handleGetStarted}>
    //           Get Started {"->"}
    //         </button>
    //     </div>

    //     <GoogleGeminiEffect
    //       pathLengths={[
    //         pathLengthFirst,
    //         pathLengthSecond,
    //         pathLengthThird,
    //         pathLengthFourth,
    //         pathLengthFifth,
    //       ]}
    //       title={"Real Time Location Services"}
    //       description={"Track efficiently and live with our new website"}
    //     />
    //   </div>
    // </>
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
    <Vortex
      backgroundColor="black"
      rangeY={800}
      particleCount={500}
      baseHue={120}
      className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
    >
      <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
        Lets Start using Loki today
      </h2>
      <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
      With our real-time location services, you can have peace of mind knowing exactly where everything important is, at any moment.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </Vortex>
  </div>
  );
}
