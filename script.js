document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-menu li a').forEach(item => {
        item.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.getElementById('downloadResume').addEventListener('click', function(e) {
        e.preventDefault();
        
        const link = document.createElement('a');
        link.href = "images/DostMuhammadkhan Resume.pdf"; 
        link.download = 'DostMuhammadkhan.pdf';
        
        alert('Resume download started!');
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable button during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        console.log(formData);
        
        // Send data to email service
        // Replace 'YOUR_EMAIL_ENDPOINT' with your actual email service endpoint
        fetch('https://formsubmit.co/482ae1b1283bc9c24a1f894359fd0e9c', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)

        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            formStatus.textContent = 'Your message has been sent successfully!';
            formStatus.className = 'form-status success';
            
            // Reset form
            console.log(data);
            
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            formStatus.textContent = 'There was an error sending your message. Please try again later.';
            formStatus.className = 'form-status error';
        })
        .finally(() => {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Auto-hide status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    });
});