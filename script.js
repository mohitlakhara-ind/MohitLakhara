
// Typing effect for the span
const typingText = document.getElementById("typing-text");
const textArray = ["Web Developer", "UI/UX Designer", "JavaScript Enthusiast"];
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textIndex].length) {
        typingText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100); // Typing speed
    } else {
        setTimeout(deleteText, 1000); // Delay before deleting
    }
}

function deleteText() {
    if (charIndex > 0) {
        typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, 50); // Deleting speed
    } else {
        textIndex = (textIndex + 1) % textArray.length; // Move to the next text
        setTimeout(type, 500); // Delay before typing next text
    }
}

// Start the typing effect
window.onload = type;

// Function to reveal the hero content on scroll
function revealOnScroll() {
    const heroContent = document.getElementById('heroContent');
    const heroSection = document.getElementById('hero');

    // Get the position of the hero content relative to the viewport
    const rect = heroSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // If the top of the hero content is within the viewport, make it visible
    if (rect.top <= viewportHeight * 0.75) {
        heroContent.classList.add('visible');
    }
}

// Listen for the scroll event and call the function
window.addEventListener('scroll', revealOnScroll);

// Call the function once when the page loads, in case the section is already visible
revealOnScroll();

// Check if the user has a saved theme preference
