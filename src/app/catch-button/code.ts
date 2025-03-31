export const CODE = '<!DOCTYPE html>\n' +
  '<html lang="en">\n' +
  '<head>\n' +
  '    <meta charset="UTF-8">\n' +
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
  '    <title>Delete Your Account - Catch Me!</title>\n' +
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
  '    background: linear-gradient(45deg, #ff6b6b, #4ecdc4); /* Wild gradient */\n' +
  '    font-family: "Comic Sans MS", "Arial", sans-serif;\n' +
  '    overflow: hidden;\n' +
  '}\n' +
  '\n' +
  '.delete-container {\n' +
  '    text-align: center;\n' +
  '    padding: 20px;\n' +
  '    background: rgba(255, 255, 255, 0.9);\n' +
  '    border-radius: 20px;\n' +
  '    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);\n' +
  '}\n' +
  '\n' +
  'h1 {\n' +
  '    color: #ff1493; /* Hot pink */\n' +
  '    font-size: 36px;\n' +
  '    margin-bottom: 10px;\n' +
  '    text-shadow: 2px 2px #ffd700;\n' +
  '}\n' +
  '\n' +
  'p {\n' +
  '    color: #333;\n' +
  '    font-size: 18px;\n' +
  '    margin-bottom: 20px;\n' +
  '}\n' +
  '\n' +
  '.chase-area {\n' +
  '    position: relative;\n' +
  '    width: 600px;\n' +
  '    height: 400px;\n' +
  '    background: rgba(255, 255, 255, 0.5);\n' +
  '    border: 3px dashed #ff4500;\n' +
  '    border-radius: 15px;\n' +
  '    overflow: hidden;\n' +
  '}\n' +
  '\n' +
  '.runaway-button {\n' +
  '    position: absolute;\n' +
  '    padding: 15px 25px;\n' +
  '    font-size: 18px;\n' +
  '    font-weight: bold;\n' +
  '    background: #ff4500; /* Orange */\n' +
  '    color: white;\n' +
  '    border: none;\n' +
  '    border-radius: 50px;\n' +
  '    cursor: pointer;\n' +
  '    transition: transform 0.1s ease;\n' +
  '    box-shadow: 0 5px #e5533d;\n' +
  '}\n' +
  '\n' +
  '.runaway-button:hover {\n' +
  '    background: #e5533d;\n' +
  '    transform: scale(1.1);\n' +
  '}\n' +
  '\n' +
  '.taunt-box {\n' +
  '    margin-top: 20px;\n' +
  '    font-size: 20px;\n' +
  '    color: #ff1493;\n' +
  '    font-weight: bold;\n' +
  '    text-shadow: 1px 1px #fff;\n' +
  '}\n' +
  '\n' +
  '.status-message {\n' +
  '    margin-top: 15px;\n' +
  '    font-size: 18px;\n' +
  '    color: #333;\n' +
  '    font-weight: bold;\n' +
  '} \n' +
  '\t</style>\n' +
  '</head>\n' +
  '<body>\n' +
  '    <div class="delete-container">\n' +
  '        <h1>Delete Your Account?</h1>\n' +
  '        <p>Catch the button if you dare!</p>\n' +
  '        <div class="chase-area" id="chaseArea">\n' +
  '            <button id="deleteButton" class="runaway-button">Delete Me!</button>\n' +
  '        </div>\n' +
  '        <div class="taunt-box" id="tauntBox"></div>\n' +
  '        <div class="status-message" id="statusMessage"></div>\n' +
  '    </div>\n' +
  '    <script>\n' +
  '\tconst chaseArea = document.getElementById("chaseArea");\n' +
  'const deleteButton = document.getElementById("deleteButton");\n' +
  'const tauntBox = document.getElementById("tauntBox");\n' +
  'const statusMessage = document.getElementById("statusMessage");\n' +
  '\n' +
  'let buttonX = 0;\n' +
  'let buttonY = 0;\n' +
  'let hasDeleted = false;\n' +
  '\n' +
  'const taunts = [\n' +
  '    "Catch me if you can, loser!",\n' +
  '    "Nope, not today!",\n' +
  '    "Run, run, little mouse!",\n' +
  '    "You’ll never delete me!",\n' +
  '    "Too slow, buddy!",\n' +
  '    "I’m outta here!",\n' +
  '    "Haha, good luck!"\n' +
  '];\n' +
  '\n' +
  '// Move button to a random position\n' +
  'function moveButton() {\n' +
  '    if (hasDeleted) return;\n' +
  '    const areaWidth = chaseArea.offsetWidth - deleteButton.offsetWidth;\n' +
  '    const areaHeight = chaseArea.offsetHeight - deleteButton.offsetHeight;\n' +
  '    buttonX = Math.floor(Math.random() * areaWidth);\n' +
  '    buttonY = Math.floor(Math.random() * areaHeight);\n' +
  '    deleteButton.style.left = `${buttonX}px`;\n' +
  '    deleteButton.style.top = `${buttonY}px`;\n' +
  '    tauntBox.textContent = taunts[Math.floor(Math.random() * taunts.length)];\n' +
  '}\n' +
  '\n' +
  '// Check if cursor is near button\n' +
  'function isNearButton(event) {\n' +
  '    const rect = deleteButton.getBoundingClientRect();\n' +
  '    const mouseX = event.clientX;\n' +
  '    const mouseY = event.clientY;\n' +
  '    const buffer = 50; // Distance to trigger dodge\n' +
  '    return (\n' +
  '        mouseX > rect.left - buffer &&\n' +
  '        mouseX < rect.right + buffer &&\n' +
  '        mouseY > rect.top - buffer &&\n' +
  '        mouseY < rect.bottom + buffer\n' +
  '    );\n' +
  '}\n' +
  '\n' +
  '// Dodge on mouse move\n' +
  'chaseArea.addEventListener("mousemove", (event) => {\n' +
  '    if (hasDeleted) return;\n' +
  '    if (isNearButton(event)) {\n' +
  '        moveButton();\n' +
  '    }\n' +
  '});\n' +
  '\n' +
  '// Dodge on touch move\n' +
  'chaseArea.addEventListener("touchmove", (event) => {\n' +
  '    if (hasDeleted) return;\n' +
  '    const touch = event.touches[0];\n' +
  '    if (isNearButton({ clientX: touch.clientX, clientY: touch.clientY })) {\n' +
  '        moveButton();\n' +
  '    }\n' +
  '});\n' +
  '\n' +
  '// Handle delete when clicked\n' +
  'deleteButton.addEventListener("click", () => {\n' +
  '    if (hasDeleted) return;\n' +
  '    hasDeleted = true;\n' +
  '    deleteButton.style.background = "#ccc";\n' +
  '    deleteButton.style.boxShadow = "none";\n' +
  '    deleteButton.disabled = true;\n' +
  '    tauntBox.textContent = "Oh no, you got me!";\n' +
  '    statusMessage.textContent = "Account deleted! Poof, you’re gone!";\n' +
  '});\n' +
  '\n' +
  '// Initial position\n' +
  'moveButton();\n' +
  '\n' +
  '// Periodic dodge for extra challenge\n' +
  'setInterval(() => {\n' +
  '    if (!hasDeleted && Math.random() < 0.3) { // 30% chance every second\n' +
  '        moveButton();\n' +
  '    }\n' +
  '}, 1000);\n' +
  '\t</script>\n' +
  '</body>\n' +
  '</html>';
