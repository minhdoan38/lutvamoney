export type WebsiteSubject = {
  rawInput: string;
  normalizedUrl: string;
  domain: string;
};

export type WebsiteParseError = "empty" | "invalid" | "unsupported-protocol";

export type WebsiteParseResult =
  | { ok: true; subject: WebsiteSubject }
  | { ok: false; error: WebsiteParseError };

function hasScheme(value: string): boolean {
  return /^[a-z][a-z\d+.-]*:/i.test(value);
}

export function parseWebsiteInput(rawInput: string): WebsiteParseResult {
  const trimmed = rawInput.trim();
  if (!trimmed) return { ok: false, error: "empty" };

  const candidate = hasScheme(trimmed) ? trimmed : `https://${trimmed}`;
  let parsed: URL;

  try {
    parsed = new URL(candidate);
  } catch {
    return { ok: false, error: "invalid" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: "unsupported-protocol" };
  }

  if (!parsed.hostname || parsed.username || parsed.password) {
    return { ok: false, error: "invalid" };
  }

  const hostname = parsed.hostname.toLowerCase();
  const domain = hostname.replace(/^www\./, "");

  return {
    ok: true,
    subject: {
      rawInput: trimmed,
      normalizedUrl: parsed.href,
      domain,
    },
  };
}
