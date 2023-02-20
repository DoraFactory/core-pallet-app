import { React, useState, useEffect } from "react";
import "../styles/less/component/navbar.css";
import { useSubstrate, useSubstrateState } from '../context';
import { useLocation } from "react-router-dom";
import Downdrop from "./downdrop";

const Navbar = () => {
    const {
        setCurrentAccount,
    } = useSubstrate()
    const { keyring, currentAccount } = useSubstrateState();
    const location = useLocation();
    const [showAccount, setShowAccount] = useState(0);

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

    const handleClick = () => {
        setShowAccount(1);

    }

    return (
        <nav className="navbar">
            <span className="navbar-logo">
                CORE Pallet
            </span>
            <div className="navbar-main">
                <a className={location.pathname == "/assets/" ? "navbar-main-tab--active" : "navbar-main-tab"} href="../assets/">Assets</a>
                <a className={location.pathname == "/network/" ? "navbar-main-tab--active" : "navbar-main-tab"} href="../network/">Network</a>
                <a className={location.pathname == "/rewards/" ? "navbar-main-tab--active" : "navbar-main-tab"} href="../rewards/">Rewards</a>
            </div>
            <div className="navbar-complex">
                <button className="navbar-complex-button is-active" onClick={() => handleClick()}>
                    <span>
                        <strong>{keyringOptions[0].text}</strong>
                        <small>{keyringOptions[0].value.slice(0, 10)}...{keyringOptions[0].value.slice(40)}</small>
                    </span>
                </button>
            </div>
            {/* {showAccount == 1 ? (<Downdrop></Downdrop>) : (null)}
             */}
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
            <button className="navbar-menu">
                <i className="navbar-menu-icon"></i>
            </button>
        </nav>
    )
}

export default Navbar;