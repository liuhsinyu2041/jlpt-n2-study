const KEY = "n2-study-records-v1";
const empty = () => ({ dataVersion: "1.1", answers: [], targets: {}, mistakeItems: {}, sessions: [] });
export function loadState(){try{return {...empty(),...JSON.parse(localStorage.getItem(KEY)||"{}"),dataVersion:"1.1"}}catch{return empty()}}
export function saveState(state){localStorage.setItem(KEY,JSON.stringify(state));window.dispatchEvent(new CustomEvent("study-state-change"))}
export function recordAnswer({question,targetType,targetId,selected,correct,sourceType="generated"}){
 const s=loadState(), now=new Date(), day=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`, t=s.targets[targetId]||{status:"new",wrong_count:0,correct_count:0,streak:0,last_review_date:null,datesCorrect:[]};
 t.last_review_date=day;t.target_type=targetType;
 if(correct){t.correct_count++;t.streak++;t.datesCorrect=[...new Set([...(t.datesCorrect||[]),day])];t.status=t.streak>=2&&t.datesCorrect.length>=2?"mastered":t.streak>=2?"improving":"learning"}
 else{t.wrong_count++;t.streak=0;t.status="weak"}
 s.targets[targetId]=t;s.answers.push({question_id:question.id,source_type:sourceType,exam:question.exam||null,year:question.year||null,month:question.month||null,question_number:question.question_number||null,target_type:targetType,target_id:targetId,selected_answer:selected,correct_answer:correct?selected:question.answer,correct,wrong_date:correct?null:day,answer_date:day,last_review_date:day,mastery_status:t.status});
 if(!correct){const id=question.id||targetId, old=s.mistakeItems[id]||{question_id:id,source_type:sourceType,target_type:targetType,target_id:targetId,wrong_count:0,correct_count:0};old.wrong_count++;old.correct_count=t.correct_count;old.correct_answer=question.answer;old.selected_answer=selected;old.last_review_date=day;s.mistakeItems[id]=old}else if(question.id&&s.mistakeItems[question.id]){s.mistakeItems[question.id].correct_count++;s.mistakeItems[question.id].last_review_date=day}
 saveState(s);return t;
}
export function resetProgress(){localStorage.removeItem(KEY);window.dispatchEvent(new CustomEvent("study-state-change"))}
