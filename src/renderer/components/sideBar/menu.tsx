import { memo } from 'react';
import useStore from 'store/index';
import { getItem, ItemProps } from './menuItem';
import { cut } from '../../utils';

import { Divider } from '@nextui-org/react';

// 菜单
const Menu1: ItemProps[] = [
  { icon: 'song', title: 'song', url: '/songs' },
  { icon: 'list', title: 'list', url: '/list/recommended' },
  { icon: 'album', title: 'album', url: '/album' },
];

export default memo(() => {
  const list = useStore((state) => state.list);

  const Menu2 = list.map(
    (item): ItemProps => ({
      icon: cut(item.cover, 42),
      title: item.title,
      url: `/list/${item.id}`,
    }),
  );
  
  if (Menu2.length > 0) {
    Menu2[0].title = '我喜欢的音乐';
  }

  return (
    <div>
      {Menu1.map((item) => getItem(item))}
      <Divider className="my-4" />
      {Menu2.map((item) => getItem(item))}
    </div>
  );
});
