import React, { useState, useEffect } from 'react';
import { useSubstrateState } from '../../context';
import { formatBalance } from '@polkadot/util'
import { Icon, Table } from 'semantic-ui-react'
import Icons from '../../resources'
import localStorage from 'localStorage'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

let rewardsHistory = [];

const RewardInfo = () => {
    const { api, currentAccount } = useSubstrateState();
    const [claimable, setclaimable] = useState(null);
    const [totalReawrd, settotalReawrd] = useState(null);
    const [contribution, setcontribution] = useState(null);

    useEffect(() => {
        if (currentAccount) {
            let current_address = currentAccount.address;
            console.log(`当前地址为${current_address}`)
            let unsubscribeAll = null
            api.query.doraRewards.contributorsInfo(current_address, reward_info => {
                if (reward_info.isSome) {
                    let reward = reward_info.unwrap();
                    console.log(`索取后claimed reward is ` + reward.claimedReward.toNumber());
                    let total_reward = (reward.totalReward.toNumber() / 1000000000);
                    let claimed_reward = (reward.claimedReward.toNumber() / 1000000000);
                    settotalReawrd(formatBalance(reward.totalReward));
                    setclaimable((total_reward - claimed_reward).toFixed(4) + " MUnit");
                    setcontribution((total_reward / 3).toFixed(4) + " MUnit");

                    // get the reward history records
                    let history = localStorage.getItem(current_address);
                    console.log("history is " + history);
                    rewardsHistory = JSON.parse(history);
                    console.log(`rewardsHistory is  ${(rewardsHistory)}`);
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
        <div>
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
            {rewardsHistory == null ? (
                <div className = "no-history"> Not having claiming record ! </div>
            ) : (
                <Table singleLine className="reward-history">
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
                                            <span className="lg-p">{record.block_number}</span>
                                            <img src={Icons.Arrow} className="reward-link"></img>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div clasName="ba-content">
                                        <span className="ba-content1" style={{ textAlign: 'left' }}>{record.claiming_time}</span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div clasName="ba-content">
                                        <span>{record.claimed}</span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <span>DORA</span>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table >
            )}

        </div >

    );
}


export default RewardInfo;