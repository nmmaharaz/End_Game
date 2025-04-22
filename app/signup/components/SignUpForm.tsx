"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import SocialLogin from "../../login/component/SocialLogin";
import toast from "react-hot-toast";

function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const route = useRouter();
  useEffect(() => {
    const errors: string[] = [];

    if (password.length < 7) {
      errors.push("Must be at least 6 characters");
    }

    const uperCasePassword = /^(?=.*[A-Z]).+$/;
    if (!uperCasePassword.test(password)) {
      errors.push("Must contain at least 1 in Capital Case");
    }

    const lowerCasePassword = /^(?=.*[a-z]).+$/;
    if (!lowerCasePassword.test(password)) {
      errors.push("Must contain at least 1 in lower case");
    }
    setErrorMessage(errors);
  }, [password]);

  console.log(password, "password");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorMessage.length > 0) {
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(["Passwords do not match"]);
      return;
    }
    const form = e.target as HTMLFormElement;
    const userInfo = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      user_name: (form.elements.namedItem("user_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: password,
      confirm_password: confirmPassword,
    };
   const {data} = await axios.post("http://localhost:3000/api/user", userInfo);
   console.log(data)
   if(data.acknowledged){
      toast.success("Registration Successfully please login");
      route.push("/login");
   }else {
    toast.error(`${data?.message}`);
  }
  };
  return (
    <form onSubmit={handleSubmit} action="">
      <div className="bg-gradient-to-t from-white via-blue-100 to-blue-200 p-8 rounded-2xl shadow-xl w-96 text-center">
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
          name="name"
          type="text"
          required
          placeholder="Name"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="user_name"
          type="text"
          placeholder="User_name"
          required
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Create Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer top-[35%]"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer top-[35%]"
            />
          )}
        </div>
        {errorMessage && (
          <p className="text-sm text-red-700 text-left">{errorMessage[0]}</p>
        )}
        <div className="relative">
          <input
            type={confirmShowPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full p-3 mt-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmShowPassword ? (
            <FaEye
              onClick={() => setConfirmShowPassword(!confirmShowPassword)}
              className="absolute right-3 cursor-pointer top-[35%]"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setConfirmShowPassword(!confirmShowPassword)}
              className="absolute right-3 cursor-pointer top-[35%]"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
        >
          Create
        </button>
        <div className="text-gray-500 text-sm mt-4">Or sign in with</div>
        <SocialLogin></SocialLogin>
      </div>
    </form>
  );
}

export default SignUpForm;
