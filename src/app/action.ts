/** @format */

// https://restcountries.com/v3.1/all

"use server";

export async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  return data;
}

export async function fetchCountryByName(countryName: string) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const data = await response.json();

  return data;
}
