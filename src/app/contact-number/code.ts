export const CODE = '<!DOCTYPE html>\n' +
  '<html lang="en">\n' +
  '\n' +
  '<head>\n' +
  '    <meta charset="UTF-8">\n' +
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
  '    <title>Phone Number Slot Machine</title>\n' +
  '    <style>\n' +
  '        :root {\n' +
  '          --primary-color: #307351;\n' +
  '          --primary-hover-color: #36815c;\n' +
  '          --background-color: #f0f0f0;\n' +
  '          --text-color: #333;\n' +
  '          --light-text-color: #f5f5f5;\n' +
  '          --border-color: #000;\n' +
  '          --container-bg: #fff;\n' +
  '          --shadow-color: rgba(0, 0, 0, 0.2);\n' +
  '        }\n' +
  '        \n' +
  '        body {\n' +
  '          font-family: "Arial", sans-serif;\n' +
  '          display: flex;\n' +
  '          justify-content: center;\n' +
  '          align-items: center;\n' +
  '          height: 100vh;\n' +
  '          background-color: var(--background-color);\n' +
  '          margin: 0;\n' +
  '        }\n' +
  '        \n' +
  '        .form-wrapper {\n' +
  '          border-radius: 10px;\n' +
  '          padding: 10px;\n' +
  '          box-shadow: 0 10px 25px var(--shadow-color);\n' +
  '          margin: 8px;\n' +
  '          width: 300px;\n' +
  '        }\n' +
  '        \n' +
  '        .submit-wrapper {\n' +
  '          display: flex;\n' +
  '          justify-content: center;\n' +
  '          margin-top: 20px;\n' +
  '        }\n' +
  '        \n' +
  '        .submit-btn {\n' +
  '          background-color: var(--primary-color);\n' +
  '          border-radius: 4px;\n' +
  '          padding: 8px 20px;\n' +
  '          transition: all 0.3s ease-in;\n' +
  '          border: none;\n' +
  '          font-weight: 600;\n' +
  '          font-size: 14px;\n' +
  '          text-transform: uppercase;\n' +
  '          color: var(--light-text-color);\n' +
  '          cursor: pointer;\n' +
  '        }\n' +
  '        \n' +
  '        .submit-btn:hover:not(:disabled) {\n' +
  '          background-color: var(--primary-hover-color);\n' +
  '        }\n' +
  '        \n' +
  '        button:disabled {\n' +
  '          background-color: var(--text-color);\n' +
  '        }\n' +
  '        \n' +
  '        .input-content-wrapper {\n' +
  '          text-align: center;\n' +
  '          width: 100%;\n' +
  '          display: flex;\n' +
  '          align-items: flex-end;\n' +
  '        }\n' +
  '        \n' +
  '        .slot-machine {\n' +
  '          border-radius: 4px;\n' +
  '          padding: 5px;\n' +
  '          margin: 10px 0;\n' +
  '          display: flex;\n' +
  '          justify-content: center;\n' +
  '          overflow: hidden;\n' +
  '          border: 1px solid var(--border-color);\n' +
  '          cursor: text;\n' +
  '          background: var(--container-bg);\n' +
  '        }\n' +
  '        \n' +
  '        .slot-machine.focused {\n' +
  '          box-shadow: 0 0 0 1px var(--border-color);\n' +
  '        }\n' +
  '        \n' +
  '        .digit-wrapper {\n' +
  '          width: 8px;\n' +
  '          height: 20px;\n' +
  '          margin: 0 2px;\n' +
  '          overflow: hidden;\n' +
  '          position: relative;\n' +
  '        }\n' +
  '        \n' +
  '        .digit-spinner {\n' +
  '          position: absolute;\n' +
  '          top: 0;\n' +
  '          left: 0;\n' +
  '          width: 100%;\n' +
  '          transition: top 0.5s ease-in-out;\n' +
  '        }\n' +
  '        \n' +
  '        .digit {\n' +
  '          height: 20px;\n' +
  '          display: flex;\n' +
  '          justify-content: center;\n' +
  '          align-items: center;\n' +
  '          font-size: 16px;\n' +
  '          font-weight: bold;\n' +
  '          color: var(--text-color);\n' +
  '        }\n' +
  '        \n' +
  '        .roll-btn {\n' +
  '          border: none;\n' +
  '          padding: 0;\n' +
  '          margin: 10px 0 10px 10px;\n' +
  '          font-size: 18px;\n' +
  '          font-weight: bold;\n' +
  '          border-radius: 5px;\n' +
  '          cursor: pointer;\n' +
  '          height: 30px;\n' +
  '          transition: all 0.3s;\n' +
  '          display: none;\n' +
  '          background: transparent;\n' +
  '        }\n' +
  '        \n' +
  '        .machine-wrapper {\n' +
  '          display: flex;\n' +
  '          align-items: center;\n' +
  '          justify-content: center;\n' +
  '        }\n' +
  '        \n' +
  '        .dice-icon {\n' +
  '          width: 30px;\n' +
  '          height: 30px;\n' +
  '          background: var(--background-color);\n' +
  '          transition: all 0.3s ease-in-out;\n' +
  '        }\n' +
  '        \n' +
  '        .dice-icon:hover {\n' +
  '          transform: scale(1.15);\n' +
  '        }\n' +
  '        \n' +
  '        .label {\n' +
  '          font-weight: 600;\n' +
  '          font-size: 14px;\n' +
  '          align-self: center;\n' +
  '        }\n' +
  '        \n' +
  '        .label-wrapper {\n' +
  '          margin: 10px 10px 10px 0;\n' +
  '          align-self: center;\n' +
  '        }\n' +
  '        \n' +
  '        .submit-message {\n' +
  '          margin-top: 15px;\n' +
  '          padding: 10px;\n' +
  '          text-align: center;\n' +
  '          font-weight: bold;\n' +
  '          min-height: 20px;\n' +
  '        }\n' +
  '    </style>\n' +
  '</head>\n' +
  '\n' +
  '<body>\n' +
  '    <form class="form-wrapper">\n' +
  '        <div class="input-content-wrapper">\n' +
  '            <div class="label-wrapper">\n' +
  '                <label class="label">Contact Number:</label>\n' +
  '            </div>\n' +
  '            <div class="machine-wrapper">\n' +
  '                <div class="slot-machine" id="slot-machine">\n' +
  '                </div>\n' +
  '            </div>\n' +
  '            <button class="roll-btn" id="roll-btn">\n' +
  '                <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">\n' +
  '                    <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"\n' +
  '                    />\n' +
  '                </svg>\n' +
  '            </button>\n' +
  '            <!-- Hidden input that will actually store the value -->\n' +
  '            <input type="hidden" id="phone-input" name="phone" value="">\n' +
  '        </div>\n' +
  '        <div class="submit-wrapper">\n' +
  '            <button class="submit-btn" type="submit" id="submit-btn">Submit</button>\n' +
  '        </div>\n' +
  '        <div class="submit-message" id="submit-message"></div>\n' +
  '    </form>\n' +
  '    <script>\n' +
  '        document.addEventListener("DOMContentLoaded", () => {\n' +
  '          const rollBtn = document.getElementById("roll-btn");\n' +
  '          const slotMachine = document.getElementById("slot-machine");\n' +
  '          const phoneInput = document.getElementById("phone-input");\n' +
  '          const submitBtn = document.getElementById("submit-btn");\n' +
  '          const submitMessageContainer = document.getElementById("submit-message");\n' +
  '          const digitSpinners = [];\n' +
  '          const digitContainers = [];\n' +
  '          let isRolling = false;\n' +
  '          let hasRolledOnce = false;\n' +
  '        \n' +
  '          const generateDigitElements = () => {\n' +
  '            const slotMachineContainer = document.getElementById("slot-machine");\n' +
  '        \n' +
  '            Array.from({ length: 9 }).forEach((_, i) => {\n' +
  '              const digitContainer = document.createElement("div");\n' +
  '              digitContainer.className = "digit-wrapper";\n' +
  '              digitContainer.id = `wrapper-${i}`;\n' +
  '        \n' +
  '              const digitSpinner = document.createElement("div");\n' +
  '              digitSpinner.className = "digit-spinner";\n' +
  '              digitSpinner.id = `digit-${i}`;\n' +
  '        \n' +
  '              Array.from({ length: 2 }).forEach(() => {\n' +
  '                Array.from({ length: 10 }).forEach((_, k) => {\n' +
  '                  const digit = document.createElement("div");\n' +
  '                  digit.className = "digit";\n' +
  '                  digit.textContent = k;\n' +
  '                  digitSpinner.appendChild(digit);\n' +
  '                });\n' +
  '              });\n' +
  '        \n' +
  '              digitContainer.appendChild(digitSpinner);\n' +
  '              slotMachineContainer.appendChild(digitContainer);\n' +
  '              digitSpinners.push(digitSpinner);\n' +
  '              digitContainers.push(digitContainer);\n' +
  '            });\n' +
  '          };\n' +
  '        \n' +
  '          const spinDigit = (digitIndex, finalDigit) => {\n' +
  '            return new Promise((resolve) => {\n' +
  '              const spinner = digitSpinners[digitIndex];\n' +
  '              const container = digitContainers[digitIndex];\n' +
  '        \n' +
  '              digitContainers.forEach((c) => c.classList.remove("active-digit"));\n' +
  '              container.classList.add("active-digit");\n' +
  '              spinner.style.transition = "none";\n' +
  '              spinner.style.top = "0px";\n' +
  '              void spinner.offsetWidth;\n' +
  '              spinner.style.transition = "top 2s cubic-bezier(0.1, 0.7, 0.5, 1)";\n' +
  '              spinner.style.top = `${-(finalDigit + 10) * 20}px`;\n' +
  '        \n' +
  '              setTimeout(() => {\n' +
  '                container.classList.remove("active-digit");\n' +
  '                resolve();\n' +
  '              }, 2000);\n' +
  '            });\n' +
  '          };\n' +
  '        \n' +
  '          const rollAllDigits = async () => {\n' +
  '            if (isRolling) return;\n' +
  '        \n' +
  '            const phoneNumber = [];\n' +
  '            isRolling = true;\n' +
  '            rollBtn.disabled = true;\n' +
  '            submitBtn.disabled = true;\n' +
  '        \n' +
  '            Array.from({ length: 9 }).forEach(() => {\n' +
  '              phoneNumber.push(Math.floor(Math.random() * 10));\n' +
  '            });\n' +
  '        \n' +
  '            for (let i = 0; i < 9; i++) {\n' +
  '              await spinDigit(i, phoneNumber[i]);\n' +
  '            }\n' +
  '        \n' +
  '            phoneInput.value = phoneNumber.join("");\n' +
  '        \n' +
  '            rollBtn.disabled = false;\n' +
  '            submitBtn.disabled = false;\n' +
  '            isRolling = false;\n' +
  '        \n' +
  '            if (!hasRolledOnce) {\n' +
  '              hasRolledOnce = true;\n' +
  '              rollBtn.style.display = "block";\n' +
  '            }\n' +
  '          };\n' +
  '        \n' +
  '          const submitPhone = (e) => {\n' +
  '            if (e) e.preventDefault();\n' +
  '        \n' +
  '            const phoneValue = phoneInput.value;\n' +
  '            if (phoneValue) {\n' +
  '              submitMessageContainer.textContent = `Nailed it! We\'ll give you a ring at ${phoneValue} to discuss your winnings.`;\n' +
  '            } else {\n' +
  '              submitMessageContainer.textContent = "Phone number first!";\n' +
  '            }\n' +
  '          };\n' +
  '        \n' +
  '          rollBtn.addEventListener("click", rollAllDigits);\n' +
  '          submitBtn.addEventListener("click", submitPhone);\n' +
  '          slotMachine.addEventListener("click", rollAllDigits);\n' +
  '          slotMachine.addEventListener("click", () => {\n' +
  '            slotMachine.classList.add("focused");\n' +
  '          });\n' +
  '        \n' +
  '          document.addEventListener("click", (event) => {\n' +
  '            if (!slotMachine.contains(event.target) && event.target !== rollBtn) {\n' +
  '              slotMachine.classList.remove("focused");\n' +
  '            }\n' +
  '          });\n' +
  '        \n' +
  '          // Init\n' +
  '          generateDigitElements();\n' +
  '        \n' +
  '          digitSpinners.forEach((spinner) => {\n' +
  '            spinner.style.top = "20px";\n' +
  '          });\n' +
  '        });\n' +
  '    </script>\n' +
  '</body>\n' +
  '\n' +
  '</html>';
