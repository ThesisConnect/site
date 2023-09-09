'use client';

import FolderDisplay from '@/components/files/FolderDIsplay';
import axiosBaseurl from '@/config/baseUrl';
import fileStore, { Item } from '@/stores/Files';
import { use, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { boolean } from 'zod';
import { usePathname } from 'next/navigation';

const Fetcher = async (url: string) => {
  const res = await axiosBaseurl.get(url);
  return res.data;
};
export interface IFolder {
  _id: string;
  name: string;
  parent?: string;
  child: string[];
  files: string[];
  shared: string[];
  type: 'folder';
  timestamps: string;
}
export interface IFile {
  _id: string;
  name: string;
  url: string;
  size: number;
  type_file: string;
  memo?: string;
  type: 'file';
  timestamps: string;
}
const Pagefiles = ({
  params: { folderID },
}: {
  params: {
    folderID: string[];
  };
}) => {
  const { data, error, isLoading } = useSWR(
    '/folderExtra/' + folderID[folderID.length - 1],
    Fetcher
  );
  const pathName = usePathname();
  const setChildren = fileStore((state) => state.setChildren);
  const FormatData: Item[] = useMemo(() => {
    if (!data) return [];
    return data
      .map((items: IFile | IFolder): Item => {
        if (items.type === 'folder') {
          const { _id, name, parent, child, files, shared, type, timestamps } =
            items as IFolder;
          return {
            type,
            name,
            folderID: _id,
            parentID: parent,
            children: [...child, ...files],
            share: shared,
            last_modifiled: timestamps,
          };
        } else {
          const { _id, name, url, size, type_file, memo, type, timestamps } =
            items as IFile;
          return {
            type,
            name,
            fileID: _id,
            size,
            type_file,
            lastModified: timestamps,
            link: url,
            memo,
          };
        }
      })
      .filter(
        (items: Item) => items.type === 'folder' || items.type === 'file'
      );
  }, [data]);
  useEffect(() => {
    if (FormatData) {
      setChildren(FormatData);
    }
  }, [FormatData, setChildren]);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <FolderDisplay showFolderID={folderID[folderID.length - 1]} />
    </div>
  );
};

export default Pagefiles;
