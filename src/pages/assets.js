/// show different network's assets,eg: Dora-KSM Parchain, Kusama, Listmus, Parallel, etc...

import react from 'react';
import Header from '../components/header';
import TableSingleLine from '../components/table';
import TransDoc from '../components/assets/transfer-doc';
import Footer from '../components/footer';
import '../styles/assets.css';
const Assets = () => {
    return(
        <div className="App">
            <Header></Header>
            <div className="text-default">
                <p className="font1">Your Assets</p>
                {/* TODO：文字页上脚*/}
                <a className="explorer-sty">View Dora-KSM Parachain Stats</a>
            </div>
            <TableSingleLine className="tb"></TableSingleLine>
            <TransDoc></TransDoc>
            <Footer></Footer>
        </div>
    );
}

export default Assets;