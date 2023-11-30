/** @format */
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";

type Props = {};

export default function Navbar({}: Props) {
  const { setTheme, resolvedTheme } = useTheme();

  function toggleTheme() {
    if (resolvedTheme === "dark") {
      setTheme("light");
    }
    if (resolvedTheme === "light") {
      setTheme("dark");
    }
  }

  return (
    <div className=" sticky top-0 z-50 shadow-xl dark:shadow-2xl ">
      <div className="flex justify-between max-w-screen-2xl mx-auto   mb-8 px-8  dark:bg-slate-900 md:px-14 py-5 items-center transition-all bg-white">
        <Link href={"/"} className="font-bold  text-xl md:text-2xl">
          Where in the world?
        </Link>

        <section
          onClick={toggleTheme}
          className=" flex  items-center gap-1 cursor-pointer p-2 hover:opacity-80  md:px-4 transition-all"
        >
          <div className=" text-xl md:text-2x ">
            {resolvedTheme === "light" ? <BsMoonFill /> : <BsFillSunFill />}
          </div>
          <div className="text-xl md:text-2xl md-1 font-semibold hidden  md:block ">
            {resolvedTheme === "light" ? "Dark" : "Light"}
            Mode
          </div>
        </section>
      </div>
    </div>
  );
}
