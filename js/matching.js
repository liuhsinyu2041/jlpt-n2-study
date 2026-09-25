export function makePairs(words,count=6){return [...words].sort(()=>Math.random()-.5).slice(0,count).map(x=>({left:x.word,right:x.meaning_zh,targetId:x.id,targetType:"vocabulary"}))}
