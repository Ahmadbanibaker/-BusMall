'use strict';

let imgArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'bubblegum.jpg',
  'breakfast.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg',
];

let all = [];
let counter = 0;
let numberOfRound = 25;
let divE = document.getElementById('list');
let imgname = [];
let imgviwes = [];
let imgclicks = [];

const imageSection = document.getElementById('imageSection');
let imgone = document.getElementById( 'imgone' );
let imgtwo = document.getElementById( 'imgtwo' );
let imgthree = document.getElementById( 'imgthree' );


function Mall( name, imageSrc ) {
  this.name = name;
  this.image = imageSrc;
  this.shown = 0;
  this.click = 0;
  Mall.all.push( this );
}

Mall.all = [];

for( let i = 0; i < imgArray.length; i++ ) {
  new Mall( imgArray[i].split( '.' )[0], imgArray[i] );
}

console.log( Mall.all );

function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

let leftRandom ;
let rightRandom ;
let centerRandom ;

function render() {

  do{
    leftRandom = randomNumber(0, imgArray.length -1);
    rightRandom = randomNumber(0, imgArray.length -1);
    centerRandom = randomNumber(0, imgArray.length -1);
  }
  while (leftRandom === rightRandom || leftRandom === centerRandom || centerRandom === rightRandom);

  imgone.src = './img/' + Mall.all[leftRandom].image;
  imgtwo.src = './img/' + Mall.all[rightRandom].image;
  imgthree.src = './img/' + Mall.all[centerRandom].image;

  Mall.all[leftRandom].shown++;
  Mall.all[rightRandom].shown++;
  Mall.all[centerRandom].shown++;


}

render();

imageSection.addEventListener('click', whenclick);
function whenclick(event){

  if((event.target.id === 'imgone' || event.target.id === 'imgtwo' || event.target.id === 'imgthree') && counter < numberOfRound) {
    if (event.target.id === 'imgone')
    { Mall.all[leftRandom].click++;
    } else if (event.target.id === 'imgtwo')
    { Mall.all[rightRandom].click++;
    }else if (event.target.id === 'imgthree')
    { Mall.all[centerRandom].click++;
    }



    render();
    counter++;
  }
  else {
    imageSection.removeEventListener('click', whenclick);
    document.getElementById('button').style.visibility = 'visible';


  }

}


function clickbutton (){
  drawchart();
  let ulE = document.createElement('ul');
  divE.appendChild(ulE);

  for (let index = 0; index < imgArray.length; index++) {

    let liE = document.createElement('li');
    liE.textContent = Mall.all[index].name + ' had ' + Mall.all[index].click + ' votes , and was seen ' + Mall.all[index].shown + ' times' ;
    ulE.appendChild(liE);

  }
}



let ctx = document.getElementById('myChart').getContext('2d');
function drawchart(){
  for(let i = 0; i < imgArray.length-1; i++){
    imgname.push( Mall.all[i].name);
    imgviwes.push(Mall.all[i].shown) ;
    imgclicks.push(Mall.all[i].click) ;
    console.log( Mall.all[i].name , Mall.all[i].shown , Mall.all[i].click );

  }
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imgname,
      datasets: [{
        label: '# of Viwes',
        data: imgviwes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of clicks',
        data: imgclicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ]

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

function 