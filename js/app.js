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
  leftRandom = randomNumber( 0, imgArray.length - 1 );
  rightRandom = randomNumber( 0, imgArray.length - 1 );
  centerRandom = randomNumber(0, imgArray.length - 1);

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

  let ulE = document.createElement('ul');
  divE.appendChild(ulE);

  for (let index = 0; index < imgArray.length; index++) {

    let liE = document.createElement('li');
    liE.textContent = Mall.all[index].name + ' had ' + Mall.all[index].click + ' votes , and was seen ' + Mall.all[index].shown + ' times' ;
    ulE.appendChild(liE);

  }
}



