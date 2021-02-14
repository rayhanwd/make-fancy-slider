const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

//get Images

const getImages = async(query) => {
  const url =(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`);
  spinnerToggle(true);
  const res = await fetch(url);
  const data = await res.json();

  showImages(data.hits);//why does not showing images in this UI.problem solved(1)."hits" spell mistake.

  ShowError(err => err);
}

//Showing Error when a user submit a unexpected search keyword--- bonus(1).

const ShowError=() =>{  
  setTimeout = spinnerToggle(false),5000;
  const Error = document.getElementById('alert-show');
  if(Error.classList.add('d-none')){
    Error.classList.remove('d-none')
  }
  else{
    Error.classList.remove('d-none')
  }
}

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);

    spinnerToggle(false);

     document.getElementById('alert-show').style.display = 'none';
  })
}
gallery.innerHTML = '';

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added'); //Toggle image selection solved. problem(2).
  // N:B: problem(3) have in html file, please check it.
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  }
   else  {
    sliders.pop(null);
  }
 
}

var timer
const createSlider = () => {
  
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
   
  }

  else{
      
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
 }

}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  const duration = document.getElementById('duration').value || 1000;
 if(duration >0){ //duration not allowed negative value(solved), problem (4).
  createSlider();
 }
 else{
  alert('Please Input a positive value');

}
})


//search by Enter key solved. problem(5).
const inputField = document.getElementById('search');

inputField.onkeyup = enter;    
function enter(e) {
  if (e.which == 13) {
    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    const search = document.getElementById('search');
    getImages(search.value)
    sliders.length = 0;
}
  
}

// Toggle Spinner solved. bonus(2). As this site is to fast So, generally is not showing properly. but when a user submit a bigger keyword or anything bigger word then it showing properly. Eample : "gg"

const spinnerToggle = (show) =>{
  const spinner = document.getElementById('loading-spinner');
  if(show){
  spinner.classList.remove('d-none')
}
 else {
  spinner.classList.add('d-none')
}
}