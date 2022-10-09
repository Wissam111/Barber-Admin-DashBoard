import React, { Component, useState } from "react";
import moment from "moment/moment";
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
              type="checkbox"
              disabled={customerChecked ? true : false}
              onChange={() => setworkerChecked(!workerChecked)}
            />
            <label>Customer</label>
            <input
              type="checkbox"
              disabled={workerChecked ? true : false}
              onChange={() => setcustomerChecked(!customerChecked)}
            />
          </div>

          {workerChecked && (
            <div className="input-wrapper">
              <label>Service</label>
              <select id="algos" name="algos">
                <option value="Hair Cut">Hair Cut</option>
                <option value="Face Cut">Face Cut</option>
                <option value="Wax">Wax</option>
                <option value="Massage">Massage</option>
              </select>
            </div>
          )}
        </div>
        <input className="submitBtn" type="submit" value={"Create user"} />
        {/* Create User
        </input> */}
      </form>
    </div>
  );
}

export default RegisterForm;
