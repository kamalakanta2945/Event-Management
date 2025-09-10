package com.bluepal.service;

import com.bluepal.dto.PaymentRequest;
import com.bluepal.model.Payment;
import com.bluepal.response.RazorPayOrderResponse;
import com.razorpay.RazorpayException;
import java.util.List;

public interface PaymentService {

    // Create RazorPay order and save Payment in MongoDB
    RazorPayOrderResponse createOrder(PaymentRequest paymentRequest) throws RazorpayException;

    // Verify RazorPay payment signature and update MongoDB; also confirm booking on success
    Payment verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature);

    // Get Payment by bookingId from MongoDB
    Payment getPaymentByBookingId(String bookingId);

    // Update Payment status in MongoDB
    Payment updatePaymentStatus(String paymentId, String status);

    // List all payments (admin use)
    List<Payment> getAllPayments();

    // Verify a payment by scanning (uses Razorpay API to fetch and validate)
    Payment scanVerify(String razorpayOrderId, String razorpayPaymentId);
}
