/// page reward for contributors to claim
///
import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import '../styles/assets.scss';
import RewardInfo from '../components/rewards/rewards-info'
import Block from '../components/rewards/block'
import { useSubstrateState } from '../context';
import { web3FromSource } from '@polkadot/extension-dapp';
import {
    Grid,
    Message,
} from 'semantic-ui-react'

const Reward = () => {
    const { api, currentAccount } = useSubstrateState();
    // record the current account' status in the contributor list
    const [contributor_status, setContributor_status] = useState(false);

    // is the lowest balance?
    const [accBalance, setAccBalance] = useState(0);
    // default the reward is not claimed
    const [claimedAll, setClaimedAll] = useState(false);
    const [unsub, setUnsub] = useState(null)

    // set the current account's status
    useEffect(() => {
        if (currentAccount) {
            let current_address = currentAccount.address;
            api.query.system.account(current_address, balance_info => {
                setAccBalance(balance_info.data.free.toNumber());
            })
            let unsubscribeAll = null
            api.query.doraRewards.contributorsInfo(current_address, reward_info => {
                if (reward_info.isSome) {
                    let reward = reward_info.unwrap();
                    // claimed reward ?= total reward
                    if (reward.totalReward.toNumber() == reward.claimedReward.toNumber()) {
                        setClaimedAll(true)
                    } else {
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
    }, [api, currentAccount, contributor_status, setContributor_status, claimedAll, setClaimedAll])

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
        const fromAcct = await getFromAcct();
        // if the current account is in contributor list and not claimed all
        //TODO: check the basic balance to call tx
        if (contributor_status && !claimedAll) {
            let txExecute = api.tx.doraRewards.claimRewards();
            const unsub = txExecute.signAndSend(...fromAcct, result => {
                console.log(`Current status is ${result.status}`);
                if (result.status.isInBlock) {
                    console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                    console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                }
            })
            setUnsub(() => unsub)
        }

        console.log(`已经领取全部奖励${claimedAll}`);
    }

    return (
        <div>
            <div className="text-default">
                <p className="font1">Dora-KSM crowdloan rewards</p>
                {!contributor_status ? (
                    // <Grid  columns={1} padded>
                    //     <Grid.Column>
                    <Message
                        negative
                        compact
                        floating
                        header="You are not in the reward contributor list"
                        content={`have no access to claim reward`}
                    />
                    //     </Grid.Column>
                    // </Grid>
                ) : (
                    <button className="claim-btn" onClick={() => handle_change()}>Claim Reward</button>
                )}

                {claimedAll ? (
                    // <Grid centered columns={2} padded>
                    // <Grid.Column>
                    <Message
                        warning
                        compact
                        floating
                        header="You have claimed all your reward ! ! !"
                        content={`No rewards left.`}
                    />
                    // </Grid.Column>
                    // </Grid>
                ) : (
                    <p></p>
                )}

                {/* {
                    accBalance < 5000000000000 ? (
                        <Message
                            negative
                            compact
                            floating
                            header="You are not in the reward contributor list"
                            content={`have no access to claim reward`}
                        />
                    ) : (
                        <p></p>
                    )
                } */}
            </div>
            <RewardInfo></RewardInfo>
            <Block></Block>
            <div className="content-info">
                The reward distribution started when Dora-KSM Parachain launched. The total rewards will be linearly released by block. The transcation fee of each claim is 0.125 DORA.
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Reward;