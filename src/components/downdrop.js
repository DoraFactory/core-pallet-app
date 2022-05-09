import {React, useEffect} from 'react';
import "../styles/page-default.scss"
import {useSubstrate ,useSubstrateState} from '../context';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const acctAddr = acct => (acct ? acct.address : '')

const Main = (props) => {
    const {
        setCurrentAccount,
        state: { keyring, currentAccount },
    } = useSubstrate()

    // Get the list of accounts we possess the private key for
    const keyringOptions = keyring.getPairs().map(account => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase(),
        icon: 'user',
    }))

    const initialAddress =
        keyringOptions.length > 0 ? keyringOptions[0].value : ''

    // Set the initial address
    useEffect(() => {
        // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
        !currentAccount &&
            initialAddress.length > 0 &&
            setCurrentAccount(keyring.getPair(initialAddress))
    }, [currentAccount, setCurrentAccount, keyring, initialAddress])

    const handleChange = addr => {
        setCurrentAccount(keyring.getPair(addr))
    }
    
    return (
        <div>
            <label>
                <select
                    onChange={(dropdown) => {
                        handleChange(dropdown.target.value)
                    }}
                    className="connect-wallet">
                    {keyringOptions.map((option) => (
                        <option value={option.value} >
                            <div className="account-id">
                                {option.text}
                            </div>
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default function Downdrop (props) {
    const { api, keyring } = useSubstrateState()
    return keyring.getPairs && api.query ? <Main {...props} /> : null
};