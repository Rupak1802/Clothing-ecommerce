import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem("aura_session");
    if (session) {
      const user = JSON.parse(session);
      // Ensure this is a real backend session with a token
      if (user.token) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setRole(user.role);
      } else {
        // Clear out old mock localstorage sessions
        localStorage.removeItem("aura_session");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, expectedRole) => {
    try {
      // Mock Data
      let mockUser = null;
      if (email === 'admin@example.com' && password === 'password123') {
        mockUser = { _id: 'admin123', name: 'Admin User', email: 'admin@example.com', isAdmin: true, token: 'mock-token' };
      } else if (email === 'user@example.com' && password === 'password123') {
        mockUser = { _id: 'user123', name: 'John Doe', email: 'user@example.com', isAdmin: false, token: 'mock-token' };
      } else {
        throw new Error("Invalid mock credentials.");
      }
      
      const user = {
        _id: mockUser._id,
        fullName: mockUser.name,
        email: mockUser.email,
        role: mockUser.isAdmin ? 'admin' : 'customer',
        token: mockUser.token
      };

      if (expectedRole && user.role !== expectedRole) {
        throw new Error("Unauthorized access for this portal.");
      }

      setCurrentUser(user);
      setIsAuthenticated(true);
      setRole(user.role);
      localStorage.setItem("aura_session", JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error(error.message || "Invalid email or password.");
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration
      const data = { 
        name: userData.fullName, 
        email: userData.email, 
        phone: userData.phone 
      };
      return data;
    } catch (error) {
      throw new Error("Registration failed.");
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      if (otp !== "123456") {
        throw new Error("Invalid mock OTP. Try 123456.");
      }
      
      const user = {
        _id: `user-${Date.now()}`,
        fullName: "New Mock User",
        email: email,
        phone: "1234567890",
        role: 'customer',
        token: 'mock-token'
      };

      setCurrentUser(user);
      setIsAuthenticated(true);
      setRole(user.role);
      localStorage.setItem("aura_session", JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error(error.message || "OTP Verification failed.");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("aura_session");
  };

  const updateProfile = async (updatedData) => {
    // Currently relying on local state for profile updates
    // In a full implementation, this would hit PUT /api/users/profile
    try {
      const user = { ...currentUser, ...updatedData };
      setCurrentUser(user);
      localStorage.setItem("aura_session", JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error("Update failed.");
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    role,
    loading,
    login,
    logout,
    register,
    verifyOtp,
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
