const container = document.getElementById("container");

/*---Create elements---*/
let main = document.createElement("div");
let leftSide = document.createElement("div");
let gridContainer = document.createElement("div");
let gridDiv = document.createElement("div");
let rgbContainer = document.createElement("div");
let bgContainer = document.createElement("div");
let rangeSize = document.createElement("div");
let buttonRGB = document.createElement("input");
let buttonBackGround = document.createElement("input");
let buttonRange = document.createElement("input");
let buttonEraser = document.createElement("button");
let buttonClear = document.createElement("button");
let buttonReset = document.createElement("button");
let valueRange = document.createElement("p");
let titleRGB = document.createElement("p");
let titleBG = document.createElement("p");
let title = document.createElement("h1");
let logo = document.createElement("img");

/*---Create elements and class---*/
container.appendChild(main).classList.add("main");
main.appendChild(leftSide).classList.add("left-side");
main.appendChild(gridContainer).classList.add("grid-container");
gridContainer.appendChild(gridDiv).classList.add("grid");
leftSide.appendChild(title).classList.add("title");
leftSide.appendChild(logo).classList.add("logo");
leftSide.appendChild(rgbContainer).classList.add("rgb-container");
leftSide.appendChild(bgContainer).classList.add("background-container");
rgbContainer.appendChild(titleRGB).classList.add("title-rgb");
rgbContainer.appendChild(buttonRGB).classList.add("button-rgb");
bgContainer.appendChild(titleBG).classList.add("title-background");
bgContainer.appendChild(buttonBackGround).classList.add("button-background");
leftSide.appendChild(rangeSize).classList.add("range-size");
rangeSize.appendChild(buttonRange).classList.add("button-range");
rangeSize.appendChild(valueRange).classList.add("value-range");
leftSide.appendChild(buttonEraser).classList.add("button-eraser");
leftSide.appendChild(buttonClear).classList.add("button-clear");
leftSide.appendChild(buttonReset).classList.add("button-reset");

/*---Get elements by class---*/
const gridClass = document.getElementsByClassName("grid");
const buttonRGBClass = document.getElementsByClassName("button-rgb");
const buttonBGClass = document.getElementsByClassName("button-background");
const buttonRangeClass = document.getElementsByClassName("button-range");
const valuRangeClass = document.getElementsByClassName("value-range");
const buttonEraserClass = document.getElementsByClassName("button-eraser");
const buttonClearClass = document.getElementsByClassName("button-clear");
const buttonResetClass = document.getElementsByClassName("button-reset");
const logoClass = document.getElementsByClassName("logo");

/*---Setting attributes---*/
/*Logo*/
logoClass[0].setAttribute("src", "/img/logo.png");

/*Button RGB*/
buttonRGBClass[0].setAttribute("type", "color");
buttonRGBClass[0].setAttribute("oninput", "setColor()");
buttonRGBClass[0].setAttribute("onclick", "colorPen()");

/*Button Background*/
buttonBGClass[0].setAttribute("type", "color");
buttonBGClass[0].setAttribute("oninput", "setBackground()");

/*Button range*/
buttonRangeClass[0].setAttribute("type", "range");
buttonRangeClass[0].setAttribute("onmousemove", "updateRangeValue()");
buttonRangeClass[0].setAttribute("onchange", "reloadGrid()");
buttonRangeClass[0].setAttribute("onclick", "updateRangeValue()");
buttonRangeClass[0].setAttribute("max", "100");
buttonRangeClass[0].setAttribute("min", "10");

/*Button eraser*/
buttonEraserClass[0].setAttribute("type", "button");
buttonEraserClass[0].setAttribute("onclick", "eraser()");
buttonEraser.value = "#ffffff";
buttonEraser.textContent = "Eraser";

/*Button clear*/
buttonClearClass[0].setAttribute("type", "button");
buttonClearClass[0].setAttribute("onclick", "reloadGrid()");
buttonClear.textContent = "Clear";

/*Button reset*/
buttonResetClass[0].setAttribute("type", "button");
buttonResetClass[0].setAttribute("onclick", "reset()");
buttonReset.textContent = "Reset";

/*Value default*/
const DefaultValueRange = 32;
buttonRange.defaultValue = DefaultValueRange;
valueRange.textContent = `${DefaultValueRange} x ${DefaultValueRange}`;
titleRGB.textContent = "Color pen";
titleBG.textContent = "Color background";
title.textContent = "Etch-a-sketch";
gridDiv.style.backgroundColor = "#ffffff";
buttonRGB.value = "#ff0000";
buttonBackGround.value = "#ffffff";

/*Config mouse click*/
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

/*Functions*/
function defaultStyle() {
  buttonRangeClass[0].value = 32;
  buttonRGB.value = "#ff0000";
  buttonBackGround.value = "#ffffff";
  gridDiv.style.backgroundColor = "#ffffff";
  colorPen();
}

function updateRangeValue() {
  valueRange.textContent = `${buttonRange.value} x ${buttonRange.value}`;
}

function setGridSize() {
  gridDiv.style.gridTemplateColumns = `repeat(${buttonRange.value},1fr)`;
  gridDiv.style.gridTemplateRows = `repeat(${buttonRange.value},1fr)`;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < buttonRange.value * buttonRange.value; i++) {
    const gridChidls = document.createElement("div");
    gridChidls.classList.add("grid-child");
    gridChidls.addEventListener("mouseover", setColor);
    gridChidls.addEventListener("mousedown", setColor);
    fragment.appendChild(gridChidls);
  }
  gridDiv.appendChild(fragment);
}

function clearGrid() {
  gridDiv.innerHTML = "";
}

var color = buttonRGB.value;

function setColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  buttonEraser.onclick = function () {
    color = buttonBackGround.value;
  };
  buttonRGB.oninput = function () {
    color = buttonRGB.value;
  };
  e.target.style.background = color;
}

function setBackground() {
  gridDiv.style.background = buttonBackGround.value;
}

function reloadGrid() {
  clearGrid();
  setGridSize();
}

function colorPen() {
  color = buttonRGB.value;
}

function reset() {
  clearGrid();
  defaultStyle();
  setGridSize();
  updateRangeValue();
}

setGridSize();
