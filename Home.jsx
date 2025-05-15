import React from 'react';
import { Link } from 'react-router-dom';
// Removed import for Layout as it's handled in App.js
import './Home.css'; // Ensure this is still imported

// Assuming these components are defined elsewhere or within this file
// If they are in separate files, you'll need to import them:
// import HeroSection from './HeroSection';
// import KeyFeatures from './KeyFeatures';
// import HowItWorks from './HowItWorks';
// import Benefits from './Benefits';
// import CallToAction from './CallToAction';
// import Testimonials from './Testimonials';
// import ContactPreview from './ContactPreview';

function Home() {
  return (
    // Removed the <Layout> wrapper here. App.js already provides the Layout.
    <div className="home-container clean">
      <HeroSection />
      <KeyFeatures />
      <HowItWorks />
      <Benefits />
      <CallToAction />
      <Testimonials />
      <ContactPreview />
    </div>
  );
}

// Assuming these components are defined here for now,
// but it's better practice to move them to separate files
const HeroSection = () => (
  <section className="hero clean">
    <div className="hero-content left clean">
      <h1>SkySnap.ai</h1>
      <p className="hero-tagline clean">From Sky to Safety—In Seconds.</p>
      <h2>Empowering Proactive Disaster Management with AI-Driven Cloud Burst Prediction</h2>
      <p className="hero-description clean">
        SkySnap.ai provides government agencies and organizations with a robust, real-time cloud burst prediction system, enabling timely warnings and effective mitigation strategies to safeguard communities.
      </p>
      <div className="hero-actions clean">
        {/* Using Link from react-router-dom */}
        {/* Corrected path to /signup */}
        <Link to="/signup" className="button primary large">Get Started</Link>
        {/* Corrected path to /about */}
        <Link to="/about" className="button secondary outline large">Learn More</Link>
         {/* Added Login link with corrected path to /login */}
        <Link to="/login" className="button secondary outline large">Login</Link>
      </div>
    </div>
    <div className="hero-demo right clean">
      <h2>See SkySnap.ai in Action</h2>
      <p>Request a personalized demo to explore the powerful features and benefits of our cloud burst prediction platform.</p>
      {/* Using Link from react-router-dom */}
      <Link to="/contact" className="button primary large">Request a Demo</Link>
      <p className="demo-note clean">Our experts will tailor the demo to your specific needs.</p>
    </div>
  </section>
);

const KeyFeatures = () => (
  <section className="key-features clean">
    <h2 className="section-title clean">Key Features for Effective Disaster Preparedness</h2>
    <div className="feature-grid clean">
      <FeatureItem title="Real-time Data Assimilation" description="Continuous intake and processing of diverse meteorological data for accurate and up-to-the-minute analysis." />
      <FeatureItem title="Proprietary AI Prediction Engine" description="Leveraging state-of-the-art machine learning algorithms trained on extensive historical and real-time data." />
      <FeatureItem title="Multi-Channel Alerting System" description="Dissemination of critical alerts through SMS, email, dedicated APIs, and integrated emergency communication channels." />
      <FeatureItem title="Geospatial Risk Visualization" description="Interactive maps displaying predicted cloud burst zones, intensity levels, and potential impact areas with GIS integration." />
      <FeatureItem title="Comprehensive Data Archive & Reporting" description="Access to historical cloud burst events, prediction accuracy metrics, and customizable reporting tools for analysis and planning." />
      <FeatureItem title="Seamless API Integration" description="Facilitates integration with existing government systems and platforms for streamlined data sharing and operational efficiency." />
    </div>
  </section>
);

const FeatureItem = ({ title, description }) => (
  <div className="feature-item clean">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const HowItWorks = () => (
  <section className="how-it-works clean">
    <h2 className="section-title clean">How SkySnap.ai Works</h2>
    <div className="how-it-works-grid clean">
      <HowItWorksItem title="Data Acquisition" description="We gather real-time meteorological data from satellites, weather stations, and radar networks." />
      <HowItWorksItem title="AI-Powered Analysis" description="Our advanced AI algorithms analyze vast datasets to identify patterns indicative of potential cloud bursts." />
      <HowItWorksItem title="Predictive Modeling" description="Sophisticated models generate accurate predictions about the location, intensity, and timing of cloud burst events." />
      <HowItWorksItem title="Alert Dissemination" description="Timely alerts are delivered through multiple channels to relevant authorities and communities." />
    </div>
  </section>
);

const HowItWorksItem = ({ title, description }) => (
  <div className="how-it-works-item clean">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Benefits = () => (
  <section className="benefits clean">
    <h2 className="section-title clean">Key Benefits for Your Organization</h2>
    <div className="benefits-grid clean">
      <BenefitItem title="Enhanced Public Safety" description="Minimize casualties and injuries with timely and accurate warnings." />
      <BenefitItem title="Minimized Infrastructure Damage" description="Enable proactive measures to protect critical infrastructure and assets." />
      <BenefitItem title="Improved Resource Allocation" description="Optimize the deployment of emergency services based on predicted impact areas." />
      <BenefitItem title="Data-Driven Decision Making" description="Make informed decisions with reliable and actionable cloud burst predictions." />
    </div>
  </section>
);

const BenefitItem = ({ title, description }) => (
  <div className="benefit-item clean">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const CallToAction = () => (
  <section className="call-to-action clean">
    <div className="cta-content clean">
      <h2>Enhance Your Disaster Response Capabilities with SkySnap.ai</h2>
      <p>Explore how our advanced cloud burst prediction system can empower your organization to make informed decisions and protect vulnerable communities.</p>
      <div className="cta-buttons clean">
        {/* Using Link from react-router-dom */}
        <Link to="/contact" className="button primary large">Request a Demo</Link>
        <Link to="/about" className="button secondary outline large">Our Technology</Link>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="testimonials clean">
    <h2 className="section-title clean">Trusted by Organizations Committed to Safety</h2>
    <div className="testimonial-grid clean">
      {/* Add testimonials here */}
    </div>
  </section>
);

const ContactPreview = () => (
  <section className="contact-preview clean">
    <h2>Ready to Integrate SkySnap.ai?</h2>
    <p>Contact our team to discuss your organization's specific needs and explore partnership opportunities.</p>
    {/* Using Link from react-router-dom */}
    <Link to="/contact" className="button primary large">Contact Us</Link>
  </section>
);


export default Home;
