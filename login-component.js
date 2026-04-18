/**
 * Login Component for Legend Card Hub
 * 
 * This script creates a reusable login modal that can be included in all pages.
 * It handles login/signup functionality and user authentication.
 */

class LoginComponent {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in (from localStorage)
        this.checkLoginStatus();
        
        // Create login modal HTML
        this.createLoginModal();
        
        // Add event listeners
        this.addEventListeners();
        
        // Update UI based on login status
        this.updateUI();
    }

    checkLoginStatus() {
        // Check localStorage for login status
        const userData = localStorage.getItem('legendCardHub_user');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
            } catch (e) {
                console.error('Error parsing user data:', e);
                localStorage.removeItem('legendCardHub_user');
            }
        }
    }

    createLoginModal() {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.id = 'login-modal-container';
        modalContainer.classList.add('login-modal-container');
        modalContainer.style.display = 'none';
        
        // Create modal HTML
        modalContainer.innerHTML = `
            <div class="login-modal">
                <div class="login-close-btn">&times;</div>
                <div class="pokemon-header">
                    <br><div class="pokemon-logo">Legend Card Hub</div>
                </div>
                
                <div class="toggle-container">
                    <button class="toggle-btn active" id="login-toggle">Login</button>
                    <button class="toggle-btn" id="signup-toggle">Sign Up</button>
                    <div class="toggle-slider"></div>
                </div>
                
                <div id="login-form-container">
                    <h2 class="form-title">Welcome Back, Trainer!</h2>
                    <div id="login-error" class="error-message"></div>
                    <form id="login-form">
                        <div class="form-group">
                            <input type="text" id="login-username" class="form-input" placeholder="Username or Email" required>
                        </div>
                        <div class="form-group password-container">
                            <input type="password" id="login-password" class="form-input" placeholder="Password" required>
                            <button type="button" class="password-toggle" id="login-password-toggle">👁️</button>
                        </div>
                        <button type="submit" class="submit-btn">Login</button>
                        <div class="forgot-password">
                            <a href="#" id="forgotPasswordLink">Forgot Password?</a>
                        </div>
                    </form>
                </div>
                
                <div id="signup-form-container" style="display: none;">
                    <h2 class="form-title">Join the Adventure!</h2>
                    <div id="signup-error" class="error-message"></div>
                    <form id="signup-form">
                        <div class="form-group">
                            <input type="text" id="signup-username" class="form-input" placeholder="Choose Username" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="signup-email" class="form-input" placeholder="Email Address" required>
                        </div>
                        <div class="form-group password-container">
                            <input type="password" id="signup-password" class="form-input" placeholder="Create Password" required>
                            <button type="button" class="password-toggle" id="signup-password-toggle">👁️</button>
                        </div>
                        <div class="form-group password-container">
                            <input type="password" id="signup-confirm-password" class="form-input" placeholder="Confirm Password" required>
                            <button type="button" class="password-toggle" id="signup-confirm-password-toggle">👁️</button>
                        </div>
                        <button type="submit" class="submit-btn">Sign Up</button>
                    </form>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(modalContainer);
    }

    addEventListeners() {
        // Get elements
        const loginModal = document.getElementById('login-modal-container');
        const closeBtn = document.querySelector('.login-close-btn');
        const loginToggle = document.getElementById('login-toggle');
        const signupToggle = document.getElementById('signup-toggle');
        const toggleSlider = document.querySelector('.toggle-slider');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const loginFormContainer = document.getElementById('login-form-container');
        const signupFormContainer = document.getElementById('signup-form-container');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        const loginPasswordToggle = document.getElementById('login-password-toggle');
        const signupPasswordToggle = document.getElementById('signup-password-toggle');
        const signupConfirmPasswordToggle = document.getElementById('signup-confirm-password-toggle');
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        
        // Toggle between login and signup forms
        loginToggle.addEventListener('click', () => {
            loginToggle.classList.add('active');
            signupToggle.classList.remove('active');
            toggleSlider.classList.remove('signup');
            loginFormContainer.style.display = 'block';
            signupFormContainer.style.display = 'none';
        });
        
        signupToggle.addEventListener('click', () => {
            signupToggle.classList.add('active');
            loginToggle.classList.remove('active');
            toggleSlider.classList.add('signup');
            signupFormContainer.style.display = 'block';
            loginFormContainer.style.display = 'none';
        });
        
        // Close modal
        closeBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
        
        // Toggle password visibility
        loginPasswordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility('login-password', loginPasswordToggle);
        });
        
        signupPasswordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility('signup-password', signupPasswordToggle);
        });
        
        signupConfirmPasswordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility('signup-confirm-password', signupConfirmPasswordToggle);
        });
        
        // Login form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // Signup form submission
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });
        
        // Forgot password
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('🔍 Don\'t worry! We\'ll help you recover your credentials. (This is a demo - add your actual password reset logic here)');
        });
        
        // Login button click
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                loginModal.style.display = 'flex';
            });
        }
        
        // Logout button click
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    togglePasswordVisibility(inputId, toggleBtn) {
        const passwordInput = document.getElementById(inputId);
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.textContent = '🔒';
        } else {
            passwordInput.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    }

    handleLogin() {
        const loginInput = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errorDisplay = document.getElementById('login-error');
        
        // Hide previous error
        errorDisplay.style.display = 'none';
        
        if (!loginInput || !password) {
            this.showError('login', 'Please enter both username/email and password.');
            return;
        }

        // Email format validation (if input looks like an email)
        if (loginInput.includes('@')) {
            if (!this.validateEmail(loginInput)) {
                this.showError('login', '⚠️ Incorrect email format! Check your @ and dots.');
                return;
            }
        }

        // Check against mock database (localStorage)
        const storedUsers = JSON.parse(localStorage.getItem('legendCardHub_all_users') || '[]');
        const user = storedUsers.find(u => u.username === loginInput || u.email === loginInput);

        if (user) {
            if (user.password === password) {
                // Successful login
                this.isLoggedIn = true;
                this.currentUser = {
                    username: user.username,
                    email: user.email,
                    joinDate: user.joinDate || new Date().toISOString()
                };
                
                // Save current user
                localStorage.setItem('legendCardHub_user', JSON.stringify(this.currentUser));
                this.updateUI();
                document.getElementById('login-modal-container').style.display = 'none';
                this.createSparkles();
                setTimeout(() => {
                    alert(`🌟 Welcome back, ${this.currentUser.username}! Your adventure continues!`);
                }, 500);
            } else {
                // Wrong password
                this.showError('login', '❌ Wrong password! Try again, Trainer.');
            }
        } else {
            // For demo: if user doesn't exist, we can either say "user not found" 
            // OR let them log in with any password for now (as it was before)
            // But since the user wants to identify "wrong password", let's assume a default demo user
            if (loginInput === 'ash' || loginInput === 'ash@pallet.com') {
                if (password === 'pikachu') {
                    // Success for demo user
                    this.isLoggedIn = true;
                    this.currentUser = { username: 'Ash Ketchum', email: 'ash@pallet.com', joinDate: new Date().toISOString() };
                    localStorage.setItem('legendCardHub_user', JSON.stringify(this.currentUser));
                    this.updateUI();
                    document.getElementById('login-modal-container').style.display = 'none';
                    this.createSparkles();
                } else {
                    this.showError('login', '❌ Wrong password for Ash! Is it his favorite Pokémon?');
                }
            } else {
                // If not demo user and not in localStorage, let's treat it as a generic "User not found" or just let them in if we want to be lenient
                // Given the request, let's be strict.
                this.showError('login', '👤 Trainer not found! Did you sign up yet?');
            }
        }
    }

    handleSignup() {
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const errorDisplay = document.getElementById('signup-error');
        
        // Hide previous error
        errorDisplay.style.display = 'none';

        if (!username || !email || !password || !confirmPassword) {
            this.showError('signup', 'Please fill in all fields.');
            return;
        }

        // Email format validation
        if (!this.validateEmail(email)) {
            this.showError('signup', '⚠️ Invalid email address! Please enter a valid email.');
            return;
        }

        // Validate passwords match
        if (password !== confirmPassword) {
            this.showError('signup', 'Passwords do not match!');
            return;
        }

        if (password.length < 6) {
            this.showError('signup', 'Password must be at least 6 characters.');
            return;
        }
        
        // Check if user already exists
        const storedUsers = JSON.parse(localStorage.getItem('legendCardHub_all_users') || '[]');
        if (storedUsers.some(u => u.username === username || u.email === email)) {
            this.showError('signup', 'Username or email already registered!');
            return;
        }

        // Save new user to "database"
        const newUser = {
            username: username,
            email: email,
            password: password,
            joinDate: new Date().toISOString()
        };
        storedUsers.push(newUser);
        localStorage.setItem('legendCardHub_all_users', JSON.stringify(storedUsers));

        // Auto-login
        this.isLoggedIn = true;
        this.currentUser = {
            username: username,
            email: email,
            joinDate: newUser.joinDate
        };
        
        localStorage.setItem('legendCardHub_user', JSON.stringify(this.currentUser));
        this.updateUI();
        document.getElementById('login-modal-container').style.display = 'none';
        this.createSparkles();
        setTimeout(() => {
            alert(`🌟 Congratulations, ${username}! Your Trainer journey begins now!`);
        }, 500);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(formType, message) {
        const errorDisplay = document.getElementById(`${formType}-error`);
        if (errorDisplay) {
            errorDisplay.textContent = message;
            errorDisplay.style.display = 'block';
            
            // Add a slight delay then shake if already displayed
            errorDisplay.style.animation = 'none';
            errorDisplay.offsetHeight; // trigger reflow
            errorDisplay.style.animation = null;
        }
    }

    handleLogout() {
        // Clear user data
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('legendCardHub_user');
        
        // Update UI
        this.updateUI();
        
        // Show logout message
        alert('You have been logged out. See you next time!');
    }

    updateUI() {
        // Update login/logout buttons
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userDisplay = document.getElementById('user-display');
        
        if (this.isLoggedIn && this.currentUser) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (userDisplay) {
                userDisplay.style.display = 'inline-block';
                userDisplay.textContent = `Welcome, ${this.currentUser.username}!`;
            }
        } else {
            // User is logged out
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userDisplay) userDisplay.style.display = 'none';
        }
    }

    createSparkles() {
        const colors = ['#FFD93D', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    animation: sparkleFloat 2s ease-out forwards;
                `;
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes sparkleFloat {
                        0% { transform: translateY(0) scale(0); opacity: 1; }
                        50% { transform: translateY(-100px) scale(1); opacity: 1; }
                        100% { transform: translateY(-200px) scale(0); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                    style.remove();
                }, 2000);
            }, i * 100);
        }
    }
}

// Initialize login component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create login component instance
    window.loginComponent = new LoginComponent();
});