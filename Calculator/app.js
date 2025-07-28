// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("input[type='button']");

  // Loop through all calculator buttons
  // Event listener for all button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const value = button.dataset.value;

      handleInput(action, value);
    });
  });

  // Keyboard input support
  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key.match(/[0-9+\-*/.]/)) {
      appendToDisplay(key);
    } else if (key === "Enter") {
      evaluateExpression();
    } else if (key === "Backspace") {
      deleteLastCharacter();
    } else if (key.toLowerCase() === "c") {
      clearDisplay();
    }
  });

  // Core logic functions
  function handleInput(action, value) {
    if (action === "clear") {
      clearDisplay();
    } else if (action === "delete") {
      deleteLastCharacter();
    } else if (action === "calculate") {
      evaluateExpression();
    } else if (value !== undefined) {
      appendToDisplay(value);
    }
  }

  // Clear display
  function clearDisplay() {
    display.value = "";
  }

  function deleteLastCharacter() {
    display.value = display.value.slice(0, -1);
  }

  // appendToDisplay : This function adds the pressed button's value to the calculator's display.
  function appendToDisplay(value) {
    display.value += value;
  }

  function evaluateExpression() {
    try {
      // Safer alternative to eval()
      const result = new Function(`return ${display.value}`)();
      display.value = result;
    } catch (err) {
      display.value = "Error";
    }
  }
});
