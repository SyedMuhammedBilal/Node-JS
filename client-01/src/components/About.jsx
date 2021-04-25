import React from 'react'
import './About.css'

const About = () => {
    return (
        <div className="about-profile">
            <>
  <section className="profile_container">
    <div className="profile_img_section">
      <img className="profile_img-LG" src="https://www.northwestern.edu/fsl/about-us/meet-the-staff/assets/missing-photo.jpg" />
      
    </div>
    <div className="profile_desc_section">
        {/* Name */}
      <h2>Seo Dal-Mi</h2>
      <h3>CEO</h3>
      <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      
      {/* DATA */}
      <div className="interests">
        <span className="interests_item">Technology</span>
        <span className="interests_item">Management</span>
        <span className="interests_item">Leadership</span>
      </div>
    </div>
  </section>
  <div className="info">
    <ul>
      <li>
        <div className="link_img_wrapper">
          <img className="link_img" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/round-pushpin_1f4cd.png" alt />
        </div>
        <p>Seoul, South Korea</p>
      </li>
      <li>
        <div className="link_img_wrapper">
          <img className="link_img" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/speaking-head_1f5e3-fe0f.png" alt />
        </div>
        <p>Korean, English</p>
      </li>
      <li>
        <div className="link_img_wrapper">
          <img className="link_img" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/globe-with-meridians_1f310.png" alt />
        </div>
        <p>sandbox.kr/samsantech</p>
      </li>
    </ul>
  </div>
</>

        </div>
    )
}

export default About