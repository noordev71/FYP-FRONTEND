"use client";
import { LinkedinAdDetail } from "@/components/LinkedinAdPosting/LinkedinAdDetail";

export default function Page({ params }: { params: { id: string } }) {
  return <LinkedinAdDetail id={params.id} />;
}
