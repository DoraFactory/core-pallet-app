/// default page(unlogged pages)
///
import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/page-default.scss';
import LeaseInfo from '../components/defaults/default-networks';
import NoAccount from "../components/defaults/no-accounts";
import Icons from "../resources/index";

const DefaultPage = () => {
    const navigate =  useNavigate();
    
    const handle_change = () => {
        navigate("/account")
    }
    return (
        <div className="App" >
            <div className="header-default" >
                <div className="nav-brand">
                    CORE Pallet
                </div>
                <div className="nav-account">
                    <button onClick={() => handle_change()} className="wallet">Connect Wallet</button>
                </div>
            </div>
            <div className="text-default">
                <p className="font1">Dora-KSM Parachain</p>
                {/* TODO：文字页上脚*/}
                <div className="icon-link">
                    <a href="http://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.dwellir.com#/accounts" className="explorer-sty">View Dora-KSM Parachain Explorer</a>
                    <img src={Icons.Arrow} className="icon-sty"></img>
                </div>
            </div>
            <LeaseInfo />
            <NoAccount />
            {/* <Footer></Footer>
             */}
            <div className="foot-default">
                <span className="foot-font">© 2022 Dora Factory</span>
                <span className="foot-font">·</span>
                <a className="foot-font">Feedback</a>
            </div>
        </div>
    );
}

export default DefaultPage;