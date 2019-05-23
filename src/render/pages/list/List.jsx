import React from 'react';
import style from './List.module.less';
import {getLiveList} from "@/render/api/live";
import {Pagination} from "antd";
import LiveItem from "@/render/pages/list/components/LiveItem";
import {connect} from "react-redux";
import {scrollTop} from "@/render/util/util";
import {toggleSidebar} from "@/render/store/setting/action";
import Loading from "@/render/components/loading/Loading";

// 记录滚动条位置，用于恢复位置
let scrollPosition = 0;

class List extends React.Component {
  state = {
    liveList: [],
    page: {
      pageNo: 1,
      pageSize: 120,
      totalCount: 0,
    },
    loading: true,
    fail: false
  };

  componentDidMount() {
    this.mounted = true;
    this.getList()
      .then(() => {
        if (scrollPosition) {
          scrollTop(scrollPosition);
          scrollPosition = 0;
        }
      });
    this.props.toggleSidebar({ status: true });
  }

  componentWillUnmount() {
    // 消除组件卸载后异步请求才完成时的警告
    this.mounted = false;
  }

  getList() {
    return new Promise(resolve => {
      getLiveList({ pageNo: this.state.page.pageNo })
        .then(data => {
          this.mounted && this.setState({
            liveList: data.list,
            page: data.page,
            loading: false
          }, () => {
            scrollTop(0);
            resolve();
          });
        })
        .catch(() => {
          this.mounted && this.setState({
            loading: false,
            fail: true
          });
        });
    });
  }

  onPageChange = (pageNo) => {
    this.setState({
      page: { ...this.state.page, pageNo }
    }, this.getList);
  };

  onPlayHandler = (profileRoom) => {
    scrollPosition = scrollTop();
    this.props.history.push(`/live/${profileRoom}`);
  };

  render() {
    const { liveList, page } = this.state;
    return (
      <div className={style.wrapper}>
        <Loading
          loading={this.state.loading}
          fail={this.state.fail}
        >

          <ul className={`${style['live__listWrapper']} ${this.props.sidebarOpened ? style['sidebarOpened'] : ''}`}>
            {
              liveList.map(item => (
                <li className={style['live__item']} key={item.profileRoom}>
                  <LiveItem onPlay={this.onPlayHandler} liveData={item}/>
                </li>
              ))
            }
          </ul>
          <Pagination
            className={style['pagination']}
            onChange={this.onPageChange}
            current={page.pageNo}
            pageSize={page.pageSize}
            total={page.totalCount}
          />
        </Loading>
      </div>
    );
  }
}

export default connect(state => ({
  sidebarOpened: state.setting.sidebarOpened
}), {
  toggleSidebar
})(List);
