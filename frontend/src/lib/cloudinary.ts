const CLOUD_NAME = "t99lwcej";

type Transform = {
  w?: number;
  h?: number;
  c?: string;
  q?: string;
  f?: string;
};

export function cloudinaryUrl(
  url: string | null | undefined,
  transform?: Transform
): string {
  if (!url || !url.includes("res.cloudinary.com")) return url || "";

  if (!transform) return url;

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  const c = transform.c || "fill";
  const q = transform.q || "auto";
  const f = transform.f || "auto";

  let t = "";
  if (transform.w) t += `w_${transform.w},`;
  if (transform.h) t += `h_${transform.h},`;
  t += `c_${c},q_${q},f_${f}`;

  return `${parts[0]}/upload/${t}/${parts[1]}`;
}

export function cloudinaryThumb(url: string | null | undefined, w = 600, h = 400): string {
  return cloudinaryUrl(url, { w, h, c: "fill", q: "auto", f: "auto" });
}

export function cloudinaryHero(url: string | null | undefined): string {
  return cloudinaryUrl(url, { w: 1920, h: 800, c: "fill", q: "auto", f: "auto" });
}

export function cloudinaryCard(url: string | null | undefined): string {
  return cloudinaryUrl(url, { w: 800, h: 600, c: "fill", q: "auto", f: "auto" });
}
