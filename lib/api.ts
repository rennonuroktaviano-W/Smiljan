/** A field-level problem as reported by a `/api/*` route handler. */
export type ApiIssue = { field: string; code: string };

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; issues?: ApiIssue[]; error?: 'network' | 'request' };

/**
 * Posts JSON to one of the site's route handlers and normalises the outcome,
 * so forms only deal in "validated payload", "field issues" or "the request
 * itself failed".
 */
export async function postJson<T>(url: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const payload = (await response.json().catch(() => null)) as
      | (T & { ok?: boolean; issues?: ApiIssue[] })
      | null;

    if (response.ok && payload?.ok) {
      return { ok: true, data: payload as T };
    }

    if (response.status === 400 && Array.isArray(payload?.issues)) {
      return { ok: false, issues: payload.issues };
    }

    return { ok: false, error: 'request' };
  } catch {
    return { ok: false, error: 'network' };
  }
}
