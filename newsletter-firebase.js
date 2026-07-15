// Import Firebase
import { db, collection, addDoc, getDocs } from './firebase-config.js';

// NEWSLETTER SUBSCRIBE FUNCTION
window.subscribeNewsletter = async function(buttonElement) {

    // Find the input near the clicked button
    const input = buttonElement.previousElementSibling;
    const email = input.value.trim();

    // Validate email
    if (!email) {
        alert('Please enter your email address!');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address!');
        return;
    }

    // Change button to loading
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    buttonElement.disabled = true;

    try {
        // Check if email already exists
        const snapshot = await getDocs(collection(db, 'newsletter'));
        let alreadySubscribed = false;

        snapshot.forEach(doc => {
            if (doc.data().email === email) {
                alreadySubscribed = true;
            }
        });

        if (alreadySubscribed) {
            alert('This email is already subscribed!');
            buttonElement.innerHTML = originalText;
            buttonElement.disabled = false;
            return;
        }

        // Save to Firebase
        await addDoc(collection(db, 'newsletter'), {
            email,
            subscribedAt: new Date().toISOString()
        });

        // Success!!
        buttonElement.innerHTML = '✓ Subscribed!';
        buttonElement.style.background = '#2e7d32';
        buttonElement.style.color = 'white';
        input.value = '';

        setTimeout(() => {
            buttonElement.innerHTML = originalText;
            buttonElement.style.background = '';
            buttonElement.style.color = '';
            buttonElement.disabled = false;
        }, 4000);

    } catch (error) {
        console.error('Error subscribing:', error);
        alert('Something went wrong! Please try again.');
        buttonElement.innerHTML = originalText;
        buttonElement.disabled = false;
    }
}