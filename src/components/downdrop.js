import { React, useEffect, useState } from 'react';
import "../styles/page-default.scss"
import { useSubstrate, useSubstrateState } from '../context';
import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';
import { useOutlineSelectStyles } from '@mui-treasury/styles/select/outline';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../styles/less/component/navbar.css";


const acctAddr = acct => (acct ? acct.address : '')

const Downdrop = (props) => {
    const {
        setCurrentAccount,
    } = useSubstrate()
    const { keyring, currentAccount } = useSubstrateState();

    // Get the list of accounts we possess the private key for
    const keyringOptions = keyring.getPairs().map(account => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase(),
        icon: 'user',
    }))

    const initialAddress =
        keyringOptions.length > 0 ? keyringOptions[0].value : ''

    // Set the initial address
    useEffect(() => {
        // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
        !currentAccount &&
            initialAddress.length > 0 &&
            setCurrentAccount(keyring.getPair(initialAddress))
    }, [currentAccount, setCurrentAccount, keyring, initialAddress])

    const handleChange = addr => {
        setCurrentAccount(keyring.getPair(addr))
    }

    const minimalSelectClasses = useOutlineSelectStyles();
    const iconComponent = (props) => {
        return (
            <ExpandMoreIcon className={props.className + " " + minimalSelectClasses.icon} />
        )
    };

    // moves the menu below the select input
    const menuProps = {
        classes: {
            paper: minimalSelectClasses.paper,
            list: minimalSelectClasses.list
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "center"
        },
        getContentAnchorEl: null
    };

    return (
        // <FormControl>
        //     <Select
        //         disableUnderline
        //         classes={{ root: minimalSelectClasses.select }}
        //         MenuProps={menuProps}
        //         IconComponent={iconComponent}
        //         value={currentAccount ? currentAccount.address : initialAddress}
        //         onChange={(dropdown) => {
        //             handleChange(dropdown.target.value)
        //         }}
        //         className="connect-wallet"
        //     >
        //         {keyringOptions.map((option) => {
        //             return (<MenuItem value={option.key}>
        //                     {option.text}
        //             </MenuItem>
        //             )
        //         })}
        //     </Select>
        // </FormControl>
        <div className="navbar-complex-dropdown">
            <h5 className="navbar-complex-dropdown-caption">Scahemes</h5>
            <ul className="navbar-complex-drop-list">
                {/* {keyringOptions.map(account => {
                            <li className="nav-complex-dropdown-item">
                                <span>
                                    <strong>{account.text}</strong>
                                    <small>{keyringOptions[0].value.slice(0, 10)}...{keyringOptions[0].value.slice(40)}</small>
                                </span>
                                <i className="nav-complex-dropdown-radio"></i>
                            </li>
                        })} */}
                <li className="nav-complex-dropdown-item">
                    <span>
                        <strong>Alice</strong>
                        <small>5safgusdvfbdsvgh</small>
                    </span>
                    <i className="nav-complex-dropdown-radio"></i>
                </li>
                <li className="nav-complex-dropdown-item">
                    <span>
                        <strong>Bob</strong>
                        <small>5safgusdvfbdsvgh</small>
                    </span>
                    <i className="nav-complex-dropdown-radio"></i>
                </li>
                <li className="nav-complex-dropdown-item">
                    <span>
                        <strong>John</strong>
                        <small>5safgusdvfbdsvgh</small>
                    </span>
                    <i className="nav-complex-dropdown-radio"></i>
                </li>
            </ul>
            {/* <button className="nav-complex-dropdown-button">Reset to Default</button> */}
        </div>
    );
}

export default Downdrop;