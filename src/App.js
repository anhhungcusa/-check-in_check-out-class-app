import React, {useEffect} from 'react';
import { DataProvider } from './store';
import './assets/css/utilities.css'
import 'antd/dist/antd.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import {PublicRoute} from './routes'
import Login from './containers/Login/Login';
import { FullScreenLayout } from './components';
function App() {
  useEffect(() => {
    document.title = 'QR'
  }, [])
  
  return (
    <div >
      <DataProvider>
        <BrowserRouter>
          <Switch>  
            <PublicRoute path="/login" layout={FullScreenLayout}>
              <Login />
            </PublicRoute>
          </Switch>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
