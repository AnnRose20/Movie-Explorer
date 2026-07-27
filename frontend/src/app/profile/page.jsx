"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/userService";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-28 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl bg-slate-900 p-8 shadow-lg">

        <h1 className="mb-8 text-4xl font-bold">
          My Profile
        </h1>

        <div className="space-y-6">

          <div>
            <p className="text-sm text-gray-400">
              Username
            </p>

            <p className="mt-1 text-xl font-semibold">
              {user.username}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Email
            </p>

            <p className="mt-1 text-xl font-semibold">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              User ID
            </p>

            <p className="mt-1 text-xl font-semibold">
              {user.id}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}