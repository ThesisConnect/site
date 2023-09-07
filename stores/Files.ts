import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export interface File {
    type: 'file';
    size: number;
    type_file: string;
    lastModified: string;
    link: string;
  }
  
export interface Folder {
    type: 'folder';
    name: string;
    folderID: string;
    last_modifiled?: string;
    contents: (Folder | File)[];
  }
  export const baseData:(Folder | File)[] = [
    {
      type: 'folder',
      name: 'All tasks',
      folderID: '1_1',
      contents: [
        {
          type: 'folder',
          name: 'All tasks',
          folderID: '2_1',
          contents: [],
        },
        {
          type: 'folder',
          name: 'All tasks',
          folderID: '2_2',
          contents: [],
        },
      ],
    },
    {
      type: 'folder',
      name: 'General',
      folderID: '1_2',
      contents: [],
    },
    {
      type: 'folder',
      name: 'Literature review',
      folderID: '1_3',
      contents: [],
    },
    {
      type: 'folder',
      name: 'Private ',
      folderID: '1_4',
      contents: [],
    },
  ];

    export interface FileStore {
        defaultFiles: (Folder | File)[];
        getcontent: (folderID: string,data: (Folder | File)[]) => (Folder | File)[];
      }


  const fileStore = createWithEqualityFn<FileStore>((
    set,
    get
  ) => ({
    defaultFiles: baseData,
    getcontent:(showFolderID: string, data: (Folder | File)[]) => {
        if (showFolderID === 'root') {
          return baseData;
        }
        for (const item of data) {
          if (item.type === 'folder' && item.folderID === showFolderID) {
            return item.contents;
          }
          if (item.type === 'folder' && item.contents?.length) {
            const result = get().getcontent(showFolderID, item.contents);
            if (result.length) {
                return result;
                }
          }
        }
        return [];
      }, 
  }),shallow)


export default fileStore;