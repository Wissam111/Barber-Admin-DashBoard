import React, { useState } from "react";
import Service from "./Service";
function AddServiceComp(props) {
  const { user, handleDeleteServ, handleAddService, workerServs } = props;

  const [showServices, setShowServices] = useState(false);
  const [showAddServ, setShowAddServ] = useState(false);
  const [newServData, setNewServData] = useState({
    workerId: user._id,
    title: "",
    price: "",
  });

  const handleChangeTitle = (e) => {
    setNewServData({
      ...newServData,
      title: e.target.value,
    });
  };
  return (
    <div className="services-container">
      <label>Services:</label>
      <i
        className="fa-sharp fa-solid fa-circle-chevron-down"
        onClick={() => setShowServices(!showServices)}
      ></i>
      <div
        className={
          showServices ? "servWrapper servWrapper-active" : "servWrapper"
        }
      >
        {workerServs.map((service) => {
          return (
            <Service service={service} handleDeleteServ={handleDeleteServ} />
          );
        })}
        <i
          className="fa-solid fa-circle-plus"
          onClick={() => setShowAddServ(!showAddServ)}
        ></i>
        {showAddServ && (
          <div className="addservice">
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={() => setShowAddServ(!showAddServ)}
            ></i>
            <label>Title:</label>

            <select id="servsss" name="servsss" onChange={handleChangeTitle}>
              <option value="">Select Service</option>
              <option value="Hair Cut">Hair Cut</option>
              <option value="Face Cut">Face Cut</option>
              <option value="Wax">Wax</option>
              <option value="Massage">Massage</option>
            </select>
            <label>Price:</label>
            <input
              type="number"
              min="1"
              step="any"
              className="priceinput"
              onChange={(e) => {
                setNewServData({
                  ...newServData,
                  price: e.target.value,
                });
              }}
            />
            <button onClick={() => handleAddService(newServData)}>
              Add Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddServiceComp;
