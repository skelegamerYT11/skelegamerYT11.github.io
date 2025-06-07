// Simulate a terminal login sequence
document.addEventListener('DOMContentLoaded', () => {
    const loginLine = document.getElementById('login-line');
    const passwordLine = document.getElementById('password-line');
    const accessLine = document.getElementById('access-line');
    const pressEnter = document.getElementById('press-enter');

    // Step 1: Show "login: MrSkele" (typed)
    setTimeout(() => {
        loginLine.textContent = 'login: ';
        typeText('MrSkele', loginLine).then(() => {
            // Step 2: Show password field after 0.5s
            setTimeout(() => {
                passwordLine.classList.remove('hidden');
                passwordLine.textContent = 'password: ';
                typeText('************', passwordLine).then(() => {
                    // Step 3: Show access granted after 1s
                    setTimeout(() => {
                        accessLine.classList.remove('hidden');
                        // Step 4: Show "Press ENTER" after 1.5s
                        setTimeout(() => {
                            pressEnter.classList.remove('hidden');
                            // Listen for ENTER key to proceed
                            document.addEventListener('keydown', (e) => {
                                if (e.key === 'Enter') {
                                    document.getElementById('loading-screen').style.opacity = '0';
                                    setTimeout(() => {
                                        document.getElementById('loading-screen').style.display = 'none';
                                        document.getElementById('content').style.display = 'block';
                                    }, 500);
                                }
                            });
                        }, 1500);
                    }, 1000);
                });
            }, 500);
        });
    }, 2000);
});

// Helper function to simulate typing
function typeText(text, element, speed = 100) {
    return new Promise((resolve) => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                resolve();
            }
        }, speed);
    });
}
