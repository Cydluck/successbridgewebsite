// Import Firebase
import { db, collection, addDoc } from './firebase-config.js';

// Initialize EmailJS
emailjs.init("aAc_NM94Zfcadvccq");

// SUBMIT FORM FUNCTION
window.submitForm = async function() {

    const firstName = document.querySelectorAll('.form-group input[type="text"]')[0].value.trim();
    const lastName = document.querySelectorAll('.form-group input[type="text"]')[1].value.trim();
    const email = document.querySelector('.form-group input[type="email"]').value.trim();
    const phone = document.querySelector('.form-group input[type="tel"]').value.trim();
    const dob = document.querySelector('input[type="date"]').value;
    const gender = document.querySelectorAll('select')[0].value;
    const address = document.querySelectorAll('.form-group input[type="text"]')[2].value.trim();
    const educationLevel = document.querySelectorAll('select')[1].value;
    const institution = document.querySelectorAll('.form-group input[type="text"]')[3].value.trim();
    const graduationYear = document.querySelectorAll('.form-group input[type="text"]')[4].value.trim();
    const englishLevel = document.querySelectorAll('select')[2].value;
    const preferredCountry = document.querySelectorAll('select')[3].value;
    const preferredCourse = document.querySelectorAll('.form-group input[type="text"]')[5].value.trim();
    const startDate = document.querySelectorAll('select')[4].value;
    const servicesNeeded = document.querySelectorAll('select')[5].value;
    const additionalInfo = document.querySelector('textarea').value.trim();
    const agreed = document.querySelector('input[type="checkbox"]').checked;

    if (!firstName || !lastName || !email || !phone || !address || !preferredCountry || !preferredCourse) {
        alert('Please fill in all required fields!');
        return;
    }

    if (!agreed) {
        alert('Please agree to the terms and conditions!');
        return;
    }

    const btn = document.querySelector('.btn-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    btn.disabled = true;

    try {
        // Save to Firebase
        await addDoc(collection(db, 'students'), {
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            address,
            educationLevel,
            institution,
            graduationYear,
            englishLevel,
            preferredCountry,
            preferredCourse,
            startDate,
            servicesNeeded,
            additionalInfo,
            status: 'New',
            submittedAt: new Date().toISOString()
        });

        // Send Email Notification
        await emailjs.send("service_e8e0k9k", "template_0mr8lo8", {
            student_name: `${firstName} ${lastName}`,
            student_email: email,
            student_phone: phone,
            preferred_country: preferredCountry,
            preferred_course: preferredCourse,
            services_needed: servicesNeeded,
            submission_date: new Date().toLocaleDateString()
        });

        // Success!!
        btn.innerHTML = '<i class="fas fa-check"></i> Application Submitted Successfully!';
        btn.style.background = '#2e7d32';
        btn.style.color = 'white';
        showSuccessMessage();

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 5000);

    } catch (error) {
        console.error('Error:', error);
        btn.innerHTML = '<i class="fas fa-times"></i> Error! Please Try Again';
        btn.style.background = '#e53935';
        btn.style.color = 'white';
        btn.disabled = false;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    }
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Application Submitted Successfully!</h3>
            <p>Thank you for applying! Our team will contact you within 24 hours.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn-primary">Close</button>
        </div>
    `;
    document.body.appendChild(successDiv);
}