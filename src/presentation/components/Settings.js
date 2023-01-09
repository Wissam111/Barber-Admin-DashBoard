import { useState } from "react";
import SettingsForm from "./SettingsForm";
// import AddService from "./AddService";
function Settings(props) {
  const { handleExitSettings, user, isWorker, handleDeleteUser } = props;

  return (
    <div className="settings-container">
      {/* <img
        src={
          user.image != null
            ? `https://saloon-ibra-api.herokuapp.com/imgs/${user.image}`
            : require("../../assets/imgs/unknown.png")
        }
        alt=""
      /> */}

      <SettingsForm
        handleExitSettings={handleExitSettings}
        user={user}
        isWorker={isWorker}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
}

export default Settings;
