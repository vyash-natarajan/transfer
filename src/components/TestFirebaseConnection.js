// src/components/TestFirebaseConnection.js
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Import Firestore instance

function TestFirebaseConnection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const testFirebaseConnection = async () => {
      try {
        // Add a test document to the 'testCollection'
        const docRef = await addDoc(collection(db, 'testCollection'), {
          testField: "Hello Firebase!"
        });
        console.log("Document written with ID: ", docRef.id);

        // Fetch the documents from 'testCollection'
        const querySnapshot = await getDocs(collection(db, 'testCollection'));
        const documents = querySnapshot.docs.map(doc => doc.data());
        setData(documents);
      } catch (error) {
        console.error("Error interacting with Firebase: ", error);
      }
    };

    // Call the function to test Firebase connection
    testFirebaseConnection();
  }, []);

  return (
    <div>
      <h1>Check the console to see if Firebase is connected!</h1>
      {data.length > 0 ? (
        <div>
          <h2>Data from Firestore:</h2>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.testField}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data fetched from Firestore yet...</p>
      )}
    </div>
  );
}

export default TestFirebaseConnection;
