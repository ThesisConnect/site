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
  
  return (
    <div>
      <FolderDisplay showFolderID={folderID[folderID.length - 1]} />
    </div>
  );
};

export default Pagefiles;
