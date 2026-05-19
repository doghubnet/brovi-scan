export const totalRequiredFunds=(tuition:number,living:number)=>tuition+living;
export const coverageRatio=(closing:number,total:number)=>total>0?closing/total:0;
export const averageCoverageRatio=(avg:number,total:number)=>total>0?avg/total:0;
export const monthlyNet=(income:number,expenses:number)=>income-expenses;
