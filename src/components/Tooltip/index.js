import "./styles.scss";
export default function Tooltip({text}) {
    return <div className="main_tooltip">
        <b>?
        <div className="text">
            {text}
        </div>
        </b>
    </div>

}