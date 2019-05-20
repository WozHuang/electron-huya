import React from 'react';
import {getLiveData} from "@/render/api/live";
import style from "./Live.module.less";
import Loading from "@/render/components/loading/Loading";
import {connect} from "react-redux";
import {toggleSidebar} from "@/render/store/setting/action";

class Live extends React.Component {
  state = {
    loading: true,
    fail: false,
    roomData: null
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
          roomData: data,
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
    return (
      <div className={style['wrapper']}>
        <Loading
          loading={this.state.loading}
          fail={this.state.fail}
        >
          {this.profileRoom}
        </Loading>
      </div>
    );
  }
}

export default connect(() => ({}), {
  toggleSidebar
})(Live);
