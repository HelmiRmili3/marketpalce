const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors")

const app = express();
app.use(cors())

app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server running"));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "helmirmili@gmail.com",
    pass: "60996498",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const code = req.body.code;
  const email = req.body.email;
  const mail = {
    from: name,
    to: "helmirmili@gmail.com",
    subject: "Contact Form Submission",
    html: `
            <p>Email: ${email}</p>
            <p>MessageP: ${code}</p>
        `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});