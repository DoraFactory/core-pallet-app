/// default lease info
import React, { useState, useEffect } from "react";
import { useSubstrateState } from "../../context";
import { formatBalance } from '@polkadot/util'
const LeaseInfo = (props) => {
    const { api } = useSubstrateState()
    const { finalized } = props
    const [blockNumber, setBlockNumber] = useState(0)
    const [totalsupply, setTotalSupply] = useState(0)
    const chainDecimals = api.registry.chainDecimals[0];
    formatBalance.setDefaults({ unit: '' });
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


    // DoraFactory has no inflation, so the total supply equals the total issurance
    useEffect(() => {
        let unsubscribeAll = null
        api.query.balances.totalIssuance(total => {
            const free = formatBalance(total, { withSi: false, forceUnit: '-'  }, chainDecimals);
            setTotalSupply(free);
        })
            .then(unsub => {
                unsubscribeAll = unsub
            })
            .catch(console.error)

        return () => unsubscribeAll && unsubscribeAll()
    }, [api, setTotalSupply])

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
                    <span className="p-font">{totalsupply}</span>
                    <p className="p-font2">Current total supply</p>

                </div>
                <div>
                    <p className="p-font">34</p>
                    <p className="p-font2">Connected parachains</p>

                </div>
            </div>
        </div>
    );
}


export default LeaseInfo;