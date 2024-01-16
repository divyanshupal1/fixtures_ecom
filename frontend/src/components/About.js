import React from "react";
import TeamMember from "./smallcomponents/TeamMember";

const About = () => {
  return (
    <div className="container">
      <div className="about-section">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
      </div>

        <h2 style={{ textAlign: "center" }}>Our Team</h2>

        <div className="row">
          <TeamMember
            imageURL="https://loremflickr.com/300/300"
            name="Aaditya"
            role="CEO & Founder"
            description="Some text that describes me lorem ipsum ipsum lorem."
            email="jane@example.com"
          />
          <TeamMember
            imageURL="https://loremflickr.com/300/300"
            name="Aaditya"
            role="Art Director"
            description="Some text that describes me lorem ipsum ipsum lorem."
            email="mike@example.com"
          />
          <TeamMember
            imageURL="https://loremflickr.com/300/300"
            name="Aaditya"
            role="Designer"
            description="Some text that describes me lorem ipsum ipsum lorem."
            email="john@example.com"
          />
        </div>
    </div>
  );
};

export default About;
