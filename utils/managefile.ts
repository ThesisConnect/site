import fileStore, { File, Folder, Item } from '@/stores/Files';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import bytes from 'bytes';
import { object } from 'zod';

export const handleZipFile = async (
  file: any,
  parentID: string
): Promise<Item[]> => {
  const zip = new JSZip();
  const zipContent = await zip.loadAsync(file);
  const rootName = file.name.split('.')[0];
  const rootFolder: Folder = {
    type: 'folder',
    name: rootName,
    folderID: uuidv4(),
    children: [],
    parentID,
    last_modifiled: Date.now().toString(),
  };
  const newItems: Record<string, Item> = {
    [rootFolder.folderID]: rootFolder,
  };
  zipContent
    .filter((relativePath) => {
      // console.log(relativePath)
      // console.log(file.name)
      return (
        relativePath.startsWith(rootName) &&
        !relativePath.endsWith('.DS_Store') &&
        relativePath !== `${rootName}/`
      );
    })
    .forEach(async (zipEntry) => {
      console.log(zipEntry);
      const paths = zipEntry.name.split('/');
      if (zipEntry.dir) {
        const newFolderID = uuidv4();
        const folder = Object.values(newItems).find(
          (item) => item.name === paths[paths.length - 2]
        ) as Folder;
        newItems[newFolderID] = {
          type: 'folder',
          name: zipEntry.name,
          folderID: newFolderID,
          parentID: folder.folderID,
          children: [],
        };
        folder.children!.push(newFolderID);
      } else {
        const newFileID = uuidv4();
        const fileName = paths[paths.length - 1];
        const fileContent = await zipEntry.async('blob');
        const url = await uploadFile(
          new Blob([fileContent], { type: 'application/octet-stream' }),
          fileName
        );
        newItems[newFileID] = {
          type: 'file',
          name: fileName,
          fileID: newFileID,
          size: zipEntry._data.uncompressedSize,
          type_file: (fileName.split('.').pop() as string) || '',
          lastModified: Date.now().toString(),
          link: url,
        };
        const folder = Object.values(newItems).find(
          (item) => item.name === paths.slice(0, -1).join('/')
        ) as Folder;
        folder.children!.push(newFileID);
      }
      Object.values(newItems).forEach((item) => {
        if (item.type === 'folder') {
          item.name = item.name.split('/').pop() as string;
        }
      });
      const defaultFiles = fileStore.getState().defaultFiles;
      const folderParentRoot = defaultFiles[parentID] as Folder;
      folderParentRoot.children!.push(rootFolder.folderID);
      fileStore.setState({
        defaultFiles: {
          ...defaultFiles,
          ...newItems,
        },
      });
    });
  return Object.values(newItems);
};

export const handleFile = async (
  file: any,
  parentID: string
): Promise<File> => {
  const newFileID = uuidv4();
  const url = await uploadFile(file, file.name);
  const newFile: File = {
    type: 'file',
    name: file.name,
    fileID: newFileID,
    size: file.size,
    type_file: (file.name.split('.').pop() as string) || '',
    lastModified: Date.now.toString(),
    link: url,
  };
  const defaultFiles = fileStore.getState().defaultFiles;
  const folderParentRoot = defaultFiles[parentID] as Folder;
  folderParentRoot.children!.push(newFileID);
  fileStore.setState({
    defaultFiles: {
      ...defaultFiles,
      [newFileID]: newFile,
    },
  });
  return newFile;
};

export const uploadFile = async (file: any, filename: string) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User not found');
  const storageRef = ref(storage, `${user.uid}/files/${filename}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
