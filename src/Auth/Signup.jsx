"use client";
import { Label } from "../components/ui/lsbel";
import { cn } from "../utils/cn";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import axios from "axios";
import { axiosInstance, signinApiGoogle, signupApi } from "../../apiList";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Signup({ setSignin }) {
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);
  const handleSubmit = async(e) => {
    if (!name || !lastname || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    e.preventDefault();
    const fullName=name+" "+lastname;
    
    try {
      toast.loading("Posting data");
      const res = await axiosInstance.post(signupApi, { name: fullName, email: email, password: password },);
      localStorage.setItem("authToken", res.data.user.authToken);
      console.log(res.data.user);
      toast.dismiss();
      // toast.success(res.data.mssg);
      navigateTo("/dashboard")
    } catch (error) {
      toast.dismiss();
      toast.error("Signup failed");
      console.error("Error during signup:", error);
    }
    // setLoading(true);
  };

  const handleGoogleSignup = () => {
    toast.loading("Redirecting to Google...");
    window.location.href = `${signinApiGoogle}`;
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#0C0F15] text-neutral-200">
      <h2 className="font-bold text-xl text-neutral-200">Welcome to Loci</h2>
      <p className="text-neutral-300 text-sm max-w-sm mt-2">Signup to Loci</p>
      <div className="my-8">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text"  value={name} onChange={(e)=>setName(e.target.value)}   />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="text">Confirm Password</Label>
          <Input id="confirmPassword" placeholder="••••••••" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        </LabelInputContainer>

        <button className="bg-zinc-900 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] flex items-center justify-center space-x-2" onClick={handleGoogleSignup}>
          <span>Sign up with Google</span>
          <BottomGradient />
        </button>
        <div className="my-4" />
        <button className="bg-zinc-900 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]" onClick={handleSubmit}>
          Sign up &rarr;
          <BottomGradient />
        </button>
        <div
          className="pt-4 flex justify-center text-gray-400 cursor-pointer hover:text-blue-400 hover:shadow-lg"
          onClick={() => setSignin(false)}
        >
          Already have an account? <BottomGradient />
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </div>
      <Toaster/>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
