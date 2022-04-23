import React, { useState } from 'react';
import Select from 'react-select';
import "../styles/page-default.css";
import Selecting from "./select";
import DoraTabs from "./tab/doratab";

const options = [
    { value: 'chocolate', label: '0xq42342342' },
    { value: 'strawberry', label: '0x3erfw342' },
    { value: 'vanilla', label: '0x3w44g3543t3' },
];

const Header = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="header-default" >
            <div className="nav-brand">
                CORE Pallet
            </div>
            <DoraTabs></DoraTabs>
            <div className="select-bd">
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
            </div>
        </div>
    );
}

export default Header;