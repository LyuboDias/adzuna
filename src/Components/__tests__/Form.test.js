/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom/extend-expect"; // adding jest DOM
// additional functions we are going to use for our testing
import { render, screen, cleanup } from "@testing-library/react";
// importing the component that we going to run test on
// for testing we run in terminal 'npm run test'
import ContactForm from "../Form";
// using renderer as snapshot to verify that the component hasnt changed since last test
import renderer from "react-test-renderer";
// import { act, renderHook } from "@testing-library/react-hooks";

// clean up tree after every test
afterEach(() => {
  cleanup();
});

// testing if component renders properly
test("should render Form component", () => {
  render(<ContactForm />); // rendering the component
  const formElement = screen.getByTestId("contact-form"); // get component by id from the tree
  expect(formElement).toBeInTheDocument();
});

// renderer test with snapshot
test("matches snapshot", () => {
  const tree = renderer.create(<ContactForm />).toJSON();
  expect(tree).toMatchSnapshot(); // creating snapshot of the entire component
  // when component change and test fail if we happy with changes can update the snapshot with 'npm test -- -u' command
});
