import React, { Component, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
class OTP extends Component {
  state = {
    inputsCode: [
      { id: 0, value: 0 },
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
    ],
  };

  handleKeyDown = (e) => {
    const codes = document.querySelectorAll(".code");
    const inCodes = [...this.state.inputsCode];
    let id = parseInt(e.target.id);
    let idCode = inCodes.find((ins) => ins.id == id);
    if (e.key >= 0 && e.key <= 9) {
      idCode.value = e.key;
      codes[id].value = "";
      setTimeout(() => codes[id + 1].focus(), 10);
    } else if (e.key === "Backspace") {
      setTimeout(() => codes[id - 1].focus(), 10);
    }
    this.setState({ inputsCode: inCodes });
  };

  render() {
    return (
      <div
        className="otp-cointainer"
        onSubmit={(event) =>
          this.props.handleVerify(event, this.state.inputsCode)
        }
      >
        <p>
          An four digit number has been sent to your phone please verify it
          below
        </p>
        <form className="otp-wrapper">
          <div className="code-container">
            {this.state.inputsCode.map((sinput) => {
              return (
                <input
                  key={sinput.id}
                  id={sinput.id}
                  type="number"
                  class="code"
                  placeholder="0"
                  min="0"
                  max="9"
                  required
                  onKeyDown={this.handleKeyDown}
                />
              );
            })}
          </div>
          {/* {this.props.loadLogin && (
            <div className="circle-wrapper">
              <CircularProgress />
            </div>
          )} */}
          <div className="loginVerf-container">
            <input className="loginBtn" type="submit" value={"VERIFY"} />
            {/* <i
              className="fa fa-arrow-left"
              aria-hidden="true"
              //   onClick={this.props.handleBack}
            ></i> */}
          </div>
        </form>
      </div>
    );
  }
}

export default OTP;
