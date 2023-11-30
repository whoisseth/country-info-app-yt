/** @format */

import { cn } from "@/lib/utils";
import React from "react";

export default function ValueSpan({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={cn("font-semibold text-gray-500", className)} />
  );
}
