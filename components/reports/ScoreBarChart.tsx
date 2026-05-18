"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export function ScoreBarChart({data}:{data:{name:string;score:number}[]}){return <div className="h-72 w-full" aria-label="Brovi Scan module score chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" opacity={0.25}/><XAxis dataKey="name" tick={{fontSize:12}}/><YAxis domain={[0,100]}/><Tooltip/><Bar dataKey="score" fill="#2563EB" radius={[12,12,0,0]}/></BarChart></ResponsiveContainer></div>}
