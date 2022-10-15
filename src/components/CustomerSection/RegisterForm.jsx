import React, { Component, useState } from "react";
function RegisterForm(props) {
  const [workerChecked, setworkerChecked] = useState(false);
  const [customerChecked, setcustomerChecked] = useState(false);

  return (
    <div
      className="registerform-container"
      onSubmit={(event) => props.handleSubmit(event, customerChecked)}
    >
      <h1>Register User</h1>
      <form className="register-inputs">
        <div className="inputs">
          <div className="input-wrapper">
            <label>First Name</label>
            <input type="text" required />
          </div>
          <div className="input-wrapper">
            <label>Last Name</label>
            <input type="text" required />
          </div>
          <div className="input-wrapper">
            <label>Phone Number</label>
            <input type="tel" required />
          </div>
          <div className="input-wrapper">
            <label>Birth Date</label>
            <input type="date" required />
          </div>

          <div className="input-wrapper checkboxType">
            <label>Worker</label>
            <input
              className="Checkbox"
              type="checkbox"
              disabled={customerChecked ? true : false}
              onChange={() => setworkerChecked(!workerChecked)}
            />
            <label>Customer</label>
            <input
              className="Checkbox"
              type="checkbox"
              disabled={workerChecked ? true : false}
              onChange={() => setcustomerChecked(!customerChecked)}
            />
          </div>
        </div>
        <input className="submitBtn" type="submit" value={"Create user"} />
      </form>
    </div>
  );
}

export default RegisterForm;
