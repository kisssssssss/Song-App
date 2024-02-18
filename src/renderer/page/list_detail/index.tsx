import React, { memo, useEffect, useState, useMemo, useLayoutEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

import FormatArtistName from '../../components/FormatArtistName';

import useStore from 'store/index';
import Scroll from 'components/scroll';
import Icon from '../../components/icon';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image } from '@nextui-org/react';

import { getListSong } from '../../service';
import type { Song } from '../../@types';
import { BScrollInstance } from '@better-scroll/core';

export default memo(() => {
  const { id } = useParams();
  const table = useRef<Array<Song & { index: number }>>([]);
  const [getMyList, play, limit] = useStore((state) => [state.getMyList, state.play, state.requestLimit]);

  const listData = useMemo(() => getMyList(Number(id)), [id]);

  // 组件初始化
  useEffect(() => {
    requestData();

    // 却换歌单
    return () => {
      table.current = [];
      offset.current = 0;
      hasMore.current = true;
      setStartY(0);
      setRefresh((pre) => !pre);
    };
  }, [id]);

  // 上拉加载更多，保存滚动条位置
  const hasMore = useRef<boolean>(true);
  const [startY, setStartY] = useState<number>(0);
  const pullingUpHandler = useCallback(
    (bs: BScrollInstance) => {
      hasMore.current && requestData(() => setStartY(bs.y));
    },
    [hasMore.current, table.current.length],
  );

  // 请求歌单的歌曲
  const [refresh, setRefresh] = useState<boolean>(true);
  const offset = useRef<number>(0);
  const requestData = useCallback(
    (fn?: () => void) => {
      getListSong(Number(id), limit, offset.current).then((res) => {
        // 将请求结果插入到数组
        table.current.splice(
          offset.current,
          limit,
          ...res.data.songs.map((song, index) => {
            return {
              ...song,
              index: offset.current + index + 1,
            };
          }),
        );
        // 更新 offset 以及 hasMore
        offset.current += limit;
        hasMore.current = res.data.more;
        // 刷新，重新渲染table组件
        setRefresh((pre) => !pre);

        fn && fn();
      });
    },
    [id, limit, offset.current, table.current.length, refresh],
  );

  return (
    <Scroll
      config={{
        scrollConfig: { startY, scrollbar: { interactive: true }, pullUpLoad: { threshold: 0 } },
        customConfig: { isDrag: true, pullingUpHandler },
      }}
      className="mr-1 flex-grow pl-3 pr-2"
    >
      <div className="pt-10">
        <div className="mx-4 mb-6 lg:mx-6 lg:mb-7 xl:mx-8 xl:mb-8">
          <Image isZoomed isBlurred src={listData?.cover} className="max-h-fit w-52 max-w-fit lg:w-56 xl:w-60" />
        </div>
        <Table
          color="primary"
          selectionMode="single"
          aria-label="infinite"
          classNames={{
            base: 'px-4 lg:px-6 xl:px-8',
            table: ' table-fixed',
          }}
          onRowAction={(key) => {
            for (let index = 0; index < table.current.length; index++) {
              if (key == table.current[index].id) {
                play(table.current[index]);
                break;
              }
            }
          }}
        >
          <TableHeader>
            <TableColumn className="w-[8%]">Index</TableColumn>
            <TableColumn className="w-[40%]">Name</TableColumn>
            <TableColumn className="w-[32%]">Artist</TableColumn>
            <TableColumn className="w-[20%]">Action</TableColumn>
          </TableHeader>
          <TableBody items={table.current}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell className="w-8 [&>span]:ml-[11px]">{item.index}</TableCell>
                <TableCell>
                  <div title={item.name} className="w-full truncate">
                    {item.name}
                  </div>
                </TableCell>
                <TableCell>
                  <FormatArtistName artists={item.artist} />
                </TableCell>
                <TableCell>
                  <Icon name="play"></Icon>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Scroll>
  );
});
