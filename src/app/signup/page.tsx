"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center ">
      <h1>{loading ? "Processing " : "Signup"} </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 rounded-md text-black focus:outline-none "
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="Username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 rounded-md text-black focus:outline-none "
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 rounded-md text-black focus:outline-none "
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      />

      <button
        className="px-5 py-2 bg-blue-400 mt-3 rounded-lg hover:px-7 hover:py-3 "
        type="submit"
        onClick={onSignup}
      >
        {buttonDisabled ? "no signup" : "signup"}
      </button>
      <Link href={"/login"}>Visit Login page</Link>
    </div>
  );
}
