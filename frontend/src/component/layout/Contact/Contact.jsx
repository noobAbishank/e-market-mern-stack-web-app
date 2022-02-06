import React from "react";
import { Button } from "@material-ui/core";

import "./Contact.css";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    <div className="contactContainer">
      <MetaData title="CONTACT - E-MARKET" />
      <a className="mailBtn" href="mailto:nayakabishank0711@gmail.com">
        <Button>Contact: nayakabishank1999@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
