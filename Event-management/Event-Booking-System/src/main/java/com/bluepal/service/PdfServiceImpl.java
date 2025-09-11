package com.bluepal.service;

import com.bluepal.model.Booking;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.stream.Collectors;

@Service
public class PdfServiceImpl implements PdfService {

    @Override
    public ByteArrayInputStream generateBookingPdf(Booking booking) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);
            document.open();

            // Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 25);
            Paragraph title = new Paragraph("Booking Confirmation", titleFont);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph("\n"));

            // Booking Details Table
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{1, 3});

            addTableRow(table, "Booking ID", booking.getId());
            addTableRow(table, "Event ID", booking.getEventId());
            addTableRow(table, "User Email", booking.getUserEmail());
            addTableRow(table, "Booking Date", booking.getBookingDate() != null ? booking.getBookingDate().toString() : "");
            addTableRow(table, "Seats", booking.getSeatNumbers() != null ? booking.getSeatNumbers().stream().collect(Collectors.joining(", ")) : "");
            addTableRow(table, "Tickets", String.valueOf(booking.getNumberOfTickets()));
            addTableRow(table, "Total Amount", "$" + booking.getTotalAmount());
            addTableRow(table, "Status", booking.getStatus() != null ? booking.getStatus().name() : "");
            addTableRow(table, "Payment ID", booking.getPaymentId());

            document.add(table);

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private void addTableRow(PdfPTable table, String header, String value) {
        table.addCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        table.addCell(new Phrase(value));
    }
}
