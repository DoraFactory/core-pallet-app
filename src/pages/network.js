/// show the Dora-KSM Parachain Network Info.
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import LeaseInfo from "../components/defaults/default-networks";
import "../styles/less/page/index.css";
import "../styles/less/component/stat.css";
import "../styles/less/component/button.css";
import "../styles/less/component/footer.css";
import "../styles/less/basis.css";
import "../styles/less/layout/stickyfooter.css";

const Network = () => {
    return (
        <div className="app" >
            <Navbar></Navbar>
            <main className="main">
                <div className="index-wrap">
                    <header className="index-header">
                        <h1 className="index-header-headline">Dora-KSM Parachain</h1>
                        <a className="index-header-link button-text-primary-md" target="_blank">View Dora-KSM Parachain Explore</a>
                    </header>
                    <LeaseInfo></LeaseInfo>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Network;
