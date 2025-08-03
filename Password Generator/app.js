const passwordBox = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+~|}{[]></-=";

const allChars = upperCase + lowerCase + number + symbol;

// Helper arrow function to get random character
const getRandomChar = (chars) => 
    chars[Math.floor(Math.random() * chars.length)];

// Arrow function and modular approach for password creation
const createPassword = () => {
    let password = "";

    password += getRandomChar(upperCase);
    // Add one character from each category to ensure password complexity
    // First, a character from uppercase letters (A-Z)
    // Example: password = "P"

    password += getRandomChar(lowerCase);
    // Next, a character from lowercase letters (a-z)
    // Example: password = "Ph"

    password += getRandomChar(number);
    // Then, a character from numbers (0-9)
    // Example: password = "Ph3"

    password += getRandomChar(symbol);
    // Lastly, a character from symbols
    // Example: password = "Ph3+"

    // Fill the rest of the password length with random characters from all categories
    while(password.length < length){
        password += getRandomChar(allChars);
    }
    // For example:
    // Iteration 1: Randomly selects "a" -> password = "Ph3+a"
    // Iteration 2: Randomly selects "D" -> password = "Ph3+aD"
    // Iteration 8: Randomly selects "%" -> password = "Ph3+aD9!gTl%"
    // Loop ends when password length reaches 12

    // Set the value of the password input field to the generated password
    passwordBox.value = password;
};

// Using Clipboard API with async/await
// Function to copy the generated password to clipboard
const copyPassword = async () => {
    try {
        // Clipboard API explained:
        // The browser provides a set of tools (API) to interact with the clipboard (copy/paste).
        // navigator.clipboard is the object representing these clipboard tools.
        // navigator.clipboard us toolbox ka naam hai jisse hum apne code me clipboard se text copy ya paste kar sakte hain.
        // navigator.clipboard: Browser ka Clipboard API object hai.
        // .writeText(...): Is method se hum koi text clipboard me copy kar sakte hain.
        // // passwordBox.value is the generated password text.
        await navigator.clipboard.writeText(passwordBox.value);
        alert("Password copied to clipboard");
    } catch (err) {
        // If copying fails (e.g., permission denied by browser),
        // this catch block runs to handle the error.
        alert("Failed to copy password. Please try manually.");
    }
};

// Adding event listeners instead of inline onclick attributes
generateBtn.addEventListener("click", createPassword);
copyBtn.addEventListener("click", copyPassword);
