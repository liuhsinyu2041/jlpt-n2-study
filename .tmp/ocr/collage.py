from PIL import Image
ps=['.tmp/ocr/2023-12-09.png','.tmp/ocr/2024-12-09.png','.tmp/ocr/answer-2024-12-52.png']
out=Image.new('RGB',(700,900*len(ps)),'white')
for i,p in enumerate(ps):
 im=Image.open(p).convert('RGB'); im.thumbnail((700,900)); out.paste(im,(0,i*900))
out.save('.tmp/ocr/low-pages.jpg',quality=85)
