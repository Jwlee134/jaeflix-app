import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';

const defaultContext: IUserContext = {
  isLoading: false,
  userInfo: undefined,
  login: () => {},
  getUserInfo: () => {},
  logout: () => {},
};

export const UserContext = createContext(defaultContext);

interface Props {
  children: React.ReactNode;
}

export const UserContextProvider = ({children}: Props) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    await AsyncStorage.setItem('token', 'save your token');
    setUserInfo({
      name: 'Jaewon',
      email: 'sorhd134@gmail.com',
    });
    setIsLoading(true);
  };

  const getUserInfo = async (): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem('token');
      if (data) {
        setUserInfo({
          name: 'Jaewon',
          email: 'sorhd134@gmail.com',
        });
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error);
      setUserInfo(undefined);
      setIsLoading(true);
    }
  };

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem('token');
    setUserInfo(undefined);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{userInfo, isLoading, login, logout, getUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};
