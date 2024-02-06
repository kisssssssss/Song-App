import { memo } from 'react';
import classNames from 'classnames';
import useStore from 'store/index';

import Icon from 'components/icon';

export default memo(() => {
  const [isMenuFolded, isPlayerFolded, setIsPlayerFolded] = useStore(state => [
    state.isMenuFolded,
    state.isPlayerFolded,
    state.setIsPlayerFolded,
  ]);

  const foldClass = classNames(
    'group absolute bottom-0 h-full cursor-pointer border-r-1 border-divider bg-gradient-to-r from-content2 to-default-200/80 shadow-sm',
    { '-right-[20px] border': isPlayerFolded && isMenuFolded, 'right-0': !isPlayerFolded || !isMenuFolded },
    { 'rounded-lg': isMenuFolded, 'rounded-r-lg': !isMenuFolded },
  );

  return (
    <div className={foldClass} onClick={() => setIsPlayerFolded(!isPlayerFolded)}>
      <Icon name="playerFold" height={20} className="mx-o.5 mt-[22px] group-hover:fill-primary-500 lg:mt-[30px] xl:mt-[38px]"></Icon>
    </div>
  );
});
