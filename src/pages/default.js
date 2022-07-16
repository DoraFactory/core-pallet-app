/// default page(unlogged pages)
///
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/page-default.scss';
import LeaseInfo from '../components/defaults/default-networks';
import NoAccount from "../components/defaults/no-accounts";
import Icons from "../resources/index";
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { Message } from 'semantic-ui-react';
import config from "../context/config"
import Footer from "../components/footer"
import "../styles/less/component/navbar.css";
import "../styles/less/page/index.css";
import "../styles/less/component/stat.css";
import "../styles/less/component/button.css";
import "../styles/less/component/footer.css";
import "../styles/less/basis.css";
import "../styles/less/layout/stickyfooter.css";

const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;

const DefaultPage = () => {
    const navigate = useNavigate();
    // is there exists polkadot.js extension ?
    const [isExtension, setIsExtension] = useState(1);
    const [existsAccount, setExistsAccount] = useState(1);

    useEffect(() => {
        web3Enable("core pallet app").then((extension) => {
            // no polkadot.js extension
            console.log(extension.length);
            if (extension.length == 0) {
                setIsExtension(0);
            } else {
                web3Accounts().then((accounts) => {
                    // no account in extension
                    if (accounts.length == 0) {
                        setExistsAccount(0)
                    }
                })
            }
        });
    })

    const handle_change = async () => {
        if (isExtension && existsAccount) {
            navigate("/account")
        }
    }
    return (
        <div className="app" >
            <nav className="navbar">
                <span className="navbar-logo">
                    CORE Pallet
                </span>
                <div className="navbar-complex">
                    <button onClick={() => handle_change()} className="wallet">Connect Wallet</button>
                </div>
            </nav>
            {/* {!isExtension ? (
                <Message
                    negative
                    compact
                    floating
                    header="No wallet extension. Please get Polkadot{.js} extension and create a new account."
                    className="message-extension"
                />
            ) : (
                null
            )}

            {isExtension && !existsAccount ? (
                <Message
                    negative
                    compact
                    floating
                    header="your wallet have no accounts, please create a new account."
                    className="message-extension"
                />
            ) : (
                null
            )} */}

            <main className="main">
                {/* <div className="message"></div> */}
                <div className="index-wrap">
                    <header className="index-header">
                        <h1 className="index-header-headline">Dora-KSM Parachain</h1>
                        <a className="index-header-link button-text-primary-md" target="_blank">View Dora-KSM Parachain Explore</a>
                    </header>
                    <section className="index-overview stat">
                        <ul className="stat-data">
                            <div className="stat-data-pair">
                                <div className="stat-data-value">11</div>
                                <div className="stat-data-label">Current block</div>
                            </div>
                            <div className="stat-data-pair">
                                <div className="stat-data-value">48 weeks</div>
                                <div className="stat-data-label">Parachain duration</div>
                            </div>
                            <div className="stat-data-pair">
                                <div className="stat-data-value">Kusama</div>
                                <div className="stat-data-label">Parachain network</div>
                            </div>
                            <div className="stat-data-pair">
                                <div className="stat-data-value">DORA</div>
                                <div className="stat-data-label">Primary token</div>
                            </div>
                            <div className="stat-data-pair">
                                <div className="stat-data-value">50,000.0000</div>
                                <div className="stat-data-label">Current total supply</div>
                            </div>
                            <div className="stat-data-pair">
                                <div className="stat-data-value">34</div>
                                <div className="stat-data-label">Connected parachains</div>
                            </div>
                        </ul>
                    </section>
                    <section className="index-source">
                        <div className="index-source-text">
                            <h2 className="index-source-text-title">Haven't got an account</h2>
                            <p className="index-source-text-desc">You can create a new account and connect to the Core Pallet with polkadot-js extension.</p>
                        </div>
                        <a className="index-source-button button-pill-primary-md" rel="noopener external nofollow noreferrer">Get polkadot js Extension</a>
                    </section>
                </div>
            </main>
            {/* <span className="dora-ksm-font">Dora-KSM Parachain</span>
                <div className="defalt-link">
                    <a href={dora_ksm_parachain_explore} target="_blank" className="explorer-sty">View Dora-KSM Parachain Explorer</a>
                    <img src={Icons.Arrow} className="icon-sty"></img>
                </div> */}
            {/* <LeaseInfo /> */}
            {/* <NoAccount /> */}
            <div className="footer">
                <nav className="footer-nav"></nav>
                <a className="footer-nav-item">© 2022 Dora Factory</a>
                <span className="footer-nav-item">Feedback</span>
            </div>
        </div>
    );
}

export default DefaultPage;