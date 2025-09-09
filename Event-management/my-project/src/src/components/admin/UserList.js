// import { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, IconButton } from '@mui/material';  // ✅ Fixed import
// import Loader from '../common/Loader';
// import { getAllUsers, exportExcel, exportPdf } from '../../services/adminService';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(5);

//   useEffect(() => {
//     getAllUsers(page, pageSize).then((data) => {
//       setUsers(data.content);
//       setLoading(false);
//     });
//   }, [page, pageSize]);

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     { field: 'fullName', headerName: 'Name', width: 150 },
//     { field: 'email1', headerName: 'Email', width: 200 },
//     { field: 'role', headerName: 'Role', width: 120 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => (
//         <div>
//           <IconButton><EditIcon /></IconButton>
//           <IconButton><DeleteIcon /></IconButton>
//         </div>
//       ),
//     },
//   ];

//   if (loading) return <Loader />;

//   return (
//     <div className="h-400">
//       <DataGrid
//         rows={users}
//         columns={columns}
//         pageSizeOptions={[5, 10, 25]}
//         paginationModel={{ page, pageSize }}
//         onPaginationModelChange={(model) => {
//           setPage(model.page);
//           setPageSize(model.pageSize);
//         }}
//         rowCount={100} // Assume from backend total
//         paginationMode="server"
//       />
//       <Button onClick={exportExcel} variant="contained" className="mt-4">Export Excel</Button>
//       <Button onClick={exportPdf} variant="contained" className="mt-4 ml-2">Export PDF</Button>
//     </div>
//   );
// };

// export default UserList;

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import Loader from '../common/Loader';
import { getAllUsers, exportExcel, exportPdf } from '../../services/adminService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    getAllUsers(page, pageSize).then((data) => {
      // ✅ Map API response to match DataGrid expectations
      const mappedUsers = data.content.map((user) => ({
        id: user.id,
        fullName: `${user.firstName ?? ''} ${user.middleName ?? ''} ${user.lastName ?? ''}`.trim(),
        email1: user.email1,
        role: user.role,
      }));

      setUsers(mappedUsers);
      setRowCount(data.totalElements ?? mappedUsers.length); // fallback if total not provided
      setLoading(false);
    });
  }, [page, pageSize]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 }, // id is long string UUID
    { field: 'fullName', headerName: 'Name', width: 200 },
    { field: 'email1', headerName: 'Email', width: 220 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton><EditIcon /></IconButton>
          <IconButton><DeleteIcon /></IconButton>
        </div>
      ),
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="h-400">
      <DataGrid
        rows={users}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        rowCount={rowCount}
        paginationMode="server"
      />
      <Button onClick={exportExcel} variant="contained" className="mt-4">Export Excel</Button>
      <Button onClick={exportPdf} variant="contained" className="mt-4 ml-2">Export PDF</Button>
    </div>
  );
};

export default UserList;
