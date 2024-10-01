import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Import Firestore

function TransferForm({ items, transfers, setTransfers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);  // To store filtered items
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [providingAssociate, setProvidingAssociate] = useState('');
  const [receivingAssociate, setReceivingAssociate] = useState('');
  const [date, setDate] = useState('');
  const [manualEntry, setManualEntry] = useState(false);  // Flag for manual entry

  // For manual entry of item details
  const [manualItem, setManualItem] = useState('');
  const [manualBrand, setManualBrand] = useState('');
  const [manualPack, setManualPack] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [manualEach, setManualEach] = useState('');

  // Function to handle the search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter items based on the search term and limit the suggestions to 3 items
    const filtered = items.filter((item) => {
      return (
        (item.items && item.items.toLowerCase().includes(term)) || 
        (item.brand && item.brand.toLowerCase().includes(term))
      );
    }).slice(0, 3);  // Limit the results to 3 suggestions

    setFilteredItems(filtered);  // Update the filtered items
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchTerm(item.items); // Set the selected item in the search bar
    setFilteredItems([]); // Clear the filtered list after selection
    setManualEntry(false); // Disable manual entry if an item is selected
  };

  const handleAddTransfer = async () => {
    if (!selectedItem && !manualEntry) {
      alert("Please select or manually enter an item.");
      return;
    }

    const itemDetails = manualEntry ? {
      items: manualItem,
      brand: manualBrand,
      pack: manualPack,
      price: manualPrice,
      each: manualEach
    } : selectedItem;

    if (!quantity || !fromLocation || !toLocation || fromLocation === toLocation || !providingAssociate || !receivingAssociate) {
      alert("Please fill in all fields and make sure the locations are different.");
      return;
    }

    const total = itemDetails.each * quantity;
    const newTransfer = {
      date,
      itemName: itemDetails.items,
      quantity,
      fromLocation,
      toLocation,
      providingAssociate,
      receivingAssociate,
      itemPrice: itemDetails.each,
      total,
    };

    try {
      const docRef = await addDoc(collection(db, 'transfers'), newTransfer);
      setTransfers([...transfers, { id: docRef.id, ...newTransfer }]);
      resetForm();
      alert("Transfer successfully added.");
    } catch (error) {
      console.error("Error adding transfer: ", error);
      alert("Failed to add transfer.");
    }
  };

  const resetForm = () => {
    setSearchTerm('');
    setSelectedItem(null);
    setQuantity('');
    setFromLocation('');
    setToLocation('');
    setProvidingAssociate('');
    setReceivingAssociate('');
    setDate('');
    setFilteredItems([]);
    setManualEntry(false);  // Reset manual entry state
    setManualItem('');      // Clear manual fields
    setManualBrand('');
    setManualPack('');
    setManualPrice('');
    setManualEach('');
  };

  return (
    <div>
      <h2>Add Transfer</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search item or brand..."
        disabled={manualEntry}  // Disable search if in manual entry mode
      />

      {filteredItems.length > 0 && !manualEntry && (
        <ul className="suggestion-list">
          {filteredItems.map((item) => (
            <li key={item.items} onClick={() => handleSelectItem(item)}>
              <strong>Item:</strong> {item.items} <br />
              <strong>Brand:</strong> {item.brand || 'N/A'} <br />
              <strong>Pack:</strong> {item.pack || 'N/A'} <br />
              <strong>Price:</strong> ${item.price} <br />
              <strong>Each:</strong> ${item.each}
            </li>
          ))}
        </ul>
      )}

      <div>
        <label>
          <input
            type="radio"
            name="itemEntry"
            checked={!manualEntry}
            onChange={() => setManualEntry(false)}
          />
          Search and Select Item
        </label>
        <label>
          <input
            type="radio"
            name="itemEntry"
            checked={manualEntry}
            onChange={() => {
              setManualEntry(true);
              setSearchTerm('');  // Clear search when switching to manual entry
            }}
          />
          Manual Entry
        </label>
      </div>

      {manualEntry && (
        <div>
          <input
            type="text"
            value={manualItem}
            onChange={(e) => setManualItem(e.target.value)}
            placeholder="Enter item name"
          />
          <input
            type="text"
            value={manualBrand}
            onChange={(e) => setManualBrand(e.target.value)}
            placeholder="Enter brand"
          />
          <input
            type="text"
            value={manualPack}
            onChange={(e) => setManualPack(e.target.value)}
            placeholder="Enter pack"
          />
          <input
            type="number"
            value={manualPrice}
            onChange={(e) => setManualPrice(e.target.value)}
            placeholder="Enter price"
          />
          <input
            type="number"
            value={manualEach}
            onChange={(e) => setManualEach(e.target.value)}
            placeholder="Enter each price"
          />
        </div>
      )}

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />

      <select value={fromLocation} onChange={(e) => setFromLocation(e.target.value)}>
        <option value="">From Location</option>
        <option value="UC">UC</option>
        <option value="FA">FA</option>
        <option value="LIB">LIB</option>
        <option value="EBB">EBB</option>
        <option value="SSW">SSW</option>
        <option value="COBA">COBA</option>
        <option value="Starbucks UC">Starbucks UC</option>
        <option value="Starbucks West">Starbucks West</option>
        <option value="Panera">Panera</option>
        <option value="CFA">CFA</option>
        <option value="Panda">Panda</option>
        <option value="Subway">Subway</option>
        <option value="Cabo">Cabo</option>
      </select>

      <select value={toLocation} onChange={(e) => setToLocation(e.target.value)}>
        <option value="">To Location</option>
        <option value="UC">UC</option>
        <option value="FA">FA</option>
        <option value="LIB">LIB</option>
        <option value="EBB">EBB</option>
        <option value="SSW">SSW</option>
        <option value="COBA">COBA</option>
        <option value="Starbucks UC">Starbucks UC</option>
        <option value="Starbucks West">Starbucks West</option>
        <option value="Panera">Panera</option>
        <option value="CFA">CFA</option>
        <option value="Panda">Panda</option>
        <option value="Subway">Subway</option>
        <option value="Cabo">Cabo</option>
      </select>

      <select value={providingAssociate} onChange={(e) => setProvidingAssociate(e.target.value)}>
        <option value="">Providing Associate</option>
        {Array.from({ length: 30 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Associate {i + 1}
          </option>
        ))}
      </select>

      <select value={receivingAssociate} onChange={(e) => setReceivingAssociate(e.target.value)}>
        <option value="">Receiving Associate</option>
        {Array.from({ length: 30 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Associate {i + 1}
          </option>
        ))}
      </select>

      <button onClick={handleAddTransfer}>Add Transfer</button>
    </div>
      );
    }
    
    export default TransferForm;
    