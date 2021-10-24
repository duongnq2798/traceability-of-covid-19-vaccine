import React from 'react';
import "../../assets/scss/_cardtotal.scss";

const CardTotal = ({srcImg, quantity, desc}) => {
    return (
        <React.Fragment>
            <div className="card-total">
                <img className="card-total_img" src={srcImg} alt=""/>
                <p className="card-total_title text-3xl font-bold mt-3">{quantity}</p>
                <p className="card-total_subtitle font-bold text-md mt-3">{desc}</p>
            </div>
        </React.Fragment>
    )
}

export default CardTotal;