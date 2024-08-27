package com.rhyun.backend.flight.exception;

import java.util.Date;

public record ErrorMessage(
        Date timestamp,
        int status,
        String message
) {
}
