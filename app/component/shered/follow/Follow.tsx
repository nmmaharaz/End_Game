"use client"
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
interface User {
    name?: string;
    user_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    user_photo?: string;
    isFollowing?: boolean;
  }
  
function Follow() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        if (session?.user?.email) {
          try {
            const res = await axios.get<User[]>(
              `http://localhost:3000/api/user/${session.user.email}`
            );
            setUsers(res.data);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        }
      };
  
      fetchUsers();
    }, [session]);
  return (
    <div className="lg:px-6 rounded-lg mb-8 bg-gray-900/25">
      <div className="">
        <h2 className="text-lg pt-3 font-semibold text-white text-center mb-4">Who to follow</h2>
        <ul className="space-y-4">
          {users.slice(0,4).map((user, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative rounded-full overflow-hidden">
                  <Image
                    src={user?.user_photo ? user?.user_photo :"https://placehold.co/10x10"}
                    alt={user?.user_name || "User"}
                    width={38}
                    height={38}
                    className="rounded-full w-10 h-10 object-cover border-2 overflow-hidden border-blue-500"
                    
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-200 text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">web developer</p>
                </div>
              </div>
              <button
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  user.isFollowing
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                } hover:bg-blue-700 group transition`}
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 group-hover:text-white w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
              </button>
            </li>
          ))}
        </ul>
        <Button variant="surface" className="mt-4 w-full mb-7 cursor-pointer bg-gray-100 hover:bg-gray-300 text-gray-700 hover:text-blue-500 text-sm font-medium py-2 rounded-lg transition">
          View more
        </Button>
      </div>
    </div>
  );
}
export default Follow;
