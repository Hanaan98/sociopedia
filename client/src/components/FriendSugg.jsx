import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
function FriendSugg(props) {
  const currentUser = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {loading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar alt={props.user.firstName} src={props.link} />
        )}

        <div>
          <h1 className="text-white text-sm">
            {loading ? (
              <Skeleton variant="text" width={100} />
            ) : (
              props.user.firstName + " " + props.user.lastName
            )}
          </h1>
          <p className="text-xs text-gray-300">
            {loading ? (
              <Skeleton variant="text" width={100} />
            ) : (
              props.user.location
            )}
          </p>
        </div>
      </div>

      {currentUser._id === props.user._id ||
      (currentUser.friends &&
        currentUser.friends.find((f) => f === props.user._id))
        ? !loading && (
            <div
              className="flex items-center justify-center w-fit p-2 rounded-full "
              onClick={props.friendHandler}
            >
              <PersonRemoveIcon
                htmlColor="#8B5CF6"
                className="cursor-pointer"
              />
            </div>
          )
        : !loading && (
            <div
              className="flex items-center justify-center w-fit p-2 rounded-full bg-[#8B5CF6]"
              onClick={props.friendHandler}
            >
              <PersonAddIcon htmlColor="white" className="cursor-pointer" />
            </div>
          )}
    </div>
  );
}

export default FriendSugg;
