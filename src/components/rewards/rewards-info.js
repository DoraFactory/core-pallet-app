import React, { useState, useEffect } from 'react';
import "../../styles/rewards.css";
import '../../styles/page-default.css';
import { useSubstrateState } from '../../context';

const RewardInfo = () => {

    const { api, currentAccount } = useSubstrateState();
    const [claimable, setclaimable] = useState(0);
    const [totalReawrd, settotalReawrd] = useState(0);
    const [contribution, setcontribution] = useState(0);

    useEffect(() => {
        if (currentAccount) {
            let current_address = currentAccount.address;
            console.log(`当前地址为${current_address}`)
            let unsubscribeAll = null
            api.query.doraRewards.contributorsInfo(current_address, reward_info => {
                if (reward_info.isSome) {
                    let reward = reward_info.unwrap();
                    console.log(reward);
                    console.log(reward.totalReward.toNumber());
                    console.log(`claimed reward is `+reward.claimedReward.toNumber());
                    let total_rewad = reward.totalReward.toNumber() / 1000000000000;
                    let claimed_reward = reward.claimedReward.toNumber() / 1000000000000;
                    settotalReawrd(total_rewad);
                    setclaimable(total_rewad - claimed_reward);
                    setcontribution(total_rewad / 3);
                }else{
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
    }, [api, currentAccount, setclaimable, settotalReawrd, setcontribution])

    return (
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
    );
}


export default RewardInfo;