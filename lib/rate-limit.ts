/**
 * Minimal in-memory rate limit (as on gulforbit.sa). Per Worker instance and lost on restart:
 * a deterrent against one script hammering the form, not a hard guarantee.
 */
const buckets = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5000;

export function checkRateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  if (buckets.size > MAX_TRACKED_KEYS) buckets.clear();
  const recent = (buckets.get(key) || []).filter((t) => t > now - windowMs);
  if (recent.length >= limit) return { allowed: false };
  recent.push(now);
  buckets.set(key, recent);
  return { allowed: true };
}

export function getClientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip")?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}
