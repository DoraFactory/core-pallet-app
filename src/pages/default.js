
/// default page(unlogged pages)

import '../styles/page-default.css';
import LeaseInfo from '../components/defaults/default-networks';
import NoAccount from "../components/defaults/no-accounts";
import Footer from "../components/footer";

const DefaultPage = () => {
    return (
        <div className="App" >
            <div className="header-default" >
                <div className="nav-brand">
                    CORE Pallet
                </div>
                <div className="nav-account">
                    <button className="wallet">Connect Wallet</button>
                </div>
            </div>
            <div className="text-default">
                <p className="font1">Dora-KSM Parachain</p>
                {/* TODO：文字页上脚*/}
                <a className="explorer-sty">View Dora-KSM Parachain Explorer</a>
            </div>
            <LeaseInfo />
            <NoAccount />
            <Footer></Footer>
        </div>
    );
}

/// message-default


/// message-error


/// multi-messages


export default DefaultPage;