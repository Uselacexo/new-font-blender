document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const fontFamilySelect = document.getElementById('fontFamily');
    const fontSizeInput = document.getElementById('fontSize');
    const fontSizeValueSpan = document.getElementById('fontSizeValue');
    const fontWeightSelect = document.getElementById('fontWeight');
    const letterSpacingInput = document.getElementById('letterSpacing');
    const letterSpacingValueSpan = document.getElementById('letterSpacingValue');
    const lineHeightInput = document.getElementById('lineHeight');
    const lineHeightValueSpan = document.getElementById('lineHeightValue');
    const textColorInput = document.getElementById('textColor');
    const backgroundColorInput = document.getElementById('backgroundColor');
    const textScaleXInput = document.getElementById('textScaleX');
    const textScaleXValueSpan = document.getElementById('textScaleXValue');
    const textScaleYInput = document.getElementById('textScaleY');
    const textScaleYValueSpan = document.getElementById('textScaleYValue');
    const textPreview = document.getElementById('textPreview');
    const downloadPngButton = document.getElementById('downloadPng');
    const textCanvas = document.getElementById('textCanvas');
    const ctx = textCanvas.getContext('2d');

    let currentSettings = {
        text: inputText.value,
        fontFamily: fontFamilySelect.value,
        fontSize: parseInt(fontSizeInput.value),
        fontWeight: fontWeightSelect.value,
        letterSpacing: parseFloat(letterSpacingInput.value),
        lineHeight: parseFloat(lineHeightInput.value),
        textColor: textColorInput.value,
        backgroundColor: backgroundColorInput.value,
        scaleX: parseFloat(textScaleXInput.value),
        scaleY: parseFloat(textScaleYInput.value)
    };

    const updatePreview = () => {
        // Clear previous content
        textPreview.innerHTML = '';
        const lines = currentSettings.text.split('\n');

        lines.forEach(line => {
            const p = document.createElement('p');
            p.textContent = line;
            p.style.fontFamily = currentSettings.fontFamily;
            p.style.fontSize = `${currentSettings.fontSize}px`;
            p.style.fontWeight = currentSettings.fontWeight;
            p.style.letterSpacing = `${currentSettings.letterSpacing}px`;
            p.style.lineHeight = `${currentSettings.lineHeight}em`;
            p.style.color = currentSettings.textColor;
            // Apply scale transforms for "simulated" cap height and width
            p.style.transform = `scaleX(${currentSettings.scaleX}) scaleY(${currentSettings.scaleY})`;
            p.style.transformOrigin = 'center center'; // Scale from center
            textPreview.appendChild(p);
        });

        // Set background color for the preview area
        textPreview.style.backgroundColor = currentSettings.backgroundColor;

        // Update value displays
        fontSizeValueSpan.textContent = `${currentSettings.fontSize}px`;
        letterSpacingValueSpan.textContent = `${currentSettings.letterSpacing}px`;
        lineHeightValueSpan.textContent = `${currentSettings.lineHeight}em`;
        textScaleXValueSpan.textContent = `${currentSettings.scaleX}x`;
        textScaleYValueSpan.textContent = `${currentSettings.scaleY}x`;
    };

    const drawTextOnCanvas = () => {
        // Determine canvas size based on content
        // For accurate measurement, we'll draw a dummy element off-screen
        const dummyDiv = document.createElement('div');
        dummyDiv.style.fontFamily = currentSettings.fontFamily;
        dummyDiv.style.fontSize = `${currentSettings.fontSize}px`;
        dummyDiv.style.fontWeight = currentSettings.fontWeight;
        dummyDiv.style.letterSpacing = `${currentSettings.letterSpacing}px`;
        dummyDiv.style.lineHeight = `${currentSettings.lineHeight}em`;
        dummyDiv.style.color = currentSettings.textColor;
        dummyDiv.style.transform = `scaleX(${currentSettings.scaleX}) scaleY(${currentSettings.scaleY})`;
        dummyDiv.style.transformOrigin = '0 0'; // Scale from top-left for measurement
        dummyDiv.style.position = 'absolute';
        dummyDiv.style.whiteSpace = 'pre-wrap'; // Important for line breaks
        dummyDiv.style.visibility = 'hidden';
        dummyDiv.textContent = currentSettings.text;
        document.body.appendChild(dummyDiv);

        // Calculate dimensions after the element is in the DOM (but hidden)
        const textMetrics = dummyDiv.getBoundingClientRect();
        const padding = 40; // Add some padding around the text
        const canvasWidth = textMetrics.width * currentSettings.scaleX + padding * 2;
        const canvasHeight = textMetrics.height * currentSettings.lineHeight * currentSettings.scaleY + padding * 2; // Adjust height calc for scaleY

        textCanvas.width = canvasWidth;
        textCanvas.height = canvasHeight;

        // Clean up the dummy element
        document.body.removeChild(dummyDiv);

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = currentSettings.backgroundColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Set canvas font properties
        // IMPORTANT: Canvas's ctx.font does not support complex transforms like scaleX.
        // We handle scaleX with ctx.setTransform for accurate scaling.
        // For font sizing, we use fontSize * scaleY to effectively adjust vertical size.
        ctx.font = `${currentSettings.fontWeight} ${currentSettings.fontSize * currentSettings.scaleY}px "${currentSettings.fontFamily.split(',')[0].trim()}"`;
        ctx.fillStyle = currentSettings.textColor;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top'; // Start drawing from the top of the line

        // Apply horizontal scaling and initial translation (padding)
        ctx.setTransform(currentSettings.scaleX, 0, 0, 1, padding, padding);

        // Draw text line by line
        const lines = currentSettings.text.split('\n');
        let currentY = 0;
        // The effective line height in pixels, considering the scaled font size and lineHeight multiplier.
        // Since scaleY is applied to font size above, we multiply by the original line height.
        const lineHeightPx = currentSettings.fontSize * currentSettings.lineHeight;

        lines.forEach(line => {
            ctx.fillText(line, 0, currentY); // X is 0 due to translate
            currentY += lineHeightPx;
        });

        // Reset transform for subsequent operations if any (crucial!)
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };


    const downloadPng = () => {
        drawTextOnCanvas(); // Draw the latest state onto the canvas
        const dataURL = textCanvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'custom-text.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Event Listeners
    inputText.addEventListener('input', (e) => {
        currentSettings.text = e.target.value;
        updatePreview();
    });

    fontFamilySelect.addEventListener('change', (e) => {
        currentSettings.fontFamily = e.target.value;
        updatePreview();
    });

    fontSizeInput.addEventListener('input', (e) => {
        currentSettings.fontSize = parseInt(e.target.value);
        updatePreview();
    });

    fontWeightSelect.addEventListener('change', (e) => {
        currentSettings.fontWeight = e.target.value;
        updatePreview();
    });

    letterSpacingInput.addEventListener('input', (e) => {
        currentSettings.letterSpacing = parseFloat(e.target.value);
        updatePreview();
    });

    lineHeightInput.addEventListener('input', (e) => {
        currentSettings.lineHeight = parseFloat(e.target.value);
        updatePreview();
    });

    textColorInput.addEventListener('input', (e) => {
        currentSettings.textColor = e.target.value;
        updatePreview();
    });

    backgroundColorInput.addEventListener('input', (e) => {
        currentSettings.backgroundColor = e.target.value;
        updatePreview();
    });

    textScaleXInput.addEventListener('input', (e) => {
        currentSettings.scaleX = parseFloat(e.target.value);
        updatePreview();
    });

    textScaleYInput.addEventListener('input', (e) => {
        currentSettings.scaleY = parseFloat(e.target.value);
        updatePreview();
    });

    downloadPngButton.addEventListener('click', downloadPng);

    // Initial preview update
    updatePreview();
});
