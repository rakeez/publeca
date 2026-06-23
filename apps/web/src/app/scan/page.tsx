import { redirect } from "next/navigation";

// The scanner lives in the authenticated dashboard. Keep /scan as a friendly entry
// point that sends hosts to the real tool (and through login if needed).
export default function ScanRedirect() {
  redirect("/app/scan");
}
