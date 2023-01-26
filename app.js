'use strict';
let state = null;

let images = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
let conImages = [];
let totalClicks = 0;
let number = 25;
let prev3 = [];
let current3 = [];

function Products(name, url) {
  this.name = name;
  this.url = `img/${url}`;
  this.timesSeen = 0;
  this.clicks = 0;
}

function randomNum() {
  return Math.floor(Math.random() * (images.length));
}

function render() {
  let img1 = conImages[randomNum()];
  img1.timesSeen += 1;
  let img2 = conImages[randomNum()];
  img2.timesSeen += 1;
  let img3 = conImages[randomNum()];
  img3.timesSeen += 1;

  while (img1 === img2 || img1 === img3 || img2 === img3) {
    img2 = conImages[randomNum()];
    img3 = conImages[randomNum()];
    // console.log(img2.name);
  }

  current3.push(img1.name);
  current3.push(img2.name);
  current3.push(img3.name);
  // console.log(prev3);
  // console.log(current3);
  while(checkPrevious(prev3, current3)) {
    img1 = conImages[randomNum()];
    img2 = conImages[randomNum()];
    img3 = conImages[randomNum()];
    while (img1 === img2 || img1 === img3 || img2 === img3) {
      img2 = conImages[randomNum()];
      img3 = conImages[randomNum()];
      // console.log(img2.name);
    }

    current3 = [];
    current3.push(img1.name);
    current3.push(img2.name);
    current3.push(img3.name);
  }
  // console.log(prev3);
  // console.log(current3);
  $('#img1').attr('src', img1.url);
  $('#img1').attr('name', img1.name);
  $('#img2').attr('src', img2.url);
  $('#img2').attr('name', img2.name);
  $('#img3').attr('src', img3.url);
  $('#img3').attr('name', img3.name);

  // console.log(prev3, current3);
}

for(let i = 0; i < images.length; i++){
  let modImage = new Products(images[i].slice(0, images[i].length - 4), images[i]);
  conImages.push(modImage);
}

render();

$('#img1').on('click', (function(event) {
  if (totalClicks < number){
    totalClicks++;
    $('#counter').text(`Round ${totalClicks + 1}`);
    let imgChoice = event.target.name;
    conImages.forEach(function(img) {
      if (img.name === imgChoice) {
        img.clicks++;
      }
    });
    prev3 = [...current3];
    current3 = [];
    render();
  }
  if (totalClicks === number) {
    $('#counter').text('Voting Over, View Results');
  }
  // console.log(totalClicks);
}));


$('#img2').on('click', (function(event) {
  if (totalClicks < number){
    totalClicks++;
    $('#counter').text(`Round ${totalClicks + 1}`);
    let imgChoice = event.target.name;
    conImages.forEach(function(img) {
      if (img.name === imgChoice) {
        img.clicks++;
      }
    });
    prev3 = [...current3];
    current3 = [];
    render();
    if (totalClicks === number) {
      $('#counter').text('Voting Over, View Results');
    }
  }}));


$('#img3').on('click', (function(event) {
  if (totalClicks < number){
    totalClicks++;
    $('#counter').text(`Round ${totalClicks + 1}`);
    let imgChoice = event.target.name;
    conImages.forEach(function(img) {
      if (img.name === imgChoice) {
        img.clicks++;
      }
    });
    prev3 = [...current3];
    current3 = [];
    render();
    if (totalClicks === number) {
      $('#counter').text('Voting Over, View Results');
    }
    // console.log(totalClicks);
  }}));

let clickData = [];
let viewData = [];
let nameData = [];

$('#results').click(function(event) {
  console.log(event);
  if (totalClicks === number) {
    for(let i = 0; i < conImages.length; i++) {
      clickData.push(conImages[i].clicks);
      viewData.push(conImages[i].timesSeen);
      nameData.push(conImages[i].name);
    }
    saveImages(conImages);
    getImages();
    // Creating the chart
    new Chart($('#chart'), {
      type: 'bar',
      data: {
        labels: nameData,
        datasets: [{
          label: 'Number of Votes',
          data: clickData,
          borderWidth: 1,
        }, {
          label: 'Number of Times Seen',
          data: viewData,
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});

$('#delete').click(function(){
  deleteData();
  window.location.reload();
});

$('#counter').text(`Round ${totalClicks + 1}`);

function checkPrevious(firstArr, secondArr) {
  return firstArr.some(product => secondArr.includes(product));
}

let totals = [];
const getInfoStorage = getImages();

if(getInfoStorage){
  console.log('products exist');
  state = getInfoStorage;
  for(let i = 0; i < state.length; i++){
    totals.push('');
    totals[i] += state[i];
    localStorage.setItem('Totals', totals);
  }
} else {
  console.log('products do not exist');
  state = conImages;
}

// Gets images from storage
function getImages() {
  let stringData = localStorage.getItem('clickData');
  // console.log(stringData);
  return JSON.parse(stringData);
}
// save goats into storage
function saveImages(conImages){
  let stringifiedImages = [];
  for(let i = 0; i < conImages.length; i++){
    stringifiedImages.push((conImages[i].clicks));
    // console.log(stringifiedImages);
  //stringify data and set it as something into local storage
  }
  let newString = JSON.stringify(stringifiedImages);
  localStorage.setItem('clickData' , newString);
}
function deleteData() {
  localStorage.clear();
}

console.log(localStorage.clickData);


$('#reload').click(function(){
  window.location.reload();
});

$('#delete').click(function(){
  deleteData();
  window.location.reload();
});
