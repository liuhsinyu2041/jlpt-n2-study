import {createWorker} from 'tesseract.js';
const dir='.';const w=await createWorker('jpn',1,{langPath:dir,gzip:false,cachePath:`${dir}/cache`});
for (const f of ['2023-12-12.png','2024-12-12.png']) {const {data}=await w.recognize(f); console.log('\n###'+f+'\n'+data.text)} await w.terminate();
