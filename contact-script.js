// Initialize EmailJS with your Public Key
console.log('Initializing EmailJS...');
emailjs.init('hUfdjPNmgfS5De79b');
console.log('EmailJS initialized successfully!');

// Get form and success message elements
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitButton = contactForm.querySelector('.btn-submit');

console.log('Form elements loaded:', { contactForm, successMessage, submitButton });

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted!');

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    console.log('Form data:', { fullName, email, subject, message });

    // Validate all fields are filled
    if (!fullName || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Disable button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    console.log('Button disabled and set to "Sending..."');

    // Create the email template parameters
    const templateParams = {
        from_name: fullName,
        from_email: email,
        subject: subject,
        message: message
    };

    console.log('Template params:', templateParams);
    console.log('Sending with Service ID: service_tfkaseb');
    console.log('Sending with Template ID: template_nu6bzn2');

    // Send email using EmailJS
    emailjs.send('service_tfkaseb', 'template_nu6bzn2', templateParams)
        .then(function(response) {
            // Success - show success message
            console.log('✓ Email sent successfully!', response);
            
            // Show success message
            successMessage.style.display = 'block';
            console.log('Success message displayed');

            // Reset the form
            contactForm.reset();
            console.log('Form reset');

            // Hide success message after 4 seconds
            setTimeout(function() {
                successMessage.style.display = 'none';
                
                // Re-enable button after success message hides
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                console.log('Button re-enabled');
            }, 4000);

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(function(error) {
            // Error - show error message
            console.error('✗ Error sending email:', error);
            console.error('Error status:', error.status);
            console.error('Error text:', error.text);
            
            alert('Failed to send message.\n\nError: ' + (error.text || error.message || 'Unknown error'));
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            console.log('Button re-enabled after error');
        });
});