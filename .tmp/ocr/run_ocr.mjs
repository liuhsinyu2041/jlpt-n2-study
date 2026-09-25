import fs from 'node:fs/promises';
import { createWorker } from 'tesseract.js';
const worker=await createWorker('jpn',1,{langPath:'./.tmp/ocr',gzip:false,cachePath:'./.tmp/ocr/cache'});
const dir='.tmp/ocr'; const files=(await fs.readdir(dir)).filter(x=>/^202[45]-07-\d+\.png$/.test(x)).sort(); const pages=[];
for(const file of files){const {data}=await worker.recognize(`${dir}/${file}`,{}, {blocks:true});const words=(data.blocks||[]).flatMap(b=>(b.paragraphs||[]).flatMap(p=>(p.lines||[]).flatMap(l=>l.words||[])));const nums=words.map(w=>Number(w.confidence)).filter(x=>Number.isFinite(x)&&x>=0);pages.push({file,page:Number(file.match(/-(\d+)\.png$/)[1]),confidence_mean:nums.length?Math.round(nums.reduce((a,b)=>a+b,0)/nums.length):Number(data.confidence)||0,word_count:words.length,text:data.text});console.log(file,pages.at(-1).confidence_mean,words.length,data.text.length)}
await fs.writeFile(`${dir}/recognized_pages.json`,JSON.stringify(pages,null,2),'utf8');await worker.terminate();
