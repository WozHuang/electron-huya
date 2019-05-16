import React from 'react';

export default class RedirectPage extends React.Component {

  componentWillMount() {
    const targetPath = this.props.history.location.search.split('=')[1];
    this.props.history.replace(targetPath);
  }

  render() {
    return null;
  }
}
