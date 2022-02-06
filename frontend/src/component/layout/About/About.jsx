import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

import "./About.css";
import MetaData from "../MetaData";

const About = () => {
  return (
    <div className="aboutSection">
      <MetaData title="ABOUT - E-MARKET" />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dynb7qc29/image/upload/v1644158608/avatars/yx2r36fgxy2cunavwsix.jpg"
              alt="Founder"
            />
            <Typography className="author">Abishank Nayak</Typography>

            <span>
              This is a sample e-Commerce Website build by Abishank Nayak. The
              Frontend is made using ReactJs, Redux for API Calling, Material-UI
              Icons and Templates. In the Backend part NodeJs and ExpressJs is
              been used. For the DataBase Part MonogoDB is been used. The Images
              are stored in Cloudinary.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Social Handles</Typography>
            <a
              href="https://www.linkedin.com/in/abishank-nayak-2000/"
              target="blank"
            >
              <LinkedInIcon className="linkedInSvgIcon" />
            </a>

            <a href="https://www.instagram.com/abishanknayak/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a
              href="https://github.com/noobAbishank/e-market-mern-stack-web-app"
              target="blank"
            >
              <GitHubIcon className="gitHubSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
