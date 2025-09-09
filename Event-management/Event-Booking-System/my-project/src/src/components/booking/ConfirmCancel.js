import { Button } from '@mui/material';
import { confirmBooking, cancelBooking } from '../../services/bookingService';
import { toast } from 'react-toastify';
import { VscCheck, VscChromeClose } from 'react-icons/vsc';

const ConfirmCancel = ({ bookingId }) => {
  const handleConfirm = async (paymentId) => {
    try {
      await confirmBooking(bookingId, paymentId);
      toast.success('Confirmed');
    } catch (err) {
      toast.error('Failed');
    }
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(bookingId);
      toast.success('Cancelled');
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <div className="flex space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
      <Button 
        variant="contained" 
        onClick={() => handleConfirm('somePaymentId')}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center"
      >
        <VscCheck className="mr-2" />
        Confirm
      </Button>
      
      <Button 
        variant="outlined" 
        color="error" 
        onClick={handleCancel}
        className="border-red-500 text-red-500 hover:bg-red-50 py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center"
      >
        <VscChromeClose className="mr-2" />
        Cancel
      </Button>
    </div>
  );
};

export default ConfirmCancel;