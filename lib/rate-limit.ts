// Fixed-window in-memory rate limiter.
// State is per server instance, which is sufficient to blunt credential
// guessing on a single-admin site; a shared store (Redis/KV) would be needed
// for hard multi-instance guarantees.
interface Window {
  count: number
  resetAt: number
}

const windows = new Map<string, Window>()
const MAX_ENTRIES = 5000

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()

  // Lazy pruning keeps the map bounded without a timer
  if (windows.size > MAX_ENTRIES) {
    for (const [k, w] of windows) {
      if (w.resetAt <= now) windows.delete(k)
    }
  }

  const current = windows.get(key)
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  current.count++
  if (current.count > limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}

export function clearRateLimit(key: string): void {
  windows.delete(key)
}
