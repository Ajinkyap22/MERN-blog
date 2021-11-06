import Logo from "../images/logo.png";

function Toast(props) {
  const hideToast = function () {
    props.setShowToast(false);
  };

  return (
    <div
      className="position-fixed bottom-0 start-0 p-2 m-4 bg-dark shadow rounded"
      hidden={props.showToast ? false : true}
    >
      <div
        className="notification d-flex"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex flex-column">
          <div className="text-center p-2 text-white letter-spacing">
            <img src={Logo} alt="" className="logo pe-2" />
            {props.toastText}
          </div>
        </div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={hideToast}
        ></button>
      </div>
    </div>
  );
}

export default Toast;
