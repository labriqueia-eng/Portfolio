import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder Associate & Sales</h4>
                <h5>Metreecs (YC24)</h5>
              </div>
              <h3>April 2026</h3>
            </div>
            <p>
              Omnichannel prospecting, demo execution and deal closing alongside
              the CEO. Built acquisition campaigns and automated sales processes.
              Iterated product positioning based on field feedback.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Co-founder</h4>
                <h5>La Brique</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Built a medical SaaS for complex device knowledge management — 0%
              hallucination guaranteed. Deployed in 2 months at a national
              distributor, 100+ users. Turned customer support into a sales
              driver through training automation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>VC Scout</h4>
                <h5>The Quest</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Identified high-potential tech startups and entrepreneurial
              talent. Analyzed pitch decks and contributed to investment pipeline
              sourcing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
