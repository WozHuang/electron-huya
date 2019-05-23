import React from 'react';
import propType from 'prop-types';
import s from './BarrageItem.module.less';
import HuyaEmojiParser from "@/render/pages/live/components/components/HuyaEmojiParser";

export default class BarrageItem extends React.Component {
  static propTypes = {
    message: propType.object.isRequired
  };

  render() {
    return (
      <div className={s["barrage-item"]}>
        <span>
            <span className={s["nickName"]}>{this.props.message.sendNick}：</span>
          <span className={s["content"]}><HuyaEmojiParser content={this.props.message.content}/></span>
      </span>
      </div>
    );
  }
}
