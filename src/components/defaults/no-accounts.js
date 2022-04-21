/// no accounts
import '../../styles/page-default.css';

const polkadot = "polkadot{.js}";

const NoAccount = () => {
    return (
        <div className="body-noacc">
            <div className="noacc-div">
                <span className="noacc-p"> Haven't got an account?</span>
                <span className="noacc-p2">You can create a new account and connect to the Core Pallet with {polkadot} extension.</span>
            </div>
            <button className="get-account">Get {polkadot} Extension</button>
        </div>
    );
}

export default NoAccount;