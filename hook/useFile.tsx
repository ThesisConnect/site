import { IFolder } from "@/app/mainPage/[project]/files/[...folderID]/page";
import axiosBaseurl from "@/config/baseUrl";
import fileStore, { Item } from "@/stores/Files";
import { useEffect, useState } from "react";
import useSWR, { KeyedMutator, mutate } from 'swr';

export const FecherFile = async (url:string) => {
  const response = await axiosBaseurl.get(url)
  return response.data
};
interface IFileHookReturn{
  allfiles:Item[] | undefined;
  isLoading:boolean;
  error:Error|undefined
  mutate: KeyedMutator<IFileFetch> | undefined
}
interface IFileFetch extends Omit<IFolder,'child'|'files'>{
  child:any[]
  files:any[]
  updatedAt:string
}
const useFile = (folderID:string) => {
  const {setChildren,getcontent} = fileStore((state) => ({
    setChildren:state.setChildren,
    getcontent:state.getcontent
  }))
  const ONE_HOUR_IN_MS = 60 * 60 * 1000;
  const {data,mutate,error,isLoading} = useSWR<IFileFetch,Error>(`/folder/${folderID}`,FecherFile,{
    revalidateOnFocus:true,
  })
  const [dataFile,setData] = useState<Item[]|undefined>()
  useEffect(() => {
    if(data){
      const rootFolder = {
        type: 'folder',
        name: data.name,
        _id: data._id,
        lastModifiled: data.updatedAt,
        parentID: data.parent,
        children: [...data.child.map((item ) => item._id),...data.files.map((item ) => item._id)],
        shared: data.shared,
      } as Item
      const allFolder = data.child.map((item ) => {
        return {
          type: 'folder',
          name: item.name,
          _id: item._id,
          lastModifiled: item.updatedAt,
          parentID: item.parent,
          children: item.child,
          shared: item.shared,
        };
      }
      ) as Item[]
      const allFile = data.files.map((item ) => {
        return {
          type: 'file',
          name: item.name,
          _id: item._id,
          size: item.size,
          file_type: item.file_type,
          lastModified: item.updatedAt,
          link: item.url,
          memo: item.memo,
        };
      }
      ) as Item[]
      if(folderID)
        setChildren([rootFolder,...allFolder,...allFile])
    }
    setData(getcontent(folderID))

  }, [data,folderID,setChildren,getcontent])
  return {
    allfiles: getcontent(folderID) || [],
    isLoading,
    error,
    mutate
  } as IFileHookReturn
}
export default useFile