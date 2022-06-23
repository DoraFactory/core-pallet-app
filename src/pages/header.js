import React from 'react';
import "../styles/page-default.scss";
import DoraTabs from "../components/tab/doratab";
import Downdrop from "../components/downdrop";
const Header = () => {

    return (
        <div className="header-default" >
            <div className="nav-brand">
                CORE Pallet
            </div>
            <DoraTabs></DoraTabs>
            <div className="wrap-account">
                <Downdrop></Downdrop>
            </div>
        </div >
    );
}
export default Header;