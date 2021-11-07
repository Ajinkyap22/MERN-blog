const Loader = function (props) {
  return (
    <div
      className="spinner-border text-primary"
      hidden={props.loading ? false : true}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
