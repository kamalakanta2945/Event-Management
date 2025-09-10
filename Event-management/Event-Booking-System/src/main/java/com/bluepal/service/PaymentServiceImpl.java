package com.bluepal.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.bluepal.config.RazorPayConfig;
import com.bluepal.dto.PaymentRequest;
import com.bluepal.exception.PaymentFailedException;
import com.bluepal.exception.ResourceNotFoundException;
import com.bluepal.model.Payment;
import com.bluepal.repository.PaymentRepository;
import com.bluepal.response.RazorPayOrderResponse;
import com.bluepal.util.PaymentStatus;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private RazorPayConfig razorPayConfig;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingService bookingService;

    @Override
    public RazorPayOrderResponse createOrder(PaymentRequest paymentRequest) throws RazorpayException {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorPayConfig.getKey(), razorPayConfig.getSecret());

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", paymentRequest.getAmount() * 100); // amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "receipt_" + paymentRequest.getBookingId());
            orderRequest.put("payment_capture", 1);

            Order order = razorpayClient.orders.create(orderRequest);

            // Save payment in MongoDB
            Payment payment = new Payment();
            payment.setBookingId(paymentRequest.getBookingId());
            payment.setRazorpayOrderId(order.get("id"));
            payment.setAmount(paymentRequest.getAmount());
            payment.setStatus(PaymentStatus.PENDING);
            payment.setPaymentDate(LocalDateTime.now());
            payment.setCreatedAt(LocalDateTime.now());

            paymentRepository.save(payment);

            // Prepare response
            RazorPayOrderResponse response = new RazorPayOrderResponse();
            response.setOrderId(order.get("id"));
            response.setAmount(order.get("amount").toString());
            response.setCurrency(order.get("currency").toString());
            response.setKey(razorPayConfig.getKey());

            return response;
        } catch (RazorpayException e) {
            throw new RazorpayException("Error creating RazorPay order: " + e.getMessage());
        }
    }

    @Override
    public Payment verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        try {
            // Verify signature
            String verificationData = razorpayOrderId + "|" + razorpayPaymentId;
            boolean isValidSignature = com.razorpay.Utils.verifySignature(verificationData, razorpaySignature,
                    razorPayConfig.getSecret());

            Optional<Payment> paymentOpt = paymentRepository.findByRazorpayOrderId(razorpayOrderId);
            if (!paymentOpt.isPresent()) {
                throw new ResourceNotFoundException("Payment not found for order id: " + razorpayOrderId);
            }

            Payment payment = paymentOpt.get();
            if (isValidSignature) {
                payment.setRazorpayPaymentId(razorpayPaymentId);
                payment.setRazorpaySignature(razorpaySignature);
                payment.setStatus(PaymentStatus.SUCCESS);
                payment.setPaymentDate(LocalDateTime.now());
                try {
                    bookingService.confirmBooking(payment.getBookingId(), razorpayPaymentId);
                } catch (Exception ex) {
                    payment.setStatus(PaymentStatus.FAILED);
                }
            } else {
                payment.setStatus(PaymentStatus.FAILED);
            }

            return paymentRepository.save(payment);
        } catch (RazorpayException e) {
            throw new PaymentFailedException("Error verifying payment: " + e.getMessage());
        }
    }

    @Override
    public Payment getPaymentByBookingId(String bookingId) {
        return paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found for booking id: " + bookingId));
    }

    @Override
    public Payment updatePaymentStatus(String paymentId, String status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + paymentId));

        payment.setStatus(PaymentStatus.valueOf(status.toUpperCase()));
        return paymentRepository.save(payment);
    }

    @Override
    public java.util.List<com.bluepal.model.Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
