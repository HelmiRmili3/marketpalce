import React,{useState} from "react";

import { useAuth } from "../../../Contexts/authContext";
export default function Admins() {
  const { admins } = useAuth();

  return (
    <>
      <div className="labo-div">
        <div className="user-list">
          <h1>List of Admins</h1>
          {/* <ListOfUsers data={admins} /> */}
        </div>
        {/* <SignUpFormAdmins /> */}
      </div>
    </>
  );
}
const SignUpFormAdmins = () => {
  const { signUp } = useAuth();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTow, setPasswordTow] = useState("");
  const [address, setAddress] = useState("");

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };
  const handlePasswordOneChange = (event) => {
    setPasswordOne(event.target.value);
  };
  const handlePasswordTowChange = (event) => {
    setPasswordTow(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleSubmit = async () => {
    if (passwordOne === passwordTow) {
      try {
        await signUp(nom, prenom, email, passwordOne, address, 1);
        console.log("labo account added");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("passwords does not match");
    }
  };
  return (
    <>
      <div className="container">
        <form>
          <div>
            <h1>Add Labo</h1>
          </div>
          <div className="sign-up-row">
            <div className="form-group-row">
              <input
                type="text"
                id="nom"
                placeholder="Nom"
                value={nom}
                onChange={handleNomChange}
              ></input>
            </div>
            <div className="form-group-row">
              <input
                type="text"
                id="prenom"
                placeholder="Prenom"
                value={prenom}
                onChange={handlePrenomChange}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <input
              type="address"
              id="address"
              placeholder="Enter your Address"
              value={address}
              onChange={handleAddressChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="passwordOne"
              placeholder="Enter your password"
              value={passwordOne}
              onChange={handlePasswordOneChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="passwordTow"
              placeholder="Confirme your password"
              value={passwordTow}
              onChange={handlePasswordTowChange}
            ></input>
          </div>
          <div className="form-group">
            <button type="submit" onClick={handleSubmit}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

