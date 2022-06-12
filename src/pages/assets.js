/// show different network's assets,eg: Dora-KSM Parchain, Kusama, Listmus, Parallel, etc...
import "../styles/assets.scss"
import TableSingleLine from '../components/table';
import TransDoc from '../components/assets/transfer-doc';
import Footer from '../components/footer';
const Assets = () => {
    return (
        <div className="App">
            <div className="text-default">
                <p className="dora-ksm-font">Your assets</p>
                <a href="http://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.dwellir.com#/accounts" className="explorer-sty">View Dora-KSM Parachain Stats</a>
            </div>
            <div className="tb-line">
                <TableSingleLine className="tb"></TableSingleLine>
            </div>
            <TransDoc></TransDoc>
            <Footer></Footer>
        </div>
    );
}

export default Assets;