import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store';
import { VideoProvider } from './context/VideoContext';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <VideoProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </VideoProvider>
  </Provider>
)
