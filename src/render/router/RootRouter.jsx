import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Hello from "@/render/pages/hello/Hello";
import List from "@/render/pages/list/List";

export default class RootRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Hello}/>
        <Route path="/list" component={List}/>
        <Redirect to="/"/>
      </Switch>
    );
  }
}
