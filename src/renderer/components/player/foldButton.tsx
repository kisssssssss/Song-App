import { memo } from 'react';
import classNames from 'classnames';
import useStore from 'store/index';

import Icon from 'components/icon';

export default memo(() => {
  const [isMenuFolded, isPlayerFolded, setIsPlayerFolded] = useStore((state) => [
    state.isMenuFolded,
    state.isPlayerFolded,
    state.setIsPlayerFolded,
  ]);

  const foldClass = classNames('group absolute bottom-0 h-full cursor-pointer rounded-r-lg border-divider transition-colors ', {
    'right-0': (isPlayerFolded && isMenuFolded) || !isPlayerFolded || !isMenuFolded,
  });

  return (
    <div className={foldClass} onClick={() => setIsPlayerFolded(!isPlayerFolded)}>
      <Icon
        name={isPlayerFolded ? 'playerFold' : 'playerUnfold'}
        height={20}
        className="mx-o.5 mt-[22px] group-hover:fill-primary-500 lg:mt-[30px] xl:mt-[38px]"
      ></Icon>
    </div>
  );
});
