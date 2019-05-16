/**
 * 主体区域滚动到顶部
 * @param scrollTop
 */
export function scrollToTop(scrollTop = 0) {
  document.getElementById('content-box').scrollTop = scrollTop;
}
