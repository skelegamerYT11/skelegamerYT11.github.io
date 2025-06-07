document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const loginContainer = document.getElementById('login-container');
    const portfolioContainer = document.getElementById('portfolio-container');
    const loadingBar = document.getElementById('loading-bar');
    const closeBtn = document.getElementById('close-btn');
    const minimizeBtn = document.getElementById('minimize-btn');
    const projectsGrid = document.getElementById('projects-grid');

    loginBtn.addEventListener('click', function() {
        loadingBar.style.width = '100%';
        
        setTimeout(function() {
            loginContainer.style.display = 'none';
            portfolioContainer.style.display = 'block';
            
            const projects = [
                {
                    title: "StealthShell-Win11-AV-Bypass-Digispark",
                    description: "Crea una shell con una chiavetta digispark disattivando l'av d",
                    link: "https://github.com/skelegamerYT11/StealthShell-Win11-AV-Bypass-Digispark"
                },
                {
                    title: "InstaOSINT",
                    description: "permetto di eseguire osint su account instagram",
                    link: "https://github.com/skelegamerYT11/InstaOSINT"
                }
            ];
            
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">Vai al progetto →</a>
                `;
                projectsGrid.appendChild(projectCard);
            });

            addInteractiveConsole();
        }, 2000);
    });
    
    closeBtn.addEventListener('click', function() {
        portfolioContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
        loadingBar.style.width = '0';
    });
    
    minimizeBtn.addEventListener('click', function() {
        alert('Funzionalità di minimizzazione simulata');
    });
    
    const headerTitle = document.querySelector('.header h1');
    headerTitle.classList.add('typewriter');

    function addInteractiveConsole() {
        const consoleSection = document.createElement('div');
        consoleSection.className = 'section console';
        consoleSection.innerHTML = `
            <h2>> CONSOLE</h2>
            <div class="console-output" id="console-output"></div>
            <div class="console-input">
                <span class="console-prompt">root@mrSkele:~$</span>
                <input type="text" id="console-input" autocomplete="off">
            </div>
            <p class="hint">Prova comandi come: help, ls, cat flag.txt, whoami, hack</p>
        `;
        
        document.querySelector('.portfolio-content').appendChild(consoleSection);
        
        const consoleOutput = document.getElementById('console-output');
        const consoleInput = document.getElementById('console-input');
        
        const commands = {
            help: {
                description: "Mostra tutti i comandi disponibili",
                execute: () => {
                    let output = "Comandi disponibili:<br>";
                    for (const cmd in commands) {
                        output += `<span class="command">${cmd}</span> - ${commands[cmd].description}<br>`;
                    }
                    return output;
                }
            },
            ls: {
                description: "Lista dei file",
                execute: () => {
                    return `flag.txt<br>secret.txt<br>projects/<br>contacts/`;
                }
            },
            "cat": {
                description: "Mostra il contenuto di un file",
                execute: (args) => {
                    if (args.length === 0) {
                        return "Specifica un file da leggere (es: cat flag.txt)";
                    }
                    
                    const file = args[0];
                    if (file === "flag.txt") {
                        return "FLAG{MrSkele_Is_The_Real_H4x0r}";
                    } else if (file === "secret.txt") {
                        return "Il vero hacking non è violare sistemi, ma imparare come funzionano.";
                    } else {
                        return `Impossibile leggere il file: ${file}`;
                    }
                }
            },
            whoami: {
                description: "Mostra informazioni sull'utente",
                execute: () => {
                    return "Utente: MrSkele<br>Livello: Hacker Junior<br>Specialità: Cybersecurity, Python, Linux";
                }
            },
            clear: {
                description: "Pulisce la console",
                execute: () => {
                    consoleOutput.innerHTML = '';
                    return '';
                }
            },
            sudo: {
                description: "Esegui come superutente",
                execute: () => {
                    return "sudo: impossibile risolvere il nome host mrSkele: Non sei ancora un hacker abbastanza avanzato";
                }
            },
            hack: {
                description: "Avvia sequenza di hacking",
                execute: () => {
                    let output = "Inizializzazione sequenza di hacking...<br>";
                    output += "> Bypassando firewall... [OK]<br>";
                    output += "> Trovando vulnerabilità... [OK]<br>";
                    output += "> Sfruttando CVE-2023-1234... [OK]<br>";
                    output += "> Ottenendo accesso root... [FAILED]<br><br>";
                    output += "Accesso negato: il sistema ha rilevato l'attacco!";
                    return output;
                }
            }
        };
        
        let commandHistory = [];
        let historyIndex = -1;
        
        consoleInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const commandText = consoleInput.value.trim();
                if (commandText) {
                    commandHistory.push(commandText);
                    historyIndex = commandHistory.length;
                    executeCommand(commandText);
                    consoleInput.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                if (commandHistory.length > 0) {
                    if (historyIndex > 0) {
                        historyIndex--;
                    }
                    consoleInput.value = commandHistory[historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                if (commandHistory.length > 0) {
                    if (historyIndex < commandHistory.length - 1) {
                        historyIndex++;
                        consoleInput.value = commandHistory[historyIndex] || '';
                    } else {
                        historyIndex = commandHistory.length;
                        consoleInput.value = '';
                    }
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const input = consoleInput.value;
                if (input) {
                    const matches = Object.keys(commands).filter(cmd => 
                        cmd.startsWith(input.toLowerCase())
                    );
                    if (matches.length === 1) {
                        consoleInput.value = matches[0];
                    }
                }
            }
        });
        
        function executeCommand(commandText) {
            addToConsole(`<span class="prompt">root@mrSkele:~$</span> ${commandText}`);
            
            const parts = commandText.split(' ');
            const command = parts[0].toLowerCase();
            const args = parts.slice(1);
            
            if (commands[command]) {
                const result = commands[command].execute(args);
                if (result) {
                    addToConsole(result);
                }
            } else {
                addToConsole(`Comando non trovato: ${command}<br>Digita 'help' per la lista dei comandi`);
            }
            
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
        
        function addToConsole(text) {
            consoleOutput.innerHTML += `${text}<br>`;
        }
        
        setTimeout(() => {
            executeCommand('help');
        }, 500);
    }
});
