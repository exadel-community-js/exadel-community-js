export const CODE = '<!DOCTYPE html>\n' +
  '<html lang="en">\n' +
  '<head>\n' +
  '    <meta charset="UTF-8">\n' +
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
  '    <title>Donate to JS-JOKESTERS</title>\n' +
  '    <style>\n' +
  '\t* {\n' +
  '    box-sizing: border-box;\n' +
  '}\n' +
  '\n' +
  'body {\n' +
  '    display: flex;\n' +
  '    flex-direction: column;\n' +
  '    justify-content: center;\n' +
  '    align-items: center;\n' +
  '    height: 100vh;\n' +
  '    background-color: #f9e4b7; /* Warm yellow */\n' +
  '    font-family: "Comic Sans MS", "Arial", sans-serif;\n' +
  '}\n' +
  '\n' +
  '.donation-container {\n' +
  '    background: #fff;\n' +
  '    padding: 30px;\n' +
  '    border-radius: 15px;\n' +
  '    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\n' +
  '    width: 400px;\n' +
  '    text-align: center;\n' +
  '}\n' +
  '\n' +
  'h2 {\n' +
  '    color: #ff4500; /* Bright orange */\n' +
  '    margin-bottom: 10px;\n' +
  '}\n' +
  '\n' +
  'p {\n' +
  '    color: #555;\n' +
  '    font-size: 16px;\n' +
  '    margin-bottom: 20px;\n' +
  '}\n' +
  '\n' +
  '.form-group {\n' +
  '    margin-bottom: 20px;\n' +
  '}\n' +
  '\n' +
  'label {\n' +
  '    font-weight: bold;\n' +
  '    display: block;\n' +
  '    margin-bottom: 8px;\n' +
  '    color: #333;\n' +
  '}\n' +
  '\n' +
  'input[type="text"] {\n' +
  '    width: 100%;\n' +
  '    padding: 12px;\n' +
  '    font-size: 16px;\n' +
  '    border: 2px dashed #ff4500;\n' +
  '    border-radius: 8px;\n' +
  '    outline: none;\n' +
  '}\n' +
  '\n' +
  '.slider-box {\n' +
  '    margin-top: 20px;\n' +
  '}\n' +
  '\n' +
  '.slider-container {\n' +
  '    position: relative;\n' +
  '    width: 100%;\n' +
  '    height: 80px;\n' +
  '}\n' +
  '\n' +
  'input[type="range"] {\n' +
  '    width: 100%;\n' +
  '    margin: 30px 0;\n' +
  '    -webkit-appearance: none;\n' +
  '    background: #ffd700; /* Gold track */\n' +
  '    height: 12px;\n' +
  '    border-radius: 6px;\n' +
  '    outline: none;\n' +
  '}\n' +
  '\n' +
  'input[type="range"]::-webkit-slider-thumb {\n' +
  '    -webkit-appearance: none;\n' +
  '    width: 24px;\n' +
  '    height: 24px;\n' +
  '    background: #ff4500; /* Orange thumb */\n' +
  '    border-radius: 50%;\n' +
  '    cursor: grab;\n' +
  '}\n' +
  '\n' +
  '.character {\n' +
  '    position: absolute;\n' +
  '    width: 40px;\n' +
  '    height: 40px;\n' +
  '    background: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" fill="#ff4500"/><rect x="15" y="23" width="10" height="12" fill="#ff4500"/><circle cx="17" cy="13" r="2" fill="white"/><circle cx="23" cy="13" r="2" fill="white"/></svg>\') no-repeat center;\n' +
  '    background-size: contain;\n' +
  '    top: -15px;\n' +
  '    transition: left 0.1s ease;\n' +
  '}\n' +
  '\n' +
  '.taunt {\n' +
  '    position: absolute;\n' +
  '    width: 100%;\n' +
  '    text-align: center;\n' +
  '    font-size: 16px;\n' +
  '    color: #ff4500;\n' +
  '    top: 50px;\n' +
  '    font-weight: bold;\n' +
  '}\n' +
  '\n' +
  '.amount-display {\n' +
  '    position: absolute;\n' +
  '    width: 100%;\n' +
  '    text-align: center;\n' +
  '    font-size: 18px;\n' +
  '    color: #333;\n' +
  '    top: 0;\n' +
  '    font-weight: bold;\n' +
  '}\n' +
  '\n' +
  'button {\n' +
  '    width: 100%;\n' +
  '    padding: 12px;\n' +
  '    font-size: 18px;\n' +
  '    font-weight: bold;\n' +
  '    background: #ff4500;\n' +
  '    color: white;\n' +
  '    border: none;\n' +
  '    border-radius: 10px;\n' +
  '    cursor: pointer;\n' +
  '    transition: 0.3s;\n' +
  '}\n' +
  '\n' +
  'button:hover:not(:disabled) {\n' +
  '    background: #e5533d;\n' +
  '}\n' +
  '\n' +
  'button:disabled {\n' +
  '    background: #ccc;\n' +
  '    cursor: not-allowed;\n' +
  '}\n' +
  '\n' +
  '.donation-message {\n' +
  '    margin-top: 15px;\n' +
  '    font-size: 16px;\n' +
  '    color: #ff4500;\n' +
  '    font-weight: bold;\n' +
  '}\n' +
  '\t</style>\n' +
  '</head>\n' +
  '<body>\n' +
  '    <div class="donation-container">\n' +
  '        <h2>Fund JS-JOKESTERS!</h2>\n' +
  '        <p>Support our quest to build JavaScript comedy bots. Slide to donate!</p>\n' +
  '        <div class="form-group">\n' +
  '            <label for="donorName">Your Name</label>\n' +
  '            <input type="text" id="donorName" value="Generous User" placeholder="Enter your name">\n' +
  '        </div>\n' +
  '        <div class="form-group slider-box">\n' +
  '            <label for="donationSlider">Set Donation (Aim for $80!)</label>\n' +
  '            <div class="slider-container">\n' +
  '                <input type="range" id="donationSlider" min="5" max="100" value="5">\n' +
  '                <div class="character" id="sliderCharacter"></div>\n' +
  '                <div class="taunt" id="tauntText"></div>\n' +
  '                <div class="amount-display" id="amountDisplay">$5</div>\n' +
  '            </div>\n' +
  '        </div>\n' +
  '        <button id="donateButton">Donate Now</button>\n' +
  '        <div class="donation-message" id="donationMessage"></div>\n' +
  '    </div>\n' +
  '    <script>const slider = document.getElementById("donationSlider");\n' +
  'const character = document.getElementById("sliderCharacter");\n' +
  'const tauntText = document.getElementById("tauntText");\n' +
  'const amountDisplay = document.getElementById("amountDisplay");\n' +
  'const donateButton = document.getElementById("donateButton");\n' +
  'const donationMessage = document.getElementById("donationMessage");\n' +
  '\n' +
  'const targetValue = 80; // Target donation amount\n' +
  'const maxValue = 100; // Max slider value\n' +
  'let isDragging = false;\n' +
  'let fightBackInterval;\n' +
  'let hasDonated = false; // Track donation state\n' +
  '\n' +
  'const taunts = [\n' +
  '    "Joke bots need more!",\n' +
  '    "Cheap code, huh?",\n' +
  '    "Raise it, coder!",\n' +
  '    "I want bigger bucks!",\n' +
  '    "JS deserves better!"\n' +
  '];\n' +
  '\n' +
  '// Update slider visuals\n' +
  'function updateSlider() {\n' +
  '    if (hasDonated) return; // Stop if donated\n' +
  '    const sliderRect = slider.getBoundingClientRect();\n' +
  '    const thumbWidth = 24;\n' +
  '    const percent = (slider.value - slider.min) / (slider.max - slider.min);\n' +
  '    const leftPos = percent * (sliderRect.width - thumbWidth);\n' +
  '    character.style.left = `${leftPos}px`;\n' +
  '    amountDisplay.textContent = `$${slider.value}`;\n' +
  '    if (!isDragging && parseInt(slider.value) < maxValue) {\n' +
  '        tauntText.textContent = taunts[Math.floor(Math.random() * taunts.length)];\n' +
  '    }\n' +
  '}\n' +
  '\n' +
  '// Fight back by increasing value, stop at max or if donated\n' +
  'function fightBack() {\n' +
  '    if (hasDonated) {\n' +
  '        clearInterval(fightBackInterval);\n' +
  '        return;\n' +
  '    }\n' +
  '    if (!isDragging) {\n' +
  '        const currentValue = parseInt(slider.value);\n' +
  '        if (currentValue < maxValue) {\n' +
  '            const newValue = Math.min(maxValue, currentValue + 2);\n' +
  '            slider.value = newValue;\n' +
  '            updateSlider();\n' +
  '        } else {\n' +
  '            tauntText.textContent = "Maxed out, you big spender!";\n' +
  '            clearInterval(fightBackInterval);\n' +
  '        }\n' +
  '    }\n' +
  '}\n' +
  '\n' +
  '// Start dragging\n' +
  'slider.addEventListener("mousedown", () => {\n' +
  '    if (hasDonated) return;\n' +
  '    isDragging = true;\n' +
  '    tauntText.textContent = "Trying to lowball me?";\n' +
  '    clearInterval(fightBackInterval);\n' +
  '});\n' +
  '\n' +
  'slider.addEventListener("mouseup", () => {\n' +
  '    if (hasDonated) return;\n' +
  '    isDragging = false;\n' +
  '    updateTaunt();\n' +
  '    if (parseInt(slider.value) < maxValue) {\n' +
  '        fightBackInterval = setInterval(fightBack, 200);\n' +
  '    }\n' +
  '});\n' +
  '\n' +
  'slider.addEventListener("input", () => {\n' +
  '    if (hasDonated) return;\n' +
  '    updateSlider();\n' +
  '    updateTaunt();\n' +
  '});\n' +
  '\n' +
  '// Touch support\n' +
  'slider.addEventListener("touchstart", () => {\n' +
  '    if (hasDonated) return;\n' +
  '    isDragging = true;\n' +
  '    tauntText.textContent = "Trying to lowball me?";\n' +
  '    clearInterval(fightBackInterval);\n' +
  '});\n' +
  '\n' +
  'slider.addEventListener("touchend", () => {\n' +
  '    if (hasDonated) return;\n' +
  '    isDragging = false;\n' +
  '    updateTaunt();\n' +
  '    if (parseInt(slider.value) < maxValue) {\n' +
  '        fightBackInterval = setInterval(fightBack, 200);\n' +
  '    }\n' +
  '});\n' +
  '\n' +
  'slider.addEventListener("touchmove", () => {\n' +
  '    if (hasDonated) return;\n' +
  '    updateSlider();\n' +
  '    updateTaunt();\n' +
  '});\n' +
  '\n' +
  '// Update taunt based on current value\n' +
  'function updateTaunt() {\n' +
  '    if (hasDonated) return;\n' +
  '    const currentValue = parseInt(slider.value);\n' +
  '    if (Math.abs(currentValue - targetValue) <= 5) {\n' +
  '        tauntText.textContent = `Nice $${currentValue}, you rock!`;\n' +
  '        character.style.background = "url(\'data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 40 40\\"><circle cx=\\"20\\" cy=\\"15\\" r=\\"8\\" fill=\\"#ff4500\\"/><rect x=\\"15\\" y=\\"23\\" width=\\"10\\" height=\\"12\\" fill=\\"#ff4500\\"/><circle cx=\\"17\\" cy=\\"17\\" r=\\"2\\" fill=\\"white\\"/><circle cx=\\"23\\" cy=\\"17\\" r=\\"2\\" fill=\\"white\\"/></svg>\') no-repeat center";\n' +
  '    } else if (currentValue < targetValue) {\n' +
  '        tauntText.textContent = "Too low for JS laughs!";\n' +
  '    } else if (currentValue === maxValue) {\n' +
  '        tauntText.textContent = "Maxed out, you big spender!";\n' +
  '    } else {\n' +
  '        tauntText.textContent = "Close, but aim for $80!";\n' +
  '    }\n' +
  '}\n' +
  '\n' +
  '// Initial setup\n' +
  'updateSlider();\n' +
  'fightBackInterval = setInterval(fightBack, 200);\n' +
  '\n' +
  '// Donate action with custom laughing message\n' +
  'donateButton.addEventListener("click", () => {\n' +
  '    if (hasDonated) return; // Stop if already donated\n' +
  '    const name = document.getElementById("donorName").value || "Generous User";\n' +
  '    const amount = parseInt(slider.value);\n' +
  '    let laughMessage;\n' +
  '    if (amount < 30) {\n' +
  '        laughMessage = `HAHAHA! ${name}, you stingy fool, gave $${amount} to JS-JOKESTERS? Cheap!`;\n' +
  '    } else if (amount < targetValue) {\n' +
  '        laughMessage = `HAHAHA! ${name}, you almost-generous fool, gave $${amount} to JS-JOKESTERS!`;\n' +
  '    } else if (Math.abs(amount - targetValue) <= 5) {\n' +
  '        laughMessage = `HAHAHA! ${name}, you perfect fool, gave $${amount} to JS-JOKESTERS! Spot on!`;\n' +
  '    } else {\n' +
  '        laughMessage = `HAHAHA! ${name}, you over-the-top generous fool, gave $${amount} to JS-JOKESTERS! Wow!`;\n' +
  '    }\n' +
  '    donationMessage.textContent = laughMessage;\n' +
  '    donateButton.disabled = true;\n' +
  '    slider.disabled = true;\n' +
  '    hasDonated = true; // Mark as donated\n' +
  '    clearInterval(fightBackInterval); // Stop fight back\n' +
  '    tauntText.textContent = "Much obliged, you glorious donor!"; // Polite and funny thank-you\n' +
  '});</script>\n' +
  '</body>\n' +
  '</html>';
