export default function RefreshButton(props) {
  const { refresh } = props;

  return (
    <button onClick={() => refresh()} className="refreshBtn">
      <i class="fa fa-refresh" aria-hidden="true"></i>
    </button>
  );
}
