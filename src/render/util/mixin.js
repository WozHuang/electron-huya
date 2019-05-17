// 存放mixin函数
// 使用方法为装饰器语法
/*
 @name
 class xx extends React.Component{}
*/

// 一个用于强制刷新的方法
export function withRefresh(Component){
  Component.prototype.refreshPage = function () {
    if (!this.props.history) {
      throw new Error('need this.props.history');
    }
    // this.props.history.push('/redirectTo?t=' + this.props.history.location.pathname);
    const {location} = this.props.history;
    const targetLocation = {...location};
    targetLocation.query = {...location.query} || {};
    this.props.history.replace({
      pathname: '/redirectTo',
      query: {
        location: targetLocation
      }
    })
  };
}
