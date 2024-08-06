let isMultiPage = false;
let isSixImageLayout = false;

const SINGLE_WIDTH = 400;
const SINGLE_HEIGHT = 400;
const MULTI_WIDTH = 2752;
const MULTI_HEIGHT = 2064;

function setup() {
    pixelDensity(1); // Force pixel density to 1
    let canvas = createCanvas(SINGLE_WIDTH, SINGLE_HEIGHT);
    canvas.parent('scribbleCanvas');
    background(255);
    noLoop();
}

function draw() {
    background(255);
    if (isMultiPage) {
        if (isSixImageLayout) {
            drawSixScribbles();
        } else {
            drawMultipleScribbles();
        }
    } else {
        drawSingleScribble();
    }
}

function drawSingleScribble() {
    let scribble = new Scribble(width / 2, height / 2, min(width, height) * 0.8);
    scribble.draw();
}

function drawMultipleScribbles() {
    const cellWidth = width / 3;
    const cellHeight = height / 2;
    const size = min(cellWidth, cellHeight) * 0.8;

    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
            const centerX = cellWidth * (col + 0.5);
            const centerY = cellHeight * (row + 0.5);
            let scribble = new Scribble(centerX, centerY, size);
            scribble.draw();
        }
    }
}

function drawSixScribbles() {
    const cellWidth = width / 2;
    const cellHeight = height / 3;
    const size = min(cellWidth, cellHeight) * 0.8;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 2; col++) {
            const centerX = cellWidth * (col + 0.5);
            const centerY = cellHeight * (row + 0.5);
            let scribble = new Scribble(centerX, centerY, size);
            scribble.draw();
        }
    }
}

class Scribble {
    constructor(centerX, centerY, size) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.size = size;
        this.points = [];
        this.generatePoints();
    }

    generatePoints() {
        const numPoints = floor(random(8, 14));
        for (let i = 0; i < numPoints; i++) {
            this.points.push(createVector(
                random(-this.size/2, this.size/2),
                random(-this.size/2, this.size/2)
            ));
        }
    }

    draw() {
        push();
        translate(this.centerX, this.centerY);
        stroke(0, 102);
        strokeWeight(isMultiPage ? 3 : 1.5);
        noFill();
        beginShape();
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            if (i === 0) {
                curveVertex(point.x, point.y); // Duplicate the first point
            }
            curveVertex(point.x, point.y);
            if (i === this.points.length - 1) {
                curveVertex(point.x, point.y); // Duplicate the last point
            }
        }
        endShape(CLOSE);
        pop();
    }
}

function generateScribble() {
    updateCanvasSize();
    redraw();
}

function downloadScribble() {
    saveCanvas(isMultiPage ? (isSixImageLayout ? 'six_squiggles' : 'multi_squiggle') : 'squiggle', 'png');
}

function togglePage() {
    if (isMultiPage && !isSixImageLayout) {
        isSixImageLayout = true;
    } else if (isMultiPage && isSixImageLayout) {
        isMultiPage = false;
        isSixImageLayout = false;
    } else {
        isMultiPage = true;
        isSixImageLayout = false;
    }
    updateCanvasSize();
    updateUIText();
    redraw();
}

function updateCanvasSize() {
    pixelDensity(1); // Ensure pixel density is always 1
    if (isMultiPage) {
        resizeCanvas(MULTI_WIDTH, MULTI_HEIGHT);
    } else {
        resizeCanvas(SINGLE_WIDTH, SINGLE_HEIGHT);
    }
}

function updateUIText() {
    if (isMultiPage) {
        if (isSixImageLayout) {
            select('#togglePage').html("Create Single Scribble");
            select('#generateScribble').html("Generate Six Scribbles");
            select('title').html("Six-Scribble Generator");
        } else {
            select('#togglePage').html("Create Six Scribbles");
            select('#generateScribble').html("Generate Scribbles");
            select('title').html("Multi-Scribble Generator");
        }
    } else {
        select('#togglePage').html("Create Scribble Page");
        select('#generateScribble').html("Generate Scribble");
        select('title').html("Single Scribble Generator");
    }
}

// Setup event listeners after the DOM is loaded
function setupEventListeners() {
    select('#generateScribble').mousePressed(generateScribble);
    select('#downloadScribble').mousePressed(downloadScribble);
    select('#togglePage').mousePressed(togglePage);
}

window.addEventListener('load', setupEventListeners);