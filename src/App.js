import React, {useEffect} from 'react';
import { DataProvider } from './store';
import './assets/css/utilities.css'
function App() {
  useEffect(() => {
    document.title = 'QR'
  }, [])
  
  return (
    <div >
      <DataProvider>

      </DataProvider>
    </div>
  );
}

export default App;
