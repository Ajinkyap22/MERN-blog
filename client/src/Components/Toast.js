import Logo from "../images/logo.png";

function Toast(props) {
  const hideToast = function () {
    props.setShowToast(false);
  };

  return (
    <div className="position-fixed bottom-0 strat-0 m-4 bg-dark shadow rounded">
      <div
        className="notification align-items-center"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        hidden={props.showToast ? false : true}
      >
        <div className="d-flex flex-column">
          <div className="toast-header py-1 px-0 border-bottom">
            <img src={Logo} className="logo p-1" alt="..." />
            <strong className="px-2 text-dark">Blogify</strong>
            <button
              type="button"
              className="btn-close btn-close-dark me-2 m-auto"
              aria-label="Close"
              onClick={hideToast}
            ></button>
          </div>
          <div className="text-center text-white p-2">{props.toastText}</div>
        </div>
      </div>
    </div>
  );
}

export default Toast;
