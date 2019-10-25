import React from 'react';
import { Router } from '@reach/router';

import Layout from './components/Layout';
import Home from './screens/Home';
import Screenshot from './screens/Mockup';

// import 'react-github-corners/dist/GithubCorner.css';
import './assets/layout.css';

export default () => (
  <Layout>


    <Router>
      <Home path="/" />
      <Screenshot path="mockup" />
    </Router>
  </Layout>
);
