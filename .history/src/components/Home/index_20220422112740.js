import * as React from "react";
import "./styles.scss";

export  const Home = () => {
    return(
        <div className="mainblock">
            <h2>Welcom to admin app</h2>
            <label>               
                <input type="password" required  placeholder="enter password"/>
            </label>
            <button type='submit'>SUBMIT</button> 
        </div>
    )
}