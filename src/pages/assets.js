/// show different network's assets,eg: Dora-KSM Parchain, Kusama, Listmus, Parallel, etc...
import "../styles/assets.scss"
import TableSingleLine from '../components/table';
import TransDoc from '../components/assets/transfer-doc';
import config from "../context/config"

const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;
const Assets = () => {
    return (
        <div className="App">
            <div className="text-default">
                <p className="dora-ksm-font">Your assets</p>
                <a href={dora_ksm_parachain_explore} target="_blank" className="explorer-sty">View Dora-KSM Parachain Stats</a>
            </div>
            <div className="tb-line">
                <TableSingleLine className="tb"></TableSingleLine>
            </div>
            <TransDoc></TransDoc>
        </div>
    );
}

export default Assets;