import Reward from "./pages/rewards";
import Network from "./pages/network";
import Assets from "./pages/assets";
import DefaultPage from "./pages/default";
import Icons from "./resources";
import img from './resources/icons/dora.png'
import Header from "./components/header";
import Downdrop from "./components/downdrop";
import {
    Container,
    Dimmer,
    Loader,
    Grid,
    Sticky,
    Message,
} from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'
import { SubstrateContextProvider, useSubstrateState } from "./context";


function Main () {
    // get substrate context
    const { apiState, apiError, keyringState, currentAccount } = useSubstrateState();

    // loading message
    const loader = text => (
        <Dimmer active>
            <Loader size="small">{text}</Loader>
        </Dimmer>
    )
    // some message to handle error
    const message = errObj => (
        <Grid centered columns={2} padded>
            <Grid.Column>
                <Message
                    negative
                    compact
                    floating
                    header="Error Connecting to Substrate"
                    content={`Connection to websocket '${errObj.target.url}' failed.`}
                />
            </Grid.Column>
        </Grid>
    )

    // 
    if (apiState === 'ERROR') return message(apiError)
    else if (apiState !== 'READY') return loader('Connecting to Substrate')

    if (keyringState !== 'READY') {
        return loader(
            "Loading accounts (please review any extension's authorization)"
        )
    }

    return (
        <Header></Header>
        // <DefaultPage></DefaultPage>
    );
}

export default function App () {
    return (
        <SubstrateContextProvider>
            <Main />
        </SubstrateContextProvider>
    )
};

// export default App();