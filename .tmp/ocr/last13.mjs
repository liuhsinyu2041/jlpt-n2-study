import {createWorker} from 'tesseract.js';
const dir='.';const w=await createWorker('jpn',1,{langPath:dir,gzip:false,cachePath:`${dir}/cache`});
for (const f of ['2023-12-13.png','2024-12-13.png']) {const {data}=await w.recognize(f); console.log('\n###'+f+'\n'+data.text)} await w.terminate();
