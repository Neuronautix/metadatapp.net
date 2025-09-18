document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('presignupForm');
    const submitButton = document.getElementById('submit-button');
    const formWrapper = document.getElementById('form-wrapper');
    const successPanel = document.getElementById('success-panel');
    const errorBanner = document.getElementById('form-error-banner');

    const emailField = document.getElementById('email');
    const reasonField = document.getElementById('reason');
    const reasonCounter = document.getElementById('reason-counter');

    const fields = {
        email: {
            validate: (value) => {
                if (!value) return 'Email is required.';
                const emailRegex = /^(([^<>()[\\]\\.,;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;
                if (value.length > 254) return 'Email is too long.';
                if (!emailRegex.test(String(value).toLowerCase())) return 'Please enter a valid email address.';
                return null;
            }
        },
        role: {
            validate: (value) => {
                const validRoles = ['researcher', 'pi', 'student', 'technician', 'vendor', 'other'];
                if (!validRoles.includes(value)) return 'Please select a valid role.';
                return null;
            }
        },
        reason: {
            validate: (value) => {
                if (value.length > 1000) return 'Your reason cannot exceed 1000 characters.';
                return null;
            }
        }
    };

    // --- Optional Niceties ---
    // Prefill email from localStorage
    const savedEmail = localStorage.getItem('mapp-presignup-email');
    if (savedEmail) {
        emailField.value = savedEmail;
    }

    // Check for success query param on load
    if (new URLSearchParams(window.location.search).get('ok') === '1') {
        showSuccessPanel();
    }

    // --- Event Listeners ---
    form.addEventListener('submit', handleFormSubmit);

    reasonField.addEventListener('input', () => {
        const count = reasonField.value.length;
        reasonCounter.textContent = `${count} / 1000`;
        if (count > 1000) {
            reasonCounter.style.color = 'var(--error-color)';
        } else {
            reasonCounter.style.color = 'var(--muted-color)';
        }
    });

    // --- Core Functions ---
    async function handleFormSubmit(event) {
        event.preventDefault();
        if (submitButton.disabled) return;

        clearAllErrors();
        const isValid = validateAllFields();
        const honeypotValue = document.getElementById('website').value;

        if (!isValid || honeypotValue) {
            if (honeypotValue) console.warn('Honeypot field filled. Blocking submission.');
            return;
        }

        setLoading(true);

        const formData = new FormData(form);
        const payload = {
            email: formData.get('email').toLowerCase().trim(),
            role: formData.get('role'),
            reason: formData.get('reason').trim(),
            source: 'mapp-presignup',
            userAgent: navigator.userAgent,
            pageUrl: window.location.href
        };

        try {
            const response = await fetch(form.dataset.endpoint, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                localStorage.setItem('mapp-presignup-email', payload.email);
                showSuccessPanel();
                rateLimitForm();
            } else if (response.status === 409 || response.status === 422) {
                showError('email', 'You’re already on the list or the email looks invalid.');
                setLoading(false);
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            showBannerError('Something went wrong on our end. Please try again later.');
            setLoading(false);
        }
    }

    function validateAllFields() {
        let allValid = true;
        for (const fieldName in fields) {
            const input = document.getElementById(fieldName);
            const error = fields[fieldName].validate(input.value);
            if (error) {
                showError(fieldName, error);
                allValid = false;
            }
        }
        return allValid;
    }

    // --- UI Functions ---
    function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.querySelector('.spinner').hidden = !isLoading;
        submitButton.querySelector('.button-text').hidden = isLoading;
    }

    function showSuccessPanel() {
        formWrapper.hidden = true;
        successPanel.hidden = false;
    }

    function rateLimitForm() {
        let seconds = 60;
        submitButton.disabled = true;
        const originalText = submitButton.querySelector('.button-text').textContent;
        
        const interval = setInterval(() => {
            submitButton.querySelector('.button-text').textContent = `Try again in ${seconds--}s`;
            if (seconds < 0) {
                clearInterval(interval);
                submitButton.disabled = false;
                submitButton.querySelector('.button-text').textContent = originalText;
            }
        }, 1000);
    }

    function showError(fieldName, message) {
        const input = document.getElementById(fieldName);
        const errorEl = document.getElementById(`${fieldName}-error`);
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = message;
    }
    
    function showBannerError(message) {
        errorBanner.textContent = message;
        errorBanner.hidden = false;
    }

    function clearAllErrors() {
        errorBanner.hidden = true;
        for (const fieldName in fields) {
            const input = document.getElementById(fieldName);
            const errorEl = document.getElementById(`${fieldName}-error`);
            input.setAttribute('aria-invalid', 'false');
            errorEl.textContent = '';
        }
    }
});
