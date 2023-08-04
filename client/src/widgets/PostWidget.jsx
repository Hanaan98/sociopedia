import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch } from "react-redux";
import { setFriends } from "../state/state";
import FriendSugg from "../components/FriendSugg";
import { Skeleton } from "@mui/material";
function PostWidget(props) {
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const isLiked = Boolean(post && post.likes[currentUser._id]);
  const getPost = useCallback(async () => {
    const response = await fetch(`http://localhost:5000/post/${props.id}`);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    setPost(data);
  }, [props.id]);

  const getUser = useCallback(async () => {
    if (post && post.userId) {
      const response = await fetch(`http://localhost:5000/user/${post.userId}`);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setUser(data);
    }
  }, [post]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const likeClickHandler = async () => {
    const response = await fetch(
      `http://localhost:5000/post/${post._id}/${currentUser._id}/like`,
      {
        method: "PATCH",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    setPost(data);
  };

  const friendHandler = async () => {
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
    dispatch(setFriends(data));
  };

  if (!post || !user) {
    return null;
  }

  return (
    <div className="w-[45vw] rounded-xl bg-[#333333] p-3 flex flex-col gap-2 shadow-2xl">
      <FriendSugg
        user={user}
        link={`http://localhost:5000/assets/${user.profilePicture}`}
        friendHandler={friendHandler}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-sm">
          {loading ? <Skeleton variant="text" width={100} /> : post.desc}
        </h1>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            className="rounded-md"
          />
        ) : (
          <img
            src={`http://localhost:5000/assets/${post.img}`}
            alt="post"
            className="h-[60vh] object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex items-center justify-between mt-2 px-3">
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            {isLiked
              ? !loading && (
                  <FavoriteIcon
                    htmlColor="#8B5CF6"
                    className="cursor-pointer"
                    onClick={likeClickHandler}
                  />
                )
              : !loading && (
                  <FavoriteIcon
                    htmlColor="white"
                    className="cursor-pointer"
                    onClick={likeClickHandler}
                  />
                )}
            <h1 className="text-gray-300 text-xs">
              {loading ? (
                <Skeleton variant="text" width={100} />
              ) : (
                Object.keys(post.likes).length
              )}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            {!loading && (
              <ChatBubbleIcon htmlColor="white" className="cursor-pointer" />
            )}
            <h1 className="text-gray-300 text-xs">
              {loading ? (
                <Skeleton variant="text" width={100} />
              ) : (
                post.comments.length
              )}
            </h1>
          </div>
        </div>
        <div>
          {!loading && (
            <ShareIcon htmlColor="white" className="cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostWidget;
