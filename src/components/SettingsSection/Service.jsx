function Service(props) {
  return (
    <div className="service-container">
      <span>{props.service.title}</span>
      <i
        className="fa fa-trash"
        aria-hidden="true"
        onClick={() => props.handleDeleteServ(props.service.title)}
      ></i>
    </div>
  );
}
export default Service;
