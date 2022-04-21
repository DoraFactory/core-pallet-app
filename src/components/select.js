import React from 'react'
import { Select } from 'semantic-ui-react'
import '../styles/page-default.css'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

<br />;

const selectOptions = [
    { key: 'af', value: 'af', text: '0x5wfwy2g3r23hrv123hgrvgh', },
    { key: 'ax', value: 'ax', text: '0xr32rb23jrbh23jrb43j2hbr' },
]

const Selecting = () => (
    <Select placeholder='Select your accountId' options={selectOptions} className='select-bw'></Select>
)

export default Selecting;