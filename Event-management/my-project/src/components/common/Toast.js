import { toast } from 'react-toastify';
import { VscCheck, VscError, VscInfo, VscWarning } from 'react-icons/vsc';

// Custom toast component with luxurious styling
const CustomToast = ({ type, message }) => {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          background: 'linear-gradient(to right, #56ab2f, #a8e6cf)',
          color: 'white',
          icon: <VscCheck className="text-white text-xl" />
        };
      case 'error':
        return {
          background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
          color: 'white',
          icon: <VscError className="text-white text-xl" />
        };
      case 'info':
        return {
          background: 'linear-gradient(to right, #2196F3, #21CBF3)',
          color: 'white',
          icon: <VscInfo className="text-white text-xl" />
        };
      case 'warn':
        return {
          background: 'linear-gradient(to right, #f7971e, #ffd200)',
          color: 'white',
          icon: <VscWarning className="text-white text-xl" />
        };
      default:
        return {
          background: 'linear-gradient(to right, #4b6cb7, #182848)',
          color: 'white',
          icon: <VscInfo className="text-white text-xl" />
        };
    }
  };

  const styles = getStyles();

  return (
    <div 
      className="flex items-center p-4 rounded-lg shadow-lg backdrop-blur-sm"
      style={{ 
        background: styles.background,
        color: styles.color,
        minWidth: '300px'
      }}
    >
      <div className="mr-3">
        {styles.icon}
      </div>
      <div className="font-medium">
        {message}
      </div>
    </div>
  );
};

// Utility function to show toast notifications
const Toast = {
  success: (message) => {
    toast.success(<CustomToast type="success" message={message} />, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: '0',
      }
    });
  },
  error: (message) => {
    toast.error(<CustomToast type="error" message={message} />, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: '0',
      }
    });
  },
  info: (message) => {
    toast.info(<CustomToast type="info" message={message} />, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: '0',
      }
    });
  },
  warn: (message) => {
    toast.warn(<CustomToast type="warn" message={message} />, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: '0',
      }
    });
  },
};

export default Toast;