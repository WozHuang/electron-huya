import React from 'react';
import style from './List.module.less';
import {getLiveList} from "@/render/api/live";
import {Pagination} from "antd";
import LiveItem from "@/render/pages/list/components/LiveItem";
import {connect} from "react-redux";
import {scrollToTop} from "@/render/util/util";
import {toggleSidebar} from "@/render/store/setting/action";

class List extends React.Component {
  state = {
    liveList: [],
    page: {
      pageNo: 1,
      pageSize: 120,
      totalCount: 0,
    }
  };

  componentDidMount() {
    this.getList();
    this.props.toggleSidebar({ status: true });
  }

  getList() {
    getLiveList({ pageNo: this.state.page.pageNo })
      .then(data => {
        this.setState({
          liveList: data.list,
          page: data.page
        }, scrollToTop);
      });

  }

  onPageChange = (pageNo) => {
    this.setState({
      page: { ...this.state.page, pageNo }
    }, this.getList);
  };

  render() {
    const { liveList, page } = this.state;
    return (
      <div className={style.wrapper}>
        <ul className={`${style['live__listWrapper']} ${this.props.sidebarOpened ? style['sidebarOpened'] : ''}`}>
          {
            liveList.map(item => (
              <li className={style['live__item']} key={item.profileRoom}>
                <LiveItem roomData={item}/>
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
      </div>
    );
  }
}

export default connect(state => ({
  sidebarOpened: state.setting.sidebarOpened
}), {
  toggleSidebar
})(List);
