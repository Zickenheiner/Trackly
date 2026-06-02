import '@fontsource-variable/dm-sans';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import './index.css';
import { createRoot } from 'react-dom/client';
import Router from './app/Router';
import Provider from './app/Provider';

createRoot(document.getElementById('root')!).render(
  <Provider>
    <Router />
  </Provider>,
);
