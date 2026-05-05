import { getRequest } from "@tanstack/react-start/server";

export function getRequestUrl(): URL | null {
  try {
    return new URL(getRequest().url);
  } catch {
    return null;
  }
}
