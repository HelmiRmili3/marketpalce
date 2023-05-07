import React, { useEffect } from "react";
import "./succesAlert.css";
function SuccesAlert(props) {
  useEffect(() => {
    if (props.timeout) {
      const timer = setTimeout(() => {
        handleClose();
      }, props.timeout);
      return () => clearTimeout(timer);
    }
  }, [props.timeout]);
  const handleClose = () => {
    props.setVisible(false);
    // if (props.onClose) {
    //   props.onClose();
    // }
  };

  if (!props.visible) {
    return null;
  }

  return (
    <div className="alert-container">
      <div className="alert">
        <div className="alert-title">{props.title}</div>
        <div className="alert-message">{props.message}</div>
        <button className="alert-button" onClick={handleClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default SuccesAlert;
