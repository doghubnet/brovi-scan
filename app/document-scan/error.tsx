"use client";

export default function Error() {
  if (process.env.NODE_ENV !== "production") console.error("Document Scan route render failure.");
  return <div className="container-page py-10"><div className="card"><h2 className="text-xl font-bold">Document Scan could not load. Please refresh the page or return to dashboard.</h2></div></div>;
}
