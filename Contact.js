import React, { useState } from 'react';
// Removed import for Layout as it's handled in App.js
import './Contact.css'; // Make sure you have this CSS file

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Data:', formData);
    // Add your logic to handle form submission (e.g., sending an email)
    // You might want to add state here to show a success message or handle errors
  };

  return (
    // Removed the <Layout> wrapper here. App.js already provides the Layout.
    // Add a container div for styling if needed
    <div className="contact-page-container clean">
      {/* You might want to add a back button here too */}
      {/* <div className="back-button">
        <Link to="/" className="button secondary outline small">Back to Home</Link>
      </div> */}

      <section className="contact-form clean">
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you! Please fill out the form below or reach us through the provided contact information.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          {/* Assuming you have a button style in your CSS */}
          <button type="submit" className="button primary large">Send Message</button>
        </form>
      </section>

      {/* You might want to place contact info alongside the form using flexbox or grid in Contact.css */}
      <section className="contact-info clean">
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> <a href="mailto:contact@skysnap.ai">contact@skysnap.ai</a></p>
        <p><strong>Phone:</strong> <a href="tel:+919677386470">+91 9677386470</a></p>
        {/* Add address or other info here */}
         <p>
            <strong>Address:</strong><br />
            SkySnap.ai HQ,<br />
            123 Tech Avenue,<br />
            Coimbatore, Tamil Nadu, 641001<br />
            India
          </p>
      </section>
    </div>
    // Removed the closing </Layout> tag here.
  );
}

export default Contact;
