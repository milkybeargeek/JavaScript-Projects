document.addEventListener("DOMContentLoaded", () => {
  //DOM elements
  const button = document.querySelector("#randomBtn");
  const quote = document.querySelector("blockquote p");
  const cite = document.querySelector("blockquote cite");

  //quote
  async function updateQuote() {
    //api fetch
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    if (response.ok) {
      quote.textContent = data.content;
      cite.textContent = data.author;
    } else {
      quote.textContent = "An error occurred";
      console.log(data);
    }
  }

  //background gradient
  function createHex() {
    var hexCode1 = "";
    var hexValues1 = "0123456789abcdef";

    for (var i = 0; i < 6; i++) {
      hexCode1 += hexValues1.charAt(
        Math.floor(Math.random() * hexValues1.length)
      );
    }
    return hexCode1;
  }

  function generate() {
    var deg = Math.floor(Math.random() * 360);

    var gradient =
      "linear-gradient(" +
      deg +
      "deg, " +
      "#" +
      createHex() +
      ", " +
      "#" +
      createHex() +
      ")";

    document.getElementById("bg").style.background = gradient;
  }

  function wrapperFunction() {
    generate();
    updateQuote();
  }
  button.addEventListener("click", wrapperFunction);
});
