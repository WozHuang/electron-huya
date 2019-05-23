import React from 'react';
import s from './BarrageLauncher.module.less';
import propType from 'prop-types';
import HuyaEmojiParser from "@/render/pages/live/components/components/HuyaEmojiParser";


function getRandom(min, max) {
  return Math.round(min + Math.random() * (max - min));
}
export default class BarrageLauncher extends React.Component {
  static propTypes = {
    socket: propType.object.isRequired
  };

  state = {
    list: []
  };

  el = React.createRef();
  width = 0;


  componentDidMount() {
    this.props.socket.on('message', msg => {
      this.launch(msg);
    });
    // this.width = this.el.current.clientWidth;
    // console.log('width', this.width);
  }

  launch(msg) {
    this.setState({
      list: [...this.state.list.slice(-100), {
        ...msg,
        styleObj: {
          top: getRandom(1, 5) * 50 + 'px',
          animationDuration: getRandom(10, 15) + 's'
        }
      }]
    });
  }

  render() {
    return (
      <div ref={this.el} className={s['wrapper']}>
        {
          this.state.list.map(item => (
            <div key={item.time} style={item.styleObj} className={s['barrage-item']}>
              <HuyaEmojiParser content={item.content}/></div>
          ))
        }
      </div>
    );
  }
}
