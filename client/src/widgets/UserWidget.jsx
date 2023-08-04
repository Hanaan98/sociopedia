import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useSelector } from "react-redux";
function UserWidget(props) {
  const user = useSelector((state) => state.user);
  if (!user) {
    return null;
  }

  return (
    <div className="w-72 h-fit rounded-xl bg-[#333333] p-3 flex flex-col gap-2 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            alt={user.firstName}
            src={`http://localhost:5000/assets/${user.profilePicture}`}
          />
          <div>
            <h1 className="text-white text-sm">
              {user.firstName + " " + user.lastName}
            </h1>
            <p className="text-gray-300 text-xs">
              {user.friends && user.friends.length} friends
            </p>
          </div>
        </div>
        <ManageAccountsIcon htmlColor="white" className="cursor-pointer" />
      </div>
      <Divider color="#D1D5DB" />
      <div className="flex flex-col gap-2">
        <div className="flex gap-5 items-center">
          <PlaceIcon htmlColor="white" />
          <h1 className="text-gray-300 text-xs">{user.location}</h1>
        </div>
        <div className="flex gap-5 items-center">
          <WorkIcon htmlColor="white" />
          <h1 className="text-gray-300 text-xs">{user.occupation}</h1>
        </div>
      </div>
      <Divider color="#D1D5DB" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-300 text-xs">Who's visited your profile</h1>
          <h1 className="text-white text-xs">{user.impressions}</h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-gray-300 text-xs">Impressions of your posts</h1>
          <h1 className="text-white text-xs">{user.views}</h1>
        </div>
      </div>
      <Divider color="#D1D5DB" />
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-sm">Social Profiles</h1>
        <div className="flex gap-5 items-center">
          <LinkedInIcon htmlColor="white" />
          <div>
            <h1 className="text-white text-sm">LinkedIn</h1>
            <p className="text-gray-300 text-xs">Social Network</p>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <TwitterIcon htmlColor="white" />
          <div>
            <h1 className="text-white text-sm">Twitter</h1>
            <p className="text-gray-300 text-xs">Social Network</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWidget;
