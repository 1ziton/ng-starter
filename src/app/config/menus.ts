const MAIN_MENUS = [
  {
    'text': 'DEMO',
    'icon': 'icon-shang-pin icon',
    'link': '/demo',
    'children': [{
      'text': '测试Tab1',
      'link': '/demo/test-tab',
    },
    {
      'text': '测试Tab2',
      'link': '/demo/test-tab2',
    }]
  },
  {
    'text': '用户中心',
    'icon': 'icon-shang-pin icon',
    'link': '/user-center',
    'children': [{
      'text': '运营用户',
      'link': '/user-center/operate-user',
    }]
  },
  {
    'text': '设置中心',
    'icon': 'icon-shang-pin icon',
    'link': '/setting-center',
    'children': [{
      'text': '区域经理',
      'link': '/setting-center/area-manager',
    }]
  }

];

/** 菜单配置 */
export const MENUS = [{
  'text': '主导航',
  'group': true,
  'children': MAIN_MENUS
}];

export function getMenus(menus) {
  return [{
    'text': '主导航',
    'group': true,
    'children': menus
  }];
}
