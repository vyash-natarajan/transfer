import React, { useState, useEffect } from 'react';
import TransferForm from './components/TransferForm';
import ViewTransfers from './components/ViewTransfers';
import Login from './components/Login';
import items from './data/items.json';
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';  // Import Firestore

function TransferSystem() {
  const [transfers, setTransfers] = useState([]);
  const navigate = useNavigate();  // For navigation between pages

  // Fetch existing transfers from Firebase on component mount
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'transfers'));
        const fetchedTransfers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransfers(fetchedTransfers);
      } catch (error) {
        console.error("Error fetching transfers: ", error);
      }
    };

    fetchTransfers();
  }, []);

  const handleLogout = () => {
    navigate('/'); // Redirect back to the login page on logout
  };

  return (
    <div>
      <header>
        <h1>Transfer System</h1>
      </header>
      <button className="logout" onClick={handleLogout}>Logout</button>
      <div className="container">
        <TransferForm items={items} transfers={transfers} setTransfers={setTransfers} />
        <ViewTransfers transfers={transfers} setTransfers={setTransfers} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/transfer-system" element={<TransferSystem />} />
      </Routes>
    </Router>
  );
}

export default App;
