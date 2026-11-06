MY HEALTH RECORD — V8.5 (ไอคอนอยู่ระดับเดียวกับ index.html)

เวอร์ชันนี้ย้ายไฟล์ไอคอนมาไว้ที่ระดับ Root เพื่อให้เพิ่มไฟล์ PNG ทีละไฟล์ผ่าน GitHub บนมือถือได้
ไม่ต้องอัปโหลดโฟลเดอร์ icons

ไฟล์ที่ต้องเห็นในหน้าแรกของ Repository:
- index.html
- manifest.webmanifest
- service-worker.js
- .nojekyll
- icon-192.png
- icon-512.png

วิธีอัปโหลด:
1) แตก ZIP ในโทรศัพท์
2) เข้า Repository > Add file > Upload files
3) เลือกไฟล์ทั้งหมดด้านบน (รวม PNG ทั้ง 2 ไฟล์) สามารถเลือกหลายไฟล์พร้อมกันได้
4) Commit changes ไปยัง branch/folder ที่ GitHub Pages ใช้งาน

ทดสอบหลัง Deploy:
- /My-health-/manifest.webmanifest ต้องแสดง JSON
- /My-health-/service-worker.js ต้องแสดง JavaScript
- /My-health-/icon-192.png ต้องแสดงรูปไอคอน
- /My-health-/icon-512.png ต้องแสดงรูปไอคอน

แพ็กเกจนี้คงหน้าแอปและฟังก์ชันจาก V8.4 เปลี่ยนเฉพาะตำแหน่งอ้างอิงไอคอน
และใช้ cache version V8.4 ต่อเนื่อง ไม่มีการล้างหรือย้ายข้อมูลใน localStorage
