import React from "react";
import api from "../../../utils/api";

const Landing = () => {
  const testapi = () => {
    api.get("/api/current_user");
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Emaily!</h1>
      Collect feedback from your users.
      <button onClick={testapi}>Test</button>
      <button id="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Landing;
