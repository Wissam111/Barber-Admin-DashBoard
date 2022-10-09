import { useState } from "react";
import SettingsForm from "./SettingsForm";
function Settings(props) {
  const { worker } = props;

  return (
    <div className="settings-container">
      <img
        src={
          worker.image != null
            ? `https://saloon-ibra-api.herokuapp.com/imgs/${worker.image}`
            : require("./../../imgs/unknown.png")
        }
        alt=""
      />

      <SettingsForm
        handleExitSettings={props.handleExitSettings}
        worker={worker}
      />
    </div>
  );
}

export default Settings;
