const canvas = document.getElementById('scribbleCanvas');
const ctx = canvas.getContext('2d');

let isMultiPage = false;

function initCanvas() {
    if (isMultiPage) {
        canvas.width = 2752;
        canvas.height = 2064;
    } else {
        canvas.width = 400;
        canvas.height = 400;
    }
}

function generateSquiggle(x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = isMultiPage ? 3 : 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const points = [];
    const numPoints = Math.floor(Math.random() * 6) + 8;

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: (Math.random() - 0.5) * size,
            y: (Math.random() - 0.5) * size
        });
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;
        if (Math.random() < 0.1) {
            ctx.lineTo(points[i].x, points[i].y);
        } else {
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
    }

    if (Math.random() < 0.1) {
        ctx.lineTo(points[0].x, points[0].y);
    } else {
        const xc = (points[0].x + points[points.length - 1].x) / 2;
        const yc = (points[0].y + points[points.length - 1].y) / 2;
        ctx.quadraticCurveTo(points[points.length - 1].x, points[points.length - 1].y, xc, yc);
    }

    ctx.stroke();
    ctx.restore();
}

function generateSingleSquiggle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateSquiggle(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.8);
}

function generateMultipleSquiggles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellWidth = canvas.width / 3;
    const cellHeight = canvas.height / 2;
    const size = Math.min(cellWidth, cellHeight) * 0.8;

    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
            const centerX = cellWidth * (col + 0.5);
            const centerY = cellHeight * (row + 0.5);
            generateSquiggle(centerX, centerY, size);
        }
    }
}

function downloadScribble() {
    const link = document.createElement('a');
    link.download = isMultiPage ? 'multi_squiggle.png' : 'squiggle.png';
    link.href = canvas.toDataURL();
    link.click();
}

function setupEventListeners() {
    const generateBtn = document.getElementById('generateScribble');
    const downloadBtn = document.getElementById('downloadScribble');
    const toggleBtn = document.getElementById('togglePage');

    generateBtn.addEventListener('click', () => {
        if (isMultiPage) {
            generateMultipleSquiggles();
        } else {
            generateSingleSquiggle();
        }
    });
    downloadBtn.addEventListener('click', downloadScribble);
    toggleBtn.addEventListener('click', togglePage);
}

function togglePage() {
    isMultiPage = !isMultiPage;
    initCanvas();
    if (isMultiPage) {
        generateMultipleSquiggles();
        document.title = "Multi-Scribble Generator";
        document.getElementById('togglePage').textContent = "Create Single Scribble";
        document.getElementById('generateScribble').textContent = "Generate Scribbles";
    } else {
        generateSingleSquiggle();
        document.title = "Single Scribble Generator";
        document.getElementById('togglePage').textContent = "Create Scribble Page";
        document.getElementById('generateScribble').textContent = "Generate Scribble";
    }
}

function init() {
    isMultiPage = window.location.pathname.includes('scribblePage.htm');
    initCanvas();
    setupEventListeners();
    if (isMultiPage) {
        generateMultipleSquiggles();
        document.getElementById('togglePage').textContent = "Create Single Scribble";
        document.getElementById('generateScribble').textContent = "Generate Scribbles";
    } else {
        generateSingleSquiggle();
        document.getElementById('togglePage').textContent = "Create Scribble Page";
        document.getElementById('generateScribble').textContent = "Generate Scribble";
    }
}

window.addEventListener('load', init);
