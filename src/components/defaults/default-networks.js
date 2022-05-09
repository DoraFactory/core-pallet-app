/// default lease info

import React, {useState, useEffect} from "react";
// import '../../styles/page-default.css';
import { useSubstrateState } from "../../context";

const LeaseInfo = (props) => {
    const { api } = useSubstrateState()
    const { finalized } = props
    const [blockNumber, setBlockNumber] = useState(0)

    const bestNumber = finalized
        ? api.derive.chain.bestNumberFinalized
        : api.derive.chain.bestNumber

    useEffect(() => {
        let unsubscribeAll = null

        bestNumber(number => {
            // Append `.toLocaleString('en-US')` to display a nice thousand-separated digit.
            setBlockNumber(number.toNumber().toLocaleString('en-US'))
        })
            .then(unsub => {
                unsubscribeAll = unsub
            })
            .catch(console.error)

        return () => unsubscribeAll && unsubscribeAll()
    }, [bestNumber])

    return (
        <div className="body">
            <div className="body-default">
                <div>
                    <p className="p-font">{blockNumber}</p>
                    <p className="p-font2">Current block</p>
                </div>
                <div>
                    <p className="p-font">48 weeks</p>
                    <p className="p-font2">Parachain duration</p>

                </div>
                <div>
                    <p className="p-font">Kusama</p>
                    <p className="p-font2">Parachain network</p>

                </div>
                <div>
                    <span className="p-font">DORA </span>
                    <span className="p-doya">Dorayaki</span>
                    <p className="p-font2">Primary token</p>

                </div>
                <div>
                    <span className="p-font">30,000</span>
                    <p className="p-font2">Current total supply</p>

                </div>
                <div>
                    <p className="p-font">12</p>
                    <p className="p-font2">Connected parachains</p>

                </div>
            </div>
        </div>
    );
}


export default LeaseInfo;