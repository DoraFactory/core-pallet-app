/// no accounts
// import '../../styles/page-default.css';
import Icons from "../../resources/index";

const polkadot = "polkadot{.js}";

const NoAccount = () => {
    return (
        <div className="body-noacc">
            <div className="noacc-div">
                <span className="noacc-p"> Haven't got an account?</span>
                <span className="noacc-p2">You can create a new account and connect to the Core Pallet with {polkadot} extension.</span>
            </div>
            <div className="btn-link">
                <button className="get-account">Get {polkadot} Extension</button>
                <img src={Icons.Arrow}></img>
            </div>

        </div>
    );
}

export default NoAccount;