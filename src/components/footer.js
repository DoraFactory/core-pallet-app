import React from "react";
import "../styles/page-default.scss"
import "../styles/less/component/footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <nav className="footer-nav"></nav>
            <a className="footer-nav-item">© 2022 Dora Factory</a>
            <span className="footer-nav-item">Feedback</span>
        </div>
    );
}
export default Footer;