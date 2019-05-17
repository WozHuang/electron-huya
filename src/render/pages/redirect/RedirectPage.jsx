import React from 'react';

// 这是一个用于重定向的页面，主要用于路由刷新
export default class RedirectPage extends React.Component {

  componentWillMount() {
    const { location } = this.props.history.location.query || { pathname: "/" };
    this.props.history.replace(location);
  }

  render() {
    return null;
  }
}
