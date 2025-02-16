document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display").querySelector("input");
  const buttons = document.querySelectorAll(".btn");
  const clearBtn = document.getElementById("clear");
  const equalBtn = document.getElementById("equal");
  const themeSwitcher = document.querySelector(".theme-switcher");

  let currentInput = "";
  let fullExpression = "";

  // Theme switcher functionality
  themeSwitcher.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");
      console.log(`Button clicked: ${value}`); // Debugging line

      if (!isNaN(value) || value === ".") {
        currentInput += value;
        fullExpression += value;
        updateDisplay(fullExpression);
      } else if (["+", "-", "*", "/", "%"].includes(value)) {
        if (currentInput === "" && fullExpression === "") return; // Prevents selecting an operator without a current input
        if (currentInput === "" && fullExpression !== "") {
          // Prevents selecting multiple consecutive operators
          fullExpression = fullExpression.slice(0, -1) + value;
        } else {
          fullExpression += " " + value + " ";
        }
        currentInput = "";
        updateDisplay(fullExpression);
      } else if (value === "AC") {
        clear();
      } else if (value === "DEL") {
        deleteLast();
      }
    });
  });

  clearBtn.addEventListener("click", clear);

  equalBtn.addEventListener("click", () => {
    console.log(`Equal button clicked: Full Expression: ${fullExpression}`); // Debugging line

    if (fullExpression !== "") {
      try {
        const result = eval(fullExpression.replace(/ /g, ""));
        fullExpression += " = " + result.toString(); // Update fullExpression with result
        updateDisplay(result.toString());
        setTimeout(() => {
          updateDisplay(fullExpression); // Display the full expression after a delay
        }, 1500);
        currentInput = result.toString();
      } catch (e) {
        updateDisplay("Error");
        fullExpression = "";
        currentInput = "";
      }
    }
  });

  function updateDisplay(value) {
    display.value = value;
  }

  function clear() {
    currentInput = "";
    fullExpression = "";
    updateDisplay("0");
    console.log("Calculator cleared"); // Debugging line
  }

  function deleteLast() {
    if (currentInput !== "") {
      currentInput = currentInput.slice(0, -1);
    }
    fullExpression = fullExpression.trim().slice(0, -1).trim();
    updateDisplay(fullExpression || "0");
    console.log(`Current input after delete: ${currentInput}`); // Debugging line
  }
});
