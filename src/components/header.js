import React from 'react';
import "../styles/page-default.scss";
import DoraTabs from "./tab/doratab";
import Downdrop from "./downdrop";
const Header = () => {
    
    return (
        <div className="header-default" >
            <div className="nav-brand">
                CORE Pallet
            </div>
            <DoraTabs></DoraTabs>
            <Downdrop></Downdrop>
        </div >
    );
}
export default Header;