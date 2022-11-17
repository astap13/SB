let labels = document.getElementsByTagName('label');
let inputs = document.getElementsByTagName('input');
let score = 5;
let fullScore = 0;
let wrapper = document.querySelector('.answers');
let text = document.querySelector('.text');
let answerInformation = document.querySelector('.answer__information');
let description = document.querySelector('.description');
let descriptionText = document.querySelector('.description__text');
let birdImgQuestion = document.querySelector('.bird__img');
let birdImgInformation = document.getElementById('birdInformation');
let birdName = document.getElementById('birds-name');
let birdNameQuestion = document.getElementById('bird-name__question');
let birdSpecies = document.querySelector('.species');
let audioDescription = document.getElementById('audio-description');
let nextButton = document.querySelector('.next');
let truesound = document.getElementById('soundtrue');
let falcesound = document.getElementById('soundfalce');
let scoreText = document.querySelector('.score__text');
let containerLevelActive = document.querySelector('.level__active');

let level = 0;


fetch('./birds.json')
    .then((response) => response.json())
    .then((data) => initApp(data));

    function initApp(data) {
    let getRandomBird = data[level][getRandomInt(0, 7)];
    let audioQuestion = document.getElementById('audio__question');
    
    audioQuestion.setAttribute('src', getRandomBird.audio);
    
    for (let i = 0; i < 6; i++) { 
        labels[i].innerHTML = data[level][i].name;
        inputs[i].setAttribute('value', data[level][i].name);
      }
    
    wrapper.addEventListener('click', function(e) {
        let target = e.target;
        let closestAnswer = e.target.closest('.answer');
        let value = closestAnswer.querySelector('input').value;
        let searcArr = data[level].find(e => e.name === value);

            text.classList.add('none');
            answerInformation.classList.remove('none');
            description.classList.remove('none');
            birdImgInformation.setAttribute('src', searcArr.image);
            descriptionText.innerHTML = searcArr.description;
            birdName.innerHTML = searcArr.name;
            birdSpecies.innerHTML = searcArr.species;
            audioDescription.setAttribute('src', searcArr.audio);
 
        if (value == getRandomBird.name) {
            closestAnswer.classList.add('true__colour');
            nextButton.disabled = false;
            truesound.play();
            audioQuestion.pause();
            birdImgQuestion.setAttribute('src', getRandomBird.image);
            birdNameQuestion.innerHTML = searcArr.name;
            fullScore = fullScore + score;
            scoreText.innerHTML = `Score: ${fullScore}`;

        } 
        
        else {
            falcesound.play();
            closestAnswer.classList.add('falce__colour');
            score = score - 1;

        }
    
    });
    
}

nextButton.onclick = function(data){
    level = level + 1;
    console.log(level);
    nextButton.disabled = true;
    containerLevelActive.classList.remove('level__active');
    containerLevelActive.nextElementSibling.classList.add('level__active');
    initApp(data);
  }
  

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
    



