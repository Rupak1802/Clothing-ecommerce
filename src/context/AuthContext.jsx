import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    fullName: "Mock Customer",
    email: "customer@aura.com",
    phone: "1234567890",
    password: "password123",
    role: "customer"
  },
  {
    fullName: "Mock Admin",
    email: "admin@example.com",
    phone: "0987654321",
    password: "Admin@123",
    role: "admin"
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize or update users in localStorage
    const storedUsersStr = localStorage.getItem("aura_users");
    let users = storedUsersStr ? JSON.parse(storedUsersStr) : [...DEFAULT_USERS];
    
    const correctAdmin = {
      fullName: "Mock Admin",
      email: "admin@example.com",
      phone: "0987654321",
      password: "Admin@123",
      role: "admin"
    };

    const adminIndex = users.findIndex((u) => u.role === "admin");
    if (adminIndex === -1) {
      users.push(correctAdmin);
    } else {
      users[adminIndex] = correctAdmin;
    }
    localStorage.setItem("aura_users", JSON.stringify(users));

    // Check for existing session
    const session = localStorage.getItem("aura_session");
    if (session) {
      const user = JSON.parse(session);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setRole(user.role);
    }
    setLoading(false);
  }, []);

  const login = (email, password, expectedRole) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem("aura_users") || "[]");
        const user = storedUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!user) {
          reject(new Error("Invalid email or password."));
          return;
        }

        if (expectedRole && user.role !== expectedRole) {
          reject(new Error("Unauthorized access for this portal."));
          return;
        }

        setCurrentUser(user);
        setIsAuthenticated(true);
        setRole(user.role);
        localStorage.setItem("aura_session", JSON.stringify(user));
        resolve(user);
      }, 500);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem("aura_users") || "[]");
        const emailExists = storedUsers.some(
          (u) => u.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (emailExists) {
          reject(new Error("Email already registered."));
          return;
        }

        const newUser = {
          ...userData,
          role: "customer" // Registered users are always customers
        };

        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem("aura_users", JSON.stringify(updatedUsers));
        resolve(newUser);
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("aura_session");
  };

  const updateProfile = (updatedData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem("aura_users") || "[]");
        const index = storedUsers.findIndex(
          (u) => u.email.toLowerCase() === currentUser.email.toLowerCase()
        );

        if (index === -1) {
          reject(new Error("User not found."));
          return;
        }

        const updatedUser = { ...storedUsers[index], ...updatedData };
        storedUsers[index] = updatedUser;
        localStorage.setItem("aura_users", JSON.stringify(storedUsers));
        
        setCurrentUser(updatedUser);
        localStorage.setItem("aura_session", JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 500);
    });
  };

  const value = {
    currentUser,
    isAuthenticated,
    role,
    loading,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
