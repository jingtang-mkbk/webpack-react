import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';
import './index.less';

const container = document.getElementById('root');
createRoot(container!).render(<App />);

if ((module as any).hot) {
  (module as any).hot.accept();
}
