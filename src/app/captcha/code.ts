export const CODE = "<!DOCTYPE html>\n" +
  "<html lang=\"en\">\n" +
  "<head>\n" +
  "    <meta charset=\"UTF-8\">\n" +
  "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
  "    <title>Realistic Form with Multi-Layer CAPTCHA</title>\n" +
  "\t<style>\n" +
  "\t* {\n" +
  "    box-sizing: border-box;\n" +
  "}\n" +
  "\n" +
  "body {\n" +
  "    display: flex;\n" +
  "    flex-direction: column;\n" +
  "    justify-content: center;\n" +
  "    align-items: center;\n" +
  "    height: 100vh;\n" +
  "    background-color: #eef1f7;\n" +
  "    font-family: \"Arial\", sans-serif;\n" +
  "}\n" +
  "\n" +
  ".form-container {\n" +
  "    background: #ffffff;\n" +
  "    padding: 25px;\n" +
  "    border-radius: 10px;\n" +
  "    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n" +
  "    width: 380px;\n" +
  "}\n" +
  "\n" +
  ".form-group {\n" +
  "    margin-bottom: 15px;\n" +
  "}\n" +
  "\n" +
  "label {\n" +
  "    font-weight: bold;\n" +
  "    display: block;\n" +
  "    margin-bottom: 5px;\n" +
  "    color: #333;\n" +
  "}\n" +
  "\n" +
  "input {\n" +
  "    width: 100%;\n" +
  "    padding: 10px;\n" +
  "    font-size: 16px;\n" +
  "    border: 1px solid #ccc;\n" +
  "    border-radius: 5px;\n" +
  "    outline: none;\n" +
  "}\n" +
  "\n" +
  ".captcha-box {\n" +
  "    margin-top: 15px;\n" +
  "}\n" +
  "\n" +
  ".scratch-area {\n" +
  "    position: relative;\n" +
  "    width: 100%;\n" +
  "    height: 100px;\n" +
  "    border-radius: 5px;\n" +
  "    overflow: hidden;\n" +
  "    border: 2px solid #ccc;\n" +
  "    user-select: none;\n" +
  "    margin-bottom: 4px;\n" +
  "}\n" +
  "\n" +
  ".layer {\n" +
  "    position: absolute;\n" +
  "    top: 0;\n" +
  "    left: 0;\n" +
  "    width: 100%;\n" +
  "    height: 100%;\n" +
  "}\n" +
  "\n" +
  ".layer span {\n" +
  "    position: absolute;\n" +
  "    width: 100%;\n" +
  "    text-align: center;\n" +
  "    line-height: 100px;\n" +
  "    font-size: 26px;\n" +
  "    font-weight: bold;\n" +
  "    color: #222;\n" +
  "}\n" +
  "\n" +
  "canvas {\n" +
  "    position: absolute;\n" +
  "    top: 0;\n" +
  "    left: 0;\n" +
  "    width: 100%;\n" +
  "    height: 100%;\n" +
  "    cursor: grab;\n" +
  "    z-index: 1;\n" +
  "}\n" +
  "\n" +
  "button {\n" +
  "    width: 100%;\n" +
  "    padding: 10px;\n" +
  "    font-size: 16px;\n" +
  "    font-weight: bold;\n" +
  "    background: #007bff;\n" +
  "    color: white;\n" +
  "    border: none;\n" +
  "    border-radius: 5px;\n" +
  "    cursor: pointer;\n" +
  "    transition: 0.3s;\n" +
  "}\n" +
  "\n" +
  "button:hover {\n" +
  "    background: #0056b3;\n" +
  "}\n" +
  "\t</style>\n" +
  "</head>\n" +
  "<body>\n" +
  "    <div class=\"form-container\">\n" +
  "        <h2 style=\"text-align: center;\">User Registration</h2>\n" +
  "        <div class=\"form-group\">\n" +
  "            <label for=\"email\">Email Address</label>\n" +
  "            <input type=\"email\" id=\"email\" value=\"jokesters@js.com\" placeholder=\"Enter your email\">\n" +
  "        </div>\n" +
  "        <div class=\"form-group\">\n" +
  "            <label for=\"password\">Password</label>\n" +
  "            <input type=\"password\" id=\"password\" value=\"**********\" placeholder=\"Enter your password\">\n" +
  "        </div>\n" +
  "        <div class=\"form-group captcha-box\">\n" +
  "            <label for=\"codeInput\">Scratch This CAPTCHA Area</label>\n" +
  "            <div class=\"scratch-area\">\n" +
  "                <div class=\"layer active\" id=\"layer1\">\n" +
  "                    <canvas id=\"scratchCanvas1\"></canvas>\n" +
  "                    <span id=\"text1\"></span>\n" +
  "                </div>\n" +
  "                <div class=\"layer\" id=\"layer2\" style=\"display: none;\">\n" +
  "                    <canvas id=\"scratchCanvas2\"></canvas>\n" +
  "                    <span id=\"text2\"></span>\n" +
  "                </div>\n" +
  "                <div class=\"layer\" id=\"layer3\" style=\"display: none;\">\n" +
  "                    <canvas id=\"scratchCanvas3\"></canvas>\n" +
  "                    <span id=\"text3\"></span>\n" +
  "                </div>\n" +
  "            </div>\n" +
  "            <input type=\"text\" id=\"codeInput\" placeholder=\"Enter the CAPTCHA code\">\n" +
  "        </div>\n" +
  "        <button onclick=\"validateCode()\">Register</button>\n" +
  "    </div>\n" +
  "    <script>\n" +
  "\tconst layers = [\n" +
  "    { id: \"layer1\", color: \"#888\", nextLayerId: \"layer2\" },  // Medium-dark gray\n" +
  "    { id: \"layer2\", color: \"#ccc\", nextLayerId: \"layer3\" },  // Light gray\n" +
  "    { id: \"layer3\", color: \"#f0f0f0\", isLastLayer: true, secretCode: \"JS-JOKESTERS\" }  // Off-white\n" +
  "];\n" +
  "const secretCode = layers[2].secretCode;\n" +
  "let currentLayerIndex = 0;\n" +
  "let isDrawing = false;\n" +
  "let scratchPercentage = 0;\n" +
  "let canvas, ctx, container, textSpan;\n" +
  "\n" +
  "function setupScratchLayer(layer) {\n" +
  "    container = document.getElementById(layer.id);\n" +
  "    canvas = container.querySelector(\"canvas\");\n" +
  "    ctx = canvas.getContext(\"2d\");\n" +
  "    textSpan = container.querySelector(\"span\");\n" +
  "\n" +
  "    canvas.width = container.clientWidth;\n" +
  "    canvas.height = container.clientHeight;\n" +
  "\n" +
  "    ctx.fillStyle = layer.color;\n" +
  "    ctx.fillRect(0, 0, canvas.width, canvas.height);\n" +
  "    ctx.globalAlpha = 0.4;\n" +
  "    for (let i = 0; i < 1000; i++) {\n" +
  "        let x = Math.random() * canvas.width;\n" +
  "        let y = Math.random() * canvas.height;\n" +
  "        let size = Math.random() * 2;\n" +
  "        ctx.fillStyle = layer.color === \"#f0f0f0\" ? \"#ddd\" : layer.color === \"#ccc\" ? \"#aaa\" : \"#666\";\n" +
  "        ctx.fillRect(x, y, size, size);\n" +
  "    }\n" +
  "    ctx.globalAlpha = 1;\n" +
  "\n" +
  "    canvas.addEventListener(\"mousedown\", () => isDrawing = true);\n" +
  "    canvas.addEventListener(\"mouseup\", () => isDrawing = false);\n" +
  "    canvas.addEventListener(\"mousemove\", scratch);\n" +
  "    canvas.addEventListener(\"touchstart\", () => isDrawing = true);\n" +
  "    canvas.addEventListener(\"touchend\", () => isDrawing = false);\n" +
  "    canvas.addEventListener(\"touchmove\", (e) => {\n" +
  "        e.preventDefault();\n" +
  "        scratch(e);\n" +
  "    });\n" +
  "}\n" +
  "\n" +
  "function scratch(e) {\n" +
  "    if (!isDrawing) return;\n" +
  "    const rect = canvas.getBoundingClientRect();\n" +
  "    const x = (e.clientX || e.touches[0].clientX) - rect.left;\n" +
  "    const y = (e.clientY || e.touches[0].clientY) - rect.top;\n" +
  "    ctx.globalCompositeOperation = \"destination-out\";\n" +
  "    ctx.beginPath();\n" +
  "    ctx.arc(x, y, 20, 0, Math.PI * 2);\n" +
  "    ctx.fill();\n" +
  "    calculateScratchProgress();\n" +
  "\n" +
  "    if (scratchPercentage >= 90 && !layers[currentLayerIndex].isLastLayer) {\n" +
  "        container.style.display = \"none\";\n" +
  "        const nextLayer = document.getElementById(layers[currentLayerIndex].nextLayerId);\n" +
  "        nextLayer.style.display = \"block\";\n" +
  "        currentLayerIndex++;\n" +
  "        setupScratchLayer(layers[currentLayerIndex]);\n" +
  "    } else if (scratchPercentage >= 90 && layers[currentLayerIndex].isLastLayer) {\n" +
  "        setTimeout(() => {\n" +
  "            textSpan.textContent = secretCode;\n" +
  "        }, 2000);\n" +
  "    }\n" +
  "}\n" +
  "\n" +
  "function calculateScratchProgress() {\n" +
  "    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);\n" +
  "    let pixels = imageData.data;\n" +
  "    let transparentPixels = 0;\n" +
  "    for (let i = 3; i < pixels.length; i += 4) {\n" +
  "        if (pixels[i] === 0) transparentPixels++;\n" +
  "    }\n" +
  "    scratchPercentage = (transparentPixels / (canvas.width * canvas.height)) * 100;\n" +
  "}\n" +
  "\n" +
  "function validateCode() {\n" +
  "    const userCode = document.getElementById(\"codeInput\").value.trim();\n" +
  "    if (currentLayerIndex === 2 && scratchPercentage >= 70 && userCode === secretCode) {\n" +
  "        alert(\"Registration Successful!\");\n" +
  "    }\n" +
  "}\n" +
  "\n" +
  "setupScratchLayer(layers[currentLayerIndex]);</script>\n" +
  "</body>\n" +
  "</html>";
