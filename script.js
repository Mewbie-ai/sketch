const img = document.getElementById('reference')
const display = document.getElementById('display')
const canvas = document.getElementById('canvas')
const color = document.getElementById('color-picker');
var sliderValue;
document.getElementById('canvas-slider').addEventListener('change', function(e){
  sliderValue = e.target.value;
  document.getElementById('canvas-slider-label').textContent = `${sliderValue} x ${sliderValue}`
})
document.getElementById('canvas-slider-confirm').onclick = () => createBoard(sliderValue)
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
    e.target.style.background = color.value
  });
}
document.querySelectorAll('.px').forEach(pix => relisten(pix));
  
document.getElementById("ref").addEventListener('change', function(e) {
  const reader = new FileReader();
  
  reader.addEventListener('load', () => {
    const uploaded_img = reader.result;
    img.style.height = '250px'
    img.style.width = '250px'
    document.getElementById('example').style.display = 'none'
    img.style.background = `url(${uploaded_img}) no-repeat center /contain`;
    display.style.background = `url(${uploaded_img}) no-repeat center /contain`;
  })
  
  reader.readAsDataURL(this.files[0])
});


let active = true;
document.getElementById('display__btn').addEventListener('click', function() {
  if(active == true){
    display.style.display = "block";
  } else {
    display.style.display = "none";
  }
  active = !active;
});

document.querySelectorAll('button').forEach(btn => 
  btn.onclick = () => btn.classList.toggle("active")
)
  
document.body.addEventListener('mousemove', e => {
  document.getElementById('bg').style.left = 'calc(-20% + ' + e.clientX/5 + 'px)';
})
