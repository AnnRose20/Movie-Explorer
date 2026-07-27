"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getProfile } from "@/services/userService";
import { logout } from "@/services/authService";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {

    async function loadUser() {

      try {

        const profile = await getProfile();

        console.log(profile);
        setUser(profile);

      } catch {

        setUser(null);

      }

    }

    loadUser();

  }, []);


  useEffect(() => {

    function handleClickOutside(event) {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setShowMenu(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/">
          <h1 className="cursor-pointer text-3xl font-bold text-red-500">
            Movie Explorer
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="transition hover:text-red-500"
          >
            Home
          </Link>

          <Link
            href="/favorites"
            className="transition hover:text-red-500"
          >
            ❤️ Favorites
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-red-500"
          >
            Contact
          </Link>

          {!user ? (

            <>
              <Link
                href="/login"
                className="transition hover:text-red-500"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-700"
              >
                Register
              </Link>
            </>

          ) : (

            <div
              className="relative"
              ref={menuRef}
            >

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-lg font-bold">

                  {user.username.charAt(0).toUpperCase()}

                </div>

                <span>

                  {user.username}

                </span>

              </button>

              {showMenu && (

                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

                  <div className="border-b border-slate-700 p-4">

                    <p className="font-semibold">

                      {user.username}

                    </p>

                    <p className="text-sm text-gray-400">

                      {user.email}

                    </p>

                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-slate-800"
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    href="/favorites"
                    className="block px-4 py-3 hover:bg-slate-800"
                  >
                    ❤️ Favorites
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 text-left hover:bg-slate-800"
                  >
                    🚪 Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-5 bg-black px-6 py-6 md:hidden">

          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          <Link href="/favorites" onClick={() => setIsOpen(false)}>
            ❤️ Favorites
          </Link>

          <Link href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          <hr className="border-slate-700" />

          {!user ? (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>

              <Link href="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="font-semibold text-red-500">
                👤 {user.username}
              </div>

              <Link href="/profile" onClick={() => setIsOpen(false)}>
                My Profile
              </Link>

              <Link href="/favorites" onClick={() => setIsOpen(false)}>
                My Favorites
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </nav>
  );
}