import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return (
    <div className="App">
      <Landing onLogin={setUser} />
    </div>
  )
  return (
    <div className="App">
      <Dashboard setUser={setUser} user={user} />
    </div>
  )
}

export default App;
