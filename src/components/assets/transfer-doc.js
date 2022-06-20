import config from "../../context/config"

const TransDoc = () => {
    return(
        <div className="docbody-div">
            <div className="doc-div">
                <span className="noacc-p"> Transfer assets between parachains</span>
                <span className="p2">Please check out the Substrate documentation to learn more information about the HRMP pallet.</span>
            </div>
            <button className="doc">
                <a href={config.HRMP_DOC} target="_blank" className="doc-sty">Documention</a>
            </button>
        </div>
    )
}

export default TransDoc;