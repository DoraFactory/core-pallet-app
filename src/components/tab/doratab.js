import React, { useState } from "react";
import Network from '../../pages/network';
import Rewards from '../../pages/rwd';
import Assets from "../../pages/assets";
import TabContent from "./tabContent";
import TabNavItem from "./tabNavItem";
import { ToastProvider } from "react-toast-notifications"

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
            <div id="haha">
                <ToastProvider>
                    <TabContent id="tab1" activeTab={activeTab}>
                        <Assets />
                    </TabContent>
                    <TabContent id="tab2" activeTab={activeTab}>
                        <Network />
                    </TabContent>
                    <TabContent id="tab3" activeTab={activeTab}>
                        <Rewards />
                    </TabContent>
                </ToastProvider>
            </div>
        </div>
    );
};
export default DoraTabs;
