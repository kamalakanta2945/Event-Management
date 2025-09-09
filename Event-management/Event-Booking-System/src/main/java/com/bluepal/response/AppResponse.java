package com.bluepal.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppResponse<T> {
	  private T data;
	  private String message;
}