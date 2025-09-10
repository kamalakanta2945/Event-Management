package com.bluepal.service;

import com.bluepal.model.Booking;
import java.io.ByteArrayInputStream;

public interface PdfService {
    ByteArrayInputStream generateBookingPdf(Booking booking);
}
