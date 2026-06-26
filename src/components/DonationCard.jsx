import React from "react";
import { MapPinLine } from "@phosphor-icons/react";
import { categoryColors, categoryIcons } from "../services/Variables";
import { useMediaQuery } from "react-responsive";

const DonationCard = ({ title, date, requester, category, location }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const key = category?.toLowerCase();
  const bgColor = categoryColors[key] || "bg-gray-300";
  const IconComponent = categoryIcons[key] || null;

  return (
    <div className="flex flex-col w-full border border-[var(--base-03)] p-3 rounded-xl mb-4">
      <div className="flex justify-between items-start gap-2">
        <h3 className="truncate flex-1 min-w-0">{title}</h3>
        {date && <p className="text-sm text-[var(--base-04)] shrink-0 ml-2">{date}</p>}
      </div>
      <p className="text-sm text-[var(--base-04)] truncate">{requester}</p>
      <div className="flex gap-3 items-center mt-2 flex-wrap">
        <div className={`flex items-center gap-1 ${bgColor} py-0.5 px-3 rounded-full shrink-0`}>
          {IconComponent && <IconComponent size={16} color="var(--base-05)" weight="light" />}
          <h5 className={`uppercase font-medium ${isMobile ? "text-xs" : "text-sm"}`}>{category}</h5>
        </div>
        {location && (
          <div className="flex items-center gap-1 text-[var(--base-04)] min-w-0">
            <MapPinLine size={14} className="shrink-0" />
            <p className={`truncate ${isMobile ? "text-xs" : "text-sm"}`}>{location}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCard;
