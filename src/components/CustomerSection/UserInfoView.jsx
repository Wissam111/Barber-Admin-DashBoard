function UserInfoView(props) {
  const { user } = props;

  return <div className="userinfo-container">{user.firstName}</div>;
}

export default UserInfoView;
