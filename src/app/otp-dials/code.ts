export const CODE = '<!DOCTYPE html>\n' +
  '<html lang="en">\n' +
  '<head>\n' +
  '    <meta charset="UTF-8">\n' +
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
  '    <title>OTP Entry Form</title>\n' +
  '    <style>\n' +
  '\t* {\n' +
  '    box-sizing: border-box;\n' +
  '    margin: 0;\n' +
  '    padding: 0;\n' +
  '}\n' +
  '\n' +
  'body {\n' +
  '    display: flex;\n' +
  '    justify-content: center;\n' +
  '    align-items: center;\n' +
  '    height: 100vh;\n' +
  '    background: #f5f5f5; /* Light gray background */\n' +
  '    font-family: "Roboto", sans-serif; /* Clean, modern font */\n' +
  '    overflow: hidden;\n' +
  '}\n' +
  '\n' +
  '.form-container {\n' +
  '    text-align: center;\n' +
  '    padding: 30px;\n' +
  '    background: #ffffff; /* White container */\n' +
  '    border-radius: 15px;\n' +
  '    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */\n' +
  '    border: 1px solid #e0e0e0; /* Light border */\n' +
  '}\n' +
  '\n' +
  'h1 {\n' +
  '    color: #333; /* Dark gray for text */\n' +
  '    font-size: 32px;\n' +
  '    margin-bottom: 15px;\n' +
  '    font-weight: 700;\n' +
  '}\n' +
  '\n' +
  'p {\n' +
  '    color: #666; /* Medium gray */\n' +
  '    font-size: 16px;\n' +
  '    margin-bottom: 20px;\n' +
  '}\n' +
  '\n' +
  '.dial-panel {\n' +
  '    display: flex;\n' +
  '    justify-content: center;\n' +
  '    gap: 12px;\n' +
  '    margin-bottom: 25px;\n' +
  '}\n' +
  '\n' +
  '.dial {\n' +
  '    width: 50px;\n' +
  '    height: 40px; /* Height matches one number */\n' +
  '    background: linear-gradient(145deg, #f0f0f0, #e0e0e0); /* Light gradient */\n' +
  '    border: 2px solid #4a90e2; /* Soft blue border */\n' +
  '    border-radius: 10px;\n' +
  '    overflow: hidden;\n' +
  '    position: relative;\n' +
  '    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);\n' +
  '    cursor: ns-resize;\n' +
  '}\n' +
  '\n' +
  '.dial-numbers {\n' +
  '    position: absolute;\n' +
  '    top: 0;\n' +
  '    width: 100%;\n' +
  '    text-align: center;\n' +
  '    font-size: 22px;\n' +
  '    color: #333; /* Dark gray numbers */\n' +
  '    transition: transform 0.15s ease-in-out; /* Smooth scrolling */\n' +
  '}\n' +
  '\n' +
  '.dial-numbers span {\n' +
  '    display: block;\n' +
  '    height: 40px; /* Matches dial height */\n' +
  '    line-height: 40px; /* Center vertically */\n' +
  '    text-shadow: 0 0 3px rgba(0, 0, 0, 0.1);\n' +
  '}\n' +
  '\n' +
  '#submitButton {\n' +
  '    padding: 12px 25px;\n' +
  '    font-size: 16px;\n' +
  '    background: #4a90e2; /* Soft blue */\n' +
  '    color: #fff;\n' +
  '    border: none;\n' +
  '    border-radius: 10px;\n' +
  '    cursor: pointer;\n' +
  '    transition: background 0.3s, box-shadow 0.3s;\n' +
  '    box-shadow: 0 2px 10px rgba(74, 144, 226, 0.3);\n' +
  '    font-weight: 700;\n' +
  '    letter-spacing: 1px;\n' +
  '}\n' +
  '\n' +
  '#submitButton:disabled {\n' +
  '    background: #b0b0b0; /* Gray when disabled */\n' +
  '    box-shadow: none;\n' +
  '    cursor: not-allowed;\n' +
  '}\n' +
  '\n' +
  '#submitButton:hover:not(:disabled) {\n' +
  '    background: #357abd; /* Darker blue on hover */\n' +
  '    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.5);\n' +
  '}\n' +
  '\n' +
  '.taunt-text {\n' +
  '    margin-top: 20px;\n' +
  '    font-size: 18px;\n' +
  '    color: #e94e77; /* Soft pink for taunts */\n' +
  '    font-weight: 500;\n' +
  '}\n' +
  '\n' +
  '.result-message {\n' +
  '    margin-top: 15px;\n' +
  '    font-size: 20px;\n' +
  '    color: #2ecc71; /* Green for success */\n' +
  '    font-weight: 500;\n' +
  '}\n' +
  '\n' +
  '.snackbar {\n' +
  '    position: fixed;\n' +
  '    top: 20px;\n' +
  '    right: -300px; /* Hidden off-screen initially */\n' +
  '    background: #333; /* Dark background for snackbar */\n' +
  '    color: #fff;\n' +
  '    padding: 15px 20px;\n' +
  '    border-radius: 8px;\n' +
  '    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);\n' +
  '    display: flex;\n' +
  '    align-items: center;\n' +
  '    gap: 15px;\n' +
  '    transition: right 0.3s ease-in-out;\n' +
  '    z-index: 1000;\n' +
  '}\n' +
  '\n' +
  '.snackbar.show {\n' +
  '    right: 20px; /* Slide in */\n' +
  '}\n' +
  '\n' +
  '#otpMessage {\n' +
  '    font-size: 16px;\n' +
  '}\n' +
  '\n' +
  '#otpCode {\n' +
  '    color: #2ecc71; /* Green OTP code */\n' +
  '    font-weight: 700;\n' +
  '}\n' +
  '\n' +
  '#otpTimer {\n' +
  '    font-size: 14px;\n' +
  '    color: #ffcc00; /* Yellow for timer */\n' +
  '    margin-left: 10px;\n' +
  '}\n' +
  '\n' +
  '#closeSnackbar {\n' +
  '    background: none;\n' +
  '    border: none;\n' +
  '    color: #fff;\n' +
  '    font-size: 16px;\n' +
  '    cursor: pointer;\n' +
  '    padding: 5px;\n' +
  '}\n' +
  '\n' +
  '#closeSnackbar:hover {\n' +
  '    color: #e94e77; /* Pink on hover */\n' +
  '}\n' +
  '\t</style>\n' +
  '    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">\n' +
  '</head>\n' +
  '<body>\n' +
  '    <div class="form-container">\n' +
  '        <h1>Enter Your OTP</h1>\n' +
  '        <p>Spin the dials to match the OTP sent to you!</p>\n' +
  '        <div class="dial-panel" id="dialPanel">\n' +
  '            <!-- Dials added via JS -->\n' +
  '        </div>\n' +
  '        <button id="submitButton" disabled>Verify OTP</button>\n' +
  '        <div class="taunt-text" id="tauntText"></div>\n' +
  '        <div class="result-message" id="resultMessage"></div>\n' +
  '    </div>\n' +
  '    <div class="snackbar" id="snackbar">\n' +
  '        <span id="otpMessage">Your OTP is: <strong id="otpCode"></strong></span>\n' +
  '        <span id="otpTimer">Expires in 30s</span>\n' +
  '        <button id="closeSnackbar">✕</button>\n' +
  '    </div>\n' +
  '    <audio id="clickSound" src="https://freesound.org/data/previews/245/245645_4052966-lq.mp3"></audio>\n' +
  '    <audio id="failSound" src="https://freesound.org/data/previews/13/13665_155703-lq.mp3"></audio>\n' +
  '    <audio id="successSound" src="https://freesound.org/data/previews/187/187944_2605540-lq.mp3"></audio>\n' +
  '    <script>\n' +
  '\t\tconst dialPanel = document.getElementById("dialPanel");\n' +
  'const submitButton = document.getElementById("submitButton");\n' +
  'const tauntText = document.getElementById("tauntText");\n' +
  'const resultMessage = document.getElementById("resultMessage");\n' +
  'const snackbar = document.getElementById("snackbar");\n' +
  'const otpCode = document.getElementById("otpCode");\n' +
  'const otpTimer = document.getElementById("otpTimer");\n' +
  'const closeSnackbar = document.getElementById("closeSnackbar");\n' +
  'const clickSound = document.getElementById("clickSound");\n' +
  'const failSound = document.getElementById("failSound");\n' +
  'const successSound = document.getElementById("successSound");\n' +
  '\n' +
  'const otpLength = 6;\n' +
  'let targetOTP = generateOTP();\n' +
  'let dials = [];\n' +
  'let hasSubmitted = false;\n' +
  'let expiryTimeout;\n' +
  'let timerInterval;\n' +
  'let timeLeft = 30; // 30 seconds\n' +
  '\n' +
  'const taunts = {\n' +
  '    incorrect: [\n' +
  '        "Spin faster, rookie!",\n' +
  '        "This vault’s laughing at you!",\n' +
  '        "Wrong code, try harder!",\n' +
  '        "My robot cracks better than you!",\n' +
  '        "You’re a total failure!",\n' +
  '        "Hurry up, newbie!",\n' +
  '        "Even bots laugh at this!"\n' +
  '    ],\n' +
  '    correct: [\n' +
  '        "Looking good, cracker!",\n' +
  '        "You’re on the right track!",\n' +
  '        "Almost there, champ!",\n' +
  '        "Nice spin, keep going!",\n' +
  '        "You’ve got this!"\n' +
  '    ]\n' +
  '};\n' +
  '\n' +
  '// Generate random 6-digit OTP\n' +
  'function generateOTP() {\n' +
  '    return Array.from({ length: otpLength }, () => Math.floor(Math.random() * 10)).join("");\n' +
  '}\n' +
  '\n' +
  '// Show OTP in snackbar with countdown\n' +
  'function showOTP() {\n' +
  '    otpCode.textContent = targetOTP;\n' +
  '    timeLeft = 30; // Reset timer to 30s\n' +
  '    otpTimer.textContent = `Expires in ${timeLeft}s`;\n' +
  '    snackbar.classList.add("show");\n' +
  '\n' +
  '    // Update timer every second\n' +
  '    timerInterval = setInterval(() => {\n' +
  '        timeLeft--;\n' +
  '        if (timeLeft <= 0) {\n' +
  '            clearInterval(timerInterval); // Stop the interval at 0\n' +
  '            timeLeft = 0; // Ensure it doesn\'t go negative\n' +
  '        }\n' +
  '        otpTimer.textContent = `Expires in ${timeLeft}s`;\n' +
  '    }, 1000);\n' +
  '\n' +
  '    // Expire after 30s\n' +
  '    expiryTimeout = setTimeout(() => {\n' +
  '        if (!hasSubmitted) {\n' +
  '            clearInterval(timerInterval); // Ensure interval is cleared\n' +
  '            snackbar.classList.remove("show");\n' +
  '            targetOTP = generateOTP();\n' +
  '            showOTP(); // Generate and show new OTP\n' +
  '            resultMessage.textContent = "OTP expired! A new code has been generated.";\n' +
  '            resultMessage.style.color = "#e94e77"; // Pink for expiry message\n' +
  '            dials.forEach(dial => {\n' +
  '                const numbers = dial.element.querySelector(".dial-numbers");\n' +
  '                numbers.style.transform = `translateY(0)`; // Reset dials to 0\n' +
  '                dial.getValue = () => 0;\n' +
  '            });\n' +
  '            checkCombination();\n' +
  '        }\n' +
  '    }, 30000); // 30s expiry\n' +
  '}\n' +
  '\n' +
  '// Create a dial\n' +
  'function createDial(index) {\n' +
  '    const dial = document.createElement("div");\n' +
  '    dial.classList.add("dial");\n' +
  '    const numbers = document.createElement("div");\n' +
  '    numbers.classList.add("dial-numbers");\n' +
  '    for (let i = 0; i < 10; i++) {\n' +
  '        const span = document.createElement("span");\n' +
  '        span.textContent = i;\n' +
  '        numbers.appendChild(span);\n' +
  '    }\n' +
  '    dial.appendChild(numbers);\n' +
  '    dialPanel.appendChild(dial);\n' +
  '\n' +
  '    let position = 0; // Current dial position (0-9)\n' +
  '    dial.dataset.index = index;\n' +
  '\n' +
  '    // Wheel scroll\n' +
  '    dial.addEventListener("wheel", (event) => {\n' +
  '        if (hasSubmitted) return;\n' +
  '        event.preventDefault();\n' +
  '        const delta = event.deltaY > 0 ? 1 : -1;\n' +
  '        position = scrollDial(delta, position, numbers);\n' +
  '        checkCombination();\n' +
  '        clickSound.play().catch(() => console.log("Click blocked"));\n' +
  '    });\n' +
  '\n' +
  '    // Drag scroll\n' +
  '    let isDragging = false;\n' +
  '    let startY;\n' +
  '    let lastDelta = 0;\n' +
  '    dial.addEventListener("mousedown", (event) => {\n' +
  '        if (hasSubmitted) return;\n' +
  '        isDragging = true;\n' +
  '        startY = event.clientY;\n' +
  '        lastDelta = 0;\n' +
  '    });\n' +
  '    document.addEventListener("mousemove", (event) => {\n' +
  '        if (!isDragging || hasSubmitted) return;\n' +
  '        const delta = (startY - event.clientY) / 40; // Match number height\n' +
  '        const deltaChange = Math.floor(delta) - lastDelta;\n' +
  '        if (Math.abs(deltaChange) >= 1) {\n' +
  '            position = scrollDial(deltaChange > 0 ? 1 : -1, position, numbers);\n' +
  '            lastDelta = Math.floor(delta);\n' +
  '            checkCombination();\n' +
  '            clickSound.play().catch(() => console.log("Click blocked"));\n' +
  '        }\n' +
  '    });\n' +
  '    document.addEventListener("mouseup", () => {\n' +
  '        isDragging = false;\n' +
  '    });\n' +
  '\n' +
  '    // Touch scroll\n' +
  '    dial.addEventListener("touchstart", (event) => {\n' +
  '        if (hasSubmitted) return;\n' +
  '        startY = event.touches[0].clientY;\n' +
  '        lastDelta = 0;\n' +
  '    });\n' +
  '    dial.addEventListener("touchmove", (event) => {\n' +
  '        if (hasSubmitted) return;\n' +
  '        const delta = (startY - event.touches[0].clientY) / 40;\n' +
  '        const deltaChange = Math.floor(delta) - lastDelta;\n' +
  '        if (Math.abs(deltaChange) >= 1) {\n' +
  '            position = scrollDial(deltaChange > 0 ? 1 : -1, position, numbers);\n' +
  '            lastDelta = Math.floor(delta);\n' +
  '            checkCombination();\n' +
  '            clickSound.play().catch(() => console.log("Click blocked"));\n' +
  '        }\n' +
  '    });\n' +
  '\n' +
  '    return { element: dial, getValue: () => position };\n' +
  '}\n' +
  '\n' +
  '// Scroll the dial\n' +
  'function scrollDial(direction, currentPos, numbers) {\n' +
  '    const newPos = (currentPos + direction + 10) % 10; // Wrap around 0-9\n' +
  '    numbers.style.transform = `translateY(-${newPos * 40}px)`; // 40px per step\n' +
  '\n' +
  '    // Update the dial\'s position\n' +
  '    const dial = dials.find(d => d.element === numbers.parentElement);\n' +
  '    if (dial) {\n' +
  '        dial.getValue = () => newPos; // Update the getValue function\n' +
  '    }\n' +
  '\n' +
  '    // Show taunt based on current combination\n' +
  '    const currentCombo = dials.map(dial => dial.getValue()).join("");\n' +
  '    if (Math.random() < 0.2) { // 20% taunt chance on user scroll\n' +
  '        if (currentCombo === targetOTP) {\n' +
  '            tauntText.textContent = taunts.correct[Math.floor(Math.random() * taunts.correct.length)];\n' +
  '        } else {\n' +
  '            tauntText.textContent = taunts.incorrect[Math.floor(Math.random() * taunts.incorrect.length)];\n' +
  '        }\n' +
  '    }\n' +
  '    return newPos;\n' +
  '}\n' +
  '\n' +
  '// Check combination\n' +
  'function checkCombination() {\n' +
  '    const currentCombo = dials.map(dial => dial.getValue()).join("");\n' +
  '    if (currentCombo === targetOTP && !hasSubmitted) {\n' +
  '        submitButton.disabled = false;\n' +
  '        resultMessage.textContent = "OTP matched! Ready to verify!";\n' +
  '    } else {\n' +
  '        submitButton.disabled = true;\n' +
  '        resultMessage.textContent = "";\n' +
  '    }\n' +
  '}\n' +
  '\n' +
  '// Submit the OTP\n' +
  'submitButton.addEventListener("click", () => {\n' +
  '    if (hasSubmitted || submitButton.disabled) return;\n' +
  '    hasSubmitted = true;\n' +
  '    clearTimeout(expiryTimeout);\n' +
  '    clearInterval(timerInterval);\n' +
  '    snackbar.classList.remove("show");\n' +
  '    successSound.play().catch(() => console.log("Success blocked"));\n' +
  '    tauntText.textContent = "You’re a master cracker!";\n' +
  '    resultMessage.textContent = `OTP verified successfully! Access granted!`;\n' +
  '    submitButton.disabled = true;\n' +
  '    dials.forEach(dial => dial.element.style.borderColor = "#2ecc71"); // Green victory\n' +
  '});\n' +
  '\n' +
  '// Close snackbar manually\n' +
  'closeSnackbar.addEventListener("click", () => {\n' +
  '    snackbar.classList.remove("show");\n' +
  '    clearTimeout(expiryTimeout);\n' +
  '    clearInterval(timerInterval);\n' +
  '    targetOTP = generateOTP();\n' +
  '    showOTP(); // Generate and show new OTP\n' +
  '    resultMessage.textContent = "New OTP generated.";\n' +
  '    resultMessage.style.color = "#e94e77"; // Pink for new OTP message\n' +
  '    dials.forEach(dial => {\n' +
  '        const numbers = dial.element.querySelector(".dial-numbers");\n' +
  '        numbers.style.transform = `translateY(0)`; // Reset dials to 0\n' +
  '        dial.getValue = () => 0;\n' +
  '    });\n' +
  '    checkCombination();\n' +
  '});\n' +
  '\n' +
  '// Initialize dials\n' +
  'for (let i = 0; i < otpLength; i++) {\n' +
  '    dials.push(createDial(i));\n' +
  '}\n' +
  '\n' +
  '// Show initial OTP\n' +
  'showOTP();\n' +
  '\n' +
  '// Initial taunt\n' +
  'tauntText.textContent = "Enter the OTP, you code cracker!";\n' +
  '\n' +
  '// Initial check to ensure button state is correct\n' +
  'checkCombination();\n' +
  '\t</script>\n' +
  '</body>\n' +
  '</html>';
