import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitContactForm, validateContactForm, getContactInfo } from "../api/contact";
import SEO from "../components/SEO";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = getContactInfo();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title={t("contact.title")}
        description={t("contact.subtitle")}
        keywords="Contact, Jaro Kilo Foundation, Nepal, सम्पर्क, जरो किलो प्रतिष्ठान"
      />
      
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4" data-aos="fade-up">
              {t("contact.title")}
            </h1>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {t("contact.subtitle")}
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg" data-aos="fade-right">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 border border-green-400 text-green-700'
                    : 'bg-red-100 border border-red-400 text-red-700'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.subject")} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="What is this about?"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your message here..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8" data-aos="fade-left">
              {/* Contact Details */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl text-red-600">📍</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t("contact.address")}</h3>
                      <p className="text-gray-600">
                        {contactInfo.address.street}<br/>
                        {contactInfo.address.city}, {contactInfo.address.state}<br/>
                        {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-2xl text-red-600">📞</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t("contact.phone")}</h3>
                      <p className="text-gray-600">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-2xl text-red-600">📧</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t("contact.email")}</h3>
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Working Hours</h2>
                
                <div className="space-y-3">
                  {Object.entries(contactInfo.workingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 capitalize">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("footer.followUs")}</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href={contactInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-2xl">📘</span>
                    <span className="font-medium text-blue-700">Facebook</span>
                  </a>
                  
                  <a 
                    href={contactInfo.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    <span className="text-2xl">🐦</span>
                    <span className="font-medium text-sky-700">Twitter</span>
                  </a>
                  
                  <a 
                    href={contactInfo.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <span className="text-2xl">📺</span>
                    <span className="font-medium text-red-700">YouTube</span>
                  </a>
                  
                  <a 
                    href={contactInfo.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-2xl">💼</span>
                    <span className="font-medium text-blue-700">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section (Placeholder) */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-lg" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Us</h2>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-4xl mb-2">🗺️</div>
                <p>Interactive map will be integrated here</p>
                <p className="text-sm">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
