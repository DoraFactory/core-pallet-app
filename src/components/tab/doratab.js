import React, { useState } from "react";
import '../../styles/assets.css'
import Network from '../../pages/network';
import Rewards from '../../pages/rewards';
import Assets from "../../pages/assets";
import TabContent from "./tabContent";
import TabNavItem from "./tabNavItem";

const DoraTabs = () => {

    const [activeTab, setActiveTab] = useState("tab1");

    const handleAsset = () => {
        setActiveTab("tab1");
    }

    const handleNetwork = () => {
        setActiveTab("tab2");
    }

    const handleRewards = () => {
        setActiveTab("tab3");
    }
    return (
        <div className="Tabs">

            <TabNavItem title="Assets" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabNavItem title="Network" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabNavItem title="Rewards" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* <div className={activeTab == "tab1" ? "asset-tab tab-font" : ""} onClick={handleAsset}>
                <span>Assets</span>
                <div className="tab-lineasset"></div>
            </div>
            <div className={activeTab == "tab2" ? "network-tab tab-font" : ""} onClick={handleNetwork}>
                <span>Network</span>
                <div className="tab-linenetwork"></div>
            </div>
            <div className={activeTab == "tab3" ? "rewards-tab tab-font" : ""} onClick={handleRewards}>
                <span>Rewards</span>
                <div className="tab-linereward"></div>
            </div>
            <div>
                {
                    activeTab == "tab1" && activeTab != "tab3"? <Assets /> : <Network />
                }
                {
                    activeTab == "tab2" && activeTab != "tab1"? <Network/>: <Rewards/>
                }
            </div> */}
            <div id="haha">
                <TabContent id="tab1" activeTab={activeTab}>
                    <Assets/>
                </TabContent>
                <TabContent id="tab2" activeTab={activeTab}>
                    <Network/>
                </TabContent>
                <TabContent id="tab3" activeTab={activeTab}>
                    <Rewards/>
                </TabContent>
            </div>

        </div>
    );
};
export default DoraTabs;
