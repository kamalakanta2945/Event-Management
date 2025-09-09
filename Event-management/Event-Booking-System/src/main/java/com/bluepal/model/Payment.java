package com.bluepal.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.bluepal.util.PaymentStatus;

import java.time.LocalDateTime;

@Data
@Document(collection = "payments")
public class Payment {
    @Id
    private String id;
    private String bookingId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private double amount;
    private PaymentStatus status;
    private LocalDateTime paymentDate;
    private LocalDateTime createdAt;
}