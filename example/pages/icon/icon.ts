Page({
  data: {
    icons: [
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'add-circle',
      'app',
      'arrow-down-rectangle',
      'attach',
      'backtop-rectangle',
      'backtop',
      'backward',
      'barcode',
      'books',
      'browse-off',
      'browse',
      'bulletpoint',
      'calendar',
      'call',
      'caret-down',
      'caret-left',
      'caret-right',
      'caret-up',
      'cart',
      'chart-bar',
      'chart-bubble',
      'chart-pie',
      'chart',
      'chat',
    ],
  },
  onIconTap(event: any) {
    const { icons } = this.data;
    const { index } = event.currentTarget.dataset;
    wx.setClipboardData({
      data: icons[index],
    });
  },
});
