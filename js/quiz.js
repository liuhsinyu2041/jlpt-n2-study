import {recordAnswer} from "./storage.js";
export function eligibleRealQuestions(rows){return rows.filter(q=>!q.needs_review&&!q.incomplete&&!q.answer_unknown&&q.question_text&&Array.isArray(q.choices)&&q.choices.length===4&&q.answer!==undefined&&q.answer!==null)}
export function makeVocabularyQuiz(target,all){
 const pool=all.filter(x=>x.id!==target.id&&!x.needs_review), distractors=pool.sort(()=>Math.random()-.5).slice(0,3);if(distractors.length<3)return null;
 const types=["word_to_meaning","meaning_to_word","kanji_reading","reading_to_kanji"],questionType=types[Math.floor(Math.random()*types.length)];
 const label={word_to_meaning:"日文 → 中文",meaning_to_word:"中文 → 日文",kanji_reading:"漢字 → 讀音",reading_to_kanji:"讀音 → 漢字"}[questionType];
 const prompt={word_to_meaning:target.word,meaning_to_word:target.meaning_zh,kanji_reading:target.word,reading_to_kanji:target.reading}[questionType];
 const answer={word_to_meaning:target.meaning_zh,meaning_to_word:target.word,kanji_reading:target.reading,reading_to_kanji:target.word}[questionType];
 const value=x=>({word_to_meaning:x.meaning_zh,meaning_to_word:x.word,kanji_reading:x.reading,reading_to_kanji:x.word}[questionType]);
 const options=[target,...distractors].sort(()=>Math.random()-.5).map(x=>({text:value(x),id:x.id}));
 const generatedFrom=target.source_questions?.[0];
 return {id:`generated-${target.id}-${crypto.randomUUID()}`,source_type:"generated",question_type:questionType,target_type:"vocabulary",target_id:target.id,prompt,reading:target.reading,choices:options.map(x=>x.text),options,answer,explanation:`${target.word}（${target.reading}）：${target.meaning_zh}`,generated_from:generatedFrom?`${generatedFrom.exam}-Q${String(generatedFrom.question).padStart(2,"0")}`:null,difficulty:"N2",label};
}
export function submitQuizAnswer(item,selected){const q={...item,answer:item.answer};return recordAnswer({question:q,targetType:item.target_type,targetId:item.target_id,selected,correct:selected===item.answer,sourceType:item.source_type})}
