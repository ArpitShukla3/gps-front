import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "../components/comp/google-gemini-effect";
import { Link, useNavigate } from "react-router-dom";

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
    const loginToken = document.cookie;
    if (loginToken) {
      navigateTo("/dashboard");
    } else {
      navigateTo("/auth");
    }
  }
  return (
    <>
      <div
        className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip "
        ref={ref}
      >
        <div className="fixed top-4 right-4 hidden md:block">
            <button className="px-12 py-4 rounded-full bg-white font-bold text-black tracking-widest uppercase transform hover:scale-105 hover:bg-gray-500 active:bg-blue-700 transition-colors duration-200" onClick={handleGetStarted}>
              Get Started {"->"}
            </button>
        </div>

        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          title={"Real Time Location Services"}
          description={"Track efficiently and live with our new website"}
        />
      </div>
    </>
  );
}
