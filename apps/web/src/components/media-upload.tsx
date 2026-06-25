"use client";

import { useRef, useState } from "react";

function uploadWithProgress(
  file: File,
  onProgress: (pct: number) => void
): Promise<{ url?: string; notConfigured?: boolean }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/uploads");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
      else if (xhr.status === 503) resolve({ notConfigured: true });
      else reject(new Error("upload failed"));
    };
    xhr.onerror = () => reject(new Error("upload failed"));
    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  });
}

type Status = "idle" | "uploading" | "done" | "error" | "not-configured";

export function MediaUploader({
  name,
  label,
  accept,
  defaultValue = "",
  hint,
}: {
  name: string;
  label: string;
  accept: string;
  defaultValue?: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isImage = accept.startsWith("image");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("uploading");
    setProgress(0);
    try {
      const res = await uploadWithProgress(file, setProgress);
      if (res.notConfigured) {
        setStatus("not-configured");
        return;
      }
      if (res.url) {
        setUrl(res.url);
        setStatus("done");
      }
    } catch {
      setStatus("error");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input type="hidden" name={name} value={url} />

      <div className="mt-1 flex items-start gap-3">
        {/* preview */}
        {url && isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="h-16 w-16 shrink-0 rounded-lg border border-slate-200 object-cover"
          />
        ) : url ? (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-400">
            ▶ video
          </div>
        ) : null}

        <div className="flex-1">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a URL or upload below"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={status === "uploading"}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 disabled:opacity-60"
            >
              {status === "uploading" ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
                  Uploading {progress}%
                </>
              ) : (
                "Upload file"
              )}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={onFile}
              className="hidden"
            />
            {status === "done" && <span className="text-xs font-medium text-emerald-600">Uploaded ✓</span>}
            {status === "error" && <span className="text-xs text-red-600">Upload failed — paste a URL</span>}
            {status === "not-configured" && (
              <span className="text-xs text-amber-600">Uploads not enabled — paste a URL</span>
            )}
          </div>

          {/* progress bar */}
          {status === "uploading" && (
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
        </div>
      </div>
    </div>
  );
}
