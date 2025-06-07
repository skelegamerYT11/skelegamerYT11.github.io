// Simulate loading delay (3 seconds)
window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        }, 1000);
    }, 3000);
});

// Typewriter effect for commands
const typedElements = document.querySelectorAll('.typed-cmd, .glitch-link');
typedElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
});
