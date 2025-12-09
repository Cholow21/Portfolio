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
      // Return default data if document doesn't exist
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
