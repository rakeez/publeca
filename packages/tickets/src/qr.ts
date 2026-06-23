import QRCode from "qrcode";

/** PNG data URL (for inline <img> / email embedding). */
export function qrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, { errorCorrectionLevel: "M", margin: 1, width: 320 });
}

/** Raw PNG buffer (for email attachments). */
export function qrPngBuffer(text: string): Promise<Buffer> {
  return QRCode.toBuffer(text, { errorCorrectionLevel: "M", margin: 1, width: 320 });
}
