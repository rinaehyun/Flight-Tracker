package com.rhyun.backend.globalexception;

import java.util.Date;

public record ErrorMessage(
        Date timestamp,
        int status,
        String message
) {
}
