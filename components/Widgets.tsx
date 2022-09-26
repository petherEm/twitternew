import { SearchCircleIcon, SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed"

const Widgets = () => {
  return (
    <div className="hidden lg:inline col-span-2 px-2 mt-2">
      {/* Search Box */}
      <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-3">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 outline-none bg-transparent"
        />
      </div>

        <TwitterTimelineEmbed 
            sourceType="profile"
            screenName="premierleague"
            options={{ height: 800 }}
        />

    </div>
  );
};

export default Widgets;
