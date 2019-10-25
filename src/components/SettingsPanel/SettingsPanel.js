import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Panel } from './elements';

const SettingsPanel = props => {

  return (
    <Panel>




      <label>
        <input value={props.isMobile} onChange={e => props.onToggleMobile(e.target.value)} type="checkbox" /> Mobile
      </label>

    </Panel>
  );
};

const mapState = state => ({
  isMobile: state.app.isMobile,
  viewport: state.app.viewport,
});

const mapDispatch = state => ({
  onToggleMobile: state.app.toggleMobile,
});

export default connect(
  mapState,
  mapDispatch,
)(SettingsPanel);
