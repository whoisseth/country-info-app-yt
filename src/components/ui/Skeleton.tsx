/** @format */

import { cn } from "@/lib/utils";
import React from "react";

export default function Skeleton({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "bg-gray-900/10 animate-pulse rounded-md  dark:bg-slate-600 w-full h-4",
        className
      )}
    />
  );
}
