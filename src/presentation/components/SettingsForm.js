import { useState } from "react";
import moment from "moment/moment";
import AddServiceComp from "./AddServiceComp.js";
import SelectImageView from "./SelectImageView.js";

function SettingsForm(props) {
  const {
    user,
    isWorker,
    handleDeleteUser,
    handleExitSettings,
    updateUser,
    addService,
    deleteService,
    refresh,
    uploadImage,
  } = props;

  //selectedFile?.data
  const [workerServs, setWorkerServs] = useState(user.services);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleDeleteServ = (title) => {
    let tempServs = workerServs.filter((ser) => {
      return ser.title != title;
    });
    setWorkerServs(tempServs);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let format = "yyyy-MM-DDTHH:mm:ssZZ";
    let fName = event.target[0].value;
    let lName = event.target[1].value;
    let phone = event.target[2].value;
    let birthDate = moment(event.target[3].value).format(format);
    let changePhone = phone != user.phone;
    let userObj = {};
    if (changePhone) {
      userObj = {
        firstName: fName,
        lastName: lName,
        birthDate: birthDate,
        phone: phone,
        role: user.role,
      };
    } else {
      userObj = {
        firstName: fName,
        lastName: lName,
        birthDate: birthDate,
        role: user.role,
      };
    }
    let status = await updateUser(user._id, userObj);
    // await uploadImage(selectedFile);
    console.log(status);
    if (status == 200) {
      if (isWorker) {
        user.services.forEach((wServ) => {
          let s = workerServs.find((serv) => {
            return serv._id == wServ._id;
          });
          if (!s) {
            deleteService(wServ._id);
          }
        });
        workerServs.forEach((serv) => {
          if (!serv._id) {
            addService(serv);
          }
        });
      }
      window.alert("User update successfully");
    } else {
      window.alert(status);
    }
    refresh();
    handleExitSettings();
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
    setShowAddServ(false);
    setWorkerServs(temp);
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length == 0) {
      setSelectedFile(undefined);
      return;
    }
    const selectedFile = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log(selectedFile);
    setSelectedFile(selectedFile);
  };

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
      {/* <SelectImageView
        currImg={user?.image}
        onSelectFile={onSelectFile}
        selectedFile={selectedFile}
      /> */}
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
