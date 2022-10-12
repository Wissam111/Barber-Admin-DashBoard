import React, { useState, useContext } from "react";
import moment from "moment/moment";
import APIContext from "../Context/apiContext";
import AddServiceComp from "./AddServiceComp";
function SettingsForm(props) {
  const { user, isWorker, handleDeleteUser } = props;
  const [workerServs, setWorkerServs] = useState(user.services);
  const { UpdateUser, AddService, DeleteService } = useContext(APIContext);
  const handleDeleteServ = (title) => {
    let tempServs = workerServs.filter((ser) => {
      return ser.title != title;
    });
    setWorkerServs(tempServs);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let format = "yyyy-MM-DDTHH:mm:ssZZ";
    let fName = event.target[0].value;
    let lName = event.target[1].value;
    let phone = event.target[2].value;
    let birthDate = moment(event.target[3].value).format(format);
    let userObj = {
      // phone: phone,
      firstName: fName,
      lastName: lName,
      birthDate: birthDate,
      role: user.role,
    };
    UpdateUser(user._id, userObj);

    if (isWorker) {
      user.services.forEach((wServ) => {
        let s = workerServs.find((serv) => {
          return serv._id == wServ._id;
        });
        if (!s) {
          DeleteService(wServ._id);
        }
      });
      workerServs.forEach((serv) => {
        console.log(serv);
        if (!serv._id) {
          AddService(serv);
        }
      });
    }
  };
  const handleAddService = (newServData, setShowAddServ) => {
    let _serv = workerServs.find((service) => {
      return service.title == newServData.title;
    });
    if (_serv) {
      window.alert("Service Already Added");
      return;
    }

    let temp = [...workerServs];
    temp.push(newServData);
    // setShowAddServ(false);
    setWorkerServs(temp);
  };
  // const handleDeleteUser = async () => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     let res = await DeleteUser(user._id);
  //     console.log(res);
  //     window.alert(res.message);
  //     props.handleExitSettings();
  //   }
  // };

  return (
    <div
      className="registerform-container"
      onSubmit={(event) => handleSubmit(event)}
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
            <input type="text" defaultValue={user.firstName} required />
          </div>
          <div className="input-wrapper">
            <label>Last Name</label>
            <input type="text" defaultValue={user.lastName} required />
          </div>
          <div className="input-wrapper">
            <label>Phone Number</label>
            <input type="tel" defaultValue={user.phone} required />
          </div>
          <div className="input-wrapper">
            <label>Birth Date</label>
            <input
              type="date"
              defaultValue={moment(user.birthDate).format("yyyy-MM-DD")}
              required
            />
          </div>
          {isWorker && (
            <AddServiceComp
              user={user}
              handleDeleteServ={handleDeleteServ}
              handleAddService={handleAddService}
              workerServs={workerServs}
            />
          )}
        </div>
        <div className="settings-cta">
          <input className="submitBtn" type="submit" value={"Save Changes"} />
        </div>
      </form>
      <button
        className="deleteUserBtn"
        onClick={() => handleDeleteUser(user._id)}
      >
        Delete User
      </button>
    </div>
  );
}

export default SettingsForm;
