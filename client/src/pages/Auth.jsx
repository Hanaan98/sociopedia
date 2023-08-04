import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/state";
import { useNavigate } from "react-router-dom";
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  profilePicture: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  profilePicture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

function Auth() {
  /*Usestates For Register/Login */
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /*Fetching Function For Login */
  const loginFetch = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    onSubmitProps.resetForm();
    if (data) {
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
      navigate("/");
    }
  };

  /*Fetching Function For Register */
  const registerFetch = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("profilePicture", values.profilePicture.name);
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    onSubmitProps.resetForm();
    if (data) {
      setRegister(false);
    }
  };

  const formSubmitHandler = async (values, onSubmitProps) => {
    if (!register) {
      await loginFetch(values, onSubmitProps);
    } else {
      await registerFetch(values, onSubmitProps);
    }
  };

  /*Button Click Handler */
  const buttonClickHandler = () => {
    if (register) {
      setRegister(false);
    } else {
      setRegister(true);
    }
  };

  const classname = `${
    register ? "w-[50vw]" : "w-96"
  } h-fit bg-[#EAF6FF] p-5 rounded-xl flex flex-col gap-5`;
  return (
    <Formik
      initialValues={register ? initialValuesRegister : initialValuesLogin}
      validationSchema={register ? registerSchema : loginSchema}
      onSubmit={formSubmitHandler}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full h-screen"
        >
          <div className={classname}>
            {register ? (
              <h1 className="text-center text-2xl text-gray-700">Sign Up</h1>
            ) : (
              <h1 className="text-center text-2xl text-gray-700">Sign In</h1>
            )}
            {register && (
              <>
                <div className="flex gap-5">
                  <TextField
                    name="firstName"
                    label="First Name"
                    className="w-full "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    error={
                      Boolean(errors.firstName) && Boolean(touched.firstName)
                    }
                    helperText={errors.firstName && touched.firstName}
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    className="w-full "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    error={
                      Boolean(errors.lastName) && Boolean(touched.lastName)
                    }
                    helperText={errors.lastName && touched.lastName}
                  />
                </div>

                <TextField
                  name="location"
                  label="Location"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  error={Boolean(errors.location) && Boolean(touched.location)}
                  helperText={errors.location && touched.location}
                />
                <TextField
                  name="occupation"
                  label="Occupation"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  error={
                    Boolean(errors.occupation) && Boolean(touched.occupation)
                  }
                  helperText={errors.occupation && touched.occupation}
                />

                <Dropzone
                  onDrop={(acceptedFiles) =>
                    setFieldValue("profilePicture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        className=" text-[#5e6266] border border-[#bdbdbd]  hover:border-black rounded-md p-3 cursor-pointer "
                      >
                        <input {...getInputProps()} name="profilePicture" />
                        {values.profilePicture
                          ? values.profilePicture.name
                          : "Add a Profile Picture*"}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </>
            )}
            <TextField
              name="email"
              label="Email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={Boolean(errors.email) && Boolean(touched.email)}
              helperText={errors.email && touched.email}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={Boolean(errors.password) && Boolean(touched.password)}
              helperText={errors.password && touched.password}
            />

            <button
              type="submit"
              className="bg-[#8B5CF6] text-white rounded-lg p-3"
            >
              {register ? "Register" : "Login"}
            </button>
            <p className="text-center">
              {register
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                className="hover:text-[#8B5CF6]"
                onClick={() => {
                  resetForm();
                  buttonClickHandler();
                }}
              >
                {register ? "Login" : "Register"}
              </button>
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Auth;
