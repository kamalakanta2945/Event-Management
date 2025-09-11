import { useState, useCallback } from 'react';
import { scanVerifyPayment } from '../../services/paymentService';

// Simple scanner that accepts manual input (orderId|paymentId) as fallback
const Scanner = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScanString = useCallback(async (value) => {
    if (!value) return;
    const parts = value.split('|');
    if (parts.length < 2) {
      setError('Invalid scan data. Expected format: orderId|paymentId');
      return;
    }
    const [orderId, paymentId] = parts;
    setLoading(true);
    setError(null);
    try {
      const data = await scanVerifyPayment(orderId.trim(), paymentId.trim());
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || 'Scan verification failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleScanString(input);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Scanner</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Scan or paste: orderId|paymentId"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result && (
        <div className="mt-4 p-3 border rounded bg-green-50">
          <div className="font-semibold">Verification Result</div>
          <div><strong>Status:</strong> {result.status}</div>
          <div><strong>Booking ID:</strong> {result.bookingId}</div>
          <div><strong>Payment ID:</strong> {result.razorpayPaymentId || result.id}</div>
          <div><strong>Amount:</strong> {result.amount}</div>
        </div>
      )}
    </div>
  );
};

export default Scanner;

