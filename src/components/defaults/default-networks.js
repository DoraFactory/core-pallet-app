/// default lease info

import React from "react";
import '../../styles/page-default.css';

const LeaseInfo = () => {
    return (
        <div className="body">
            <div className="body-default">
                <div>
                    <p className="p-font">144,400</p>
                    <p className="p-font2">Current block</p>
                </div>
                <div>
                    <p className="p-font">48 weeks</p>
                    <p className="p-font2">Parachain duration</p>

                </div>
                <div>
                    <p className="p-font">Kusama</p>
                    <p className="p-font2">Parachain network</p>

                </div>
                <div>
                    <span className="p-font">DORA </span>
                    <span className="p-doya">Dorayaki</span>
                    <p className="p-font2">Primary token</p>

                </div>
                <div>
                    <span className="p-font">33,000</span>
                    <p className="p-font2">Current total supply</p>

                </div>
                <div>
                    <p className="p-font">12</p>
                    <p className="p-font2">Connected parachains</p>

                </div>
            </div>
        </div>
    );
}


export default LeaseInfo;