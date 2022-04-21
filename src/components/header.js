import "../styles/page-default.css";
import Selecting from "./select";
const Header = () => {
    return (
        <div className="header-default" >
            <div className="nav-brand">
                CORE Pallet
            </div>
            <div className="select-bd">
                <Selecting></Selecting>
            </div>
        </div>
    );
}

export default Header;