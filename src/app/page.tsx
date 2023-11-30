/** @format */
"use client";

import { useQuery } from "react-query";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import { fetchCountries } from "./action";
import CountryCard, {
  CountryCardSkeleton,
  CountryProp
} from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

export default function Home() {
  const [animationParent] = useAutoAnimate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CountryProp[] | undefined>(
    []
  );

  const {
    isLoading,
    error,
    data: countryData
  } = useQuery<CountryProp[]>("countries", () => fetchCountries());

  //

  const regions = [...new Set(countryData?.map((d) => d.region))];

  function handleOnchangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleOnChangeFilter(e: string) {
    setSelectedCategory(e);
  }
  useEffect(() => {
    let data = countryData;
    if (searchTerm) {
      data = data?.filter((item) =>
        item.name.common
          ?.toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      );
    }

    if (selectedCategory || selectedCategory == "all") {
      data = data?.filter((item) => {
        if (selectedCategory == "all") {
          return item;
        }
        return item.region === selectedCategory;
      });
    }

    setFilteredData(data);
  }, [searchTerm, countryData, selectedCategory]);

  // console.log("data", data);
  // if (isLoading) return "Loading...";

  return (
    <div>
      <section className="mb-8 w-full flex flex-col sm:flex-row justify-between gap-4">
        {/* seachbar */}
        <SearchBar onChange={handleOnchangeSearch} value={searchTerm} />
        {/* filter */}

        <Select onValueChange={handleOnChangeFilter} value={selectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map((d, i) => (
              <SelectItem key={i} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <section
        ref={animationParent}
        className="flex flex-wrap gap-3 gap-y-9 md:justify-between justify-center"
      >
        {isLoading &&
          Array(10)
            .fill(null)
            .map((d, i) => <CountryCardSkeleton key={i} />)}
        {/*  */}
        {filteredData?.map((d, i) => (
          <CountryCard key={i} {...d} />
        ))}
        {/*  */}
        {Array.isArray(filteredData) && filteredData.length < 1 && (
          <NoSearchResults />
        )}
      </section>
    </div>
  );
}

function NoSearchResults() {
  return (
    <div className="text-center text-gray-600 dark:text-gray-400 mt-8 w-full text-3xl font-semibold">
      <p>Your search did not match any results :( </p>
    </div>
  );
}
