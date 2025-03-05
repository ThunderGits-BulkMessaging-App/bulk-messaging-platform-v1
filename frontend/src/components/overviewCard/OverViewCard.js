import React from "react";
import "./overViewCard.css";

function OverViewCard({ icon, number, subtitle }) {
  return (
    <div>
      <div class='overview_card'>
        <div class='overview_card__icon'>
          <i class={icon}></i>
        </div>
        <div class='overview_card__info'>
          <div className='overview_card_wrap'>
            <h2 class='overview_card__title'>{number}</h2>
            <p class='overview_card__subtitle'>{subtitle}</p>
          </div>
          {/* <p class='card__number'>dff</p> */}
        </div>
      </div>
    </div>
  );
}

export default OverViewCard;
