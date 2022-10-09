import React, { Component, useState } from "react";
import moment from "moment/moment";
function SettingsForm(props) {
  const { worker } = props;
  const [workerChecked, setworkerChecked] = useState(false);
  const [customerChecked, setcustomerChecked] = useState(false);
  const [workerServ, setWrokerServ] = useState(worker.services);
  const [showServices, setShowServices] = useState(false);
  function Service(props) {
    return (
      <div className="service-container">
        <span>{props.service.title}</span>
        <i className="fa fa-trash" aria-hidden="true"></i>
      </div>
    );
  }

  return (
    <div
      className="registerform-container"
      onSubmit={(event) => props.handleSubmit(event, customerChecked)}
    >
      <i
        className="fa fa-times closeSettings"
        aria-hidden="true"
        onClick={props.handleExitSettings}
      ></i>
      <form className="register-inputs">
        <div className="inputs">
          <div className="input-wrapper">
            <label>First Name</label>
            <input type="text" value={worker.firstName} required />
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

          <div className="services-container">
            {/* <i
              className="fa-sharp fa-solid fa-circle-chevron-down"
              onClick={setShowServices(!showServices)}
            ></i> */}
            <label>Services:</label>
            {workerServ.map((service) => {
              return <Service service={service} />;
            })}
          </div>
        </div>
        <input className="submitBtn" type="submit" value={"Save Changes"} />
      </form>
    </div>
  );
}

export default SettingsForm;
