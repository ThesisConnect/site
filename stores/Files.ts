import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import axiosBaseurl from '../config/baseUrl';
import { createJSONStorage, persist } from 'zustand/middleware';
import { deleteFile } from '@/utils/managefile';
export interface File {
  type: 'file';
  name: string;
  _id: string;
  size: number;
  file_type: string;
  lastModified: string;
  link: string;
  memo?: string;
}

export interface Folder {
  type: 'folder';
  name: string;
  _id: string;
  lastModifiled?: string;
  parentID?: string;
  children?: string[];
  shared?: string[];
}

export type Item = Folder | File;

export interface FileStore {
  defaultFiles: Record<string, Item>;
  getcontent: (folderID: string) => Item[] | undefined;
  setChildren: (children: Item[]) => void;
  getPathName: (folderID: string[]) => string;
  setFiles: (files: Item[]) => void;
  getCurrentFolder: (folderID: string) => Folder;
  deleteFileFromStore: (fileID: string) => void;
}

const fileStore = createWithEqualityFn<FileStore>()(
  persist(
    (set, get) => ({
      defaultFiles: {},
      getCurrentFolder: (folderID) => {
        return get().defaultFiles[folderID] as Folder;
      },
      setFiles: (files) => {
        const filesWithKey: Record<string, Item> = {};
        files.forEach((file) => {
          if (file.type === 'file') {
            filesWithKey[file._id] = file;
          } else {
            filesWithKey[file._id] = file;
          }
        });
        set({
          defaultFiles: {
            ...get().defaultFiles,
            ...filesWithKey,
          },
        });
      },
      getcontent: (folderID) => {
        const folder = get().defaultFiles[folderID] as Folder;
        return (
          folder?.children
            ?.map((child) => get().defaultFiles[child])
            .filter(Boolean) || undefined
        );
      },
      setChildren: (children: Item[]) => {
        const childrenWithKey: Record<string, Item> = {};
        console.log('children', children);
        children.forEach((child) => {
          if (child.type === 'file') {
            childrenWithKey[child._id] = child;
          } else {
            childrenWithKey[child._id] = child;
          }
        });
        // console.log("childrenWithKey",childrenWithKey)
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
      deleteFileFromStore: (fileID) => {
        delete get().defaultFiles[fileID];
        set({
          defaultFiles: {
            ...get().defaultFiles,
          },
        });
      },
    }),
    {
      name: 'file-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  ),
  shallow
);

export default fileStore;
