import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import Icons from '../resources'
import { useSubstrateState } from '../context'
import { formatBalance } from '@polkadot/util'
import config from "../context/config"
import "../styles/less/layout/stickyfooter.css";
import "../styles/less/page/tokens.css";
import "../styles/less/component/table.css";
import "../styles/less/page/index.css";

const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;
const ksm_network = config.KSM_NETWORK;
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
<br />;

const AssetInfo = () => {
    const { api, currentAccount } = useSubstrateState()
    const [accBalance, setaccBalance] = useState(0);
    const [ksmBalance, setKsmBalance] = useState(0);
    // Dora Ksm parachain equals Kusama: 12
    const chainDecimals = api.registry.chainDecimals[0];

    useEffect(() => {
        if (currentAccount) {
            let current_address = currentAccount.address;
            let unsubscribeAll = null
            api.query.system.account(current_address, balance_info => {
                const free = formatBalance(balance_info.data.free, { withSi: false, forceUnit: '-' }, chainDecimals);
                setaccBalance(free);
            })

            api.query.tokens.accounts(current_address, "KSM", balance_info => {
                const free = formatBalance(balance_info.free, { withSi: false, forceUnit: '-' }, chainDecimals);
                setKsmBalance(free);
            })
                .then(unsub => {
                    unsubscribeAll = unsub
                })
                .catch(console.error)
            return () => unsubscribeAll && unsubscribeAll()
        }
    }, [api, accBalance, currentAccount, setaccBalance])

    return (
        <div className="tokens-wrap">
            <div className="tokens-color">
                <div className="tokens-elevation-table table">
                    <div className="table-wrap">
                        <div className="table-head">
                            <div className="table-row">
                                <div className="table-cell">
                                    <p>ORIGIN</p>
                                </div>
                                <div className="table-cell">
                                    <p>BALANCE</p>
                                </div>
                                <div className="table-cell">
                                    <p>TOKEN SYMBOL</p>
                                </div>
                            </div>
                        </div>
                        <div className="table-body">
                            <div className="table-row">
                                <div className="table-cell">
                                    {/* <img src={Icons.Dora}></img> */}
                                    <code>Dora-KSM Parachain</code>
                                </div>
                                <div className="table-cell">
                                    <code>{accBalance}</code>
                                </div>
                                <div className="table-cell">
                                    <code>DORA</code>
                                </div>
                            </div>
                            <div className="table-row">
                                <div className="table-cell">
                                    <code>Kusama</code>
                                </div>
                                <div className="table-cell">
                                    <code>{ksmBalance}</code>
                                </div>
                                <div className="table-cell">
                                    <code>KSM</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssetInfo;