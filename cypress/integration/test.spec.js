describe("Test happy path", function () {
  // synchronous 'it' block
  it("Input Full Name", function () {
    cy.visit("localhost:8080/"); // get URL to listen on
    cy.viewport("macbook-13"); // set viewport
    // find input for name and insert random string when callling randomInput()
    cy.get('input[name="fullName"]').type(randomInput());
    // we doing same for email with adding '@gmail.com' at end
    cy.get('input[name="email"]').type(randomInput() + "@gmail.com");
    // same for textarea
    cy.get('textarea[name="description"]').type(
      randomInput() + "lorem ipsum 123 - example !"
    );
    // find the Submit btn and click() on it
    // cy.get("button").contains("Submit").click();
    cy.get('button[id="submit"]').click();
    //  checking if we get the modal with "Thank you text"
    cy.get("h4").contains("Thank You").should("have.text", "Thank You");
  });

  // create random alphabetic input
  function randomInput() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
  }
});
