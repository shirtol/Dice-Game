import "./LabeledInput.css";

const LabeledInput = ({
    value,
    onInputChange,
    inputLabel,
    inputType,
    maxInputLength,
}) => {
    const changeScoreToWin = (e) => {
        onInputChange(e.target.value);
    };

    return (
        <div className="input-container">
            <input
                type={inputType}
                value={value}
                onChange={changeScoreToWin}
                maxLength={maxInputLength}
            ></input>
            <label className={value && "filled"}>{inputLabel}</label>
        </div>
    );
};

export default LabeledInput;
