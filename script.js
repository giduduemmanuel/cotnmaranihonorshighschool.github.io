// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeButtons = document.querySelectorAll('.close');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

// Demo user data (in a real app, this would be server-side)
const demoUsers = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'test@test.com', password: 'test123' }
];

// Modal Functions
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModal(loginModal);
    }
    if (e.target === signupModal) {
        closeModal(signupModal);
    }
});

// Form Validation and Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Reset errors
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    
    // Basic validation
    let isValid = true;
    
    if (!email) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError.textContent = 'Email is invalid';
        emailError.style.display = 'block';
        isValid = false;
    }
    
    if (!password) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Check against demo users (in a real app, this would be a server request)
        const user = demoUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Successful login
            alert('Login successful! Redirecting to dashboard...');
            closeModal(loginModal);
            // In a real app, you would redirect to a dashboard page
            // window.location.href = 'dashboard.html';
        } else {
            // Failed login
            passwordError.textContent = 'Invalid email or password';
            passwordError.style.display = 'block';
        }
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const emailError = document.getElementById('signupEmailError');
    const passwordError = document.getElementById('signupPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    // Reset errors
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';
    
    // Basic validation
    let isValid = true;
    
    if (!email) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError.textContent = 'Email is invalid';
        emailError.style.display = 'block';
        isValid = false;
    }
    
    if (!password) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.style.display = 'block';
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // In a real app, you would send this data to your server
        alert('Account created successfully! Please login.');
        closeModal(signupModal);
        openModal(loginModal);
        signupForm.reset();
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    authButtons.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a, .auth-buttons button').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        authButtons.classList.remove('active');
    });
});

// Add active class to mobile menu elements when toggled (for CSS)
hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.contains('active');
    
    if (isActive) {
        navLinks.style.display = 'flex';
        authButtons.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
        authButtons.style.display = 'none';
    }
});

// Initialize mobile menu state
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        navLinks.style.display = 'flex';
        authButtons.style.display = 'flex';
    } else {
        if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
            authButtons.style.display = 'none';
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 992) {
        navLinks.style.display = 'none';
        authButtons.style.display = 'none';
    }
});