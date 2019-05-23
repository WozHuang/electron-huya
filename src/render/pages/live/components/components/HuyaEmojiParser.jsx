import React from 'react';
import {parseMessage} from './HuyaEmoji';
import propType from 'prop-types';
import s from './BarrageItem.module.less';

export default class HuyaEmojiParser extends React.Component {
  static propTypes = {
    content: propType.string.isRequired
  };
  nodeList = [];

  constructor(props) {
    super(props);
    this.nodeList = parseMessage(this.props.content);
  }

  render() {
    return (
      this.nodeList.map((item, index) => {
        switch (item.type) {
          case 'text':
            return <span key={index}>{item.content}</span>;
          case 'emoji':
            return <img key={index} className={s['emoji']} src={item.src} alt={item.alt}/>;
          default:
            return null;
        }
      })
    );
  }
}

