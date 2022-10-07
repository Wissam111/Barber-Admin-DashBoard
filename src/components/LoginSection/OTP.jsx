import React, { Component } from "react";

function OTP(props) {
  const handleKeyDown = (e, idx) => {
    const codes = document.querySelectorAll(".code");
    if (e.key >= 0 && e.key <= 9) {
      codes[idx].value = "";
      setTimeout(() => codes[idx + 1].focus(), 10);
    } else if (e.key === "Backspace") {
      setTimeout(() => codes[idx - 1].focus(), 10);
    }
  };
  return (
    <div
      className="otp-cointainer"
      onSubmit={(event) => props.handleVerf(event)}
    >
      <p>
        An four digit number has been sent to your phone please verify it below
      </p>
      <form className="otp-wrapper">
        <div className="code-container">
          <input
            type="number"
            class="code"
            placeholder="0"
            min="0"
            max="9"
            required
            onKeyDown={handleKeyDown}
          />
          <input
            type="number"
            class="code"
            placeholder="0"
            min="0"
            max="9"
            required
            onKeyDown={handleKeyDown}
          />
          <input
            type="number"
            class="code"
            placeholder="0"
            min="0"
            max="9"
            required
            onKeyDown={handleKeyDown}
          />
          <input
            type="number"
            class="code"
            placeholder="0"
            min="0"
            max="9"
            required
            onKeyDown={handleKeyDown}
          />
        </div>

        <i
          class="fa fa-arrow-left"
          aria-hidden="true"
          onClick={props.handleBack}
        ></i>
        <input className="submitOtpBtn" type="submit" value={"VERIFY"} />
      </form>
    </div>
  );
}

export default OTP;
