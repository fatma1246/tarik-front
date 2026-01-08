import axios from 'axios';

const BASE_URL = `https://api.dev.meetusvr.com`;

export interface LoginData {
  email: string;
  password: string;
  orgId: string;
  isEmployee: boolean;
}

export interface LoginResponse {
  token: string;
  refresh?: string;
  userInfo: {
    id: number;
    name: string;
    email: string;
  };
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const data: LoginData = {
      email,
      password,
      orgId: "2",
      isEmployee: true
    };

    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/nasnav/token`,
      data,
      {
        headers: {
          'Content-Type': "application/json"
        }
      }
    );
    
    return response.data;
  }
};