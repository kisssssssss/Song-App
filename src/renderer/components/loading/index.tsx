import { memo } from 'react';
import { CircularProgress } from '@nextui-org/react';

export default memo<{ loading: boolean }>(({ loading }) => {
  if (loading) {
    return (
      <div className="absolute left-0 top-0 z-20 h-full w-full backdrop-blur-[1px]">
        <CircularProgress aria-label="Loading..." className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  }
});
