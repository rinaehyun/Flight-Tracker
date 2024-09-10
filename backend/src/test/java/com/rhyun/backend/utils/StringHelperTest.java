package com.rhyun.backend.utils;

import org.junit.jupiter.api.Test;

import static com.rhyun.backend.utils.StringHelper.capitalizeFirstLetter;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class StringHelperTest {

    @Test
    void capitalizeFirstLetterTest_whenInputHasValue_thenReturnString() {
        // GIVEN
        String input1 = "HeLLo, wORLD!";
        String input2 = "FRIDAY";
        String input3 = "take a rest..";

        // WHEN
        String actual1 = capitalizeFirstLetter(input1);
        String actual2 = capitalizeFirstLetter(input2);
        String actual3 = capitalizeFirstLetter(input3);

        // THEN
        assertEquals("Hello, World!", actual1);
        assertEquals("Friday", actual2);
        assertEquals("Take A Rest..", actual3);
    }

    @Test
    void capitalizeFirstLetterTest_whenInputIsEmpty_thenReturnNothing() {
        // GIVEN
        String input1 = "  ";

        // WHEN
        String actual1 = capitalizeFirstLetter(input1);

        // THEN
        assertEquals("", actual1);
        assertThat(actual1).isEmpty();
    }
}