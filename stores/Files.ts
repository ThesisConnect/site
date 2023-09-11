
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import axiosBaseurl from '../config/baseUrl';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface File {
  type: 'file';
  name: string;
  fileID: string;
  size: number;
  type_file: string;
  lastModified: string;
  link: string;
  memo?: string;
}

export interface Folder {
  type: 'folder';
  name: string;
  folderID: string;
  last_modifiled?: string;
  parentID?: string;
  children?: string[];
  share?: string[];
}

export type Item = Folder | File;
export const baseData: Record<string, Item> = {
  '1_Folder_1': {
    type: 'folder',
    name: 'All tasks',
    folderID: '1_Folder_1',
    children: ['2_Folder_1', '2_Folder_2'],
  },
  '2_Folder_1': {
    type: 'folder',
    name: 'All tasks',
    folderID: '2_Folder_1',
    children: [],
  },
  '2_Folder_2': {
    type: 'folder',
    name: 'All tasks',
    folderID: '2_Folder_2',
    children: [],
  },
  '1_Folder_2': {
    type: 'folder',
    name: 'General',
    folderID: '1_Folder_2',
    children: [],
  },
  '1_Folder_3': {
    type: 'folder',
    name: 'Literature review',
    folderID: '1_Folder_3',
    children: [],
  },
  '1_Folder_4': {
    type: 'folder',
    name: 'Private ',
    folderID: '1_Folder_4',
    children: [],
  },
};

export interface FileStore {
  defaultFiles: Record<string, Item>;
  getcontent: (folderID: string) => Item[];
  setChildren: (children: Item[]) => void;
  getPathName: (folderID: string[]) => string;
}

export const FecherFile = async (childrenID: string[]) => {
  const response = await axiosBaseurl.post('/api/file/download', childrenID);
  const data = (await response.data) as Item[];
  return data;
};

const fileStore = createWithEqualityFn<FileStore>()(persist(
  (set, get) => ({
    defaultFiles: baseData,

    getcontent: (folderID) => {
      const folder = get().defaultFiles[folderID] as Folder;
      return (
        folder?.children
          ?.map((child) => get().defaultFiles[child])
          .filter(Boolean) || []
      );
    },
    setChildren: (children: Item[]) => {
      const childrenWithKey: Record<string, Item> = {};
      children.forEach((child) => {
        if (child.type === 'file') {
          childrenWithKey[child.fileID] = child;
        } else {
          childrenWithKey[child.folderID] = child;
        }
      });
      set({
        defaultFiles: {
          ...get().defaultFiles,
          ...childrenWithKey,
        },
      });
    },
    getPathName: (folderID) => {
      return folderID.map((id) => get().defaultFiles[id]?.name).join('/');
    },
  })
  ,{
    name: 'file-storage',
    storage: createJSONStorage(()=>sessionStorage),
  }
  ),
  shallow
);

export default fileStore;


