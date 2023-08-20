"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");

  const onLogout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };
  return (
    <div className="flex items-center min-h-screen justify-center flex-col">
      <h1 className="text-4xl">Profile Page</h1>
      <hr />
      <h2 className="bg-green-500 rounded mt-5 px-3 py-2">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <button
        onClick={onLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 py-2 px-4 text-white rounded-lg font-bold"
      >
        logout
      </button>
      <button
        onClick={getDetails}
        className=" mt-4 py-2 px-4 text-white rounded-lg font-bold bg-blue-500 hover:bg-red-600 "
      >
        Get Details
      </button>
    </div>
  );
}
