import Link from "next/link"; import { cn } from "@/lib/utils";
export function ButtonLink({href,children,variant="primary",className}:{href:string;children:React.ReactNode;variant?:"primary"|"secondary";className?:string}){return <Link href={href} className={cn(variant==="primary"?"btn-primary":"btn-secondary","w-full sm:w-auto",className)}>{children}</Link>}
export function Button({children,type="button",className}:{children:React.ReactNode;type?:"button"|"submit";className?:string}){return <button type={type} className={cn("btn-primary w-full sm:w-auto",className)}>{children}</button>}
