import "./LabeledInput.css";

const LabeledInput = ({ scoreToWin, onInputChange }) => {
    const changeScoreToWin = (e) => {
        onInputChange(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div className="input-container">
            <input
                type="text"
                value={scoreToWin}
                onChange={changeScoreToWin}
            ></input>
            <label className={scoreToWin && "filled"}>SCORE TO WIN</label>
        </div>
    );
};

export default LabeledInput;
