const prompt = require('prompt-sync')();

/*
Char codes:
A - Z : 65 - 90
a - z : 97 - 122
*/

console.log(`PASSWORD GENERATOR`);
console.log('==================');

// 1. Characters to be used in the password
const UPPER_CASE_LETTERS = [];
const LOWER_CASE_LETTERS = [];
for (let i = 65; i <= 90; i += 1) {
  UPPER_CASE_LETTERS.push(String.fromCharCode(i));
  LOWER_CASE_LETTERS.push(String.fromCharCode(i + 32));
}
const SPECIAL_CHARACTERS = ['_', '!', '@', '$', '%'];

const NUMERICAL_DIGITS = [];
for (let i = 0; i <= 9; i += 1) {
  NUMERICAL_DIGITS.push(i.toString());
}

const ALL_CHARACTERS = UPPER_CASE_LETTERS.concat(
  LOWER_CASE_LETTERS,
  NUMERICAL_DIGITS,
  SPECIAL_CHARACTERS
);

// 2. Functions required for randomization of letters and generation of passwords

// To random shuffle an array in-place
function shuffleArray(inputArray) {
  for (let i = inputArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
  }
}

// To generate a random number between 0 (inclusive) and a given number
function generateRandomIntegerLessThan(number) {
  const randomNumber = Math.floor(Math.random() * number);
  return randomNumber;
}

// To generate a password length at random
const generateRandomPasswordLength = (lowerLimitInput, upperLimitInput) => {
  const lowerLimit =
    lowerLimitInput === '' || lowerLimitInput === undefined
      ? 12
      : parseInt(lowerLimitInput);
  const upperLimit =
    upperLimitInput === '' || upperLimitInput === undefined
      ? 256
      : parseInt(upperLimitInput);
  let passwordLength = generateRandomIntegerLessThan(upperLimit);
  while (passwordLength < lowerLimit) {
    passwordLength += generateRandomIntegerLessThan(
      upperLimit - passwordLength
    );
  }
  return passwordLength;
};

// To generate a random string of given length
const generateRandomPassword = (
  includeLowerCaseInput,
  includeUpperCaseInput,
  includeNumbersInput,
  includeSpecialCharsInput,
  startWithLowerCaseInput,
  passwordlengthInput
) => {
  const includeLowerCase = includeLowerCaseInput === 'n' ? 0 : 1;
  const includeUpperCase = includeUpperCaseInput === 'n' ? 0 : 1;
  const includeNumbers = includeNumbersInput === 'n' ? 0 : 1;
  const includeSpecialChars = includeSpecialCharsInput === 'n' ? 0 : 1;
  const startWithLowerCase = startWithLowerCaseInput === 'n' ? 0 : 1;

  let allChars = [];

  if (includeLowerCase === 1) allChars.push(...LOWER_CASE_LETTERS);
  if (includeUpperCase === 1) allChars.push(...UPPER_CASE_LETTERS);
  if (includeNumbers === 1) allChars.push(...NUMERICAL_DIGITS);
  if (includeSpecialChars === 1) allChars.push(...SPECIAL_CHARACTERS);

  shuffleArray(allChars);

  let randomPassword =
    startWithLowerCase === 1
      ? LOWER_CASE_LETTERS[
          generateRandomIntegerLessThan(LOWER_CASE_LETTERS.length)
        ]
      : allChars[generateRandomIntegerLessThan(allChars.length)];

  const passwordLength = parseInt(passwordlengthInput);

  while (randomPassword.length < passwordLength) {
    randomPassword += allChars[generateRandomIntegerLessThan(allChars.length)];
  }
  return randomPassword;
};

// To generate a random password

// Collect user preferences

const passwordTypePreference = prompt(
  'Enter 0 if you simply want a strong password without any customization.\nEnter 1 if you want to specify customizations such as password length, what special characters to use etc.\nEnter your choice : '
);

if (passwordTypePreference !== '0' && passwordTypePreference !== '1') {
  console.log('INVALID INPUT. TRY AGAIN');
} else if (passwordTypePreference === '0') {
  console.log('I will generate a strong password for you.');

  let passwordLength = generateRandomPasswordLength();

  shuffleArray(LOWER_CASE_LETTERS);
  let password = generateRandomPassword(
    'y',
    'y',
    'y',
    'y',
    'y',
    passwordLength
  );
  console.log(`\n\n Here is a ${password.length}-digit password:\n${password}`);
} else {
  console.log(
    "Great! Let's collect your preferences and generate a strong password accordingly."
  );
  const lowerLimitInput = prompt(
    'Specify the minimum number of characters your password should contain. Enter any integer between 12 and 255: '
  );

  const upperLimitInput = prompt(
    'Specify the maximum number of characters your password can contain. Enter any integer between 12 and 255: '
  );

  const passwordLength = generateRandomPasswordLength(
    lowerLimitInput,
    upperLimitInput
  );

  const includeLowerCaseInput = prompt(
    'Would you like to include lower-case letters? (y/n): '
  ).toLowerCase();
  const startWithLowerCaseInput =
    includeLowerCaseInput === 'y'
      ? prompt(
          'Would you like your password to start with a lower-case letter? (y/n): '
        )
      : 'n';
  const includeUpperCaseInput = prompt(
    'Would you like to include upper-case letters? (y/n): '
  ).toLowerCase();
  const includeNumbersInput = prompt(
    'Would you like to include numbers? (y/n): '
  ).toLowerCase();
  const includeSpecialCharsInput = prompt(
    `The password can contain one or more special characters from ${SPECIAL_CHARACTERS}.\nWould you like to include special characters? (y/n): `
  ).toLowerCase();

  const password = generateRandomPassword(
    includeLowerCaseInput,
    includeUpperCaseInput,
    includeNumbersInput,
    includeSpecialCharsInput,
    startWithLowerCaseInput,
    passwordLength
  );

  console.log(`\n\n Here is a ${password.length}-digit password:\n${password}`);
}
