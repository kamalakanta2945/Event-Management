// src/components/admin/BulkImport.js
import { useState } from 'react';
import { Button, Input, Box, Typography, Paper } from '@mui/material';
import * as XLSX from 'xlsx';
import { VscCloudUpload } from 'react-icons/vsc';

const BulkImport = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };
    reader.readAsBinaryString(selectedFile);
  };

  const handleImportEvents = async () => {
    if (data.length === 0) {
      alert('No data to import.');
      return;
    }
    // try {
    // TODO: Implement the actual API call to the backend.
    // The `data` variable contains the parsed data from the Excel file.
    // Example:
    // try {
    //   await importEvents(data); // importEvents is a function in your eventService
    //   toast.success('Events imported successfully!');
    // } catch (error) {
    //   toast.error('Failed to import events.');
    //   console.error('Failed to import events:', error);
    // }
    console.log('Importing events:', data);
    alert('This is a placeholder. The data has been logged to the console.');
  };

  const handleImportUsers = async () => {
    if (data.length === 0) {
      alert('No data to import.');
      return;
    }
    // TODO: Implement the actual API call to the backend.
    // The `data` variable contains the parsed data from the Excel file.
    // Example:
    // try {
    //   await importUsers(data); // importUsers is a function in your userService
    //   toast.success('Users imported successfully!');
    // } catch (error) {
    //   toast.error('Failed to import users.');
    //   console.error('Failed to import users:', error);
    // }
    console.log('Importing users:', data);
    alert('This is a placeholder. The data has been logged to the console.');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <VscCloudUpload className="h-16 w-16 text-gray-400 mb-4" />
        <Typography variant="h5" gutterBottom>
          Bulk Data Import
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Upload an Excel file (.xlsx) to import data in bulk.
        </Typography>
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx"
          sx={{ display: 'none' }}
          id="bulk-import-file"
        />
        <label htmlFor="bulk-import-file">
          <Button variant="contained" component="span">
            Select File
          </Button>
        </label>
        {file && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Selected file: {file.name}
          </Typography>
        )}
        {data.length > 0 && (
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleImportEvents}>
              Import Events
            </Button>
            <Button variant="contained" color="secondary" onClick={handleImportUsers}>
              Import Users
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default BulkImport;
