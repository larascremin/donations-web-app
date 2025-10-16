import React from "react";
import { MapPinLine } from "@phosphor-icons/react";
import { categoryColors, categoryIcons } from "../services/Variables";

const DonationCard = ({ title, date, requester, category, location }) => {
  const key = category?.toLowerCase();
  const bgColor = categoryColors[key] || "bg-gray-300";
  const IconComponent = categoryIcons[key] || "";

  return (
    <div className="flex flex-col w-full max-w-200  border border-[var(--base-03)] p-3 rounded-xl mb-4">
      <div className="flex justify-between">
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
      <p>{requester}</p>
      <div className="flex gap-4 items-center mt-2">
        <div
          className={`flex items-center gap-1 ${bgColor} py-0.5 px-3 rounded-4xl`}
        >
          <IconComponent size={18} color="var(--base-05)" weight="light" />
          <h5 className="uppercase text-sm">{category}</h5>
        </div>
        <div className="flex items-center gap-1 text-[var(--base-05)]">
          <MapPinLine size={16} />
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
