import React, { useEffect, useState } from "react";
import FriendSugg from "../components/FriendSugg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFriends } from "../state/state";
function SuggestionWidget() {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const getUsers = async () => {
    const response = await fetch("http://localhost:5000/user");
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    const filteredData = data.filter((user) => user._id !== currentUser._id);
    setUsers(filteredData.slice(0, 3));
  };
  const friendHandler = async (currentUser, user) => {
    if (currentUser._id === user._id) return;
    const response = await fetch(
      `http://localhost:5000/user/${currentUser._id}/${user._id}`,
      {
        method: "PATCH",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    console.log(data);
    dispatch(setFriends(data));
  };
  useEffect(() => {
    getUsers();
  }, []);
  if (!users) return null;
  return (
    <div className="w-full h-fit  rounded-xl bg-[#333333] py-4 px-4 flex flex-col gap-2 shadow-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-sm">People you may know</h1>
        <p className="text-gray-300 text-xs cursor-pointer hover:text-[#8B5CF6]">
          See All
        </p>
      </div>
      {users.map((user) => {
        return (
          <FriendSugg
            user={user}
            link={`http://localhost:5000/assets/${user.profilePicture}`}
            friendHandler={() => friendHandler(currentUser, user)}
          />
        );
      })}
    </div>
  );
}

export default SuggestionWidget;
