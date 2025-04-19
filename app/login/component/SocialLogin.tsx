"use client"
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

function SocialLogin() {
    // const route = useRouter();
    // const session = useSession();
    // const handleSocailLogin = async (providerName:string) => {
    //     await signIn(providerName);
    //     if(session?.status == "authenticated"){
    //         // toast.success("Login successfully");
    //         // route.push("/")
    //     }
    //   };
      
  return (
    <div className="flex justify-center gap-4 mt-3">
      <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
        <FaGoogle
        //  onClick={() => handleSocailLogin("google")} 
         className="text-red-500" size={20} />
      </button>
      <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
        <FaGithub className="text-gray-800" size={20} />
      </button>
    </div>
  );
}

export default SocialLogin;
