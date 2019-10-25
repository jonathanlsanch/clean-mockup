import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { isValidURL } from '../utils/utils';
import { InputSubmit, InputText } from './elements';
import ErrorPanel from '../components/ErrorPanel/ErrorPanel';
import SettingsPanel from '../components/SettingsPanel';

class Home extends Component {
  urlInputRef = React.createRef();

  state = { invalidUrl: false };

  componentDidMount = () => {
    if (this.urlInputRef.current) {
      this.urlInputRef.current.focus();
    }

    this.props.clear();

    const queryParams = new URLSearchParams(this.props.location.search);
    const url = queryParams.get('url');

    if (url && isValidURL(url)) {
      this.props.updateUrl(url);
    }
  };

  handleOnChange = e => {
    this.props.updateUrl(e.target.value);
    this.setState({ invalidUrl: false });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    if (isValidURL(this.props.url)) {
      this.props.setLoading();
      this.props.navigate(`/mockup`);
    } else {
      this.setState({ invalidUrl: true });
    }
  };

  render() {
    const { isLoading, isReady, url, hasError } = this.props;

    return (
      <Fragment>
        {hasError && <ErrorPanel url={url} />}

        {!isLoading && !isReady && (
          <form onSubmit={this.handleOnSubmit}>
            <InputText
              autocorrect="off"
              autocapitalize="none"
              ref={this.urlInputRef}
              placeholder="Website URL"
              value={this.props.url}
              onChange={this.handleOnChange}
              type="text"
              invalidUrl={this.state.invalidUrl}
              autoComplete="off"
            />

            <InputSubmit value="Create" type="submit" />

            <SettingsPanel />
          </form>
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
});

const mapDispatch = state => ({
  updateUrl: state.app.updateUrl,
  toggleMobile: state.app.toggleMobile,
  setImageError: state.app.setImageError,
  setLoading: state.app.setLoading,
  clear: state.app.clear,
});

export default connect(
  mapState,
  mapDispatch,
)(Home);
