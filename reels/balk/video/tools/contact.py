import sys, glob
from PIL import Image, ImageDraw, ImageFont
files=sys.argv[2:]; out=sys.argv[1]; cols=5; w,h=270,480
rows=(len(files)+cols-1)//cols; sheet=Image.new('RGB',(cols*w,rows*(h+24)),'white'); d=ImageDraw.Draw(sheet)
for i,f in enumerate(files):
    im=Image.open(f).resize((w,h)); x,y=(i%cols)*w,(i//cols)*(h+24); sheet.paste(im,(x,y+24)); d.text((x+4,y+4),f.split('f_')[-1][:-4],fill='black')
sheet.save(out)
