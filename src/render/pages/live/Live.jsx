import React from 'react';
import {getLiveData} from "@/render/api/live";
import style from "./Live.module.less";
import Loading from "@/render/components/loading/Loading";
import {connect} from "react-redux";
import {toggleSidebar} from "@/render/store/setting/action";
import LiveHeader from "@/render/pages/live/components/LiveHeader";
import LiveBody from "@/render/pages/live/components/LiveBody";
import BarrageList from "@/render/pages/live/components/BarrageList";

class Live extends React.Component {
  state = {
    loading: true,
    fail: false,
    liveData: null
  };

  componentDidMount() {
    this.props.toggleSidebar({ status: false });
    this.profileRoom = this.props.match.params.profileRoom;
    this.getLiveData();
  }

  getLiveData() {
    getLiveData({ profileRoom: this.profileRoom })
      .then(data => {
        this.setState({
          liveData: data,
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

  render() {
    const liveData = this.state.liveData;
    return (
      <Loading
        loading={this.state.loading}
        fail={this.state.fail}
      >
        {liveData ?
          <div className={style['wrapper']}>
            <div className={style['left']}>
              <div className={style['live-header']}>
                <LiveHeader liveData={liveData}/>
              </div>
              <div className={style['live-body']}>
                <LiveBody liveData={liveData}/>
              </div>
            </div>
            <div className={style['right']}>
              <BarrageList liveData={liveData}/>
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
