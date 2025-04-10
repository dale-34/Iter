import React from "react";
import "../css/header.css";
import { Login } from "./Login";
import { useAuth } from "../AuthContext"; // Access auth context

export const Header = () => {
  const { userProfile, logout } = useAuth(); // Access userProfile and logout from context

  const handleLogout = () => {
    logout(); // Clear the token and profile
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <h1 className="header-title">
          <a href="/HomePage" className="header-link">Iter</a>
        </h1>
      </nav>
      <div className="LoginButton">
        {!userProfile ? (
          <div className="LoginButton">
            <Login />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <p style={{ fontWeight: 500 }}>
              Welcome, {userProfile.username}!
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};


// import React from "react";
// import "../css/header.css";
// import { Login } from "./Login";

// export const Header = () => {
//   return (
//     <header className="header">
//       <nav className="header-nav">
//         <h1 className="header-title">
//           <a href="/HomePage" className="header-link">Iter</a>
//         </h1>
//       </nav>
//       <div className="LoginButton">
//           <Login />
//       </div>
//     </header>
//   );
// };