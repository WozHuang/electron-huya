import React from 'react';
import s from './Home.module.less';
import {Button, Form, Input} from "antd";

class Home extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = this.props.form.getFieldsValue();
    this.play(formData.roomId);
  };

  play = (profileRoom) => {
    this.props.history.push(`/live/${profileRoom}`);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={s['wrapper']}>
        <div className={s['content']}>
          <img
            className={s['logo']}
            alt="LOGO"
            src={process.env.PUBLIC_URL + '/favicon.png'}
          />
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('roomId')(
                <Input placeholder="输入房间号" style={{ textAlign: 'center' }}/>,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">进入房间</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Home);
