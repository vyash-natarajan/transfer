import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

function ViewTransfers({ transfers }) {
  const [editingTransfer, setEditingTransfer] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleEdit = (transfer) => {
    setEditingTransfer(transfer.id);
    setEditFields(transfer);
  };

  const handleSaveEdit = async () => {
    try {
      // Assuming you would update the transfers in the parent component
      // setTransfers would be passed from the parent component if needed
      setEditingTransfer(null);
      alert("Transfer successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const filteredTransfers = transfers.filter(transfer => transfer.fromLocation === selectedLocation);

    doc.setFontSize(10);
    doc.text(20, 20, `Transfer Records - From ${selectedLocation}`);
    let yPos = 30;

    filteredTransfers.forEach((transfer) => {
      const transferDetails = `
        Date: ${transfer.date}
        Item: ${transfer.itemName}
        Quantity: ${transfer.quantity} units
        From Location: ${transfer.fromLocation}
        To Location: ${transfer.toLocation}
        Providing Associate: Associate ${transfer.providingAssociate}
        Receiving Associate: Associate ${transfer.receivingAssociate}
        Total: $${transfer.total.toFixed(2)}
      `;
      const lines = transferDetails.split('\n');
      lines.forEach((line) => {
        doc.text(20, yPos, line.trim());
        yPos += 6;
      });
      yPos += 10;
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.save(`transfers_${selectedLocation}.pdf`);
  };

  return (
    <div>
      <h2>Transfer Records</h2>
      <ul className="transfer-records">
        {transfers.map((transfer) => (
          <li key={transfer.id} className="transfer-item">
            {editingTransfer === transfer.id ? (
              <div className="edit-form">
                <input
                  type="date"
                  name="date"
                  value={editFields.date || ''}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="itemName"
                  value={editFields.itemName || ''}
                  onChange={handleChange}
                  placeholder="Item Name"
                />
                <input
                  type="number"
                  name="quantity"
                  value={editFields.quantity || ''}
                  onChange={handleChange}
                  placeholder="Quantity"
                />
                <input
                  type="text"
                  name="fromLocation"
                  value={editFields.fromLocation || ''}
                  onChange={handleChange}
                  placeholder="From Location"
                />
                <input
                  type="text"
                  name="toLocation"
                  value={editFields.toLocation || ''}
                  onChange={handleChange}
                  placeholder="To Location"
                />
                <input
                  type="number"
                  name="providingAssociate"
                  value={editFields.providingAssociate || ''}
                  onChange={handleChange}
                  placeholder="Providing Associate"
                />
                <input
                  type="number"
                  name="receivingAssociate"
                  value={editFields.receivingAssociate || ''}
                  onChange={handleChange}
                  placeholder="Receiving Associate"
                />
                <input
                  type="number"
                  name="total"
                  value={editFields.total || ''}
                  onChange={handleChange}
                  placeholder="Total"
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingTransfer(null)}>Cancel</button>
              </div>
            ) : (
              <div className="transfer-details">
                <span>
                  {transfer.date} - {transfer.itemName} - {transfer.quantity} units
                </span>
                <button className="edit-button" onClick={() => handleEdit(transfer)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="download-section">
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">Select Location</option>
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
        <button className="download-button" onClick={generatePDF} disabled={!selectedLocation}>
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default ViewTransfers;
