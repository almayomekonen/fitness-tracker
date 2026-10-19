import { createContext, useContext, useEffect, useState } from "react";
import { tokenStorage } from "./tokenStorage";
import { api } from "../api/client";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!tokenStorage.get()) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          tokenStorage.clear();
        }
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function loginWithGoogle(credential) {
    try {
      const { data } = await api.post("/auth/google", { credential });

      tokenStorage.set(data.token);

      setUser(data.user);
      toast.success(`ברוך הבא ${data.user.name}`);
    } catch (error) {
      console.log("DATA", error.response?.data);
      toast.error("ההתחברות נכשלה");
    }
  }

  async function registerWithEmail({ username, email, password, fullName }) {
    try {
      const { data } = await api.post("/auth/register", {
        username,
        email,
        password,
        fullName,
      });

      tokenStorage.set(data.token);

      setUser(data.user);
      toast.success(`ברוך הבא ${data.user.name}`);
    } catch (error) {
      console.log("DATA", error.response?.data);
      toast.error("ההתחברות נכשלה");
    }
  }

  async function loginWithEmail({ username, password }) {
    try {
      const { data } = await api.post("/auth/login", {
        username,
        password,
      });

      tokenStorage.set(data.token);

      setUser(data.user);
      toast.success(`ברוך הבא ${data.user.name}`);
    } catch (error) {
      console.log("DATA", error.response?.data);
      toast.error("ההתחברות נכשלה");
    }
  }

  function logout() {
    tokenStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
