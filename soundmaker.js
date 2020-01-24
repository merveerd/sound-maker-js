var sound0 = new Audio('soundeffects/sound-0.wav');
var sound1 = new Audio('soundeffects/sound-1.wav');
var sound2 = new Audio('soundeffects/sound-2.wav');
var sound3 = new Audio('soundeffects/sound-3.wav');
var sound4 = new Audio('soundeffects/sound-4.wav');
var sound5 = new Audio('soundeffects/sound-5.wav');
var sound6 = new Audio('soundeffects/sound-6.wav');
var sound7 = new Audio('soundeffects/sound-7.wav');
var sound8 = new Audio('soundeffects/sound-8.wav');
var sound9 = new Audio('soundeffects/sound-9.wav');
var differentSound;
var stoppingTime;
var recordStartingTime;
var stater = false;
var arr = [];
var sound = [sound0, sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9];
var newSoundMaker;
var rowNumber = document.getElementById('row').value;
var columnNumber = document.getElementById('column').value;
var playedSoundIndex = [];
var playedSoundTime = [];
var play = document.querySelector('#play');
var stop = document.querySelector('#stop');
var record = document.querySelector('#record');
var creater = document.querySelector('#creater');
var timeBetweenPlayandRecord = [];
var clickedSoundMakers = [];
var recordDetecter = 'recordtoStop';
var colorChangeDelay;
var randomColorArray = [];

function createNewSoundMaker() {
  this.soundMakerElement = document.createElement('div');
  this.soundMakerElement.className = 'sound-maker';
  this.soundMakerElement.style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')';
  document.querySelector('.container').appendChild(this.soundMakerElement);
  return this.soundMakerElement;
}

function colorChangerIndividual(e) {
  var randomColor = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
  e.style.backgroundColor = randomColor;
}

function colorChanger(e) {
  colorChangerIndividual(e);
  e.style.transform = 'scale(1.5)';
  colorChangeDelay = setTimeout(function () {
    colorChangerIndividual(e);
    e.style.transform = 'scale(1)';
  }, 500);
};

function setReset() {
  playedSoundTime = [];
  playedSoundIndex = [];
  timeBetweenPlayandRecord = [];
  clickedSoundMakers = [];
  record.style.backgroundColor = 'red';
}

document.querySelector('#creater').addEventListener('click', function () {
  setReset();
  arr = [];
  stater = true;

  if (newSoundMaker !== undefined) {
    document.querySelectorAll('.sound-maker').forEach(function (item) {
      item.remove();
    })
  }

  if (document.getElementById('row').value > 0 && document.getElementById('column').value > 0) {
    document.querySelector('.container').style.width = (document.getElementById('row').value * 60) + 'px';

    for (var i = 0; i < document.getElementById('row').value * document.getElementById('column').value; i++) {
      newSoundMaker = new createNewSoundMaker;
      arr.push(newSoundMaker);
    }
  } else {
    alert('Please enter bigger number than zero')
  }
})

document.querySelector('body').addEventListener('click', function (e) {

  if (e.target.classList.contains('sound-maker')) {
    if (stater === 'playing' || stater === 'stop') {
      setReset();
    }
    stater = 'clicked';
    colorChanger(e.target);
    playedSoundTime.push(new Date().getTime());

    var index = arr.indexOf(e.target);

    clickedSoundMakers.push(index);
    if (index < 10) {
      sound[index].currentTime = 0;
      sound[index].play();
      playedSoundIndex.push(index);

    } else {
      differentSound = Math.floor(Math.random() * 10);
      sound[differentSound].currentTime = 0;
      sound[differentSound].play();
      playedSoundIndex.push(differentSound);
    }
  }
})

function iteration() {

  for (var i = 0; i < playedSoundTime.length; i++) {
    timeBetweenPlayandRecord.push(playedSoundTime[i] - recordStartingTime);

  }
  stater === 'iteration';
}

$('#record').off('click.gameRenewer').on('click.gameRenewer', function () {
  if (stater === 'recording' || stater === 'playing' || stater === 'stop') {
    setReset();
  }

  stater = 'recording';

  if (!newSoundMaker) {
    alert('You cannot record before creating it');
  } else {
    record.style.backgroundColor = 'blue';
    recordStartingTime = new Date().getTime();
  }
})

stop.addEventListener('click', function () {

  if (stater === 'playing') {
    setReset();
  }
  stater = 'stop';
  record.style.backgroundColor = 'red';
  stoppingTime = new Date().getTime();

  playedSoundIndex.forEach(function (item) {
    sound[item].pause();
  })
})

play.addEventListener('click', function () {

  if (stater === 'stop' && playedSoundTime && recordStartingTime) {
    iteration();
  } else if (stater !== 'playing') {
    alert('please record first then stop and play');
  }

  stater = 'playing';

  if (timeBetweenPlayandRecord.length > 0) {

    setTimeout(function () {

      playedSoundIndex.forEach(function (item) {
        sound[item].pause();
      })
    }, stoppingTime - recordStartingTime);

    timeBetweenPlayandRecord.forEach(function (item, index) {

      if (item >= 0) {
        setTimeout(function () {
          colorChanger(document.querySelectorAll('.sound-maker')[clickedSoundMakers[index]]);

          sound[playedSoundIndex[index]].currentTime = 0;
          sound[playedSoundIndex[index]].play();
        }, item);
      } else {
        if (sound[playedSoundIndex[index]].duration < (-item) / 1000) {

          sound[playedSoundIndex[index]].pause();
        } else {
          sound[playedSoundIndex[index]].currentTime = (-item) / 1000;

          sound[playedSoundIndex[index]].play();
        }
      }
    })
  }
})