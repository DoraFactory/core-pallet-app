import React from 'react'
import { Tab } from 'semantic-ui-react'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

<br />;
const panes = [
    {
        menuItem: 'Assets',
        render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
    },
    {
        menuItem: 'Network',
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
    {
        menuItem: 'Rewards',
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
]

const TabPointing = () => (
    <Tab menu={{ secondary: true, pointing: true, color: 'orange'}} panes={panes} className=""/>
)

export default TabPointing;
