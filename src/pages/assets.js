/// show different network's assets,eg: Dora-KSM Parchain, Kusama, Listmus, Parallel, etc...
import "../styles/assets.scss"
import config from "../context/config"
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/less/layout/stickyfooter.css";
import "../styles/less/page/tokens.css";
import "../styles/less/component/table.css";
import "../styles/less/page/index.css";
import Icons from "../resources";
import AssetInfo from "../components/asset_info";
const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;
const Assets = () => {
    return (
        <div className="app">
            <Navbar></Navbar>
            <main className="main">
                {/* <div className="message"></div> */}
                <div className="index-wrap">
                    <header className="index-header">
                        <h1 className="index-header-headline">Your assets</h1>
                        <a className="index-header-link button-text-primary-md" target="_blank">View Dora-KSM Parachain Stats</a>
                    </header>
                    <AssetInfo></AssetInfo>
                    <section className="index-source">
                        <div className="index-source-text">
                            <h2 className="index-source-text-title">Transfer assets between parachains</h2>
                            <p className="index-source-text-desc">Please check out the Substrate documentation to learn more information about the HRMP pallet.</p>
                        </div>
                        <a className="index-source-button button-pill-primary-md" rel="noopener external nofollow noreferrer">Documentation</a>
                    </section>
                </div>
            </main>

            <Footer></Footer>
        </div>
    );
}

export default Assets;