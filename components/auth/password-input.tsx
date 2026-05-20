"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return <div className="relative"><input {...props} type={show ? "text" : "password"} className={`input pr-10 ${props.className ?? ""}`} /><button type="button" onClick={()=>setShow(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</button></div>;
}
