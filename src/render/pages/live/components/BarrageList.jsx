import React from 'react';
import HuyaSocket from "@/render/api/HuyaSocket";

export default class BarrageList extends React.Component {
  socket = null;
  state = {
    messageList: []
  };

  componentDidMount() {
    const liveData = this.props.liveData;
    const profileRoom = liveData.TT_ROOM_DATA.profileRoom;
    this.socket = new HuyaSocket({ profileRoom });
    this.socket.on('message', msg => {
      const list = this.state.messageList.slice(-100);
      list.push(Object.assign(msg, { time: Date.now() }));
      this.setState({
        messageList: list
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return <div>
      <ul>
        {
          this.state.messageList.map(item => (
            <li key={item.time}>{item.content}</li>
          ))
        }
      </ul>
    </div>;
  }
}
