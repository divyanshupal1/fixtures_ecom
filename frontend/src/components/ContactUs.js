import React from "react"

const ContactUs = () =>{
    return (
      <div className="container">
        <div style={{padding:"0px 2%"}}>
        <div className="contact">
          <p style={{ fontSize: "25px", fontWeight: "550", margin: "100px 0px 10px 0px" }}>
            Contact us for all your questions and opinions, or you can solve
            your problems in a shorter time with our contact offices.
          </p>
          <div className="place">
            <p style={{ fontSize: "16px", fontWeight: "500" }}>United States</p>
            <p style={{ fontSize: "18px" }}>United States Office</p>
            <p style={{ fontSize: "16px", color: "gray" }}>
              205 Middle Road, 2nd Floor, New York
            </p>
            <p style={{ fontSize: "16" }}>+1 1234 567 88</p>
            <a href={`mailto:support@yourdomain.tld`}>support@yourdomain.tld</a>
          </div>

          <div className="box">
            <div className="box-1">
              <p>
                Nam maximus nunc a augue pulvinar, non euismod mauris tempus.
                Cras non elit vel magna molestie pellentesque in eu dui. Donec
                laoreet quis erat vitae finibus. Vestibulum enim eros, porta
                eget quam et, euismod dictum elit.
              </p>
              <img
                src="https://picsum.photos/id/237/200/300"
                alt="Contact"
                style={{ width:"100%", margin: "10px auto" }}
              />
            </div>
            <div className="box-2">
              <div className="contact-form">
                <p style={{ fontSize: "25px", fontWeight: "400" }}>
                  Get in Touch
                </p>
                <p style={{ fontSize: "16px", color: "gray", margin: "10px 0px 20px 0px" }}>
                  Quisque mattis tortor eu tristique sodales. Aenean sit amet
                  justo nec sem vestibulum.
                </p>
                <p>Your Name</p>
                <input type="text" />
                <p>Your Email</p>
                <input type="email" />
                <p>Subject</p>
                <input type="text" />
                <p>Your Message</p>
                <textarea></textarea>
                <button className="send">Send Message</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
}

export default ContactUs