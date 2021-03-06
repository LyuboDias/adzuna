import React, { useEffect, useRef, useState } from "react"; // importing built in react hooks
import { makeStyles, createTheme } from "@material-ui/core/styles"; // adding custom css through materials ui functions
import {
  responsiveFontSizes,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core"; // importing typography for responsive fonts
import Button from "@material-ui/core/Button";
import { formSchema } from "../Validations/FormValidation"; // importing our schema for validation
import { useForm } from "react-hook-form"; // hook for form validation
// makes the connection between react-hook-form and yup
import { yupResolver } from "@hookform/resolvers/yup"; // using YUP library to validate our schema
import Grow from "@material-ui/core/Grow"; // using Grow to add animations on our 'thank you' modal

let theme = createTheme();
theme = responsiveFontSizes(theme);

// adding custome CSS
const useStyles = makeStyles({
  input: {
    margin: "10px 0px",
    border: "2px solid #36096d",
    borderRadius: "6px",
  },
  submit: {
    backgroundImage: "linear-gradient(to right, #37d5d6, #36096d)",
    margin: "10px 0px",
  },
});

// From component
function ContactForm() {
  const classes = useStyles(); // using our custom css with 'classes.EXAMPLE'
  const [modalChecked, setModalChecked] = useState(false); // seting up state for our Modal
  const [formChecked, setFormChecked] = useState(true); // seting up state for our Form
  let [input, setInput] = useState(""); // seting up state for our Chars Counter

  const span = useRef(null); // using Ref for the 'span' where we display the Chars Counter
  const textArea = useRef(null);
  const span2 = useRef(null);

  useEffect(() => {
    // using ternary operator to check text area value
    let string = textArea.current.value ? textArea.current.value.length : 0;
    //  displaying numbers of Chars typed in text area
    //  if chars under 20 we add color RED
    if (string < 20) {
      span.current.classList.remove("text-gray-500");
      span.current.classList.add("text-red-500");
      span.current.innerHTML = string + " chars";
    } else {
      // when chars over 20 RED color dissappear
      span.current.classList.remove("text-red-500");
      span.current.classList.add("text-gray-500");
      span.current.innerHTML = string + " chars";
    }
  }),
    [];

  // words counting function
  useEffect(() => {
    let text = textArea.current.value ? textArea.current.value : 0;
    let wordCount = 0; // set a counter
    // loop over text input
    for (let i = 0; i <= text.length; i++) {
      // if input = 0 => reset the counter
      if (text.length == 0) {
        span2.current.innerHTML = "0 words";
        // checks if empty space AND prev char is NOT EMPTY space only then Increment
      } else if (text.charAt(i) == " " && text.charAt(i - 1) != " ") {
        wordCount++;
      }

      span2.current.innerHTML = wordCount + " words";
    }
  }),
    [];

  // destructing useForm and use these 3 functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema), // connect yup and RHF
  });

  const submitForm = (data) => {
    // console.log(data);
    // changin the state of the Form and the Modal after form inputs has passed the validations
    setModalChecked((prev) => !prev);
    setFormChecked((prev) => !prev);
  };

  return (
    // adding test-id to our wrapper
    <div className="sm:flex items-center h-full" data-testid="contact-form">
      {/* using ternary operator to check Form state and add the correct class (fade away) */}
      <div
        className={`${
          formChecked
            ? " bg-gray-100 rounded  h-content py-12 px-10  max-w-sm"
            : "hidden"
        }`}
      >
        <MuiThemeProvider theme={theme}>
          {/* using typography for responsive fonts and better accessibility */}
          <Typography
            variant="h3"
            className="text-center text-blue-900  pb-6 font-light"
          >
            Contact Form
          </Typography>
          {/* using useForm`s handleSubmit and passing submitForm function */}
          <form
            onSubmit={handleSubmit(submitForm)}
            autoComplete="off"
            title="contact form" //WAI-ARIA accessibility
          >
            {/* when running Jest didnt like the 'for' attribute, had to change to 'htmlFor' */}
            {/* using lables for better WCAG */}
            <label id="fullName" htmlFor="fullName">
              Full Name
            </label>
            <input
              aria-describedby="enter full name" //WAI-ARIA accessibility
              title="enter full name"
              // requiring name, can not be empty
              {...register("fullName", {
                required: true,
              })}
              name="fullName"
              type="text"
              placeholder="Linus Torvalds"
              className="w-full border-2 py-4 border-blue-900 bg-gray-100 px-4 rounded my-3 focus:outline-none"
            />
            {/* display if any errors message */}
            <Typography variant="caption" className=" text-red-500 font-light">
              {errors.fullName?.message}
            </Typography>
            <br />
            <label id="email" htmlFor="email">
              Email
            </label>
            <input
              aria-describedby="enter your email" //WAI-ARIA accessibility
              title="enter your email"
              {...register("email", {
                required: true,
              })}
              name="email"
              type="text"
              placeholder="ltorvalds@linux.com"
              className="w-full border-2 py-4 border-blue-900 bg-gray-100 px-4 rounded my-3 focus:outline-none"
            />
            <Typography variant="caption" className=" text-red-500 font-light">
              {errors.email?.message}
            </Typography>
            <div className="relative">
              <label id="description" htmlFor="description">
                Your message
              </label>
              <textarea
                aria-describedby="enter your message here" //WAI-ARIA accessibility
                title="enter your message here"
                {...register("description", {
                  // minimum 20 chars for text area
                  minLength: 20,
                })}
                ref={textArea}
                // on every single type we change the state of input
                onKeyUp={(e) => setInput(input + e)}
                id="description"
                name="description"
                rows="4"
                cols="50"
                placeholder="Linux is powerful, flexible, secure, reliable, stable, fun??? than Windows."
                className="w-full border-2 py-5 border-blue-900 bg-gray-100 px-4 rounded my-3 focus:outline-none "
              ></textarea>
              <Typography
                variant="caption"
                className=" text-red-500 font-light"
              >
                {errors.description?.message}
              </Typography>
              <br />
              {/* span displaying the Chars Counter */}
              <div className="flex justify-between">
                <span className="text-gray-500" id="counter" ref={span}></span>
                <p className="text-gray-500 " id="counter2" ref={span2}>
                  0 words
                </p>
              </div>
            </div>
            <br />
            <Button
              id="submit"
              title="submit button"
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
      {/* using ternary operator to check Modal state and add the correct class (smooth appearing) */}
      <Grow
        in={modalChecked}
        style={{ transformOrigin: "0 0 0" }}
        {...(modalChecked ? { timeout: 1000 } : {})}
        className={`${
          modalChecked ? "opacity-100 visible flex items-center mt-4" : "hidden"
        }`}
      >
        <div className="flex items-center h-full">
          <div className=" h-content bg-gray-100 rounded  max-h-sm py-4 px-10  max-w-sm ">
            <Typography
              variant="h4"
              className="text-center text-3xl text-blue-900  mb-4 font-light"
            >
              Thank You
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-center text-blue-900 mb-2 font-light"
            >
              We have recived your form
            </Typography>
          </div>
        </div>
      </Grow>
    </div>
  );
}

export default ContactForm;
