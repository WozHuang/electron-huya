import React from 'react';
import style from './LiveBody.module.less';
import videoJs from 'video.js';
import 'video.js/dist/video-js.css';
import zhCN from 'video.js/dist/lang/zh-CN.json';
import PropTypes from "prop-types";
import BarrageLauncher from "@/render/pages/live/components/BarrageLauncher";

videoJs.addLanguage('zh-CN', zhCN);
videoJs.options.lang = 'zh-CN';
videoJs.options.liveui = false;
window.videojs = videoJs;


export default class LiveBody extends React.Component {
  static propTypes = {
    liveData: PropTypes.object.isRequired
  };

  playerContainer = React.createRef();
  player = null;

  streamList = [];
  rateList = [];
  rate = 4000;

  componentDidMount() {
    this.player = videoJs(this.playerContainer.current, {
      autoplay: true, // 自动播放
      controls: true, // 显示控制界面
      poster: this.props.liveData.TT_ROOM_DATA.screenshot,
    });
    const stream = this.props.liveData.hyPlayerConfig.stream;
    this.streamList = stream.data[0].gameStreamInfoList;
    this.rateList = stream.vMultiStreamInfo;
    // this.play();

    this.play(0);

    // for (let i = this.streamList.length - 1; i >= 0; i--)
    //   setTimeout(() => {
    //     this.play(i);
    //   }, (this.streamList.length - 1 - i) * 15000);

  }

  componentWillUnmount() {
    this.player.dispose();
  }

  play(i = 1) {
    const stream = this.streamList[i];
    const query = `?ratio=${this.rate}&${stream.sHlsAntiCode}`;
    // const flvSrc = `${stream.sFlvUrl}/${stream.sStreamName}.${stream.sFlvUrlSuffix}?ratio=500&${stream.sFlvAntiCode}`;
    const hlsSrc = `${stream.sHlsUrl}/${stream.sStreamName}_${this.rate}.${stream.sHlsUrlSuffix}${query}`;

    this.player.src(hlsSrc);
    this.player.ready(() => {
      // this.player.play();

      // 为所有的 ts 文件加上鉴权码和清晰度选项，避免
      this.player.tech().hls.xhr.beforeRequest = function (options) {
        if (options.responseType === "arraybuffer" && options.uri.indexOf('?') === -1) {
          options.uri += query;
        }
        return options;
      };
    });
  }

  render() {
    return (
      <div className={style['wrapper']} data-vjs-player>
        <BarrageLauncher {...this.props}/>
        <video className={`${style['video']} video-js`} ref={this.playerContainer}/>
        {/*<div className={style['control']}>123</div>*/}
      </div>
    );
  }
}
