import React from "react";
import UserWidget from "../widgets/UserWidget";
import { useSelector } from "react-redux";
import InputWidget from "../widgets/InputWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdWidget from "../widgets/AdWidget";
import SuggestionWidget from "../widgets/SuggestionWidget";
function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex justify-between p-5 bg-[#2c2c2c] min-h-screen max-h-screen">
      <UserWidget id={user._id} />
      <div className="flex flex-col gap-10 items-center max-h-screen overflow-y-scroll posts">
        <InputWidget id={user._id} />
        <PostsWidget />
      </div>
      <div className="flex flex-col gap-10 items-center w-72">
        <AdWidget />
        <SuggestionWidget />
      </div>
    </div>
  );
}

export default Home;
