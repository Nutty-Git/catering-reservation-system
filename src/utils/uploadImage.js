import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';


export const uploadImageToFirebase = async (file, folder = 'products') => {
  const imageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(imageRef, file);
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};
