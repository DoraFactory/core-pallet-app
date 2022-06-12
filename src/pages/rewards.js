/// page reward for contributors to claim
///
import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import '../styles/assets.scss';
import RewardInfo from '../components/rewards/rewards_info'
import Block from '../components/rewards/block'
import { useSubstrateState } from '../context';
import { web3FromSource } from '@polkadot/extension-dapp';
import {
    Grid,
    Message,
} from 'semantic-ui-react'
import localStorage from 'localStorage'
import { useToasts } from "react-toast-notifications"

// get current time
const thisTime = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var mytime = date.toLocaleTimeString();
    // myDate.toLocaleString( );
    var time = year + "/" + month + "/" + day + ' ' + mytime;
    return time;
}

let current_claimed = 0;

const Reward = () => {
    const { api, currentAccount } = useSubstrateState();
    // record the current account' status in the contributor list
    const [contributor_status, setContributor_status] = useState(false);

    // is the lowest balance?
    const [accBalance, setAccBalance] = useState(0);
    // default the reward is not claimed
    const [claimedAll, setClaimedAll] = useState(false);
    const [unsub, setUnsub] = useState(null)
    const [currClaimed, setCurrClaimed] = useState(0);

    const { addToast } = useToasts()

    const NosuffcientBalance = (content) => {
        addToast(content, {
            appearance: 'error', autoDismiss: true,
        })
    }

    const ClaimSuccess = (content) => {
        addToast(content, {
            appearance: 'success', autoDismiss: true,
        })
    }

    const Claiming = (content) => {
        addToast(content, {
            appearance: 'info', autoDismiss: true,
        })
    }

    // this msg will be stored in localstorage
    let msg = {};

    // set the current account's status
    useEffect(() => {
        if (currentAccount) {
            let current_address = currentAccount.address;
            api.query.system.account(current_address, balance_info => {
                setAccBalance(BigInt(balance_info.data.free));
            })
            let unsubscribeAll = null
            api.query.doraRewards.contributorsInfo(current_address, reward_info => {
                if (reward_info.isSome) {
                    let reward = reward_info.unwrap();
                    // claimed reward ?= total reward
                    if (reward.totalReward.toNumber() == reward.claimedReward.toNumber()) {
                        setClaimedAll(true)
                    } else {
                        let last_claimed = localStorage.getItem(current_address + "last-claim");
                        if (reward.claimedReward.toNumber() != last_claimed) {
                            current_claimed = reward.claimedReward.toNumber() - Number(last_claimed);
                            localStorage.setItem(current_address + "last-claim", reward.claimedReward.toNumber());
                        }
                        if (localStorage.getItem(current_address + "last-claim") == null) {
                            localStorage.setItem(current_address + "last-claim", reward.claimedReward.toNumber());
                        }
                        setClaimedAll(false)
                    }
                    setContributor_status(true);
                } else {
                    setContributor_status(false);
                    setClaimedAll(false)
                }
            })
                .then(unsub => {
                    unsubscribeAll = unsub
                })
                .catch(console.error)
            return () => unsubscribeAll && unsubscribeAll()
        }
    }, [api, currentAccount, contributor_status, setContributor_status, claimedAll, setClaimedAll, currClaimed])

    // get account (include injector accounts)
    const getFromAcct = async () => {
        const {
            address,
            meta: { source, isInjected },
        } = currentAccount

        if (!isInjected) {
            return [currentAccount]
        }
        const injector = await web3FromSource(source)
        return [address, { signer: injector.signer }]
    }

    const handle_change = async () => {
        console.log(`开始申请奖励.....`);
        let history = new Array();
        let last_claimed = localStorage.getItem(currentAccount.address + "last-claim")
        const fromAcct = await getFromAcct();

        if (accBalance < 5000000) {
            NosuffcientBalance("Insufficient balance in your current account! Please buy some DORA !");
            return;
        }
        // if the current account is in contributor list and not claimed all
        if (contributor_status && !claimedAll) {
            let txExecute = api.tx.doraRewards.claimRewards();
            Claiming(" claiming reward, wait at least 12s")
            const unsub = txExecute.signAndSend(...fromAcct, async result => {
                console.log(`Current status is ${result.status}`);
                if (result.status.isInBlock) {
                    console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                    console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                    ClaimSuccess(" claim successfully !")
                    let claim_time = thisTime();
                    let block = await api.rpc.chain.getBlock(result.status.asFinalized);
                    msg.block_number = block.block.header.number;
                    msg.claiming_time = claim_time;
                    msg.claimed = current_claimed;

                    let local_storage = localStorage.getItem(currentAccount.address);
                    console.log(`当前获取的存储为${local_storage}`);
                    // if there is no localstorage, we push the new array
                    if (local_storage == null) {
                        history.push(msg);
                        localStorage.setItem(currentAccount.address, JSON.stringify(history));
                    } else {
                        let new_storage = JSON.parse(local_storage);
                        // if exists, we push into the new item into the array
                        console.log(`新增一条索取信息${JSON.stringify(msg)}`);
                        console.log(`store_obj is ${typeof new_storage}`);
                        console.log(new_storage);
                        new_storage.push(msg);
                        console.log(new_storage);
                        localStorage.setItem(currentAccount.address, JSON.stringify(new_storage))
                    }

                }
            })
            setUnsub(() => unsub
            )
        }

        console.log(`已经领取全部奖励${claimedAll}`);
    }

    return (
        <div>
            {!contributor_status ? (
                <Message
                    negative
                    compact
                    floating
                    header="You are not in the reward contributor list and have no access to claim the reward ! "
                    className="message-sty"
                />
            ) : (
                null
            )}

            {claimedAll ? (
                <Message
                    warning
                    compact
                    floating
                    header="You have claimed all your reward, No rewards left ! ! !"
                    className="message-sty"
                />
            ) : (
                <p></p>
            )}

            <div className="text-default">
                <p className="dora-ksm-font">Dora-KSM crowdloan rewards</p>
                {!contributor_status ? (
                    null
                ) : (
                    <button className="claim-btn" onClick={() => handle_change()}>Claim Reward</button>
                )}
            </div>
            <RewardInfo></RewardInfo>
            <div className="content-info">
                The reward distribution started when Dora-KSM Parachain launched. The total rewards will be linearly released by block. The transcation fee of each claim is 0.125 DORA.
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Reward;