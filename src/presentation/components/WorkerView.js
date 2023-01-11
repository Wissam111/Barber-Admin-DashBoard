function WorkerView(props) {
  const { worker, handleStaffScheduler, handleSettings } = props;
  return (
    <div className="workerView-container">
      <img
        className="workerImg"
        src={
          worker?.image
            ? `http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com/imgs/${worker.image}`
            : require("../../assets/imgs/unknown.png")
        }
        alt=""
      />
      <ul className="worker-info">
        <i
          className="fa fa-cog workerSettings"
          aria-hidden="true"
          onClick={() => handleSettings(worker)}
        ></i>
        <li>{worker?.firstName + " " + worker?.lastName}</li>
        <i className="fa fa-phone">
          <a href={"tel:" + worker?.phone}>{worker?.phone}</a>
        </i>
        <li>{"role: " + worker?.role}</li>
      </ul>
      <div className="workerhours-cta">
        <button onClick={() => handleStaffScheduler(worker)}>
          <i className="fa-solid fa-calendar"></i>
        </button>
      </div>
    </div>
  );
}
export default WorkerView;
