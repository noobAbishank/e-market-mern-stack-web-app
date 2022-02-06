import React from 'react';

import "./Footer.css";

import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

const Footer = () => {
    return (
        <footer id="footer">
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="PlayStore" />
                <img src={appStore} alt="AppStore" />
            </div>
            <div className='midFooter'>
                <h1>E-MARKET</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2021 &copy; noobAbishank</p>
            </div>
            <div className='rightFooter'>
                <h4>Follow Us</h4>
                <a href='https://www.instagram.com/abishanknayak/'>Instagram</a>
                <a href='https://www.instagram.com/abishanknayak/'>Youtube</a>
                <a href='https://www.instagram.com/abishanknayak/'>Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;
