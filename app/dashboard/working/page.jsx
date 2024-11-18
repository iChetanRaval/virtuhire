// HowItWorks.jsx
"use client"
// HowItWorks.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={styles.container}
    >
      <motion.h1
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
        className='text-2xl font-extrabold text-gray-900 mb-4'>
        How It Works
      </motion.h1>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Learn how to use the platform to conduct an interview, record answers, and view evaluations.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={styles.videoContainer}
      >
        {/* Replace the src with the URL of your actual demo video */}
        <video width="600" controls style={styles.video}>
          <source
            src="https://drive.google.com/file/d/18Q5E18baothy53pF_OX0kSoR-3GTI8HU/view?usp=drive_link"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={styles.stepsContainer}
      >
        <h2>Steps to Use the Platform</h2>
        <motion.ol
          initial="hidden"
          animate="visible"
          variants={listVariants}
          style={styles.stepsList} // Added styles for the list
        >
          <motion.li variants={itemVariants} style={styles.listItem}><strong>Step 1:</strong> Fill in the details like Job Title, Description/Skills, Experience Level, and upload your Resume.</motion.li>
          <motion.li variants={itemVariants} style={styles.listItem}><strong>Step 2:</strong> The platform will automatically generate interview questions based on the information you provided.</motion.li>
          <motion.li variants={itemVariants} style={styles.listItem}><strong>Step 3:</strong> Start the interview by allowing microphone and webcam access.</motion.li>
          <motion.li variants={itemVariants} style={styles.listItem}><strong>Step 4:</strong> Click the "Record Answer" button when you're ready to answer each question.</motion.li>
          <motion.li variants={itemVariants} style={styles.listItem}><strong>Step 5:</strong> After completing the interview, you will receive an evaluation for each answer.</motion.li>
        </motion.ol>
      </motion.div>
    </motion.div>
  );
};

// Variants for list items animation
const listVariants = {
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.3 }
  },
  hidden: { opacity: 0 }
};

const itemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -50 }
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  videoContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  video: {
    maxWidth: '100%',
    borderRadius: '10px',
  },
  stepsContainer: {
    marginTop: '30px',
  },
  stepsList: {
    fontSize: '18px',
    lineHeight: '1.8',
    listStyle: 'decimal',
    paddingLeft: '20px',
    margin: '20px 0',
  },
  listItem: {
    padding: '15px 10px',
    marginBottom: '10px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #4CAF50',
    transition: 'background-color 0.3s ease',
  },
  listItemHover: {
    backgroundColor: '#e2f7e1', // Color on hover
  },
};

export default HowItWorks;
