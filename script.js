/**
 * The JavaScript code snippet includes functionality for interactive hero section tilt effect,
 * navigation section switching, dark mode toggle, social panel interaction, and smooth scrolling for
 * navigation links.
 * @param index - The `index` parameter in the provided code refers to the index of a section within
 * the `sections` NodeList. This index is used to determine which section should be displayed or
 * targeted based on user interaction, such as clicking on a navigation link or using arrow keys for
 * navigation. The `showSection`
 */

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

