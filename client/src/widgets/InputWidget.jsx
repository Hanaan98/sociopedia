import React, { useState } from "react";
import { Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPosts } from "../state/state";
const postSchema = yup.object().shape({
  desc: yup.string().required("required"),
  postPicture: yup.string(),
});
const initialValues = {
  desc: "",
  postPicture: "",
};
function InputWidget(props) {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  if (!user) {
    return null;
  }
  const link = `http://localhost:5000/assets/${user.profilePicture}`;

  const formSubmitHandler = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("userId", user._id);
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("img", values.postPicture.name);
    const response = await fetch("http://localhost:5000/post", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    onSubmitProps.resetForm();
    setClick(false);
    const updatedPosts = [...posts, data];
    dispatch(setPosts(updatedPosts));
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={postSchema}
      onSubmit={formSubmitHandler}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form
          className="w-[45vw] h-fit rounded-xl bg-[#333333] py-4 px-8 flex flex-col gap-2 shadow-2xl"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 items-center">
            <Avatar
              alt={user.firstName}
              src={link}
              sx={{ width: 50, height: 50 }}
            />
            <input
              name="desc"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.desc}
              placeholder="What's on your mind?"
              className="rounded-md w-full h-10 bg-[#4b4b4b] p-2 text-white outline-none"
              autoComplete="off"
            />
          </div>
          {click && (
            <Dropzone
              onDrop={(acceptedFiles) => {
                setFieldValue("postPicture", acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className=" text-[#5e6266] border border-[#bdbdbd]  rounded-md p-3 cursor-pointer my-2 "
                  >
                    <input {...getInputProps()} />
                    {values.postPicture ? (
                      <p className="text-md text-gray-300">
                        {values.postPicture.name}
                      </p>
                    ) : (
                      <p className="text-md text-gray-300">Post a picture</p>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          )}
          <div className="flex justify-between gap-2">
            <div className="flex justify-between gap-5">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => {
                  setClick(!click);
                }}
              >
                <ImageIcon htmlColor="#D1D5DB" />
                <p className="text-gray-300">Photo</p>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => {
                  setClick(!click);
                }}
              >
                <InventoryIcon htmlColor="#D1D5DB" />
                <p className="text-gray-300">Clip</p>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => {
                  setClick(!click);
                }}
              >
                <AttachFileIcon htmlColor="#D1D5DB" />
                <p className="text-gray-300">Attachment</p>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => {
                  setClick(!click);
                }}
              >
                <MicIcon htmlColor="#D1D5DB" />
                <p className="text-gray-300">Audio</p>
              </div>
            </div>
            <button
              className="bg-[#8B5CF6] text-white py-1 px-2 rounded-full"
              type="submit"
            >
              Post Now
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default InputWidget;
