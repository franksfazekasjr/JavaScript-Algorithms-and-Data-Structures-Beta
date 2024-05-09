/*
  Palindrome Checker - certification project

  User enters text, clicks "Check Text" button and a response is displayed indicating if an entry was made and if so if it is or is not a palindrome.

  The users presumably enters some text, clicks the "Check Text" button so the script must:
  1.) Get the input entered
  2.) check that some text was actually entered or if not then display the message "Please input a value"
  3.) If there is input then we need to clean the input by removing anything other than a letter or number.
  4.) After cleaning the input we need to determine the number of characters left in the string.
  5.) if the length of the cleaned input is even then split the string in half, reverse the first half of the cleaned input and see if it matches the second half of the cleaned input.  If they match the input is a palindrome, otherwise it is NOT.
  6.) if the length of the cleaned input is odd then we need to split the string at the center character reverse one of the remaining shtings and compare them.  if they are the same then it is a palindrome, otherwise it is NOT.
  7.) display the appropriate message if the input is /is not a palindrome.
  8.) if you click the clear button the input field is cleared.
*/ 

// Start with global variables - references to the HTML elements used
const checkButton = document.getElementById("check-btn");
const inputElement = document.getElementById("text-input");
const resultText = document.getElementById("result");
const clearButton = document.getElementById("clear-btn");

// These are text constants
const noInputMsg = "Please input a value";
const isPalindromeMsg = " is a palindrome";
const notPalindromeMsg = " is not a palindrome";

/*
  Nothing happens until the user enters text and clicks the "Check Text" button so we have one main function called when the button is clicked.  A second function is used for the clear button to clear the text input area.
*/

const checkInput = () => {
  const uncleanInput = inputElement.value;

  // First check to se if the user entered any input
  if (uncleanInput === '') {
    alert(noInputMsg);
    return;
  };

  //  Next call cleanInput() and pass the raw text the user entered (uncleanInput).
  const cleanedInput = cleanInput(uncleanInput);

  // Pass the cleaned input to the isPalindrome() function.  isPalindrome returns true/false indicating if the text is/is not a palindrome.
  const isInputPalindrome = isPalindrome(cleanedInput);
  if (isInputPalindrome) {
    displayOutput (uncleanInput + isPalindromeMsg);
  } else {
    displayOutput (uncleanInput + notPalindromeMsg);
  };
};

const cleanInput = (str) => {
  /*
    Clean the input by converting the string to lower case, then remove any non-word characters and/or underscores "_".
  */
  const regex = /[\W_]/g;
  const cleanStr = str.toLowerCase().replace(regex, '');
  return cleanStr;
};

const isPalindrome = (str) => {
  let ibIsPalindrome = true;
  let newString = '';

  //  Testing for palindrome depends on the length of the string.
  //  Any single character is a palindrome so if the length is 1 return TRUE.
  if (str.length == 1) {
    return ibIsPalindrome;
  };
  /*
    Explain the operation here
  */
  if (str.length % 2 != 0) {
    // Odd input, get rid of the "center character"
    newString = str.slice(0, Math.floor(str.length/2)) + str.slice(str.length - Math.floor(str.length/2));
  } else {
    // Even input - assign str to newString
    newString = str;
  };
  //  Using newString split the string in half, reverse the second half of the string and then compare the two halves.  If after reversing the second half of the string the two halves are equal then the original string was a palindrome.
  return compareStringParts(newString);
};

const compareStringParts = (str) => {
  const firstHalfOfString = str.slice(0, str.length/2);
  const reversedSecondHalfOfString = str.slice(str.length/2).split('').reverse().join('');

  if (firstHalfOfString == reversedSecondHalfOfString) {
    return true;
  } else {
    return false;
  };
};

const displayOutput = (msg) => {
  resultText.textContent = msg;
};

const clearInput = () => {
  inputElement.value = '';
  displayOutput('');
};

// Add the event listeners for the buttons
checkButton.addEventListener("click", checkInput);
clearButton.addEventListener("click", clearInput);