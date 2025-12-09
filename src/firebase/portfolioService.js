import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

const PORTFOLIO_DOC_ID = 'main-portfolio';

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

    // Remove base64 images to avoid Firestore document size limit (1MB)
    // Images will be stored in localStorage instead
    if (dataCopy.personalInfo?.profileImage && dataCopy.personalInfo.profileImage.startsWith('data:')) {
      console.log('Removing profile image from Firebase save (too large for Firestore)');
      delete dataCopy.personalInfo.profileImage;
    }

    // Remove project images if they're base64
    if (dataCopy.projects) {
      for (let i = 0; i < dataCopy.projects.length; i++) {
        if (dataCopy.projects[i].imageUrl && dataCopy.projects[i].imageUrl.startsWith('data:')) {
          console.log(`Removing image for project: ${dataCopy.projects[i].name} (too large for Firestore)`);
          delete dataCopy.projects[i].imageUrl;
        }
      }
    }

    console.log('Saving to Firestore...');
    const docRef = doc(db, 'portfolio', PORTFOLIO_DOC_ID);
    await setDoc(docRef, dataCopy);
    console.log('✅ Data saved to Firestore successfully!');
    console.log('📝 Note: Images are stored locally in browser, not in Firebase');
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
