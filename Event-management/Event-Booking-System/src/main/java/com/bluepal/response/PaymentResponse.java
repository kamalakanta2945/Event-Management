package com.bluepal.response;

import lombok.Data;

@Data
public class PaymentResponse {
    private String status;
    private String message;
    private String paymentId;
    private String bookingId;
}