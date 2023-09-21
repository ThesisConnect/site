import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const uploadFileToFirebase = async (file:File) => {
  if (!file) {
    throw new Error("No file provided");
  }

  try {
    // Step 1: Create a reference
    const storage = getStorage();
    const uid  = v4()
    const pathFile = 'uploads/' + file.name+uid;
    const storageRef = ref(storage, pathFile);

    // Step 2: Start the upload
    await uploadBytes(storageRef, file);
    console.log('Upload completed');

    // Step 3: Get the download URL
    try {
      const downloadURL = await getDownloadURL(storageRef);
      console.log('File available at', downloadURL);
      return [downloadURL,pathFile,uid] // Returning the download URL
    } catch (error) {
      console.error('Failed to get download URL:', error);
      throw error; // Throwing the error to be caught outside of the function
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Throwing the error to be caught outside of the function
  }
};


export default uploadFileToFirebase;