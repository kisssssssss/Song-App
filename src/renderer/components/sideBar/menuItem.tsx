import React, { memo, useContext } from 'react';
import useStore from 'store/index';
import classNames from 'classnames';

import Context from './context';

import { Tooltip, Image } from '@nextui-org/react';
import Icon, { IconName } from 'components/icon';

export type ItemProps = {
  icon?: IconName | string;
  title?: string;
  url?: string;
};

const Item = memo<ItemProps>(({ icon, title, url }) => {
  const { to, currentRoute } = useContext(Context);

  const isMenuFolded = useStore((state) => state.isMenuFolded);

  // 匹配当前路由时高亮
  const isSelected = currentRoute === url;

  let cover = null;
  if (icon.includes('http')) {
    cover = <img src={icon} className="mx-[9.5px] h-12 w-12 min-w-fit overflow-hidden rounded-md xl:mx-[17.5px] xl:h-14 xl:w-14" />;
  } else {
    cover = (
      <Icon
        name={icon as IconName}
        size={[36, 36]}
        className={classNames('mx-[15.5px] transition-all group-hover:fill-primary-400 xl:mx-[27.5px]', {
          'fill-primary-400': isSelected,
        })}
      />
    );
  }

  let result: React.ReactNode = (
    <div
      onClick={(e) => to(e, url)}
      className="group my-0.5 flex w-full cursor-pointer items-center rounded-lg py-2 text-default-500 hover:bg-primary-400/10"
    >
      {cover}
      <span
        title={title}
        className={classNames('xl: ml-0.5 max-w-[100px] truncate text-base transition-all group-hover:text-primary-400 xl:max-w-[110px]', {
          'text-primary-400': isSelected,
          hidden: isMenuFolded,
        })}
      >
        {title}
      </span>
    </div>
  );

  // 侧边栏收缩时显示提示
  if (isMenuFolded) {
    result = (
      <Tooltip content={title} placement="right" offset={20} delay={200} className="rounded-md bg-default-200/90">
        {result}
      </Tooltip>
    );
  }

  return result;
});

export const getItem = ({ icon, title, url }: ItemProps) => <Item icon={icon} title={title} url={url} key={url} />;

export default Item;
