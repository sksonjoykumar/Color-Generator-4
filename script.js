// Selected all html id
const main = document.getElementById("main-container");
const randomButton = document.getElementById("random-btn");
const colorDisplay = document.getElementById("color-display");
const copyToClipboard = document.getElementById("copy-to-clipboard");
const colorModeRadios = document.getElementsByName("color-mode");
const input1 = document.getElementById("input-1");
const input2 = document.getElementById("input-2");
const selectRGB = document.getElementById("select-rgb");
const rgbRangeRed = document.getElementById("rgb-range-red");
const rgbRangeGreen = document.getElementById("rgb-range-green");
const rgbRangeBlue = document.getElementById("rgb-range-blue");
const title1 = document.getElementById("title-1");
const title2 = document.getElementById("title-2");
const title3 = document.getElementById("title-3");

// window.onload function
window.onload = function () {
  mainFun();
};

// mainFun function
function mainFun() {
  randomButton.addEventListener("click", function () {
    const myVar = decimalColor();
    updateColorCodeToDom(myVar);
  });
  input1.addEventListener("keyup", function (e) {
    const myInput = e.target.value;
    if (myInput) {
      input1.value = myInput.toUpperCase();
      if (isInvalid(myInput)) {
        const color = hexToDecimal(myInput);
        updateColorCodeToDom(color);
      }
    }
  });

  //   Range area
  rgbRangeRed.addEventListener("change", function () {
    const colorRange = {
      red: parseInt(rgbRangeRed.value),
      green: parseInt(rgbRangeGreen.value),
      blue: parseInt(rgbRangeBlue.value),
    };
    updateColorCodeToDom(colorRange);
  });
  rgbRangeGreen.addEventListener("change", function () {
    const colorRange = {
      red: parseInt(rgbRangeRed.value),
      green: parseInt(rgbRangeGreen.value),
      blue: parseInt(rgbRangeBlue.value),
    };
    updateColorCodeToDom(colorRange);
  });
  rgbRangeBlue.addEventListener("change", function () {
    const colorRange = {
      red: parseInt(rgbRangeRed.value),
      green: parseInt(rgbRangeGreen.value),
      blue: parseInt(rgbRangeBlue.value),
    };
    updateColorCodeToDom(colorRange);
  });

  // copyToClipboard color
  copyToClipboard.addEventListener("click", function () {
    const mode = getCheckValueRadios(colorModeRadios);
    if (mode === null) {
      throw new Error("Invalid radio Input!");
    }
    // console.log(mode)
    if (mode === "hex") {
      let hexCol = input1.value;
      if (hexCol && isInvalid(hexCol)) {
        navigator.clipboard.writeText(`#${hexCol}`);
        toastMsgFun(`#${hexCol} copied!`);
      } else {
        alert("Invalid Hex Code!");
      }
    } else {
      let rgbCol = input2.value;
      if (rgbCol) {
        navigator.clipboard.writeText(rgbCol);
        toastMsgFun(`${rgbCol} copied!`);
      } else {
        alert("Invalid RGB Code!");
      }
    }
  });
}

// updateColorCodeToDom function
function updateColorCodeToDom(color) {
  const hexColor = generatedHexColor(color);
  const rgbColor = generatedRgbColor(color);
  //   console.log(rgbColor);

  colorDisplay.style.backgroundColor = `#${hexColor}`;
  input1.value = hexColor;
  input2.value = rgbColor;
  rgbRangeRed.value = color.red;
  title1.innerText = color.red;
  rgbRangeGreen.value = color.green;
  title2.innerText = color.green;
  rgbRangeBlue.value = color.blue;
  title3.innerText = color.blue;
}

// generatedHexColor function
function generatedHexColor({ red, green, blue }) {
  function myFunction(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  return `${myFunction(red)}${myFunction(green)}${myFunction(
    blue
  )}`.toUpperCase();
}

// generatedRgbColor function
function generatedRgbColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

// Convert hex to rgb
function hexToDecimal(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return {
    red: red,
    green: green,
    blue: blue,
  };
}

// generatedDecimalColor function
function decimalColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.floor(Math.random() * 255));

  return {
    red: red,
    green: green,
    blue: blue,
  };
}

// isInvalid function
function isInvalid(color) {
  if (color.length !== 6) return false;
  return /^[0-9a-fA-F]{6}$/i.test(color);
}

// toastMsgFun function
function toastMsgFun(msg) {
  let div = document.createElement("div");
  div.innerHTML = msg;
  div.className = "css-Toast-msg toast-message-slide-in";
  div.addEventListener("click", function () {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");
    div.addEventListener("animationend", function () {
      div.remove();
    });
  });
  document.body.appendChild(div);
}

// getCheckValue
function getCheckValueRadios(nodes) {
  let checkValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkValue = nodes[i].value;
      break;
    }
  }
  return checkValue;
}
