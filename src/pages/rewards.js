/// page reward for contributors to claim
///

import React, { useState } from 'react';
import Footer from '../components/footer';
import '../styles/assets.scss';
import RewardInfo from '../components/rewards/rewards-info'
import Block from '../components/rewards/block'
import { useSubstrateState } from '../context';
import { web3FromSource } from '@polkadot/extension-dapp'

const Reward = () => {
    const { api, currentAccount } = useSubstrateState();
    const [unsub, setUnsub] = useState(null)

    // get account (include injector accounts)
    const getFromAcct = async() => {
        const {
            address,
            meta: { source, isInjected },
        } = currentAccount

        if (!isInjected) {
            return [currentAccount]
        }

        // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
        // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
        const injector = await web3FromSource(source)
        return [address, { signer: injector.signer }]
    }

    const handle_change = async () => {
        console.log(`开始申请奖励.....`);
        const fromAcct = await getFromAcct();
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

    return (
        <div>
            {/* <Header></Header> */}
            <div className="text-default">
                <p className="font1">Dora-KSM crowdloan rewards</p>
                {/* TODO：文字页上脚*/}
                <button className="claim-btn" onClick={() => handle_change()}>Claim Reward</button>
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