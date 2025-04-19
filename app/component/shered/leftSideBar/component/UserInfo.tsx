"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const [user, setUser] = useState([]);
  const { data } = useSession();
  useEffect(() => {
    const userData = async () => {
      const user = await axios.get(
        `http://localhost:3000/api/user/${data?.user?.email}`
      );
      console.log(user, "user===========>");
      setUser(user.data);
    };
    userData();
  }, [data?.user?.email]);
  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="relative pb-3">
       <div className="h-20">

       </div>
        <div className="absolute inset-x-0 top-12 flex justify-center">
          <Image
            src={user?.user_photo || "https://placehold.co/10x10"}
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-lg border-4 border-white shadow-md"
          />
        </div>
      </div>
      <div className="pt-12 pb-6 text-center px-4">
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <p className="text-gray-500 text-sm">Web Developer at StackBros</p>
        <p className="text-gray-600 text-sm mt-2">
          I'd love to change the world, but they won’t give me the source code.
        </p>
        <div className="mt-4 flex justify-center space-x-6 text-gray-700">
          <div className="text-center">
            <p className="font-semibold">256</p>
            <p className="text-xs">Post</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">2.5K</p>
            <p className="text-xs">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">365</p>
            <p className="text-xs">Following</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
