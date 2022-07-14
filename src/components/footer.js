import React from "react";
import "../styles/less/component/footer.less";
const _dataFooter = {
    link: [
        {
            name: '© 2022 Dora Factory',
            link: 'https://dorafactory.org/',
        }, {
            name: 'Feedback',
            link: 'https://github.com/DoraFactory/df-design-system/issues',
        }
    ]
}

const Footer = () => {
    return (
        <div className="footer">
            <div className="foot-nav">
                {_dataFooter.link.map(linkInfo => {
                    <a className="footer-nav-item" target="_blank"
                        rel="noopener external nofollow noreferrer"
                        href={linkInfo.link}
                    >
                        {linkInfo.name}
                    </a>
                })}
            </div>
        </div>
    );
}
export default Footer;