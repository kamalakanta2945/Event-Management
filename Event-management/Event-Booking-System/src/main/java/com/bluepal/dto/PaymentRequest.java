package com.bluepal.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String bookingId;
    private double amount;
}
