// Contact form submission API
export async function submitContactForm(formData) {
  try {
    // For now, we'll simulate form submission
    // In production, this would connect to your backend API or contact form service
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // For demo purposes, we'll simulate success after a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Message sent successfully!' });
      }, 1000);
    });
  }
}

// Validate contact form data
export function validateContactForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters long';
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Get contact information
export function getContactInfo() {
  return {
    address: {
      street: 'Kathmandu, Nepal',
      city: 'Kathmandu',
      state: 'Bagmati Province',
      zipCode: '44600',
      country: 'Nepal'
    },
    phone: '+977-1-XXXXXXX',
    email: 'info@jarokilofoundation.org',
    website: 'https://jarokilofoundation.org',
    socialMedia: {
      facebook: 'https://facebook.com/jarokilofoundation',
      twitter: 'https://twitter.com/jarokilofoundation',
      youtube: 'https://youtube.com/jarokilofoundation',
      linkedin: 'https://linkedin.com/company/jarokilofoundation'
    },
    workingHours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: '10:00 AM - 2:00 PM',
      sunday: 'Closed'
    }
  };
}