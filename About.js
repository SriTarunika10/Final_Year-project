import React from 'react';
import { Link } from 'react-router-dom';
// Removed import for Layout as it's handled in App.js
import './About.css'; // Make sure you have this CSS file

function About() {
  return (
    // Removed the <Layout> wrapper here. App.js already provides the Layout.
    <div className="about-container clean">
      {/* Back to Home Button - You might want to add this back if needed */}
      {/* <div className="back-button">
        <Link to="/" className="button secondary outline small">Back to Home</Link>
      </div> */}

      <section className="about-mission clean">
        <h2 className="section-title clean">Our Mission</h2>
        <p>
          At SkySnap.ai, our mission is to significantly reduce the devastating impact of cloud burst events on communities worldwide. We are dedicated to providing accurate, timely, and actionable cloud burst predictions through the innovative application of artificial intelligence and advanced weather science. Our goal is to empower government agencies, disaster response teams, and at-risk populations with the insights needed to prepare, respond effectively, and ultimately save lives and protect infrastructure.
        </p>
      </section>

      <section className="about-vision clean">
        <h2 className="section-title clean">Our Vision</h2>
        <p>
          We envision a future where the threat of cloud bursts is minimized through the widespread adoption of intelligent prediction and early warning systems. SkySnap.ai strives to be a global leader in disaster preparedness technology, fostering resilient communities and contributing to a safer, more secure world for all who are vulnerable to these extreme weather phenomena.
        </p>
      </section>

      <section className="about-technology clean">
        <h2 className="section-title clean">Our Cutting-Edge Technology</h2>
        <p>
          SkySnap.ai harnesses the power of state-of-the-art artificial intelligence and machine learning algorithms to analyze vast and complex datasets. Our proprietary prediction engine integrates real-time data from a multitude of sources, ensuring unparalleled accuracy and timeliness.
        </p>
        <div className="technology-details clean">
          <h3>Key Technological Components:</h3>
          <ul>
            <li>
              <strong>Advanced Satellite Imagery Analysis:</strong> We utilize high-resolution satellite imagery and sophisticated image processing techniques to identify and track cloud formations and atmospheric conditions indicative of potential cloud bursts.
            </li>
            <li>
              <strong>Proprietary Machine Learning Models:</strong> Our deep learning models are trained on extensive historical cloud burst data, meteorological records, and real-time sensor inputs to forecast the probability, intensity, and location of future events with high precision.
            </li>
            <li>
              <strong>Real-time Data Fusion:</strong> Our system seamlessly integrates data from ground-based weather stations, radar networks, atmospheric models, and IoT sensors to provide a comprehensive and dynamic understanding of atmospheric conditions.
            </li>
            <li>
              <strong>Multi-Channel Alerting System:</strong> Critical alerts and predictions are disseminated through multiple channels, including SMS, email, dedicated APIs for integration with emergency management systems, and mobile applications, ensuring timely warnings reach those who need them most.
            </li>
            <li>
              <strong>Geospatial Risk Visualization:</strong> Our platform features interactive maps and GIS integration, allowing users to visualize predicted cloud burst zones, intensity levels, and potential impact areas, facilitating informed decision-making and resource allocation.
            </li>
            <li>
              <strong>Scalable Cloud Infrastructure:</strong> Built on a robust and scalable cloud infrastructure, SkySnap.ai ensures the reliability, responsiveness, and accessibility of our services, even during peak demand.
            </li>
            <li>
              <strong>Continuous Learning and Improvement:</strong> Our AI models are continuously refined and updated with new data and insights, ensuring ever-increasing accuracy and predictive capabilities.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-team clean">
        <h2 className="section-title clean">Our Passionate Team</h2>
        <p>
          SkySnap.ai is the result of a shared vision and relentless dedication of a diverse team of experts who are passionate about leveraging technology for social good. Our team brings together deep expertise in meteorology, artificial intelligence, data science, software engineering, disaster management, and public safety.
        </p>
        <div className="team-grid clean">
          <div className="team-member clean">
            {/* Replace with actual image paths */}
            {/* <img src="/images/team/john-doe.jpg" alt="John Doe" /> */}
            {/* Placeholder SVG or component if you don't have images yet */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '60px', height: '60px', margin: '0 auto 15px auto', color: '#6c757d' }}>
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1 -9 0Zm3.75 9a8.25 8.25 0 0 0 -6 2.818v0.917a6.75 6.75 0 0 0 6 6.182a6.75 6.75 0 0 0 6 -6.182v-0.917a8.25 8.25 0 0 0 -6 -2.818Z" clipRule="evenodd" />
              </svg>
            <h3>John Doe</h3>
            <p>Chief Meteorologist & Co-founder</p>
            <p>With over 20 years of experience in atmospheric science and a PhD in Meteorology, John leads our research and prediction modeling efforts.</p>
          </div>
          <div className="team-member clean">
            {/* Replace with actual image paths */}
            {/* <img src="/images/team/jane-smith.jpg" alt="Jane Smith" /> */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '60px', height: '60px', margin: '0 auto 15px auto', color: '#6c757d' }}>
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1 -9 0Zm3.75 9a8.25 8.25 0 0 0 -6 2.818v0.917a6.75 6.75 0 0 0 6 6.182a6.75 6.75 0 0 0 6 -6.182v-0.917a8.25 8.25 0 0 0 -6 -2.818Z" clipRule="evenodd" />
              </svg>
            <h3>Jane Smith</h3>
            <p>Head of Data Science & AI</p>
            <p>Jane holds a PhD in Computer Science with a specialization in machine learning and has a proven track record of developing innovative AI solutions.</p>
          </div>
          <div className="team-member clean">
            {/* Replace with actual image paths */}
            {/* <img src="/images/team/david-lee.jpg" alt="David Lee" /> */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '60px', height: '60px', margin: '0 auto 15px auto', color: '#6c757d' }}>
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1 -9 0Zm3.75 9a8.25 8.25 0 0 0 -6 2.818v0.917a6.75 6.75 0 0 0 6 6.182a6.75 6.75 0 0 0 6 -6.182v-0.917a8.25 8.25 0 0 0 -6 -2.818Z" clipRule="evenodd" />
              </svg>
            <h3>David Lee</h3>
            <p>Lead Software Engineer</p>
            <p>David is a seasoned software architect with extensive experience in building scalable and reliable cloud-based platforms.</p>
          </div>
          <div className="team-member clean">
            {/* Replace with actual image paths */}
            {/* <img src="/images/team/sarah-jones.jpg" alt="Sarah Jones" /> */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '60px', height: '60px', margin: '0 auto 15px auto', color: '#6c757d' }}>
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1 -9 0Zm3.75 9a8.25 8.25 0 0 0 -6 2.818v0.917a6.75 6.75 0 0 0 6 6.182a6.75 6.75 0 0 0 6 -6.182v-0.917a8.25 8.25 0 0 0 -6 -2.818Z" clipRule="evenodd" />
              </svg>
            <h3>Sarah Jones</h3>
            <p>Director of Disaster Management Partnerships</p>
            <p>Sarah brings over 15 years of experience in emergency response and disaster preparedness, fostering crucial collaborations with government and NGOs.</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      <section className="why-choose-us clean">
        <h2 className="section-title clean">Why Choose SkySnap.ai?</h2>
        <p>
          When it comes to safeguarding your communities from the devastating impact of cloud bursts, SkySnap.ai offers a unique combination of accuracy, reliability, and comprehensive support.
        </p>
        <ul>
          <li>
            <strong>Unparalleled Prediction Accuracy:</strong> Our advanced AI models and real-time data fusion deliver highly accurate and timely cloud burst predictions.
          </li>
          <li>
            <strong>Comprehensive Data Integration:</strong> We leverage a wide array of data sources to provide a holistic view of atmospheric conditions.
          </li>
          <li>
            <strong>Timely and Multi-Channel Alerts:</strong> Our system ensures that critical warnings reach the right people through multiple reliable channels.
          </li>
          <li>
            <strong>Actionable Insights and Visualizations:</strong> Our geospatial risk maps and detailed reports provide clear and actionable information for effective decision-making.
          </li>
          <li>
            <strong>Scalable and Reliable Infrastructure:</strong> Our cloud-based platform is designed for high availability and performance, ensuring consistent service.
          </li>
          <li>
            <strong>Dedicated Support and Partnership:</strong> We are committed to providing exceptional support and building strong partnerships with our clients to ensure their success.
          </li>
          <li>
            <strong>Continuous Innovation:</strong> We are constantly pushing the boundaries of AI and weather science to improve our prediction capabilities.
          </li>
        </ul>
      </section>

      <section className="about-contact clean">
        <h2>Ready to Partner with SkySnap.ai for Enhanced Disaster Preparedness?</h2>
        <p>
          Contact our team today to learn more about how our advanced cloud burst prediction system can empower your organization and protect your communities.
        </p>
        <Link to="/contact" className="button primary large clean">Contact Us</Link>
      </section>
    </div>
    // Removed the closing </Layout> tag here.
  );
}

export default About;
