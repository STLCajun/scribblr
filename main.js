const canvas = document.getElementById('scribbleCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

function generateSquiggle() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)'; // Slightly darker for better visibility
    ctx.lineWidth = 1.5; // Slightly thicker line
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const points = [];
    const numPoints = Math.floor(Math.random() * 6) + 8; // 8 to 13 points, reduced from before

    // Generate initial points
    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height
        });
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    // Draw curves between points
    for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;

        // Occasionally use lineTo instead of quadraticCurveTo for more varied shapes
        if (Math.random() < 0.1) {
            ctx.lineTo(points[i].x, points[i].y);
        } else {
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
    }

    // Close the shape with a higher probability of using lineTo
    if (Math.random() < 0.1) {
        ctx.lineTo(points[0].x, points[0].y);
    } else {
        const xc = (points[0].x + points[points.length - 1].x) / 2;
        const yc = (points[0].y + points[points.length - 1].y) / 2;
        ctx.quadraticCurveTo(points[points.length - 1].x, points[points.length - 1].y, xc, yc);
    }

    ctx.stroke();
}

document.getElementById('generateScribble').addEventListener('click', generateSquiggle);

// Generate a squiggle on page load
window.addEventListener('load', generateSquiggle);

// Download functionality remains the same
document.getElementById('downloadScribble').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'squiggle.png';
    link.href = canvas.toDataURL();
    link.click();
});