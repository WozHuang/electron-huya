import React from 'react';
import style from "./Loading.module.less";
import {Icon, Spin} from "antd";

// 加载中。。。
export default class Loading extends React.Component {
  static defaultProps = {
    fail: false,
    loading: true,
    loadingTip: "加载中",
    failTip: "加载失败，请尝试刷新"
  };

  render() {
    return (
      <Spin
        spinning={this.props.loading}
        className={style['spinning']}
        tip={this.props.fail ? this.props.failTip : this.props.loadingTip}
        indicator={<Icon type="loading"/>}
      >
        {this.props.children}
      </Spin>
    );
  }
}
