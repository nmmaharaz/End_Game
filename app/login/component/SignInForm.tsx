"use client"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
function SignInForm() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const route = useRouter();
    const session = useSession();
    console.log(session, "session")
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const response = await signIn("credentials", {
          email,password,
          redirect: false
        });  
        if(response?.ok){
          // toast('Here is your toast.');
          route.push("/")
        }else{
          // toast.error("Invaild Input");
        }
    }
   
  return (
    <div>
         <form onSubmit={handleSubmit} className="bg-gradient-to-t from-white via-blue-100 to-blue-200 p-8 rounded-2xl shadow-xl w-96 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m-4.5 0A2.25 2.25 0 002 11.25v7.5A2.25 2.25 0 004.25 21h15.5A2.25 2.25 0 0022 18.75v-7.5A2.25 2.25 0 0019.75 9h-15.5z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Sign in with email</h2>
        <p className="text-gray-500 mb-4">
          Make a new doc to bring your words, data, and teams together. For free
        </p>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
        <input
          type={showPassword?"text":"password"}
          name="password"
          required
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
           {showPassword ? (
                    <FaEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 cursor-pointer top-[30%]"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 cursor-pointer top-[30%]"
                    />
                  )}
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span></span>
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </div>
        <button className="w-full cursor-pointer bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition">
          Join Us
        </button>
        <div className="text-gray-500 text-sm mt-4">Or sign in with</div>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  )
}

export default SignInForm