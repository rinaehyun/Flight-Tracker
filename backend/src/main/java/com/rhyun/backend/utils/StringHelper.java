package com.rhyun.backend.utils;

public class StringHelper {

    private StringHelper() {}

    public static String capitalizeFirstLetter(String input) {
        input = input.toLowerCase();

        String[] words = input.split(" ");

        StringBuilder result = new StringBuilder();

        for (String word : words) {
            if (!word.isEmpty()) {
                result.append(Character.toUpperCase(word.charAt(0)))
                        .append(word.substring(1))
                        .append(" ");
            }
        }

        return result.toString().trim();
    }
}
