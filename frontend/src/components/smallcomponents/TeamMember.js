import React from "react";

const TeamMember = ({ imageURL, name, role, description, email }) => {
  const Mail = () =>{
    window.open("mailto:{email}");
  }
    return (
      <div className="column">
        <div className="card">
          <img src={imageURL} alt={name} style={{ width: '100%' }} />
          <div className="abt-container">
            <h2>{name}</h2>
            <p className="title">{role}</p>
            <p>{description}</p>
            <p>{email}</p>
            <p>
              <button className="button" onClick={Mail}>Contact</button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default TeamMember;