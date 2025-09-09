package com.bluepal.response;

import lombok.Data;

@Data
public class RazorPayOrderResponse {
    private String orderId;
    private String amount;
    private String currency;
    private String key;
}