import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostWidget from "../widgets/PostWidget";
import { useDispatch } from "react-redux";
import { setPosts } from "../state/state";

function PostsWidget() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const getPost = async () => {
    const response = await fetch("http://localhost:5000/post");
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    dispatch(setPosts(data));
  };
  useEffect(() => {
    getPost();
  }, []);

  if (!posts) {
    return null;
  }
  return posts.map((post) => <PostWidget key={post._id} id={post._id} />);
}

export default PostsWidget;
