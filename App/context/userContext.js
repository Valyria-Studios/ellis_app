import React, { createContext, useState, useEffect, useContext } from "react";
import { authSupabase } from "../api/supabaseClient";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginTimestamp, setLoginTimestamp] = useState(null);
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  // Function to log out the user
  const logoutUser = async () => {
    await authSupabase.auth.signOut();
    setUser(null);
    setLoginTimestamp(null);
  };

  // Function to start session timeout
  const startSessionTimeout = () => {
    if (loginTimestamp) {
      const timeElapsed = Date.now() - loginTimestamp;
      const timeRemaining = SESSION_DURATION - timeElapsed;

      if (timeRemaining > 0) {
        setTimeout(() => {
          logoutUser(); // Logout user after 1 hour
          alert("Your session has expired. Please log in again.");
        }, timeRemaining);
      } else {
        logoutUser();
      }
    }
  };

  // Check user on app startup
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await authSupabase.auth.getUser();
      if (error) {
        console.log("Error fetching user:", error);
      } else if (data?.user) {
        setUser(data.user);
        setLoginTimestamp(Date.now());
        startSessionTimeout(); // Start session expiration timer
      }
    };

    checkUser();

    // Listen for authentication state changes
    const authListener = authSupabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setLoginTimestamp(Date.now());
          startSessionTimeout(); // Reset session timeout
        } else {
          setUser(null);
          setLoginTimestamp(null);
        }
      }
    );

    return () => authListener.data.subscription.unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
