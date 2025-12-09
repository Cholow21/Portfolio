import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

const PORTFOLIO_DOC_ID = 'main-portfolio';

// Upload image to Firebase Storage
export const uploadImage = async (base64String, path) => {
  try {
    const storageRef = ref(storage, path);
    await uploadString(storageRef, base64String, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    // If upload fails, return the base64 string as fallback
    return base64String;
  }
};

// Get portfolio data from Firestore
export const getPortfolioData = async () => {
  try {
    const docRef = doc(db, 'portfolio', PORTFOLIO_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting portfolio data:', error);
    throw error;
  }
};

// Save portfolio data to Firestore
export const savePortfolioData = async (data) => {
  try {
    // Upload profile image if it's base64
    if (data.personalInfo?.profileImage && data.personalInfo.profileImage.startsWith('data:')) {
      const imageUrl = await uploadImage(
        data.personalInfo.profileImage,
        `profile/${Date.now()}.jpg`
      );
      data.personalInfo.profileImage = imageUrl;
    }

    // Upload project images if they're base64
    if (data.projects) {
      for (let i = 0; i < data.projects.length; i++) {
        if (data.projects[i].imageUrl && data.projects[i].imageUrl.startsWith('data:')) {
          const imageUrl = await uploadImage(
            data.projects[i].imageUrl,
            `projects/${data.projects[i].id}_${Date.now()}.jpg`
          );
          data.projects[i].imageUrl = imageUrl;
        }
      }
    }

    const docRef = doc(db, 'portfolio', PORTFOLIO_DOC_ID);
    await setDoc(docRef, {
      ...data,
      lastUpdated: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    throw error;
  }
};
