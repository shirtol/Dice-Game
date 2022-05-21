import Button from "../Button/Button";
import LabeledInput from "../LabeledInput/LabeledInput";
import PopUp from "../PopUp/PopUp";
import "./StartGamePopUp.css";

const StartGamePopUp = ({
    playerOneName,
    playerTwoName,
    scoreToWin,
    isShown,
    startGameMsg,
    pickNameMsg,
    whenPlayer1EnteredName,
    whenPlayer2EnteredName,
    scoreToWinChange,
    startGame,
}) => {
    const disableStartGame = () =>
        playerOneName.length === 0 ||
        playerTwoName.length === 0 ||
        isNaN(scoreToWin);

    return (
        <PopUp isShown={isShown} popupClass="start-game-popup-container">
            <i className="fa-solid fa-question fa-2x"></i>
            <h2 className="new-game-title">{startGameMsg}</h2>
            <h3 className="pick-name-title">{pickNameMsg}</h3>
            <div className="name-input-container">
                <LabeledInput
                    maxInputLength={8}
                    inputType="text"
                    value={playerOneName}
                    onInputChange={whenPlayer1EnteredName}
                    inputLabel="Player 1 name"
                ></LabeledInput>
                <LabeledInput
                    maxInputLength={8}
                    inputType="text"
                    value={playerTwoName}
                    onInputChange={whenPlayer2EnteredName}
                    inputLabel="Player 2 name"
                ></LabeledInput>
            </div>
            <div className="score-to-win-container">
                <h3 className="score-to-win-title">Enter Score To Win</h3>
                <LabeledInput
                    inputType="number"
                    value={scoreToWin}
                    onInputChange={scoreToWinChange}
                    inputLabel="SCORE TO WIN"
                ></LabeledInput>
            </div>
            <Button
                handleClick={startGame}
                buttonText="START"
                iconClass="fa-solid fa-play fa-2x"
                disabled={disableStartGame()}
            ></Button>
        </PopUp>
    );
};

export default StartGamePopUp;
