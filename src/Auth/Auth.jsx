import { useEffect, useState } from "react";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import Animation from "./Animation";

export default function Auth() {
  const [signin, setSignin] = useState(true);
  return (
    <div className=" h-screen md:h-[100vh] bg-gradient-to-br from-black via-gray-800 to-gray-900 flex justify-center items-center flex-col md:flex-row">
      <div className="hidden md:flex w-full sm:w-1/3 md:w-[50vh] justify-center items-center sm:mb-8">
        <Animation />
      </div>
      <div className="w-full md:w-[50vh] mt-8 md:mt-0 flex flex-col justify-center items-center space-y-8 md:space-y-0 md:space-x-8 ">
        {signin ? (
          <Signup setSignin={setSignin} />
        ) : (
          <Signin setSignin={setSignin} />
        )}
      </div>
    </div>
  );
}
