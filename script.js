
// // Typing effect for the span
// const typingText = document.getElementById("typing-text");
// const textArray = ["Web Developer", "UI/UX Designer", "JavaScript Enthusiast"];
// let textIndex = 0;
// let charIndex = 0;

// function type() {
//     if (charIndex < textArray[textIndex].length) {
//         typingText.textContent += textArray[textIndex].charAt(charIndex);
//         charIndex++;
//         setTimeout(type, 100); // Typing speed
//     } else {
//         setTimeout(deleteText, 1000); // Delay before deleting
//     }
// }

// function deleteText() {
//     if (charIndex > 0) {
//         typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
//         charIndex--;
//         setTimeout(deleteText, 50); // Deleting speed
//     } else {
//         textIndex = (textIndex + 1) % textArray.length; // Move to the next text
//         setTimeout(type, 500); // Delay before typing next text
//     }
// }

// // Start the typing effect
// window.onload = type;

// // Function to reveal the hero content on scroll
// function revealOnScroll() {
//     const heroContent = document.getElementById('heroContent');
//     const heroSection = document.getElementById('hero');

//     // Get the position of the hero content relative to the viewport
//     const rect = heroSection.getBoundingClientRect();
//     const viewportHeight = window.innerHeight;

//     // If the top of the hero content is within the viewport, make it visible
//     if (rect.top <= viewportHeight * 0.75) {
//         heroContent.classList.add('visible');
//     }
// }

// // Listen for the scroll event and call the function
// window.addEventListener('scroll', revealOnScroll);

// // Call the function once when the page loads, in case the section is already visible
// revealOnScroll();

// Check if the user has a saved theme preference

const heroSection = document.querySelector('.hero-section');
const innerElements = heroSection.querySelectorAll('p, h1, h2, .explore, .triangle');

heroSection.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const { offsetWidth, offsetHeight } = heroSection;
    const x = (clientX / offsetWidth) * 4 - 1;
    const y = (clientY / offsetHeight) * 4 - 1;

    const tiltX = y * 10; // Control the tilt amount on the Y-axis
    const tiltY = -x * 10; // Control the tilt amount on the X-axis

    innerElements.forEach((element) => {
        element.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
});

heroSection.addEventListener('mouseleave', () => {
    innerElements.forEach((element) => {
        element.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
    });
});



// Select all navigation links and sections
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.none');

// Keep track of the current active section
let currentIndex = 0;

// Function to show the section based on the index
function showSection(index) {
    // Ensure the index is within bounds
    if (index < 0) {
        index = sections.length - 1; // Loop back to last section
    } else if (index >= sections.length) {
        index = 0; // Loop back to first section
    }

    // Remove 'active' class from all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Add 'active' class to the targeted section
    sections[index].classList.add('active');

    // Update URL using hash without reloading
    const targetId = sections[index].id;
    window.location.hash = targetId;

    // Update the current index
    currentIndex = index;
}

// Add click event to each link
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(index); // Show section based on clicked link
    });
});

// Handle browser back/forward buttons
window.onpopstate = function (event) {
    if (event.state) {
        const targetId = event.state.page;
        const targetIndex = Array.from(sections).findIndex(section => section.id === targetId);
        showSection(targetIndex);
    }
};

// Listen for hash change (for when user reloads or navigates directly with hash)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    const targetIndex = Array.from(sections).findIndex(section => section.id === hash);
    if (targetIndex >= 0) {
        showSection(targetIndex);
    }
});

// Listen for arrow key events
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        // Go to the next section (increment index)
        showSection(currentIndex + 1);
    } else if (event.key === 'ArrowLeft') {
        // Go to the previous section (decrement index)
        showSection(currentIndex - 1);
    }
});

// Check the initial hash when the page loads
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const targetIndex = Array.from(sections).findIndex(section => section.id === hash);
    if (targetIndex >= 0) {
        showSection(targetIndex);
    }
});

// Toggle dark mode
const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
document.body.classList.toggle('dark');
});

// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
social_panel_container.classList.remove('visible')
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

