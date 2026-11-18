/**
 * Security headers middleware to protect against common web vulnerabilities:
 * - Clickjacking (X-Frame-Options)
 * - MIME-type sniffing (X-Content-Type-Options)
 * - XSS attacks (X-XSS-Protection & Content-Security-Policy)
 * - Referrer leakage (Referrer-Policy)
 * - Information disclosure (removes X-Powered-By)
 */
export const securityHeaders = (req, res, next) => {
    res.removeHeader("X-Powered-By");

    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    if (process.env.NODE_ENV === "production") {
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }

    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data: https: res.cloudinary.com; media-src 'self' https: res.cloudinary.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https:;"
    );

    next();
};
