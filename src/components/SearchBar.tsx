/** @format */

import React from "react";

import { AiOutlineSearch } from "react-icons/ai";
type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for country..."
        value={value}
        onChange={onChange}
        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 translate-all w-[300px] max-h-[36px] bg-inherit"
      />

      <div className="absolute inset-y-0 left-0 flex pl-3   items-center">
        <AiOutlineSearch className="text-gray-500 text-lg" />
      </div>
    </div>
  );
}
