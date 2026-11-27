/**
 * Lightweight in-memory sliding-window rate limiter to protect Spark Plan write quotas.
 */
function createRateLimiter({ windowMs = 15 * 60 * 1000, max = 10 } = {}) {
  const hits = new Map();

  return (req, res, next) => {
    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    const timestamps = (hits.get(key) || []).filter(ts => ts > windowStart);
    if (timestamps.length >= max) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few minutes before submitting again.'
      });
    }

    timestamps.push(now);
    hits.set(key, timestamps);
    return next();
  };
}

module.exports = { createRateLimiter };
