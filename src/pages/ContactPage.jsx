import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  submitContactForm,
  validateContactForm,
  getContactInfo,
} from "../api/contact";
import JkMap from "../assets/Jk-map.png";

import { FaFacebook, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import SEO from "../components/ui/SEO";
import { useTranslation } from "react-i18next";
import Button from "../components/ui/Button";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = getContactInfo();
  const mapUrl = "https://maps.app.goo.gl/T2ZCocV1w9iBUv3B6";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setSubmitStatus({ type: "success", message: result.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Failed to send message",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={t("contact")}
        description={t("contactPage.subtitle")}
        keywords="Contact, Jaro Kilo Foundation, Nepal, सम्पर्क, जरो किलो प्रतिष्ठान"
      />

      <div className="space-y-16 text-text-default pb-8">
        <motion.section
          className="bg-primary-default text-text-on-primary py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              {t("contactPage.title")}
            </motion.h1>
            <motion.p
              className="text-xl max-w-3xl mx-auto"
              variants={itemVariants}
            >
              {t("contactPage.subtitle")}
            </motion.p>
          </div>
        </motion.section>

        <motion.div
          className="max-w-6xl mx-auto px-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="bg-surface-default p-8 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold mb-6 text-text-primary">
                Send us a Message
              </h2>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-success-light border border-success-dark text-success-dark"
                      : "bg-error-light border border-error-dark text-error-dark"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-secondary mb-2"
                  >
                    {t("contact.form.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-default focus:border-transparent ${
                      errors.name
                        ? "border-error-dark"
                        : "border-border-default"
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error-dark">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-secondary mb-2"
                  >
                    {t("contact.form.email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-default focus:border-transparent ${
                      errors.email
                        ? "border-error-dark"
                        : "border-border-default"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-dark">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-text-secondary mb-2"
                  >
                    {t("contact.form.subject")} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-default focus:border-transparent ${
                      errors.subject
                        ? "border-error-dark"
                        : "border-border-default"
                    }`}
                    placeholder="What is this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-error-dark">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-secondary mb-2"
                  >
                    {t("contact.form.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-default focus:border-transparent ${
                      errors.message
                        ? "border-error-dark"
                        : "border-border-default"
                    }`}
                    placeholder="Your message here..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-error-dark">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  variant="primary"
                >
                  {isSubmitting
                    ? t("contact.form.sending")
                    : t("contact.form.send")}
                </Button>
              </form>
            </motion.div>

            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="bg-primary-default p-8 rounded-lg shadow-lg text-text-on-primary">
                <h2 className="text-2xl font-bold mb-6">
                  {t("contactPage.subtitle")}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">
                      <FaLocationDot />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {t("contactPage.address")}
                      </h3>
                      <p className="text-text-on-primary-muted">
                        {t("contactPage.addressDetails.street")},{" "}
                        {t("contactPage.addressDetails.city")}
                        <br />
                        {t("contactPage.addressDetails.district")},{" "}
                        {t("contactPage.addressDetails.state")}
                        <br />
                        {t("contactPage.addressDetails.country")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">
                      <FaPhone />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {t("contactPage.phone")}
                      </h3>
                      <p className="text-text-on-primary-muted">
                        {t("contactPage.phoneDetails")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">
                      <IoMdMail />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t("contactPage.email")}</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-text-on-primary hover:text-text-on-primary-muted transition-colors"
                      >
                        {t("contactPage.emailDetails")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-default p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-text-primary">
                  {t("footer.followUs")}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <a
                    href={contactInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-surface-sunken rounded-lg hover:bg-surface-hover transition-colors"
                  >
                    <span className="text-2xl text-primary-default">
                      <FaFacebook />
                    </span>
                    <span className="font-medium text-primary-default">
                      Facebook
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 bg-surface-default p-8 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 text-text-primary">
              {t("common.findus")}
            </h2>
            <div className="bg-surface-sunken rounded-lg flex flex-col items-center justify-start overflow-hidden">
              <div className="text-center text-text-secondary w-full p-4">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-sm mb-4">
                  {t("contactPage.addressDetails.district")}
                </p>
                <a href={mapUrl} target="_blank" rel="noreferrer">
                  <img
                    src={JkMap}
                    alt="Map to Jaro Kilo Pratishthan, near Nachghar"
                    className="w-full h-96 object-contain cursor-pointer rounded-md"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}