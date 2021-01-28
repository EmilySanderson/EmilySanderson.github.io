
/*
  Code for Form Validation
  Author: freecodecamp.org
  Date published: 31 January 2020
  Date Accessed: 09 September 2020
  URL: https://www.freecodecamp.org/news/basic-form-validation-in-javascript/
  Amended to suit needs.
  */
  const submitBtn = document.getElementById('submit-btn'); //assign submitBtn to the submit button
  // Add an event listener that when the submit button is clicked, the function defined below is called
  submitBtn.addEventListener('click',
    function (e) {
      // Assign constants to elements of the table
      const name = document.getElementById('name');
      const emailAddress = document.getElementById('email');
      const phone = document.getElementById('phone');
      // If the name portion is blank, display message and block submission
      if (name.value === "") {
        alert("Please enter your name.");
        name.focus();
        e.preventDefault();
        return false;
      }
      // If email address & phone number is blank, display message and block submission
      if (emailAddress.value === "" && phone.value === "") {
        alert("Please enter your email address or phone number.");
        emailAddress.focus();
        e.preventDefault();
        return false;
      }

      // If phone number is not valid (per function phoneIsValid), display message and block submission
      if (phone.value != "" && !phoneIsValid(phone.value)) {
        alert("Please enter a phone number in the form XXX-XXX-XXXX");
        phone.focus();
        e.preventDefault();
        return false;
      }

      // If email address is not valid (per function emailIsValid), display message and block submission
      if (emailAddress.value != "" && !emailIsValid(emailAddress.value)) {
        alert("Please enter a valid email address.");
        emailAddress.focus();
        e.preventDefault();
        return false;
      }

      return true; // Submit the form data to the server
    } // arrow function (e)
  ); // addEventListener

  // Function to test if email is of correct form
  const emailIsValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  } // function email
  // Function to test if phone number is of correct form
  const phoneIsValid = phone => {
    return /([(+]*[0-9]+[()+. -]*)/g.test(phone);
  }// function phone
