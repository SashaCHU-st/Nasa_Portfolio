const DEFAULT_FETCH_TIMEOUT_MS = 10_000;

export class FetchTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Request timed out after ${timeoutMs}ms`);
    this.name = "FetchTimeoutError";
  }
}

export const fetchWithTimeout = async (
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = DEFAULT_FETCH_TIMEOUT_MS,
): Promise<Response> => {
  const controller = new AbortController();
  const externalSignal = init.signal;

  if (externalSignal?.aborted) {
    controller.abort();
  }

  const onAbort = () => controller.abort();
  externalSignal?.addEventListener("abort", onAbort, { once: true });

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    const isAbortError =
      error instanceof DOMException && error.name === "AbortError";

    if (isAbortError && !externalSignal?.aborted) {
      throw new FetchTimeoutError(timeoutMs);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
    externalSignal?.removeEventListener("abort", onAbort);
  }
};
