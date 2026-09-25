import {loadState} from "./storage.js";
export function statusFor(targetId){return loadState().targets[targetId]?.status||"new"}
export function weakTargets(){return Object.entries(loadState().targets).map(([id,x])=>({id,...x})).sort((a,b)=>b.wrong_count-a.wrong_count||a.correct_count-b.correct_count)}
export function nextReviewTarget(){const s=loadState();return Object.entries(s.targets).filter(([,x])=>x.status!=="mastered").sort((a,b)=>b[1].wrong_count-a[1].wrong_count||String(a[1].last_review_date||"").localeCompare(String(b[1].last_review_date||"")))[0]?.[0]||null}
