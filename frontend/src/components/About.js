import React from "react";
import TeamMember from "./smallcomponents/TeamMember";

const About = () => {
  return (
    <div className="container">
      <div className="about-section">
        <h1 style={{fontSize: "30px", margin: "10px 0px"}}>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
      </div>

        <h2 style={{ textAlign: "center", margin: "20px 0px 10px 0px", fontSize: "25px" }}>Our Team</h2>

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
