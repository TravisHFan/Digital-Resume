document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                // Collect form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());
                
                // Send to backend
                const response = await fetch('http://localhost:3001/api/contact/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    // Show success message
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    // Show error message
                    alert('Error: ' + (result.error || 'Something went wrong. Please try again.'));
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('Network error. Please check your connection and try again.');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
});