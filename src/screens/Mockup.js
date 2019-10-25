import React, { Component, Fragment } from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { Image, BackButton } from './elements';

const SERVICE_URL = process.env.REACT_APP_LAMBDA_ENDPOINT;

class Screenshot extends Component {
  componentDidUpdate() {
    if (this.props.hasError) {
      this.props.navigate('/');
    }
  }

  render() {
    const { props } = this;
    const viewport = 'iPad Pro landscape';

    if (!props.url) {
      return <Redirect to="/" noThrow />;
    }

    let url = `${SERVICE_URL}?url=${encodeURIComponent(props.url)}`;

    if (!this.props.isMobile) {
      url += `&viewport=${viewport}`;
    }

    return (
      <Fragment>
        {(props.isLoading || props.isReady) && (
          <Fragment>
            <Image
              className={props.isLoading ? 'hidden' : null}
              alt="Your mockup"
              onError={props.setImageError}
              onLoad={props.setImageLoaded}
              src={url}
            />
            <br />
            {props.isReady && <BackButton onClick={() => props.navigate('/')}>Back</BackButton>}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapState = state => ({
  isReady: state.app.isReady,
  isLoading: state.app.isLoading,
  hasError: state.app.hasError,
  url: state.app.url,
  viewport: state.app.viewport,
  isMobile: state.app.isMobile,
});

const mapDispatch = state => ({
  setImageError: state.app.setImageError,
  setImageLoaded: state.app.setImageLoaded,
});

export default connect(
  mapState,
  mapDispatch,
)(Screenshot);
