

import "../../styles/rewards.css";
import '../../styles/page-default.css';


const RewardInfo = () => {
    return (
        <div className="reward-stat">
            <div className="reward-grid">
                <div>
                    <span className="p-font">8.9286</span>
                    <span className="p-doya"> DORA</span>
                    <p className="p-font2">Current claimable</p>
                </div>
                <div>
                    <span className="p-font">300</span>
                    <span className="p-doya"> DORA</span>
                    <p className="p-font2">Total rewards</p>
                </div>
                <div>
                    <span className="p-font">100</span>
                    <span className="p-doya"> KSM</span>
                    <p className="p-font2">Total contribution</p>
                </div>
            </div>
        </div>
    );
}


export default RewardInfo;