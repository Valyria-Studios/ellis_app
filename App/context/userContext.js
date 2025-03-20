import React, { createContext, useState, useEffect, useContext } from "react";
import { authSupabase } from "../api/supabaseClient";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginTimestamp, setLoginTimestamp] = useState(null);
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
  const [profile, setProfile] = useState(null);

  // Function to log out the user
  const logoutUser = async () => {
    await authSupabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setLoginTimestamp(null);
  };

  // Function to start session timeout
  const startSessionTimeout = () => {
    if (loginTimestamp) {
      const timeElapsed = Date.now() - loginTimestamp;
      const timeRemaining = SESSION_DURATION - timeElapsed;

      if (timeRemaining > 0) {
        setTimeout(() => {
          logoutUser();
          alert("Your session has expired. Please log in again.");
        }, timeRemaining);
      } else {
        logoutUser();
      }
    }
  };

  // Function to fetch user profile from Supabase
  const fetchUserProfile = async (userId) => {
    if (!userId) return;

    const { data: userProfile, error: profileError } = await authSupabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!profileError) {
      setProfile(userProfile);
    } else {
      console.error("Error fetching profile:", profileError);
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
        fetchUserProfile(data.user.id); // ✅ Fetch profile immediately
        setLoginTimestamp(Date.now());
        startSessionTimeout();
      }
    };

    checkUser();

    // Listen for authentication state changes
    const { data: subscription } = authSupabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchUserProfile(session.user.id); // ✅ Fetch updated profile on auth change
          setLoginTimestamp(Date.now());
          startSessionTimeout();
        } else {
          setUser(null);
          setProfile(null);
          setLoginTimestamp(null);
        }
      }
    );

    return () => subscription?.subscription?.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
