// ... [Previous code remains unchanged up to the downloadScribble function] ...

function downloadScribble() {
    // Create a temporary canvas for downloading
    let tempCanvas = createGraphics(width, height);
    tempCanvas.pixelDensity(1);
    tempCanvas.image(get(), 0, 0, width, height);

    // Save the temporary canvas
    saveCanvas(tempCanvas, isMultiPage ? (isSixImageLayout ? 'six_squiggles' : 'multi_squiggle') : 'squiggle', 'png');
}

function openInProcreate() {
    // Create a data URL from the canvas
    let dataURL = canvas.toDataURL('image/png');

    // Encode the data URL
    let encodedDataURL = encodeURIComponent(dataURL);

    // Create the Procreate URL scheme
    let procreateURL = `procreate://import-image?url=${encodedDataURL}`;

    // Open the URL
    window.open(procreateURL, '_blank');
}

function togglePage() {
    // ... [This function remains unchanged] ...
}

function updateCanvasSize() {
    // ... [This function remains unchanged] ...
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
    select('#openInProcreate').mousePressed(openInProcreate);
}

window.addEventListener('load', setupEventListeners);