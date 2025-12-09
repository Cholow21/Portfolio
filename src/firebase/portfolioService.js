import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

const PORTFOLIO_DOC_ID = 'main-portfolio';

// Compress image to reduce size for Firestore
const compressImage = (base64String, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed base64
      const compressed = canvas.toDataURL('image/jpeg', quality);
      resolve(compressed);
    };
    img.onerror = () => resolve(base64String); // Return original if compression fails
    img.src = base64String;
  });
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

    // Compress profile image if it's base64
    if (dataCopy.personalInfo?.profileImage && dataCopy.personalInfo.profileImage.startsWith('data:')) {
      try {
        console.log('Compressing profile image...');
        const compressed = await compressImage(dataCopy.personalInfo.profileImage, 400, 0.6);
        dataCopy.personalInfo.profileImage = compressed;
        console.log('Profile image compressed successfully');
      } catch (imgError) {
        console.warn('Profile image compression failed:', imgError);
        // Keep original if compression fails
      }
    }

    // Compress project images if they're base64
    if (dataCopy.projects) {
      for (let i = 0; i < dataCopy.projects.length; i++) {
        if (dataCopy.projects[i].imageUrl && dataCopy.projects[i].imageUrl.startsWith('data:')) {
          try {
            console.log(`Compressing image for project: ${dataCopy.projects[i].name}`);
            const compressed = await compressImage(dataCopy.projects[i].imageUrl, 600, 0.6);
            dataCopy.projects[i].imageUrl = compressed;
            console.log(`Project image compressed successfully`);
          } catch (imgError) {
            console.warn(`Project image compression failed for ${dataCopy.projects[i].name}:`, imgError);
            // Keep original if compression fails
          }
        }
      }
    }

    console.log('Saving to Firestore...');
    const docRef = doc(db, 'portfolio', PORTFOLIO_DOC_ID);
    await setDoc(docRef, dataCopy);
    console.log('✅ Data saved to Firestore successfully!');
    console.log('📸 Images compressed and saved to Firebase');
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
