import React, { Component, useState } from "react";
import moment from "moment/moment";
function SettingsForm(props) {
  const { worker } = props;
  const [workerChecked, setworkerChecked] = useState(false);
  const [customerChecked, setcustomerChecked] = useState(false);
  const [workerServs, setWorkerServs] = useState(worker.services);
  const [showServices, setShowServices] = useState(false);
  

  function Service(props) {
    return (
      <div className="service-container">
        <span>{props.service.title}</span>
        <i className="fa fa-trash" aria-hidden="true" onClick={()=>props.handleDeleteServ(props.service._id)}></i>
      </div>
    );
  }
  const handleDeleteServ=(servId)=>{
  let tempServs = workerServs.filter(ser=>{
     return ser._id !=servId;

  })
  setWorkerServs(tempServs);

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
            <input type="text" defaultValue={worker.firstName}  />
          </div>
          <div className="input-wrapper">
            <label>Last Name</label>
            <input type="text" defaultValue={worker.lastName} />
          </div>
          <div className="input-wrapper">
            <label>Phone Number</label>
            <input type="tel" defaultValue={worker.phone} />
          </div>
          <div className="input-wrapper">
            <label>Birth Date</label>
            {/* yyyy-MM-DD */}
            <input type="date"  defaultValue={moment(worker.birthDate).format("yyyy-MM-DD")}/>
          </div>

          <div className="services-container">
          
            <label>Services:</label>
              <i
              className="fa-sharp fa-solid fa-circle-chevron-down"
              onClick={()=>setShowServices(!showServices)}
            ></i>
            {showServices &&workerServs.map((service) => {
              return <Service service={service} handleDeleteServ={handleDeleteServ}/>;
            })}
          </div>
        </div>
        <input className="submitBtn" type="submit" value={"Save Changes"} />

      </form>
    </div>
  );
}

export default SettingsForm;
