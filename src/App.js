import React, {useEffect} from 'react';
import './App.css';
import { DataProvider } from './store';

function App() {
  useEffect(() => {
    document.title = 'QR'
  }, [])
  return (
    <div className="App">
      <DataProvider>

      </DataProvider>
    </div>
  );
}

export default App;
