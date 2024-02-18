import { memo } from 'react';
import { flatMap } from 'lodash';

export default memo<{ artists: any[] }>(({ artists }) => {
  if (artists.length > 1) {
    artists = flatMap(artists, (n) => [n, ' / ']);
    artists.pop();
  }
  return (
    <div>
      {artists.map((item, index) => {
        if (typeof item === 'string') {
          return <span key={index}>{item}</span>;
        }
        return (
          <span key={item.id} className="cursor-pointer hover:text-primary-500">
            {item.name}
          </span>
        );
      })}
    </div>
  );
});
