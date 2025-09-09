package com.bluepal.service;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;

import com.bluepal.dto.PaymentRequest;
import com.bluepal.model.Payment;
import com.bluepal.response.RazorPayOrderResponse;
import com.razorpay.RazorpayException;

public interface PaymentService {

    // Create RazorPay order and save Payment in MongoDB
    RazorPayOrderResponse createOrder(PaymentRequest paymentRequest) throws RazorpayException;

    // Verify RazorPay payment signature and update MongoDB
    Payment verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature);

    // Get Payment by bookingId from MongoDB
    Payment getPaymentByBookingId(String bookingId);

    // Update Payment status in MongoDB
    Payment updatePaymentStatus(String paymentId, String status);

	RazorPayOrderResponse createOrder(PathRequest paymentRequest) throws RazorpayException;
}
