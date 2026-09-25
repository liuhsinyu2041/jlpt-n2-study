import json,glob,os
for p in glob.glob('.tmp/ocr/scan-*.json'):
 d=json.load(open(p,encoding='utf-8')); print('\n'+os.path.basename(p))
 for x in d: print(x['page'],x['confidence_mean'],repr(x['text'][:130].replace('\n',' ')),'...',repr(x['text'][-120:].replace('\n',' ')))
