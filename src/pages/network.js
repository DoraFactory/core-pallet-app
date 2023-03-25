/// show the Dora-KSM Parachain Network Info.
import LeaseInfo from '../components/defaults/default-networks';
import RegisterEthAddr from '../components/registerEthAddr';

const Network = () => {

    return(
        <div className="App" >
            <div className="text-default">
                <p className="dora-ksm-font">Dora-KSM Parachain</p>
                <a  href="http://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.dwellir.com#/accounts"  className="explorer-sty">View Dora-KSM Parachain Explorer</a>
            </div>
            <LeaseInfo/>
            <RegisterEthAddr></RegisterEthAddr>
        </div>
    )
}

export default Network;
