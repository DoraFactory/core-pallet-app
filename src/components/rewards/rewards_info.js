import React, { useState, useEffect } from 'react';
import { useSubstrateState } from '../../context';
import { formatBalance } from '@polkadot/util'
import { Icon, Table } from 'semantic-ui-react'
import Icons from '../../resources'
import localStorage from 'localStorage'
import config from "../../context/config"

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const reward_history_url = config.REWARD_QUERY;
let rewardsHistory = [];

const RewardInfo = () => {
    const { api, currentAccount } = useSubstrateState();
    const [claimable, setclaimable] = useState(null);
    const [totalReawrd, settotalReawrd] = useState(null);
    const [contribution, setcontribution] = useState(null);
    const chainDecimals = api.registry.chainDecimals[0];

    useEffect(() => {
        if (currentAccount) {
            let current_address = currentAccount.address;
            let unsubscribeAll = null
            api.query.doraRewards.contributorsInfo(current_address, reward_info => {
                if (reward_info.isSome) {
                    let reward = reward_info.unwrap();
                    let total_reward = formatBalance(reward.totalReward, { withSi: false, forceUnit: '-' }, chainDecimals);
                    let claimed_reward = formatBalance(reward.claimedReward, { withSi: false, forceUnit: '-' }, chainDecimals);
                    settotalReawrd(total_reward);
                    setclaimable(Number(total_reward - claimed_reward).toFixed(5));
                    setcontribution((total_reward / 3));
                    // get the reward history records
                    let history = localStorage.getItem(current_address + "history-reward");
                    rewardsHistory = JSON.parse(history);
                } else {
                    settotalReawrd(0);
                    setclaimable(0);
                    setcontribution(0)
                }
            })
                .then(unsub => {
                    unsubscribeAll = unsub
                })
                .catch(console.error)

            return () => unsubscribeAll && unsubscribeAll()
        }
    }, [api, currentAccount, claimable, setclaimable, settotalReawrd, setcontribution])

    return (
        <div className="reward-info">
            <div className="reward-stat">
                <div className="reward-grid">
                    <div>
                        <span className="p-font">{claimable}</span>
                        <span className="p-doya"> DORA</span>
                        <p className="p-font2">Current claimable</p>
                    </div>
                    <div>
                        <span className="p-font">{totalReawrd}</span>
                        <span className="p-doya"> DORA</span>
                        <p className="p-font2">Total rewards</p>
                    </div>
                    <div>
                        <span className="p-font">{contribution}</span>
                        <span className="p-doya"> KSM</span>
                        <p className="p-font2">Total contribution</p>
                    </div>
                </div>
            </div>
            {localStorage.getItem(currentAccount.address + "history-reward") == null || rewardsHistory == null ? (
                <div>
                    <div className="no-history"> Not having claiming record ! </div>
                    <div className="content-info">
                        The reward distribution started when Dora-KSM Parachain launched. The total rewards will be linearly released by block. The transcation claiming time need to wait about 0.0015 DORA.
                    </div>
                </div>
            ) : (
                <div className="tb-sty">
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    <span className="blockID">Block #</span>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <span className="claim_time">CLAIMING TIME</span>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <span className="amount">AMOUNT</span>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <span className="token-stmbol">TOKEN SYMBOL</span>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {rewardsHistory.map(record => (
                                <Table.Row>
                                    <Table.Cell>
                                        <div className="pd-body">
                                            <div className="icon-body2">
                                                <a href={reward_history_url + record.block_number} target="_blank" className="lg-p">{record.block_number}</a>
                                                <img src={Icons.Arrow} className="reward-link"></img>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div clasName="ba-content">
                                            <span className="ba-content-time">{record.claiming_time}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div clasName="ba-content">
                                            <span className="ba-content-token">{Number(record.claimed).toFixed(4)}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div clasName="ba-content">
                                            <span className="ba-content-symbol">DORA</span>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table >
                </div>
            )}
        </div >
    );
}


export default RewardInfo;