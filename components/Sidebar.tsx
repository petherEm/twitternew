import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession()
 
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img className="h-10 w-10" src="https://links.papareact.com/drq" alt="" />
      <p className="uppercase text-red-400 font-bold text-[10px] animate-pulse">training purpose only</p>
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign in'} />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  );
};

export default Sidebar;
