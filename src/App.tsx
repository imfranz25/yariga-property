import React from 'react';

import { Refine, AuthProvider } from '@pankod/refine-core';
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-mui';

import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from '@mui/icons-material';

import dataProvider from '@pankod/refine-simple-rest';
import { MuiInferencer } from '@pankod/refine-inferencer/mui';
import routerProvider from '@pankod/refine-react-router-v6';
import axios, { AxiosRequestConfig } from 'axios';
import { useTranslation } from 'react-i18next';
import { ColorModeContextProvider } from 'contexts';
import { Title, Sider, Layout, Header } from 'components/layout';
import { CredentialResponse } from 'interfaces/google';
import { parseJwt } from 'utils/parse-jwt';

/* Pages */
import {
  Login,
  Home,
  Agent,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  AgentProfile,
  EditProperty,
} from 'pages';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const { t, i18n } = useTranslation();

  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api/v1';
      console.log(BACKEND_URL);
      if (profileObj) {
        const response = await fetch(`${BACKEND_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });

        console.log(response.status);

        if (response.status === 200) {
          const data = await response.json();

          localStorage.setItem(
            'user',
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userId: data._id,
            })
          );
        } else {
          return Promise.reject();
        }
      }

      localStorage.setItem('token', `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem('token');

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem('token');

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider(
            process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api/v1'
          )}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: 'properties',
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
            {
              name: 'agent',
              list: Agent,
              show: AgentProfile,
              icon: <PeopleAltOutlined />,
            },
            {
              name: 'review',
              list: Home,
              icon: <StarOutlineRounded />,
            },
            {
              name: 'message',
              list: Home,
              icon: <ChatBubbleOutline />,
            },
            {
              name: 'my-profile',
              list: MyProfile,
              icon: <AccountCircleOutlined />,
              options: {
                label: 'My Profile',
              },
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          i18nProvider={i18nProvider}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
