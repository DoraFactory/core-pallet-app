/// show the Dora-KSM Parachain Network Info.
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import "../styles/less/page/index.css";
import "../styles/less/component/stat.css";
import "../styles/less/component/button.css";
import "../styles/less/component/footer.css";
import "../styles/less/basis.css";
import "../styles/less/page/tokens.css";
import "../styles/less/component/table.css";
import "../styles/less/page/index.css";
import "../styles/less/layout/stickyfooter.css";

const Rewards = () => {
    return (
        <div className="app" >
            <Navbar></Navbar>
            <main className="main">
                <div className="index-wrap">
                    <header className="index-header">
                        <h1 className="index-header-headline">Dora-KSM Crowdloan rewards</h1>
                        <a className="index-header-link button-pill-primary-md">Claim Reward</a>
                    </header>
                    <section className="index-overview stat">
                        <ul className="stat-data">
                            <div className="stat-data-pair">
                                <div className="stat-data-value">
                                    8.34234
                                    <small>DORA</small>
                                </div>
                                <div className="stat-data-label">Current claimable</div>
                            </div>
                            <div className="stat-data-pair">
                                <div className="stat-data-value">
                                    300
                                    <small>DORA</small>
                                </div>
                                <div className="stat-data-label">Total rewards</div>
                            </div>
                            <div className="stat-data-pair">
                                <div className="stat-data-value">
                                    100
                                    <small>KSM</small>
                                </div>
                                <div className="stat-data-label">Total contribution</div>
                            </div>
                        </ul>
                    </section>
                </div>
                <div className="tokens-wrap">
                    <div className="tokens-color">
                        <div className="tokens-rewards-table table">
                            <div className="table-wrap">
                                <div className="table-head">
                                    <div className="table-row">
                                        <div className="table-cell">
                                            <p>block#</p>
                                        </div>
                                        <div className="table-cell">
                                            <p>claiming time</p>
                                        </div>
                                        <div className="table-cell">
                                            <p>amountL</p>
                                        </div>
                                        <div className="table-cell">
                                            <p>token symbol</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-body">
                                    <div className="table-row">
                                        <div className="table-cell">
                                            <code>12</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>2022/07/16 19:42</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>100.23</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>DORA</code>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell">
                                            <code>143</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>2022/07/17 22:23</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>23.23</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>DORA</code>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell">
                                            <code>423</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>2022/07/18 10:23</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>13.23</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>DORA</code>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell">
                                            <code>493</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>2022/07/18 10:32</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>53.23</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>DORA</code>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell">
                                            <code>743</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>2022/07/18 12:44</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>90.45433</code>
                                        </div>
                                        <div className="table-cell">
                                            <code>DORA</code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="tokens-note">
                            The total rewards will be linearly released by block. The reward claiming transcation need to wait about 12s.
                            Attention: Each claiming transaction need to pay some transaction fee
                        </p>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Rewards;