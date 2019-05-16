import {Icon} from "antd";
import React from "react";

// iconfont js文件的地址
// 开发时从 iconfont.cn 上引入，打包时应当要下载下来放到public内
// 可以考虑加在webpack的构建过程中自动下载
const url = process.env.NODE_ENV === "production"
  ? `/${process.env.REACT_APP_ICONFONT_CODE}.js`
  : `//at.alicdn.com/t/${process.env.REACT_APP_ICONFONT_CODE}.js`;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: url
});

class MyIcon extends React.Component {
  render() {
    return <IconFont {...this.props}/>;
  }
}

export default MyIcon;
