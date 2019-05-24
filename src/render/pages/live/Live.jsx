import React from 'react';
import {getLiveData} from "@/render/api/live";
import style from "./Live.module.less";
import Loading from "@/render/components/loading/Loading";
import {connect} from "react-redux";
import {toggleSidebar} from "@/render/store/setting/action";
import LiveHeader from "@/render/pages/live/components/LiveHeader";
import LiveBody from "@/render/pages/live/components/LiveBody";
import BarrageList from "@/render/pages/live/components/BarrageList";
import HuyaSocket from "@/render/api/HuyaSocket";

class Live extends React.Component {
  state = {
    loading: true,
    fail: false,
  };
  liveData = null;
  socket = null;

  componentDidMount() {
    this.props.toggleSidebar({ status: false });
    this.profileRoom = this.props.match.params.profileRoom;
    this.getLiveData();
  }

  componentWillUnmount() {
    this.socket && this.socket.close();
  }

  getLiveData() {
    getLiveData({ profileRoom: this.profileRoom })
      .then(data => {
        this.liveData = data;
        this.connectSocket();
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          fail: true
        });
      });
  }

  connectSocket() {
    const profileRoom = this.liveData.TT_ROOM_DATA.profileRoom;
    this.socket = new HuyaSocket({ profileRoom });
  }

  render() {
    const prop = {
      liveData: this.liveData,
      socket: this.socket
    };
    return (
      <Loading
        loading={this.state.loading}
        fail={this.state.fail}
      >
        {prop.liveData ?
          <div className={style['wrapper']}>
            <div className={style['left']}>
              <div className={style['live-header']}>
                <LiveHeader {...prop}/>
              </div>
              <div className={style['live-body']}>
                <LiveBody {...prop}/>
              </div>
            </div>
            <div className={style['right']}>
              <BarrageList {...prop}/>
            </div>
          </div>
          : <div>loading...</div>
        }
      </Loading>
    );
  }
}

export default connect(() => ({}), {
  toggleSidebar
})(Live);
