import * as React from "react";
import "./styles.scss";

export  const Home = () => {
    return(
        <div className="mainblock">
            <h2>Welcom to admin app</h2>
            <label>
                Password
                <input type="password" required  placeholder="enter password"/>
            </label>
            <input type='submit' />
        </div>
    )
}