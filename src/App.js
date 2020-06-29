import React, { useEffect } from "react";
import { DataProvider } from "./store";
import "./assets/css/utilities.css";
import "antd/dist/antd.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./routes";
import { FullScreenLayout, MainLayout } from "./components";
import {
  LoginPage,
  HomePage,
  QRPage,
  ScanQRPage,
  SessionDetail,
  RegisterAccountPage,
  RoomPage,
  Profile
} from "./containers";
import ManageUser from "./containers/ManageUser/ManageUser";
import { roles } from "./constants";
function App() {
  useEffect(() => {
    document.title = "QR";
  }, []);

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Switch>
            <PublicRoute path="/login" layout={FullScreenLayout}>
              <LoginPage />
            </PublicRoute>
            <PublicRoute path="/register" layout={FullScreenLayout}>
              <RegisterAccountPage />
            </PublicRoute>
            <PrivateRoute exact path="/" layout={MainLayout}>
              <HomePage />
            </PrivateRoute>
            <PrivateRoute path="/scan" layout={FullScreenLayout}>
              <ScanQRPage />
            </PrivateRoute>
            <PrivateRoute roles={[roles.admin, roles.teacher]} path="/sessions/:id/qr" layout={FullScreenLayout}>
              <QRPage />
            </PrivateRoute>
            <PrivateRoute  roles={[roles.admin, roles.teacher]}path="/rooms" layout={MainLayout}>
              <RoomPage />
            </PrivateRoute>
            <PrivateRoute roles={[roles.admin]} path="/users" layout={MainLayout}>
              <ManageUser />
            </PrivateRoute>
            <PrivateRoute roles={[roles.admin, roles.teacher]} path="/sessions/:id" layout={MainLayout}>
              <SessionDetail />
            </PrivateRoute>
            <PrivateRoute path="/profile/:id" layout={MainLayout}>
              <Profile />
            </PrivateRoute>
            <PublicRoute layout={FullScreenLayout}>page not found</PublicRoute>
          </Switch>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
