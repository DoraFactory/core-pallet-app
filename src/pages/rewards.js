
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/assets.css';
import RewardInfo from '../components/rewards/rewards-info'
import Block from '../components/rewards/block'
const Reward = () => {
    return (
        <div>
            {/* <Header></Header> */}
            <div className="text-default">
                <p className="font1">Dora-KSM crowdloan rewards</p>
                {/* TODO：文字页上脚*/}
                <button className="claim-btn">Claim Reward</button>
            </div>
            <RewardInfo></RewardInfo>
            <Block></Block>
            <div className="content-info">
                The reward distribution started when Dora-KSM Parachain launched. The total rewards will be linearly released by block. The transcation fee of each claim is 0.125 DORA.
            </div>
            <Footer></Footer>
        </div>
    );
}


export default Reward;