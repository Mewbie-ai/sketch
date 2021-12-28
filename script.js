const img = document.getElementById('reference')
const display = document.getElementById('display')
const canvas = document.getElementById('canvas')
const color = document.getElementById('color-picker');
const ex = document.getElementById('example')
var rainbowColor;
var rainbowMode = false;
var sliderValue = 16;

// slider or range

document.getElementById('canvas-slider').addEventListener('change', function(e){
  sliderValue = e.target.value;
  document.getElementById('canvas-slider-label').textContent = `${sliderValue} x ${sliderValue}`
})

document.getElementById('canvas-slider-confirm')
.onclick = () => createBoard(sliderValue)


function createBoard(size) {
  let square = size * size;
  canvas.style.gridTemplateColumns = `repeat(${size},1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size},1fr)`;
  canvas.innerHTML = "";

  for(let i = 0; i<square;i++){
    let px = document.createElement('div')
    px.classList.add('px');
    relisten(px);
    canvas.appendChild(px);
  }
}


function relisten(pix) {
  pix.addEventListener('mouseover', function(e){
    if(rainbowMode == true) {
      rainbowColor = Math.floor(Math.random() * 16777215).toString(16);
      e.target.style.background = "#" + rainbowColor
    } else {
      e.target.style.background = color.value
    }
  });
}
document.querySelectorAll('.px').forEach(pix => relisten(pix));

  

// image upload

document.getElementById("ref").addEventListener('change', function(e) {
  const reader = new FileReader();
  
  reader.addEventListener('load', () => {
    const uploaded_img = reader.result;
    img.style.height = '250px'
    img.style.width = '250px'
    ex.style.display = 'none'
    img.style.background = `url(${uploaded_img}) no-repeat center /contain`;
    display.style.background = `url(${uploaded_img}) no-repeat center /contain`;
  })
  
  reader.readAsDataURL(this.files[0])
});


// display button

let active = true;
document.getElementById('display__btn').addEventListener('click', () => {
  (active === true)?
    display.style.display = "block":
    display.style.display = "none";
  active = !active;
});

// hide button
let opacity = true
document.getElementById('hide__btn').addEventListener('click', () => {
  if(opacity === true){
    img.style.opacity = '0'
    ex.style.opacity = '0'
  } else {
    img.style.opacity = '1'
    ex.style.opacity = '1'
  }
  opacity = !opacity
})


// button toggle

document.querySelectorAll('button').forEach(btn => 
  btn.onclick = () => btn.classList.toggle("active")
)
  

// rainbow button

document.getElementById('rainbow').addEventListener('click', () => {
  rainbowMode = !rainbowMode
})

// cloud background

document.body.addEventListener('mousemove', e => {
  document.getElementById('bg').style.left = 'calc(-20% + ' + e.clientX/5 + 'px)';
})
