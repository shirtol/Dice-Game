import PopUp from "../PopUp/PopUp";
import "./HowToPlayPopUp.css";

const HowToPlayPopUp = ({ isShown, onCloseWindow }) => {
    return (
        <PopUp isShown={isShown} popupClass="instructions-popup-container">
            <i className="fa-solid fa-xmark" onClick={onCloseWindow}></i>
            <h2 className="how-to-play-title">How To Play</h2>
            <p className="instructions">
                Try to reach the desired score, if one of you goes over it they
                LOSE. <br></br> Hitting double 6's will cause your score to
                reset and your turn will end
            </p>
        </PopUp>
    );
};

export default HowToPlayPopUp;
