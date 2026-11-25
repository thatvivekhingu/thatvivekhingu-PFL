import { Track } from "./music-data";

export const CUSTOM_PLAYLIST_KEY = "frequency-lounge-playlist";
const IMPORT_MAX_TRACKS = 500;
const IMPORT_SCHEMA_VERSION = 1;

/**
 * Extracts a YouTube video ID from any common YouTube URL format.
 * Supports:
 *   - https://www.youtube.com/watch?v=VIDEO_ID
 *   - https://youtu.be/VIDEO_ID
 *   - https://www.youtube.com/shorts/VIDEO_ID
 *   - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  const pattern = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(pattern);
  return match ? match[1] : null;
}

export function loadCustomTracks(): Track[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_PLAYLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        item.id.length > 0 &&
        typeof item.title === "string" &&
        item.title.length > 0 &&
        typeof item.artist === "string"
    ) as Track[];
  } catch {
    return [];
  }
}

export function saveCustomTracks(tracks: Track[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CUSTOM_PLAYLIST_KEY, JSON.stringify(tracks));
  } catch {
    // Ignore quota/security errors
  }
}

export interface ImportPayload {
  version: number;
  tracks: Track[];
}

export function validateImportData(raw: unknown): ImportPayload {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("Invalid file: expected a JSON object at root.");
  }

  const data = raw as Record<string, unknown>;

  if (data.version !== IMPORT_SCHEMA_VERSION) {
    throw new Error(`Unsupported schema version ${data.version ?? "none"}.`);
  }

  if (!Array.isArray(data.tracks)) {
    throw new Error('"tracks" must be an array.');
  }

  if (data.tracks.length > IMPORT_MAX_TRACKS) {
    throw new Error(`Limit is ${IMPORT_MAX_TRACKS} tracks.`);
  }

  const validated: Track[] = [];

  for (let i = 0; i < data.tracks.length; i++) {
    const item = data.tracks[i];
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error(`Track at index ${i} is not a valid object.`);
    }
    const track = item as Record<string, unknown>;
    if (typeof track.id !== "string" || !track.id.trim()) {
      throw new Error(`Track at index ${i} has a missing or invalid "id".`);
    }
    if (typeof track.title !== "string" || !track.title.trim()) {
      throw new Error(`Track at index ${i} has a missing or invalid "title".`);
    }
    validated.push({
      id: track.id.trim(),
      title: track.title.trim(),
      artist: typeof track.artist === "string" ? track.artist.trim() : "",
      category: "chill" as const,
    });
  }

  return { version: IMPORT_SCHEMA_VERSION, tracks: validated };
}

export function buildExportJson(tracks: Track[]): string {
  const payload: ImportPayload = {
    version: IMPORT_SCHEMA_VERSION,
    tracks,
  };
  return JSON.stringify(payload, null, 2);
}
