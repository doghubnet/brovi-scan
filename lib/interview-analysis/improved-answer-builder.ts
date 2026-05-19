export function buildImprovedAnswer(answer:string){
 const base=String(answer||"").trim();
 return `${base || "[add your real answer]"}. I chose [add your university name] because it fits my study goals. My sponsor is [add your sponsor occupation]. My post-study plan is [add your real career plan].`;
}
