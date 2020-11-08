var container = document.getElementById('main_test');
var pointer = document.getElementById("pointer");
var grid = document.getElementById('main_grid');
var startBtn = document.getElementById('start_btn')

var live = false;

pointer.hidden = true;
grid.hidden = true;

startBtn.addEventListener('mousedown', start);

class Rectangle {
    constructor(height, width) {
        this.domElement = document.createElement('div');
        container.appendChild(this.domElement);

        this.height = height;
        this.width = width;
        this.x = 0;
        this.y = 0;
    }

    pop() {

    }
}


function go_fullscreen() {
    document.documentElement.requestFullscreen();
    container.classList.add('fullscreen');
}

function exit_fullscreen() {
    document.exitFullscreen();
    container.classList.remove('fullscreen');
}

function start () {
    startBtn.style.visibility = 'hidden';

    go_fullscreen();

    live = true;
    pointer.hidden = false;

    container.addEventListener('mousemove', moveCursor);
    container.addEventListener('mousedown', pointClick);
}

function stop() {
    live = false;
    pointer.hidden = true;

    exit_fullscreen();

    container.removeEventListener('mousemove', moveCursor);
    container.removeEventListener('mousedown', pointClick);
}

function moveCursor(event) {
    if (live) {
        pointer.style.right = event.offsetX + container.offsetLeft + 'px';
        pointer.style.bottom = event.offsetY + 'px';
    }
}

function pointClick(event) {
    var clickX = event.offsetX + container.offsetLeft + pointer.width;
    var clickY = event.offsetY + pointer.height;
}