// /// page reward for contributors to claim
// ///
// import React, { useState, useEffect } from 'react';
// import '../styles/assets.scss';
// import RewardInfo from '../components/rewards/rewards_info'
// import { useSubstrateState } from '../context';
// import { web3FromSource } from '@polkadot/extension-dapp';
// import { formatBalance } from '@polkadot/util'
// import {
//     Message,
// } from 'semantic-ui-react'
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import localStorage from 'localStorage'
// import { useToasts } from "react-toast-notifications";
// import Navbar from '../components/navbar';
// import Footer from "../components/footer";

// // get current time
// const thisTime = () => {
//     var date = new Date();
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1;
//     var day = date.getDate();
//     var mytime = date.toLocaleTimeString();
//     // myDate.toLocaleString( );
//     var time = year + "/" + month + "/" + day + ' ' + mytime;
//     return time;
// }

// let current_claimed = 0;

// const Rewards = () => {
//     const { api, currentAccount } = useSubstrateState();
//     // record the current account' status in the contributor list
//     const [contributor_status, setContributor_status] = useState(false);
//     // is the lowest balance?
//     const [accBalance, setAccBalance] = useState(0);
//     // default the reward is not claimed
//     const [claimedAll, setClaimedAll] = useState(false);
//     // Is initialized ? 
//     const [initialized, setInitialized] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [unsub, setUnsub] = useState(null)
//     const chainDecimals = api.registry.chainDecimals[0];

//     const { addToast } = useToasts()

//     const ErrorMsg = (content) => {
//         addToast(content, {
//             appearance: 'error', autoDismiss: true,
//         })
//     }

//     const ClaimSuccess = (content) => {
//         addToast(content, {
//             appearance: 'success', autoDismiss: true,
//         })
//     }

//     const Claiming = (content) => {
//         addToast(content, {
//             appearance: 'info', autoDismiss: true,
//         })
//     }

//     // this msg will be stored in localstorage
//     let msg = {};

//     // set the current account's status
//     useEffect(() => {
//         if (currentAccount) {
//             let current_address = currentAccount.address;
//             api.query.system.account(current_address, balance_info => {
//                 let free = formatBalance(balance_info.data.free, { withSi: false, forceUnit: '-' }, chainDecimals);
//                 setAccBalance(free);
//             })
//             api.query.doraRewards.initialized(isInitialized => {
//                 if (isInitialized == true) {
//                     setInitialized(isInitialized)
//                 }
//             })
//             let unsubscribeAll = null
//             api.query.doraRewards.contributorsInfo(current_address, reward_info => {
//                 if (reward_info.isSome) {
//                     let reward = reward_info.unwrap();
//                     // let tr = formatBalance(reward.totalReward, { withSi: false, forceUnit: '-' }, chainDecimals);
//                     // let cr = formatBalance(reward.claimedReward, { withSi: false, forceUnit: '-' }, chainDecimals);
//                     let tr = reward.totalReward.toNumber();
//                     let cr = reward.claimedReward.toNumber();
//                     // claimed reward ?= total reward
//                     if (tr == cr) {
//                         setClaimedAll(true)
//                     } else {
//                         let last_claimed = localStorage.getItem(current_address + "last-claim");
//                         if (cr != last_claimed) {
//                             // current_claimed = cr - last_claimed;
//                             // localStorage.setItem(current_address + "last-claim", cr);
//                             console.log(`last_claimed is ${last_claimed}`);
//                             current_claimed = reward.claimedReward.toNumber() - Number(last_claimed);
//                             localStorage.setItem(current_address + "last-claim", Number(cr));
//                         }
//                         if (localStorage.getItem(current_address + "last-claim") == null) {
//                             // localStorage.setItem(current_address + "last-claim", cr);
//                             localStorage.setItem(current_address + "last-claim", Number(cr));
//                         }
//                         setClaimedAll(false)
//                     }
//                     setContributor_status(true);
//                 } else {
//                     setContributor_status(false);
//                     setClaimedAll(false)
//                 }
//             })
//                 .then(unsub => {
//                     unsubscribeAll = unsub
//                 })
//                 .catch(console.error)
//             return () => unsubscribeAll && unsubscribeAll()
//         }
//     }, [api, currentAccount, contributor_status, setContributor_status, claimedAll, setClaimedAll])

//     // get account (include injector accounts)
//     const getFromAcct = async () => {
//         const {
//             address,
//             meta: { source, isInjected },
//         } = currentAccount

//         if (!isInjected) {
//             return [currentAccount]
//         }
//         const injector = await web3FromSource(source)
//         return [address, { signer: injector.signer }]
//     }

//     const handle_change = async () => {
//         console.log(`start claim reward.....`);
//         let history = new Array();
//         const fromAcct = await getFromAcct();
//         if (accBalance < 0.0015) {
//             ErrorMsg("Insufficient balance in your current account! Please buy some DORA !");
//             return;
//         }

//         if (!initialized) {
//             ErrorMsg("Reawrd ending lease is not set, Please wait for the initialization !");
//             return;
//         }
//         // if the current account is in contributor list and not claimed all
//         if (contributor_status && !claimedAll) {
//             let txExecute = api.tx.doraRewards.claimRewards();
//             Claiming(" claiming reward, wait at least 12s")
//             setOpen(!open);
//             const unsub = txExecute.signAndSend(...fromAcct, async result => {
//                 console.log(`Current status is ${result.status}`);
//                 if (result.status.isInBlock) {
//                     console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
//                 } else if (result.status.isFinalized) {
//                     console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
//                     ClaimSuccess(" claim successfully !")
//                     let claim_time = thisTime();
//                     let block = await api.rpc.chain.getBlock(result.status.asFinalized);
//                     msg.block_number = block.block.header.number;
//                     msg.claiming_time = claim_time;
//                     msg.claimed = current_claimed;

//                     let local_storage = localStorage.getItem(currentAccount.address + "history-reward");
//                     // if there is no localstorage, we push the new array
//                     if (local_storage == null) {
//                         history.push(msg);
//                         localStorage.setItem(currentAccount.address + "history-reward", JSON.stringify(history));
//                     } else {
//                         let new_storage = JSON.parse(local_storage);
//                         // if exists, we push into the new item into the array
//                         console.log(new_storage);
//                         new_storage.push(msg);
//                         console.log(new_storage);
//                         localStorage.setItem(currentAccount.address + "history-reward", JSON.stringify(new_storage))
//                     }
//                     setOpen(false);
//                 }
//             })
//             setUnsub(() => unsub
//             )
//         }

//         console.log(`claimed all reward ? ${claimedAll}`);
//     }

//     return (
//         // <div className="app">
//         //     {/* {!contributor_status ? (
//         //         <Message
//         //             negative
//         //             compact
//         //             floating
//         //             header="You are not in the reward contributor list and have no access to claim the reward ! "
//         //             className="message-sty"
//         //         />
//         //     ) : (
//         //         null
//         //     )}

//         //     {claimedAll ? (
//         //         <Message
//         //             warning
//         //             compact
//         //             floating
//         //             header="You have claimed all your reward, No rewards left ! ! !"
//         //             className="message-sty"
//         //         />
//         //     ) : (
//         //         null
//         //     )} */}

//         //     {/* <div className="text-default">
//         //         <p className="dora-ksm-font">Dora-KSM crowdloan rewards</p>
//         //         {!contributor_status ? (
//         //             null
//         //         ) : (
//         //             <button className="claim-btn" onClick={() => handle_change()}>Claim Reward</button>
//         //         )}
//         //     </div> */}

//         //     <Navbar></Navbar>
//         //     <div>
//         //         <Backdrop
//         //             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         //             open={open}
//         //         >
//         //             <CircularProgress color="inherit" />
//         //         </Backdrop>
//         //     </div>
//         //     <RewardInfo></RewardInfo>
//         // </div>
//         <div className="app" >
//             <Navbar></Navbar>
//             <main className="main">
//                 <div className="index-wrap">
//                     <header className="index-header">
//                         <h1 className="index-header-headline">Dora-KSM Parachain</h1>
//                         <a className="index-header-link button-text-primary-md" target="_blank">View Dora-KSM Parachain Explore</a>
//                     </header>
//                     <section className="index-overview stat">
//                         <ul className="stat-data">
//                             <div className="stat-data-pair">
//                                 <div className="stat-data-value">11</div>
//                                 <div className="stat-data-label">Current block</div>
//                             </div>
//                             <div className="stat-data-pair">
//                                 <div className="stat-data-value">48 weeks</div>
//                                 <div className="stat-data-label">Parachain duration</div>
//                             </div>
//                             <div className="stat-data-pair">
//                                 <div className="stat-data-value">Kusama</div>
//                                 <div className="stat-data-label">Parachain network</div>
//                             </div>
//                             <div className="stat-data-pair">
//                                 <div className="stat-data-value">DORA</div>
//                                 <div className="stat-data-label">Primary token</div>
//                             </div>
//                             <div className="stat-data-pair">
//                                 <div className="stat-data-value">50,000.0000</div>
//                                 <div className="stat-data-label">Current total supply</div>
//                             </div>
//                             <div className="stat-data-pair">
//                                 <div className="stat-data-value">34</div>
//                                 <div className="stat-data-label">Connected parachains</div>
//                             </div>
//                         </ul>
//                     </section>
//                 </div>
//             </main>
//             <Footer></Footer>
//         </div>
//     );
// }

// export default Rewards;