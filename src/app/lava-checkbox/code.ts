export const CODE = "<!DOCTYPE html>\n" +
  "<html lang=\"en\">\n" +
  "<head>\n" +
  "  <meta charset=\"UTF-8\">\n" +
  "  <title>🔥 Lava Checkbox Challenge</title>\n" +
  "  <style>\n" +
  "    html, body {\n" +
  "      margin: 0;\n" +
  "      padding: 0;\n" +
  "      background: #111;\n" +
  "      color: white;\n" +
  "      font-family: sans-serif;\n" +
  "      overflow: hidden;\n" +
  "      height: 100%;\n" +
  "      display: flex;\n" +
  "      flex-direction: column;\n" +
  "      align-items: center;\n" +
  "      justify-content: center;\n" +
  "    }\n" +
  "\n" +
  "    .checkbox-container {\n" +
  "      position: relative;\n" +
  "      padding: 30px;\n" +
  "      transition: transform 0.15s ease-in-out;\n" +
  "      z-index: 2;\n" +
  "    }\n" +
  "\n" +
  "    input[type=\"checkbox\"] {\n" +
  "      transform: scale(1.8);\n" +
  "      cursor: pointer;\n" +
  "    }\n" +
  "\n" +
  "    label {\n" +
  "      font-size: 1.4rem;\n" +
  "      margin-left: 12px;\n" +
  "      cursor: pointer;\n" +
  "    }\n" +
  "\n" +
  "    .teaser {\n" +
  "      margin-top: 20px;\n" +
  "      font-size: 1.4rem;\n" +
  "      color: #ffa500;\n" +
  "      z-index: 2;\n" +
  "    }\n" +
  "\n" +
  "    canvas {\n" +
  "      position: fixed;\n" +
  "      top: 0;\n" +
  "      left: 0;\n" +
  "      z-index: 1;\n" +
  "      width: 100vw;\n" +
  "      height: 100vh;\n" +
  "      pointer-events: none;\n" +
  "      display: none;\n" +
  "    }\n" +
  "\n" +
  "    button#reset {\n" +
  "      margin-top: 40px;\n" +
  "      background: #333;\n" +
  "      color: white;\n" +
  "      border: 1px solid #888;\n" +
  "      padding: 10px 20px;\n" +
  "      font-size: 1rem;\n" +
  "      cursor: pointer;\n" +
  "      display: none;\n" +
  "    }\n" +
  "  </style>\n" +
  "</head>\n" +
  "<body>\n" +
  "  <canvas id=\"volcanoCanvas\"></canvas>\n" +
  "\n" +
  "  <div class=\"checkbox-container\" id=\"checkboxBox\">\n" +
  "    <input type=\"checkbox\" id=\"shyCheckbox\">\n" +
  "    <label for=\"shyCheckbox\" id=\"checkboxLabel\">Check me... if you dare 💣</label>\n" +
  "  </div>\n" +
  "\n" +
  "  <div class=\"teaser\" id=\"teaserText\">🤨 Why would you do that...</div>\n" +
  "  <button id=\"reset\">Reset</button>\n" +
  "\n" +
  "  <script>\n" +
  "    const checkbox = document.getElementById('shyCheckbox');\n" +
  "    const checkboxBox = document.getElementById('checkboxBox');\n" +
  "    const label = document.getElementById('checkboxLabel');\n" +
  "    const teaser = document.getElementById('teaserText');\n" +
  "    const canvas = document.getElementById('volcanoCanvas');\n" +
  "    const ctx = canvas.getContext('2d');\n" +
  "    const resetBtn = document.getElementById('reset');\n" +
  "\n" +
  "    let isCaught = false;\n" +
  "    let dodgeCount = 0;\n" +
  "    let maxDodge = 6;\n" +
  "\n" +
  "    function resizeCanvas() {\n" +
  "      canvas.width = window.innerWidth;\n" +
  "      canvas.height = window.innerHeight;\n" +
  "    }\n" +
  "    resizeCanvas();\n" +
  "    window.addEventListener('resize', resizeCanvas);\n" +
  "\n" +
  "    checkboxBox.addEventListener('mouseenter', () => {\n" +
  "      if (isCaught || dodgeCount >= maxDodge) return;\n" +
  "      dodgeCount++;\n" +
  "\n" +
  "      const moveX = (Math.random() - 0.5) * 300;\n" +
  "      const moveY = (Math.random() - 0.5) * 200;\n" +
  "\n" +
  "      checkboxBox.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.05}deg)`;\n" +
  "\n" +
  "      // dynamic label reaction\n" +
  "      const phrases = [\n" +
  "        \"Nope! 😜\",\n" +
  "        \"Too slow!\",\n" +
  "        \"I'm warning you...\",\n" +
  "        \"You asked for it!\",\n" +
  "        \"😈 Last chance...\",\n" +
  "        \"Oh no... 💀\"\n" +
  "      ];\n" +
  "      label.textContent = phrases[dodgeCount - 1] || \"OK... now you've done it.\";\n" +
  "    });\n" +
  "\n" +
  "    checkbox.addEventListener('click', () => {\n" +
  "      if (isCaught) return;\n" +
  "      isCaught = true;\n" +
  "      teaser.textContent = \"🔥 Told you not to check it!\";\n" +
  "      canvas.style.display = 'block';\n" +
  "      eruptVolcano();\n" +
  "      resetBtn.style.display = 'inline-block';\n" +
  "    });\n" +
  "\n" +
  "    function eruptVolcano() {\n" +
  "      const particles = [];\n" +
  "      const gravity = 0.05;\n" +
  "      const colors = ['orange', 'red', 'yellow', 'darkred'];\n" +
  "\n" +
  "      function spawnParticle() {\n" +
  "        const angle = Math.random() * Math.PI * 2;\n" +
  "        const speed = Math.random() * 10 + 2;\n" +
  "        particles.push({\n" +
  "          x: canvas.width / 2,\n" +
  "          y: canvas.height - 40,\n" +
  "          vx: Math.cos(angle) * speed,\n" +
  "          vy: Math.sin(angle) * speed,\n" +
  "          radius: Math.random() * 8 + 3,\n" +
  "          life: Math.random() * 100 + 60,\n" +
  "          color: colors[Math.floor(Math.random() * colors.length)],\n" +
  "        });\n" +
  "      }\n" +
  "\n" +
  "      function draw() {\n" +
  "        ctx.clearRect(0, 0, canvas.width, canvas.height);\n" +
  "        for (let p of particles) {\n" +
  "          ctx.beginPath();\n" +
  "          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);\n" +
  "          ctx.fillStyle = p.color;\n" +
  "          ctx.fill();\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      function update() {\n" +
  "        for (let i = particles.length - 1; i >= 0; i--) {\n" +
  "          const p = particles[i];\n" +
  "          p.vy += gravity;\n" +
  "          p.x += p.vx;\n" +
  "          p.y += p.vy;\n" +
  "          p.life--;\n" +
  "          if (p.life <= 0) particles.splice(i, 1);\n" +
  "        }\n" +
  "      }\n" +
  "\n" +
  "      function animate() {\n" +
  "        for (let i = 0; i < 8; i++) spawnParticle();\n" +
  "        update();\n" +
  "        draw();\n" +
  "        if (particles.length < 1000) requestAnimationFrame(animate);\n" +
  "      }\n" +
  "\n" +
  "      animate();\n" +
  "    }\n" +
  "\n" +
  "    resetBtn.addEventListener('click', () => {\n" +
  "      isCaught = false;\n" +
  "      dodgeCount = 0;\n" +
  "      checkbox.checked = false;\n" +
  "      label.textContent = \"Check me... if you dare 💣\";\n" +
  "      checkboxBox.style.transform = `translate(0,0)`;\n" +
  "      teaser.textContent = \"🤨 Why would you do that...\";\n" +
  "      canvas.style.display = 'none';\n" +
  "      resetBtn.style.display = 'none';\n" +
  "    });\n" +
  "  </script>\n" +
  "</body>\n" +
  "</html>"
