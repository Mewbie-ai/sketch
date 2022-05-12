const img = document.getElementById("reference");
const display = document.getElementById("display");
const canvas = document.getElementById("canvas");
const color = document.getElementById("color-picker");
const ex = document.getElementById("example");
var rainbowColor;
var rainbowMode = false;
var sliderValue = 16;
var eraserMode = false;

// slider or range & canvas & color

document.getElementById("canvas-slider").addEventListener("change", function (e) {
  sliderValue = e.target.value;
  document.getElementById("canvas-slider-label").textContent = `${sliderValue} x ${sliderValue}`;
});

document.getElementById("canvas-slider-confirm").onclick = () => {
  createBoard(sliderValue);
  document.getElementById("overlay").style.display = "none";
};

function createBoard(side) {
  let square = side * side;
  canvas.style.gridTemplateColumns = `repeat(${side},1fr)`;
  canvas.style.gridTemplateRows = `repeat(${side},1fr)`;
  canvas.innerHTML = "";

  for (let i = 0; i < square; i++) {
    let px = document.createElement("div");
    px.classList.add("px");
    relisten(px);
    canvas.appendChild(px);
  }
}

let mouseHold = false;
function relisten(pix) {
  pix.addEventListener("mouseover", function (e) {
    if (eraserMode == true) {
      if (mouseHold == true) e.target.style.background = "none";
    } else if (rainbowMode == true) {
      rainbowColor = Math.floor(Math.random() * 16777215).toString(16);
      if (mouseHold == true) e.target.style.background = "#" + rainbowColor;
    } else {
      if (mouseHold == true) e.target.style.background = color.value;
    }
  });
  pix.addEventListener("dragover", function (e) {
    if (eraserMode == true) {
      if (mouseHold == true) e.target.style.background = "none";
    } else if (rainbowMode == true) {
      rainbowColor = Math.floor(Math.random() * 16777215).toString(16);
      if (mouseHold == true) e.target.style.background = "#" + rainbowColor;
    } else {
      if (mouseHold == true) e.target.style.background = color.value;
    }
  });
}
document.querySelectorAll(".px").forEach((pix) => relisten(pix));
color.addEventListener("click", () => {
  rainbowMode = false;
  document.getElementById("rainbow").classList.remove("active");
});

// clear

document.getElementById("clear").addEventListener("click", () => createBoard(sliderValue));

// image upload

document.getElementById("ref").addEventListener("change", function (e) {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const uploaded_img = reader.result;
    img.style.height = "250px";
    img.style.width = "250px";
    ex.style.display = "none";
    img.style.background = `url(${uploaded_img}) no-repeat center /contain`;
    display.style.background = `url(${uploaded_img}) no-repeat center /contain`;
  });

  reader.readAsDataURL(this.files[0]);
});

// display button

let active = true;
document.getElementById("display__btn").addEventListener("click", () => {
  active === true ? (display.style.display = "block") : (display.style.display = "none");
  active = !active;
});

// hide button
let opacity = true;
document.getElementById("hide__btn").addEventListener("click", () => {
  if (opacity === true) {
    img.style.opacity = "0";
    ex.style.opacity = "0";
  } else {
    img.style.opacity = "1";
    ex.style.opacity = "1";
  }
  opacity = !opacity;
});

// button toggle

document.querySelectorAll(".toggle").forEach((btn) => (btn.onclick = () => btn.classList.toggle("active")));

document.getElementById("rainbow").addEventListener("click", () => {
  rainbowMode = !rainbowMode;
});

document.getElementById("eraser").addEventListener("click", () => {
  eraserMode = !eraserMode;
});

// mousedown mouseup

document.body.addEventListener("mousedown", () => {
  mouseHold = true;
});
document.body.addEventListener("mouseup", () => {
  mouseHold = false;
});

document.body.addEventListener("drag", () => {
  mouseHold = true;
});
document.body.addEventListener("dragend", () => {
  mouseHold = false;
});

// cloud background
let cloud = true;
document.body.addEventListener("mousemove", (e) => {
  if (cloud == true) document.getElementById("bg").style.left = "calc(-20% + " + e.clientX / 5 + "px)";
});

document.getElementById("cloud").addEventListener("click", () => (cloud = !cloud));
