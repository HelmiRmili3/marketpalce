import React from "react";

const EmailButton = ({ recipient, subject, body ,sender }) => (
  <a
    href={`mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}&cc=${sender}`}
  >
    Send Email
  </a>
);

export default EmailButton;
