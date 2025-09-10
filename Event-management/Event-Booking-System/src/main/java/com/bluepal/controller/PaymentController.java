package com.bluepal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bluepal.dto.PaymentRequest;

import com.bluepal.model.Payment;
import com.bluepal.response.PaymentResponse;
import com.bluepal.response.RazorPayOrderResponse;
import com.bluepal.service.PaymentService;
import com.bluepal.util.ResponseWrapper;
import com.razorpay.RazorpayException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@PostMapping("/create-order")
	public ResponseEntity<ResponseWrapper<RazorPayOrderResponse>> createOrder(
			@RequestBody PaymentRequest paymentRequest) {
		try {
			RazorPayOrderResponse orderResponse = paymentService.createOrder(paymentRequest);
			return ResponseEntity.ok(new ResponseWrapper<>("Order created successfully", orderResponse));
		} catch (RazorpayException e) {
			return ResponseEntity.badRequest().body(new ResponseWrapper<>(e.getMessage(), null));
		}
	}

	@PostMapping("/verify")
	public ResponseEntity<ResponseWrapper<Payment>> verifyPayment(@RequestParam String razorpayOrderId,
			@RequestParam String razorpayPaymentId, @RequestParam String razorpaySignature) {
		try {
			Payment payment = paymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
			PaymentResponse response = new PaymentResponse();
			response.setStatus(payment.getStatus().toString());
			response.setMessage("Payment verification successful");
			response.setPaymentId(payment.getId());
			response.setBookingId(payment.getBookingId());

			return ResponseEntity.ok(new ResponseWrapper<>("Payment verified successfully", payment));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ResponseWrapper<>(e.getMessage(), null));
		}
	}

	@GetMapping("/booking/{bookingId}")
	public ResponseEntity<ResponseWrapper<Payment>> getPaymentByBookingId(@PathVariable String bookingId) {
		Payment payment = paymentService.getPaymentByBookingId(bookingId);
		return ResponseEntity.ok(new ResponseWrapper<>("Payment retrieved successfully", payment));
	}

	@GetMapping
	public ResponseEntity<ResponseWrapper<List<Payment>>> getAllPayments() {
		List<Payment> payments = paymentService.getAllPayments();
		return ResponseEntity.ok(new ResponseWrapper<>("Payments retrieved successfully", payments));
	}
}