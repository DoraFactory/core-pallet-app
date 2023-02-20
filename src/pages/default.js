/// default page(unlogged pages)
///
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import LeaseInfo from "../components/defaults/default-networks";
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
            navigate("/assets")
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
                    <LeaseInfo></LeaseInfo>
                    <section className="index-source">
                        <div className="index-source-text">
                            <h2 className="index-source-text-title">Haven't got an account</h2>
                            <p className="index-source-text-desc">You can create a new account and connect to the Core Pallet with polkadot-js extension.</p>
                        </div>
                        <a className="index-source-button button-pill-primary-md" rel="noopener external nofollow noreferrer">Get polkadot js Extension</a>
                    </section>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default DefaultPage;