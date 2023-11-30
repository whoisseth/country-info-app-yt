/** @format */

import { cn } from "@/lib/utils";
import React from "react";

export default function LabelSpan({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLSpanElement>) {
  return <span {...props} className={cn("font-semibold", className)} />;
}
