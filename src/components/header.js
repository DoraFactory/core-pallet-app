import React, { useState } from 'react';
import Select from 'react-select';
import "../styles/page-default.css";
import Selecting from "./select";
import DoraTabs from "./tab/doratab";

const options = [
    { value: 'chocolate', label: '0xq42342342' },
    { value: 'strawbero', label: '0x3erfw3422' },
    { value: 'vanilla00', label: '0x3w44g3t33' },
];

const classname = "downdrop";

const Header = () => {
    const [selectedOption, setSelectedOption] = useState(null);


    const styles = {
        fontSize: 14,
        color: 'blue',
    }

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
                    style={styles.Select}
                />
            </div>
        </div >
    );
}


export default Header;