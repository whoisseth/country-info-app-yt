/** @format */

"use client";
import { CountryProp, Maps, NativeName } from "@/components/CountryCard";
import React from "react";
import { useQuery } from "react-query";
import { fetchCountryByName } from "../action";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import ValueSpan from "@/components/ui/ValueSpan";
import Image from "next/image";
import LabelSpan from "../../components/ui/LabelSpan";
import Skeleton from "@/components/ui/Skeleton";

type Props = {};

export default function CountryDetailPage({
  params
}: {
  params: { countryName: string };
}) {
  const { isLoading, data } = useQuery<CountryProp[]>("countries", () =>
    fetchCountryByName(params.countryName)
  );

  const country = Array.isArray(data) && data.length > 0 ? data[0] : null;

  console.log("data", data);
  //
  if (isLoading) return <SkeletonLoading />;
  if (!country) return <div>Country not found</div>;

  return (
    <div>
      <BackButton />
      <section
        className="mt-8 flex flex-col items-center lg:flex-row
      gap-4 lg:gap-12 overflow-hidden"
      >
        <CountryImage {...country} />
        <div>
          <h1 className="font-bold text-3xl">{country.name.common}</h1>
          <section className=" gird grid-cols-1 md:grid-cols-2 md:mt-5 md:gap-4 md:text-xl md:flex  ">
            {/* left side */}
            <LeftSideData {...country} />
            {/* right side */}
            <RightSideData {...country} />
          </section>
        </div>
      </section>
    </div>
  );
}

function SkeletonLoading() {
  return (
    <div>
      <BackButton />
      <div className="mt-8 flex flex-col items-center  lg:flex-row md:flex gap-4 lg:gap-12   overflow-hidden">
        <>
          <Skeleton
            className="md:mb-8 mb-2  overflow-hidden
        w-[320px] h-[240px] md:w-[640px] md:h-[480px] "
          />
          <div>
            <Skeleton className="mb-2" />
            <Skeleton className="" />
            <div className="grid grid-cols-1 md:grid-cols-2  md:flex md:mt-5 md:gap-4      md:text-xl   ">
              <Skeleton className="h-[350px] w-[300px]" />
              <Skeleton className="h-[350px] w-[300px]" />
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

function RightSideData(country: CountryProp) {
  return (
    <div className="flex mt-2 md:mt-0 flex-col gap-2  max-w-[350px]  ">
      <div>
        <LabelSpan> Top Level Doamin </LabelSpan>
        <ValueSpan>: {country.tld} </ValueSpan>
      </div>
      <div>
        <LabelSpan> Currencies </LabelSpan>
        <ValueSpan>
          :{" "}
          {country.currencies
            ? country.currencies[Object.keys(country.currencies)[0]].name
            : "No Currencies"}
        </ValueSpan>
      </div>
      <div>
        <LabelSpan> Languages </LabelSpan>
        <ValueSpan>
          :{" "}
          {Object.keys(country.languages)
            .map(function (key, index) {
              return country.languages[key];
            })
            .join(", ")}
        </ValueSpan>
      </div>
      <CountryMap maps={country.maps} />
    </div>
  );
}

function CountryMap({ maps }: { maps: Maps }) {
  return (
    <div className="flex gap-1">
      <LabelSpan>Maps </LabelSpan>

      <ValueSpan className="flex gap-3 ">
        :
        <Link
          target="_blank"
          className="underline text-blue-400 font-semibold"
          href={maps.googleMaps}
        >
          Google Map
        </Link>
        <Link
          target="_blank"
          className="underline text-blue-400 font-semibold"
          href={maps.openStreetMaps}
        >
          Openm Street
        </Link>
      </ValueSpan>
    </div>
  );
}

function LeftSideData(country: CountryProp) {
  function getOfficialNames(navtiveName: NativeName): string[] {
    return Object.keys(navtiveName).map((key) => navtiveName[key]?.official);
  }

  return (
    <div className="flex flex-col gap-2 max-w-[320px] mt-8 md:mt-0">
      <div>
        <LabelSpan>Native Name</LabelSpan>
        <ValueSpan>
          : {getOfficialNames(country.name.nativeName).join(", ")}
        </ValueSpan>
      </div>
      <div>
        <LabelSpan>Population</LabelSpan>
        <ValueSpan>
          {" "}
          : {new Intl.NumberFormat().format(country.population)}{" "}
        </ValueSpan>
      </div>
      <div>
        <LabelSpan> Region </LabelSpan>
        <ValueSpan>: {country.region} </ValueSpan>
      </div>
      <div>
        <LabelSpan> Sub Region </LabelSpan>
        <ValueSpan>
          : {country.subregion ? country.subregion : "No Sub Region"}
        </ValueSpan>
      </div>
      <div>
        <LabelSpan> Capital </LabelSpan>
        <ValueSpan>
          :{" "}
          {Array.isArray(country.capital) && country.capital.length > 0
            ? country.capital.map((d) => d).join(", ")
            : "No Capital"}
        </ValueSpan>
      </div>
    </div>
  );
}

function BackButton() {
  return (
    <Link
      href="/"
      className=" mt-8   px-6  py-2 inline-block rounded shadow font-semibold  hover:shadow-2xl cursor-pointer hover:opacity-75 border "
    >
      <ArrowLeftIcon className="w-4 h-4  inline-block mr-2 " />
      <ValueSpan> Back </ValueSpan>
    </Link>
  );
}

function CountryImage(country: CountryProp) {
  return (
    <div
      className="md:mb-8 mb-2  overflow-hidden
        w-[320px] h-[240px] md:w-[640px] md:h-[480px]
        drop-shadow-md  shadow-md "
    >
      <Image
        height={480}
        width={640}
        className=" w-[100%] h-[100%] object-cover "
        src={country.flags.svg}
        alt="Picture of the Country"
      />
    </div>
  );
}
