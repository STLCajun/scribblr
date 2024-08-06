const canvas = document.getElementById('scribbleCanvas');
const ctx = canvas.getContext('2d');
const width = 2752;
const height = 2064;
canvas.width = width;
canvas.height = height;

function generateSquiggle(x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 3; // Increased for better visibility on larger canvas
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
        if (Math.random() < 0.3) {
            ctx.lineTo(points[i].x, points[i].y);
        } else {
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
    }

    if (Math.random() < 0.5) {
        ctx.lineTo(points[0].x, points[0].y);
    } else {
        const xc = (points[0].x + points[points.length - 1].x) / 2;
        const yc = (points[0].y + points[points.length - 1].y) / 2;
        ctx.quadraticCurveTo(points[points.length - 1].x, points[points.length - 1].y, xc, yc);
    }

    ctx.stroke();
    ctx.restore();
}

function generateMultipleSquiggles() {
    ctx.clearRect(0, 0, width, height);
    const cellWidth = width / 3;
    const cellHeight = height / 2;
    const size = Math.min(cellWidth, cellHeight) * 0.8; // 80% of cell size

    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
            const centerX = cellWidth * (col + 0.5);
            const centerY = cellHeight * (row + 0.5);
            generateSquiggle(centerX, centerY, size);
        }
    }
}

document.getElementById('generateScribble').addEventListener('click', generateMultipleSquiggles);

document.getElementById('scribbleSingle').addEventListener('click', function() {
    window.location.href = 'main.htm';
})

// Generate squiggles on page load
window.addEventListener('load', generateMultipleSquiggles);

document.getElementById('downloadScribble').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'multi_squiggle.png';
    link.href = canvas.toDataURL();
    link.click();
});