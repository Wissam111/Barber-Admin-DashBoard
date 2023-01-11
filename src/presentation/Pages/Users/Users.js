import Customers from "../../components/Customers";
import RegisterForm from "../../components/RegisterForm";
import SettingsForm from "../../components/SettingsForm";
import UsersViewModel from "./UsersViewModel";
import RefreshButton from "../../components/RefreshButton";

function Users(props) {
  const {
    searchedUsers,
    showSettings,
    setShowSettings,
    currUser,
    handleSubmit,
    handleDeleteUser,
    handleChange,
    handleSettings,
    updateUser,
    refresh,
    uploadImage,
  } = UsersViewModel();

  return (
    <div className="page-container">
      <RefreshButton refresh={refresh} />
      <div className="users-container">
        <div className="users-cta">
          <div className="staff-logo">
            <h2>Users</h2>
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="search-container">
            <input type="text" placeholder="search" onChange={handleChange} />
          </div>
          <Customers
            users={searchedUsers}
            handleDeleteUser={handleDeleteUser}
            handleSettings={handleSettings}
          />
        </div>
        <RegisterForm handleSubmit={handleSubmit} />

        {showSettings && (
          <div className="settingsWrapper">
            <SettingsForm
              handleExitSettings={() => setShowSettings(false)}
              user={currUser}
              handleDeleteUser={handleDeleteUser}
              updateUser={updateUser}
              refresh={refresh}
              uploadImage={uploadImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
