/// show different network's assets,eg: Dora-KSM Parchain, Kusama, Listmus, Parallel, etc...

import react from 'react';
import Header from '../components/header';
import TableSingleLine from '../components/table';
import TransDoc from '../components/assets/transfer-doc';
import Footer from '../components/footer';
import '../styles/assets.css';
const Assets = () => {
    return (
        <div className="App">
            <div className="text-default">
                <p className="font1">Your assets</p>
                <a className="explorer-sty">View Dora-KSM Parachain Stats</a>
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