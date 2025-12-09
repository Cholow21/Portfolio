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
    console.log('Starting Firebase save...');
    
    // Create a copy to avoid mutating original data
    const dataCopy = JSON.parse(JSON.stringify(data));

    // Upload profile image if it's base64
    if (dataCopy.personalInfo?.profileImage && dataCopy.personalInfo.profileImage.startsWith('data:')) {
      try {
        console.log('Uploading profile image...');
        const imageUrl = await uploadImage(
          dataCopy.personalInfo.profileImage,
          `profile/${Date.now()}.jpg`
        );
        dataCopy.personalInfo.profileImage = imageUrl;
        console.log('Profile image uploaded successfully');
      } catch (imgError) {
        console.warn('Profile image upload failed, saving without it:', imgError);
        // Remove base64 image to avoid document size limit
        delete dataCopy.personalInfo.profileImage;
      }
    }

    // Upload project images if they're base64
    if (dataCopy.projects) {
      for (let i = 0; i < dataCopy.projects.length; i++) {
        if (dataCopy.projects[i].imageUrl && dataCopy.projects[i].imageUrl.startsWith('data:')) {
          try {
            console.log(`Uploading image for project: ${dataCopy.projects[i].name}`);
            const imageUrl = await uploadImage(
              dataCopy.projects[i].imageUrl,
              `projects/${dataCopy.projects[i].id}_${Date.now()}.jpg`
            );
            dataCopy.projects[i].imageUrl = imageUrl;
            console.log(`Project image uploaded successfully`);
          } catch (imgError) {
            console.warn(`Project image upload failed for ${dataCopy.projects[i].name}:`, imgError);
            // Remove base64 image to avoid document size limit
            delete dataCopy.projects[i].imageUrl;
          }
        }
      }
    }

    console.log('Saving to Firestore...');
    const docRef = doc(db, 'portfolio', PORTFOLIO_DOC_ID);
    await setDoc(docRef, dataCopy);
    console.log('✅ Data saved to Firestore successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error saving portfolio data:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};
