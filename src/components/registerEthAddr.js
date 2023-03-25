import React, { useRef, useState } from "react";
import config from "../context/config"
import { useSubstrateState } from '../context';
import { web3FromSource } from '@polkadot/extension-dapp';
import { ethereumEncode, isEthereumAddress } from '@polkadot/util-crypto';
import { hexToU8a, isHex } from '@polkadot/util';
import { useToasts } from "react-toast-notifications"


const RegisterEthAddr = () => {

    const { api, currentAccount, keyring } = useSubstrateState();
    const [unsub, setUnsub] = useState(null)
    const [currEthAddr, setCurrEthAddr] = useState(String);
    const ethAddr = useRef();
    const { addToast } = useToasts()


    const ErrorMsg = (content) => {
        addToast(content, {
            appearance: 'error', autoDismiss: true,
        })
    }

    const RegisterSuccess = (content) => {
        addToast(content, {
            appearance: 'success', autoDismiss: true,
        })
    }

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

    const toH160Addr = (value) => {
        if (value) {
            try {
                const u8a = keyring.decodeAddress(value);

                if (u8a.length === 20) {
                    return ethereumEncode(u8a);
                } else {
                    return keyring.encodeAddress(u8a);
                }
            } catch {
                // undefined return below indicates invalid/transient
            }
        }
        return undefined;
    }

    // register ETH address
    const handle_register = async () => {
        const fromAcct = await getFromAcct();
        console.log(`start register...`)

        console.log(ethAddr.current.value)
        console.log(toH160Addr(ethAddr.current.value))

        if (typeof toH160Addr(ethAddr.current.value) !== 'undefined') {
            let txExecute = api.tx.doraRewards.registerEthAddress(toH160Addr(ethAddr.current.value));
            const unsub = txExecute.signAndSend(...fromAcct, async result => {
                if (result.status.isInBlock) {
                    console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                    console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                    RegisterSuccess("Register ETH address successfully!")
                }
            })
            setUnsub(() => unsub)
            console.log(`end register...`)
        } else {
            ErrorMsg("Please enter a correct Ethereum address");
        }
    }

    return (
        <div className="docbody-div">
            <div className="doc-div">
                <span className="noacc-p"> Register ETH Address</span>
                <span className="p2-register">You need to register an ETH adder so that we can distribute your Dora rewards to the ETH network</span>
                <input className="register"
                    placeholder="please input your ETH address"
                    ref={ethAddr}
                ></input>
                <p>fsdafdsfsda</p>
            </div>
            <button className="reg-but" onClick={() => handle_register()}>
                <strong>Register</strong>
            </button>
        </div>
    )
}

export default RegisterEthAddr;