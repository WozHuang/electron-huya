import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Hello from "@/render/pages/hello/Hello";
import List from "@/render/pages/list/List";
import RedirectPage from "@/render/pages/redirect/RedirectPage";
import Live from "@/render/pages/live/Live";

export default class RootRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Hello}/>
        <Route path="/list" component={List}/>
        <Route path="/redirectTo" component={RedirectPage}/>
        <Route path="/live/:profileRoom" component={Live}/>
        <Redirect to="/"/>
      </Switch>
    );
  }
}
