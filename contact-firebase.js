// Import Firebase
import { db, collection, addDoc } from './firebase-config.js';

// SEND MESSAGE FUNCTION
window.sendMessage = async function() {

    // Get all values from form
    const name = document.querySelector('.contact-form input[type="text"]').value.trim();
    const email = document.querySelector('.contact-form input[type="email"]').value.trim();
    const phone = document.querySelector('.contact-form input[type="tel"]').value.trim();
    const subject = document.querySelector('.contact-form select').value;
    const message = document.querySelector('.contact-form textarea').value.trim();

    // Validate required fields
    if (!name || !email || !message) {
        alert('Please fill in all required fields!');
        return;
    }

    // Change button to loading state
    const btn = document.querySelector('.contact-form .btn-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
        // Save to Firebase
        await addDoc(collection(db, 'messages'), {
            name,
            email,
            phone,
            subject,
            message,
            status: 'Unread',
            sentAt: new Date().toISOString()
        });

        // Success!!
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
        btn.style.background = '#2e7d32';
        btn.style.color = 'white';

        // Clear form
        document.querySelector('.contact-form input[type="text"]').value = '';
        document.querySelector('.contact-form input[type="email"]').value = '';
        document.querySelector('.contact-form input[type="tel"]').value = '';
        document.querySelector('.contact-form textarea').value = '';

        // Show success popup
        showContactSuccess();

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 5000);

    } catch (error) {
        console.error('Error sending message:', error);
        btn.innerHTML = '<i class="fas fa-times"></i> Error! Please Try Again';
        btn.style.background = '#e53935';
        btn.style.color = 'white';
        btn.disabled = false;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    }
}

// Show success popup
function showContactSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us! We will get back to you within 24 hours.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn-primary">Close</button>
        </div>
    `;
    document.body.appendChild(successDiv);
}