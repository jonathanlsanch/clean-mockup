import React from 'react';

import logo from './../../assets/logo.svg';
import guru from './../../assets/guru.svg';

export default ({ isLoading, isReady }) => {
  const hasNoActivity = !isLoading && !isReady;

  return (
    <header>
      {hasNoActivity && <img alt="clean mockup" src={logo} width="300px" />}

      {isLoading && <img className="animated infinite tada" alt="mockup is working" src={guru} width="80px" />}

      {(hasNoActivity || isLoading) && <h1>mockups</h1>}
      {hasNoActivity && <h2>take clean screenshots of any websites</h2>}

      {isLoading && <h2>loading</h2>}

      {isReady && (
        <h1>
          <span role="img" aria-label="kiss">
            😘
          </span>
        </h1>
      )}
    </header>
  );
};
