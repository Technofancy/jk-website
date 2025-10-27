import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/ui/SEO";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("about")}
        description={t("aboutPage.introduction.text")}
        keywords="Jaro Kilo Foundation, Objectives, Team, Members, About, Nepal, नेपाल"
      />

      <div className="space-y-16 px-4 sm:px-6 lg:px-8 min-h-screen pb-2">
        {/* Short Bar / About Us Title */}
        <motion.section
          className="bg-primary-default text-text-on-primary py-2 my-4 text-center rounded"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold">{t("aboutPage.title")}</h1>
        </motion.section>

        {/* Introduction & Objectives */}
        <motion.section
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left: Introduction + Objectives */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-primary-default mb-4">
              {t("aboutPage.introduction.title")}
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              {t("aboutPage.introduction.text")}
            </p>

            <h3 className="text-2xl font-semibold text-primary-default mb-3">
              {t("aboutPage.objectives.title")}
            </h3>
            <ul className="list-disc list-inside text-text-muted space-y-2">
              {t("aboutPage.objectives.list", { returnObjects: true }).map((obj, idx) => (
                <motion.li key={idx} custom={idx} variants={itemVariants}>
                  {t(obj)}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Facebook iframe */}
          <motion.div
            className="w-full h-fit items-center border-x-2 border-primary-default rounded-md"
            variants={itemVariants}
          >
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJAROKILOPRATISHTHANEPAL&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="340"
              height="500"
              style={{ border: "none", overflow: "hidden", margin: "auto" }}
              scrolling="no"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={true}
            />
          </motion.div>
        </motion.section>

        {/* Founding Members */}
        <motion.section
          className="py-16 mt-14 bg-surface-subtle rounded-lg"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="max-w-6xl mx-auto text-center mb-12 shadow-lg rounded-md py-2 border-y-2 border-primary-default"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold text-primary-default">
              {t("aboutPage.foundingMembers.title")}
            </h2>
            <p className="text-lg text-text-muted mt-2">
              {t("aboutPage.foundingMembers.chairperson")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {t("aboutPage.foundingMembers.members", { returnObjects: true }).map((member, idx) => (
              <motion.div key={idx} custom={idx} variants={itemVariants}>
                <Card className="text-center border-l-4 border-primary-default rounded-l-md">
                  <p className="text-text-default">{t(member)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="bg-primary-default p-8 sm:p-12 rounded-lg text-center shadow-lg text-text-on-primary"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            {t("common.joinUs")}
          </motion.h2>
          <motion.p className="text-lg mb-6" variants={itemVariants}>
            {t("common.joinText")}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Link to="/contact">
              <Button variant="primary">
                {t("common.contact")}
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="secondary">
                {t("common.viewPrograms")}
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}