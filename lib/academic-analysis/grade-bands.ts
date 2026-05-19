export function resolveAcademicBand(grade:number, scale:"percentage"|"gpa4"|"gpa5"|"unknown"){
 if(scale==="unknown") return {label:"Unknown",warning:"Grade scale unclear. Official university evaluation is required."};
 if(scale==="percentage") return grade>=90?{label:"Outstanding"}:grade>=80?{label:"Excellent"}:grade>=70?{label:"Very Good"}:grade>=60?{label:"Good"}:grade>=50?{label:"Satisfactory"}:{label:"Needs Improvement"};
 if(scale==="gpa4") return grade>=3.7?{label:"Outstanding"}:grade>=3.3?{label:"Excellent"}:grade>=3?{label:"Very Good"}:grade>=2.5?{label:"Good"}:grade>=2?{label:"Satisfactory"}:{label:"Needs Improvement"};
 return grade>=4.5?{label:"Outstanding"}:grade>=4?{label:"Excellent"}:grade>=3.5?{label:"Very Good"}:grade>=3?{label:"Good"}:grade>=2.5?{label:"Satisfactory"}:{label:"Needs Improvement"};
}
