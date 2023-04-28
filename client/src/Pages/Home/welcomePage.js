// import React from "react";
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import "../App.css";
// import Home from "../pages/home";
// import About from "../pages/about";
// import Contact from "../pages/contact";
// import LoginPage from "../pages/loginPage";
// import SignUpPage from "../pages/signUpPage";
// import { useAuth } from "../contexts/authContext";
// export default function WelcomePage() {
//   const {
//     isLoggedIn,
//   } = useAuth();
//   return isLoggedIn ? (
//     <>
//       <Router>
//         <div>
//           <div>
//             <div className="header">
//               <nav>
//                 <ul>
//                   <li>
//                     <Link to="/" element={<Home />}>
//                       Home
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/about" element={<About />}>
//                       About
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/contact" element={<Contact />}>
//                       Contact
//                     </Link>
//                   </li>
//                 </ul>
//                 <ul>
//                   <li>
//                     <Link to="/login" element={<LoginPage />}>
//                       Connect Wallet
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/signup" element={<SignUpPage />}>
//                       Create account
//                     </Link>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>

//           <Routes>
//             <Route exact path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignUpPage />} />
//           </Routes>
//         </div>
//       </Router>
//     </>
//   ) : (
//     <><div>is not logged in</div></>
//   );
// }
