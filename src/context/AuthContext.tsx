import { createContext, useContext, useReducer } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

function authReducer(state: AuthState, action: any): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { isLoggedIn: true, user: action.payload };
    case 'LOGOUT':
      return { isLoggedIn: false, user: null };
    default:
      return state;
  }
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: any) => dispatch({ type: 'LOGIN', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
