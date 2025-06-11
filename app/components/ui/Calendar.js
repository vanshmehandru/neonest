"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

export function Calendar({
  className = "",
  classNames = {},
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-3 ${className}`}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-gray-300 rounded-md",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell:
          "h-9 w-9 text-center text-sm p-0 relative first:rounded-l-md last:rounded-r-md focus-within:relative focus-within:z-20",
        day:
          "h-9 w-9 p-0 font-normal bg-transparent hover:bg-gray-200 rounded-md cursor-pointer flex items-center justify-center",
        day_range_end: "",
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 focus:text-white rounded-md",
        day_today: "bg-gray-200 text-gray-900 rounded-md",
        day_outside:
          "text-gray-400 bg-gray-100 rounded-md cursor-default",
        day_disabled: "text-gray-300 opacity-50 cursor-not-allowed",
        day_range_middle: "",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
