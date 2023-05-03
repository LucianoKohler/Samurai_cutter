
var height = window.innerHeight;
var width = window.innerWidth;
function windowUpdater(){
    height = window.innerHeight;
    width = window.innerWidth;
}

var difficulty = window.location.hash.substring(1)
var time = 0;
var timeBetweenBamboos = 0
switch(difficulty){
    case 'N':
        timeBetweenBamboos = 1500;
        time = 10;
        break;
    case 'H':
        timeBetweenBamboos = 1000;
        time = 30;
        break;
    case 'NG':
        timeBetweenBamboos = 750;
        time = 45;
        break;
}

var lives = 3;
const chin = new Audio('../assets/chiiin.m4a');
chin.volume = 0.5

document.getElementById('time').innerHTML = time;

const cronometro = setInterval(function() {

    time--;
    if(time < 1){window.location.href = 'win.html' + '#' + difficulty;
}
    document.getElementById('time').innerHTML = time;
}, 1000)

function PlaceBamboo(){

    if(document.getElementById('bamboo') && lives>0){
        document.getElementById('bamboo').remove();
        lives--;
        document.getElementById('live' + (lives+1)).src = 'assets/empty.png';
    }

    if(lives == 0){
        window.location.href = "gameover.html" + '#' + time;
    }


    var Xpos = Math.floor(Math.random() * width) - 50
    var Ypos = Math.floor(Math.random() * height) - 50

    var size = Math.floor(Math.random() * 3)

    var rotation = Math.floor(Math.random()* 3)

    Xpos = Xpos < 0 ? 0 : Xpos
    Ypos = Ypos < 0 ? 0 : Ypos

    var newBamboo = document.createElement('img')
    newBamboo.src = '../assets/bamboo.svg';
    newBamboo.style.left = Xpos + 'px';
    newBamboo.style.top = Ypos + 'px';
    newBamboo.style.position = 'absolute';
    newBamboo.id = 'bamboo';
    newBamboo.draggable = false
    newBamboo.addEventListener('click', function(){chin.play()})
    
    switch(size){ //Declare Bamboo size
        case 0:
            newBamboo.className = 'bambooS';
            break;
        case 1:
            newBamboo.className = 'bambooM';
            break;
        case 2:
            newBamboo.className = 'bambooL';
            break;
    }

    switch(rotation){
        case 0:
            break;
        case 1:
            newBamboo.classList.add('bambooTiltR')
            break;
        case 2:
            newBamboo.classList.add('bambooTiltL')
            break;
    }

    newBamboo.onclick = function(){
        var cutBamboo = document.createElement('img');
        cutBamboo.src = 'assets/bamboo-cut.svg';
        cutBamboo.style.position = 'absolute';
        cutBamboo.style.top = newBamboo.style.top;
        cutBamboo.style.left = newBamboo.style.left;
        cutBamboo.classList = newBamboo.classList;
        document.body.appendChild(cutBamboo)
        setTimeout(function(){cutBamboo.remove()}, 200)
        newBamboo.remove();
    }
    document.body.appendChild(newBamboo)
    console.log(lives)
}

const game = setInterval(function() {
    PlaceBamboo()}, timeBetweenBamboos);


