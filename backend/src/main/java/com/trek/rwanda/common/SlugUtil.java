package com.trek.rwanda.common;

import java.text.Normalizer;
import java.util.Locale;

public final class SlugUtil {
    private SlugUtil() {}

    public static String toSlug(String input) {
        String normalized = Normalizer.normalize(input.toLowerCase(Locale.ENGLISH), Normalizer.Form.NFD);
        return normalized.replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }
}
