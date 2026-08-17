"use client";

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface CloudinaryUploadProps {
  cloudName: string;
  uploadPreset: string;
  onUpload: (url: string) => void;
  folder?: string;
  className?: string;
  label?: string;
}

export default function CloudinaryUpload({
  cloudName,
  uploadPreset,
  onUpload,
  folder,
  className = "",
  label = "Upload Image",
}: CloudinaryUploadProps) {
  const [widgetReady, setWidgetReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const widgetRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function loadWidget() {
      if (window.cloudinary) {
        setWidgetReady(true);
        return;
      }

      const existingScript = document.getElementById("cloudinary-widget-script");
      if (existingScript) {
        existingScript.addEventListener("load", () => setWidgetReady(true));
        return;
      }

      const script = document.createElement("script");
      script.id = "cloudinary-widget-script";
      script.src = "https://widget.cloudinary.com/v2.0/all.js";
      script.async = true;
      script.onload = () => setWidgetReady(true);
      script.onerror = () => {
        console.error("Failed to load Cloudinary widget script");
      };
      document.body.appendChild(script);
    }

    loadWidget();
  }, []);

  const openWidget = useCallback(() => {
    if (!window.cloudinary) {
      const script = document.getElementById("cloudinary-widget-script");
      if (script) {
        script.addEventListener("load", () => openWidget());
      } else {
        alert("Upload widget failed to load. Please refresh the page and try again.");
      }
      return;
    }

    setUploading(true);

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: folder || "trek-rwanda",
        sources: ["local", "camera", "url"],
        multiple: false,
        maxFiles: 1,
        cropping: true,
        croppingAspectRatio: 16 / 9,
        styles: {
          palette: {
            window: "#ffffff",
            sourceBg: "#f4f4f5",
            windowBorder: "#e4e4e7",
            tabIcon: "#16a34a",
            inactiveTabIcon: "#a1a1aa",
            menuIcons: "#52525b",
            link: "#16a34a",
            action: "#16a34a",
            inactive: "#a1a1aa",
          },
        },
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          onUpload(result.info.secure_url);
        }
        if (result && result.event === "close") {
          setUploading(false);
        }
      }
    );

    widget.open();
    setUploading(false);
  }, [cloudName, uploadPreset, folder, onUpload, widgetReady]);

  return (
    <div ref={containerRef}>
      <button
        type="button"
        onClick={openWidget}
        disabled={uploading}
        className={`inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-50 ${className}`}
      >
        {uploading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {label}
          </>
        )}
      </button>
    </div>
  );
}

interface ImagePreviewProps {
  url: string;
  onRemove: () => void;
}

export function ImagePreview({ url, onRemove }: ImagePreviewProps) {
  if (!url) return null;
  return (
    <div className="relative inline-block">
      <img src={url} alt="Preview" className="h-40 w-full rounded-lg object-cover border border-slate-200" />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
