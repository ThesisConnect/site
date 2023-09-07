
const pagefiles = ({params:{folderName}}:{
    params:{
        folderName: string[]
    }
}) => {
    return (
      <div>pagefiles {folderName.join("/")}  </div>
    )
  }
  
  export default pagefiles