import React, { useEffect, useRef, useState } from "react";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import {
  responsiveFontSizes,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { formSchema } from "./Validations/FormValidation";
import { useForm } from "react-hook-form"; // hook for form validation
// makes the connection between react-hook-form and yup
import { yupResolver } from "@hookform/resolvers/yup";
import Fade from "@material-ui/core/Fade";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "10px 0px",
    border: "2px solid #36096d",
    borderRadius: "6px",
  },
  submit: {
    backgroundImage: "linear-gradient(to right, #37d5d6, #36096d)",
    margin: "10px 0px",
  },
}));

export default function ContactForm() {
  const classes = useStyles();
  const [modalChecked, setModalChecked] = useState(false);
  const [formChecked, setFormChecked] = useState(true);
  let [input, setInput] = useState("");

  const span = useRef(null);
  const textArea = useRef(null);

  useEffect(() => {
    let string = textArea.current.value ? textArea.current.value.length : 0;
    span.current.innerHTML = string + " chars";
    console.log(textArea.current.value);
    // countWords(string);
  }),
    [];

  // // words counter
  // function countWords(value) {
  //   // let spaces = value.match("a");
  //   // using regex to find 1 or more empty spaces
  //   // let spaces = trimed.match("Space");
  //   // console.log(spaces);

  //   // // checking if spaces exist then calculate the length otherwise is 0
  //   // let words = spaces ? spaces.length : 0;
  //   // // get the span by id where we want to append the words variable
  //   span.current.innerHTML = value + " chars";
  // }

  // destructing useForm and use these 3 functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema), // connect yup and RHF
  });

  const submitForm = (data) => {
    console.log(data);
    setModalChecked((prev) => !prev);
    setFormChecked((prev) => !prev);
  };

  return (
    <div className="sm:flex content-center ">
      <div
        in={formChecked.toString()}
        className={`${
          formChecked
            ? "my-auto h-content bg-gray-100 rounded  max-h-sm py-12 px-10  max-w-sm"
            : "hidden"
        }`}
      >
        <MuiThemeProvider theme={theme}>
          <Typography
            variant="h3"
            className="text-center text-blue-900  pb-6 font-light"
          >
            Contact Form
          </Typography>
          <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
            <input
              {...register("fullName", {
                required: true,
              })}
              name="fullName"
              type="text"
              placeholder="Full Name *"
              className="w-full border-2 py-4 border-blue-900 bg-gray-100 px-4 rounded my-3 focus:outline-none"
            />
            {/* display if any errors message */}
            <Typography variant="caption" className=" text-red-500 font-light">
              {errors.fullName?.message}
            </Typography>
            <input
              {...register("email", {
                required: true,
              })}
              name="email"
              type="text"
              placeholder="Email *"
              className="w-full border-2 py-4 border-blue-900 bg-gray-100 px-4 rounded my-3 focus:outline-none"
            />
            <Typography variant="caption" className=" text-red-500 font-light">
              {errors.email?.message}
            </Typography>
            <div className="relative">
              <textarea
                {...register("description", {
                  minLength: 20,
                })}
                ref={textArea}
                onKeyUp={(e) => setInput(input + e)}
                id="description"
                name="description"
                rows="4"
                cols="50"
                placeholder="Description"
                className="w-full border-2 py-5 border-blue-900 bg-gray-100 px-4 rounded my-3 focus:outline-none "
              ></textarea>
              <Typography
                variant="caption"
                className=" text-red-500 font-light"
              >
                {errors.description?.message}
              </Typography>
              <span
                className="text-gray-500 absolute -bottom-2 right-0"
                id="counter"
                ref={span}
              ></span>
            </div>
            <br />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.submit}
            >
              <Typography
                variant="button"
                className="text-center text-white font-light"
              >
                Submit
              </Typography>
            </Button>
          </form>
        </MuiThemeProvider>
      </div>

      <Fade
        in={modalChecked}
        className={`${
          modalChecked ? "opacity-100 visible flex items-center" : "hidden"
        }`}
      >
        <div className="flex items-center h-full">
          <div className=" h-24 bg-gray-100 rounded  max-h-sm py-4 px-10  max-w-sm ">
            <Typography
              variant="h4"
              className="text-center text-3xl text-blue-900  mb-4 font-light"
            >
              Thank You!
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-center text-blue-900 mb-2 font-light"
            >
              We have recived your from.
            </Typography>
          </div>
        </div>
      </Fade>
    </div>
  );
}
