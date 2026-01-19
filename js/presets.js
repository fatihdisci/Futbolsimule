// Prompt Studio Pro - Preset Verileri
// Tüm kategoriler için hazır seçenekler

const PRESETS = {
  // ==================== KARAKTER TEMEL ====================
  ethnicity: [
    { name: "Doğu Asya", value: "East Asian" },
    { name: "Güneydoğu Asya", value: "Southeast Asian" },
    { name: "Güney Asya", value: "South Asian" },
    { name: "Orta Doğu", value: "Middle Eastern" },
    { name: "Kuzey Afrika", value: "North African" },
    { name: "Sahra Altı Afrika", value: "Sub-Saharan African" },
    { name: "Kuzey Avrupa", value: "Northern European" },
    { name: "Güney Avrupa", value: "Southern European" },
    { name: "Doğu Avrupa", value: "Eastern European" },
    { name: "Latin Amerika", value: "Latin American" },
    { name: "Yerli Amerikan", value: "Native American" },
    { name: "Pasifik Adalı", value: "Pacific Islander" }
  ],

  age: [
    { name: "18-20", value: "18-20 years old, youthful" },
    { name: "21-24", value: "21-24 years old, young adult" },
    { name: "25-28", value: "25-28 years old" },
    { name: "29-32", value: "29-32 years old" },
    { name: "33-37", value: "33-37 years old, early thirties" },
    { name: "38-42", value: "38-42 years old, late thirties" },
    { name: "43-50", value: "43-50 years old, mature" },
    { name: "50+", value: "50+ years old, mature elegant" }
  ],

  bodyType: [
    { name: "İnce", value: "slim, slender build" },
    { name: "Minyon", value: "petite, small frame" },
    { name: "Atletik", value: "athletic, toned body" },
    { name: "Dolgun", value: "curvy, full-figured" },
    { name: "Kum Saati", value: "hourglass figure, defined waist" },
    { name: "Uzun İnce", value: "tall and slender, model-like proportions" },
    { name: "Ortalama", value: "average build, natural proportions" },
    { name: "Kilolu", value: "plus size, voluptuous" },
    { name: "Kaslı İnce", value: "lean muscular, fit" },
    { name: "Minyon Dolgun", value: "petite curvy, short and shapely" }
  ],

  height: [
    { name: "Çok Kısa (150cm)", value: "very short, around 150cm" },
    { name: "Kısa (155cm)", value: "short, around 155cm" },
    { name: "Orta-Kısa (160cm)", value: "below average height, around 160cm" },
    { name: "Ortalama (165cm)", value: "average height, around 165cm" },
    { name: "Orta-Uzun (170cm)", value: "above average height, around 170cm" },
    { name: "Uzun (175cm)", value: "tall, around 175cm" },
    { name: "Çok Uzun (180cm+)", value: "very tall, model height, 180cm+" }
  ],

  // ==================== YÜZ DETAYLARI ====================
  faceShape: [
    { name: "Oval", value: "oval face shape, balanced proportions" },
    { name: "Yuvarlak", value: "round face, soft features" },
    { name: "Kare", value: "square face, strong jawline" },
    { name: "Kalp", value: "heart-shaped face, wide forehead, pointed chin" },
    { name: "Dikdörtgen", value: "oblong face, elongated" },
    { name: "Elmas", value: "diamond face shape, high cheekbones" },
    { name: "Üçgen", value: "triangular face, wide jaw, narrow forehead" },
    { name: "Kare-Oval", value: "soft square face, slightly rounded" }
  ],

  eyeShape: [
    { name: "Badem", value: "almond-shaped eyes" },
    { name: "Yuvarlak", value: "round eyes, large and expressive" },
    { name: "Kapak Örtük", value: "hooded eyes, partially covered lid" },
    { name: "Monolid", value: "monolid eyes, single eyelid" },
    { name: "Yukarı Çekik", value: "upturned eyes, lifted outer corners" },
    { name: "Aşağı Çekik", value: "downturned eyes, droopy outer corners" },
    { name: "Geniş Aralık", value: "wide-set eyes, spaced apart" },
    { name: "Yakın Aralık", value: "close-set eyes, near the nose bridge" }
  ],

  eyeColor: [
    { name: "Koyu Kahve", value: "dark brown eyes, nearly black" },
    { name: "Açık Kahve", value: "light brown eyes, warm" },
    { name: "Ela", value: "hazel eyes, green-brown mix" },
    { name: "Yeşil", value: "green eyes, vivid" },
    { name: "Mavi", value: "blue eyes, clear" },
    { name: "Gri", value: "gray eyes, cool tone" },
    { name: "Amber", value: "amber eyes, golden brown" },
    { name: "Siyah", value: "black eyes, very dark" },
    { name: "Mavi-Gri", value: "blue-gray eyes, stormy" },
    { name: "Yeşil-Kahve", value: "green-brown eyes, mixed" },
    { name: "Bal Rengi", value: "honey-colored eyes, warm golden" },
    { name: "Derin Siyah", value: "deep black eyes, intense" }
  ],

  eyeSize: [
    { name: "Büyük İfadeli", value: "large expressive eyes, doe-eyed" },
    { name: "Orta", value: "medium-sized eyes, balanced" },
    { name: "Küçük Zarif", value: "small delicate eyes, subtle" }
  ],

  noseType: [
    { name: "Düğme", value: "button nose, small and rounded" },
    { name: "Düz", value: "straight nose, refined bridge" },
    { name: "Roma", value: "Roman nose, slight bump on bridge" },
    { name: "Kalkık", value: "upturned nose, lifted tip" },
    { name: "Geniş", value: "wide nose, broad nostrils" },
    { name: "Dar", value: "narrow nose, thin bridge" },
    { name: "Yunan", value: "Greek nose, straight and elegant" },
    { name: "Afrikan", value: "Nubian nose, wide and flat bridge" }
  ],

  lipShape: [
    { name: "Dolgun", value: "full lips, plump" },
    { name: "İnce", value: "thin lips, delicate" },
    { name: "Kalp", value: "heart-shaped lips, defined cupid's bow" },
    { name: "Geniş", value: "wide lips, broad smile" },
    { name: "Yay", value: "bow-shaped lips, curved" },
    { name: "Yuvarlak", value: "round lips, soft curves" },
    { name: "Aşağı Kıvrık", value: "downturned lips, slight frown" },
    { name: "Asimetrik", value: "slightly asymmetric lips, natural" }
  ],

  jawCheeks: [
    { name: "Yüksek Elmacık", value: "high cheekbones, defined" },
    { name: "Yumuşak Hatlar", value: "soft features, rounded cheeks" },
    { name: "Belirgin Çene", value: "defined jawline, sharp" },
    { name: "Yuvarlak Çene", value: "rounded chin, soft jaw" },
    { name: "Sivri Çene", value: "pointed chin, V-shaped" },
    { name: "Güçlü Çene", value: "strong jaw, angular" }
  ],

  eyebrows: [
    { name: "Düz", value: "straight eyebrows, horizontal" },
    { name: "Kemerli", value: "arched eyebrows, defined curve" },
    { name: "Kalın Doğal", value: "thick natural eyebrows, bushy" },
    { name: "İnce", value: "thin eyebrows, delicate" },
    { name: "Tüylü", value: "feathered eyebrows, soft texture" },
    { name: "Yuvarlak", value: "rounded eyebrows, soft arch" },
    { name: "S-Şekli", value: "S-shaped eyebrows, dramatic" },
    { name: "Düz Kalın", value: "flat thick eyebrows, bold" }
  ],

  skinTexture: [
    { name: "Kusursuz Pürüzsüz", value: "flawless smooth skin, porcelain-like" },
    { name: "Doğal Gözenekli", value: "natural pores visible, realistic skin texture" },
    { name: "Hafif Çilli", value: "light freckles scattered across face" },
    { name: "Güzellik Beni", value: "beauty mark, small mole" },
    { name: "Hafif Sivilce İzi", value: "subtle acne scars, textured" },
    { name: "Güneş Öpüşü", value: "sun-kissed glow, warm tan" },
    { name: "Mat Ten", value: "matte skin, no shine" },
    { name: "Nemli Ten", value: "dewy skin, healthy glow" }
  ],

  makeup: [
    { name: "Makyajsız", value: "no makeup, bare face, natural" },
    { name: "Doğal Minimal", value: "natural minimal makeup, barely there" },
    { name: "Hafif Günlük", value: "light everyday makeup, subtle enhancement" },
    { name: "Cesur Dudak", value: "bold lips, statement lip color" },
    { name: "Dumanlı Göz", value: "smokey eyes, dramatic eye makeup" },
    { name: "Göz Alıcı", value: "glamorous full makeup, done-up" },
    { name: "Soft Glam", value: "soft glam makeup, polished but natural" },
    { name: "Nemli Doğal", value: "dewy natural makeup, fresh-faced" },
    { name: "Mat Bitirici", value: "matte finish makeup, velvety skin" },
    { name: "Kore Cam Ten", value: "Korean glass skin, luminous and flawless" }
  ],

  expression: [
    { name: "Nötr Rahat", value: "neutral relaxed expression, calm" },
    { name: "Hafif Gülümseme", value: "soft smile, gentle" },
    { name: "Samimi Kahkaha", value: "genuine laugh, joyful" },
    { name: "Düşünceli", value: "pensive expression, thoughtful" },
    { name: "Özgüvenli", value: "confident expression, self-assured" },
    { name: "Oyuncu Sırıtış", value: "playful smirk, mischievous" },
    { name: "Ciddi", value: "serious expression, focused" },
    { name: "Utangaç", value: "shy expression, bashful" },
    { name: "Şaşkın", value: "surprised expression, eyes wide" },
    { name: "Odaklanmış", value: "focused expression, concentrated" },
    { name: "Hayalperest", value: "dreamy expression, lost in thought" },
    { name: "Baştan Çıkarıcı", value: "alluring expression, captivating gaze" },
    { name: "Doğal Anlık", value: "candid natural expression, unposed" },
    { name: "Huzurlu", value: "peaceful expression, serene" },
    { name: "Meraklı", value: "curious expression, intrigued" }
  ],

  // ==================== SAÇ ====================
  hairLength: [
    { name: "Pixie Kısa", value: "pixie short hair, cropped" },
    { name: "Çene Hizası Bob", value: "chin length bob, short" },
    { name: "Omuz Hizası", value: "shoulder length hair" },
    { name: "Sırt Ortası", value: "mid-back length hair" },
    { name: "Bel Hizası", value: "waist length long hair" },
    { name: "Çok Uzun", value: "very long hair, past waist" }
  ],

  hairStyle: [
    { name: "Düz Parlak", value: "straight sleek hair, smooth" },
    { name: "Hafif Dalgalı", value: "loose waves, flowing" },
    { name: "Sıkı Bukleler", value: "tight curls, springy" },
    { name: "Plaj Dalgası", value: "beach waves, tousled" },
    { name: "Dağınık Topuz", value: "messy bun, casual updo" },
    { name: "Yüksek At Kuyruğu", value: "high ponytail, sleek" },
    { name: "Alçak At Kuyruğu", value: "low ponytail, elegant" },
    { name: "Örgüler", value: "braided hair, intricate" },
    { name: "İkili Topuz", value: "space buns, playful" },
    { name: "Yarı Toplu", value: "half up half down, versatile" },
    { name: "Yan Ayrık", value: "side part, asymmetric" },
    { name: "Orta Ayrık", value: "middle part, symmetrical" },
    { name: "Perde Kakül", value: "curtain bangs, face-framing" },
    { name: "Düz Kakül", value: "straight bangs, blunt fringe" },
    { name: "Katlı", value: "layered hair, textured" },
    { name: "Küt Kesim", value: "blunt cut, sharp ends" },
    { name: "Hacimli", value: "voluminous hair, big and bouncy" },
    { name: "Islak Görünüm", value: "wet look, slicked back" },
    { name: "Doğal Doku", value: "natural texture, air-dried" },
    { name: "Rüzgarda Dağılmış", value: "windswept hair, dynamic" }
  ],

  hairColor: [
    { name: "Simsiyah", value: "jet black hair" },
    { name: "Doğal Siyah", value: "natural black hair" },
    { name: "Koyu Kahve", value: "dark brown hair" },
    { name: "Orta Kahve", value: "medium brown hair" },
    { name: "Açık Kahve", value: "light brown hair" },
    { name: "Kestane", value: "chestnut brown hair" },
    { name: "Kumral", value: "auburn hair, reddish brown" },
    { name: "Kızıl", value: "ginger red hair" },
    { name: "Sarı", value: "blonde hair" },
    { name: "Platin Sarı", value: "platinum blonde hair" },
    { name: "Kirli Sarı", value: "dirty blonde hair" },
    { name: "Karamel Röfle", value: "caramel highlights in brown hair" },
    { name: "Ombre", value: "ombre hair, dark to light gradient" },
    { name: "Balayage", value: "balayage highlights, natural blend" },
    { name: "Tuz Biber", value: "salt and pepper hair, gray mixed" }
  ],

  hairTexture: [
    { name: "Dümdüz", value: "pin straight hair, silky smooth" },
    { name: "Doğal Dalgalı", value: "naturally wavy hair" },
    { name: "Kıvırcık", value: "curly hair, defined curls" },
    { name: "Afro/Kıvır Kıvır", value: "coily kinky hair, tight coils" }
  ],

  // ==================== POZ & AKSİYON ====================
  bodyPose: [
    { name: "Dik Ayakta", value: "standing straight, upright posture" },
    { name: "Rahat Ayakta", value: "standing relaxed, casual stance" },
    { name: "Sandalyede Oturma", value: "sitting on chair, seated" },
    { name: "Yerde Oturma", value: "sitting on floor, grounded" },
    { name: "Bağdaş Kurma", value: "sitting cross-legged, comfortable" },
    { name: "Duvara Yaslanma", value: "leaning against wall, casual" },
    { name: "Öne Eğilme", value: "leaning forward, engaged" },
    { name: "Yürüme", value: "walking pose, mid-stride" },
    { name: "Uzanma", value: "lying down, reclined" },
    { name: "Diz Çökme", value: "kneeling position" },
    { name: "Çömelme", value: "crouching, squatting" },
    { name: "Esneme", value: "stretching pose, elongated" },
    { name: "Dans", value: "dancing pose, dynamic movement" },
    { name: "Zıplama", value: "jumping, mid-air" },
    { name: "Yaslanarak Uzanma", value: "reclining, lounging" }
  ],

  armPosition: [
    { name: "Yanlarda", value: "arms at sides, natural" },
    { name: "Belde", value: "hands on hips, confident" },
    { name: "Göğüste Kavuşuk", value: "arms crossed over chest" },
    { name: "Çenede El", value: "one hand on chin, thoughtful" },
    { name: "Saçta El", value: "hand in hair, casual" },
    { name: "Telefon Tutma", value: "holding phone, checking" },
    { name: "El Sallama", value: "waving hand, greeting" },
    { name: "İşaret Etme", value: "pointing gesture" },
    { name: "Eller Kavuşuk", value: "clasped hands, polite" },
    { name: "Kollar Yukarı", value: "arms raised up, stretching" },
    { name: "Göğüste El", value: "hand on chest, emotional" },
    { name: "Yüzeye Dayalı", value: "resting on surface, supported" }
  ],

  headAngle: [
    { name: "Düz İleri", value: "head straight ahead, facing camera" },
    { name: "Hafif Sol Eğik", value: "slight head tilt to left" },
    { name: "Hafif Sağ Eğik", value: "slight head tilt to right" },
    { name: "Yukarı Bakış", value: "head tilted up, looking upward" },
    { name: "Aşağı Bakış", value: "head tilted down, looking down" },
    { name: "3/4 Sol", value: "three-quarter view left, angled" },
    { name: "3/4 Sağ", value: "three-quarter view right, angled" },
    { name: "Profil", value: "profile view, side angle" }
  ],

  gazeDirection: [
    { name: "Doğrudan Göz Teması", value: "direct eye contact with camera, engaging" },
    { name: "Sola Bakış", value: "looking away to the left, off-camera" },
    { name: "Sağa Bakış", value: "looking away to the right, off-camera" },
    { name: "Aşağı Bakış", value: "looking down, lowered gaze" },
    { name: "Yukarı Bakış", value: "looking up, upward gaze" },
    { name: "Omuz Üstü Bakış", value: "looking over shoulder, glancing back" },
    { name: "Gözler Kapalı", value: "eyes closed, peaceful" },
    { name: "Farkında Değil", value: "candid, not aware of camera" }
  ],

  action: [
    { name: "Selfie Çekme", value: "taking a selfie, holding phone up" },
    { name: "Ayna Selfie", value: "mirror selfie, reflection visible" },
    { name: "Kitap Okuma", value: "reading a book, focused" },
    { name: "Telefon Kullanma", value: "using phone, texting or browsing" },
    { name: "Kahve İçme", value: "drinking coffee, holding cup" },
    { name: "Yemek Yeme", value: "eating food, dining" },
    { name: "Sokakta Yürüme", value: "walking on street, urban" },
    { name: "Pencereye Bakma", value: "gazing out window, contemplative" },
    { name: "Müzik Dinleme", value: "listening to music, headphones" },
    { name: "Laptop Çalışma", value: "working on laptop, focused" },
    { name: "Yemek Yapma", value: "cooking, in kitchen" },
    { name: "Egzersiz", value: "exercising, working out" },
    { name: "Meditasyon", value: "meditating, peaceful" },
    { name: "Arkadaşlarla Gülme", value: "laughing with friends, social" },
    { name: "Alışveriş", value: "shopping, browsing products" },
    { name: "Makyaj Yapma", value: "applying makeup, mirror" },
    { name: "Saç Yapma", value: "styling hair, grooming" },
    { name: "Yeni Uyanmış", value: "just woke up, morning" },
    { name: "Hazırlanma", value: "getting ready, preparation" },
    { name: "Dinlenme", value: "relaxing, at ease" }
  ],

  // ==================== KIYAFETGiyim ====================
  topWear: [
    { name: "Düz T-shirt", value: "plain t-shirt, casual" },
    { name: "Baskılı Tişört", value: "graphic tee, printed" },
    { name: "Crop Top", value: "crop top, midriff showing" },
    { name: "Askılı Atlet", value: "tank top, sleeveless" },
    { name: "Bluz", value: "blouse, elegant" },
    { name: "Düğmeli Gömlek", value: "button-up shirt, formal" },
    { name: "Kazak", value: "sweater, cozy knitwear" },
    { name: "Hırka", value: "cardigan, open front" },
    { name: "Kapüşonlu", value: "hoodie, casual streetwear" },
    { name: "Deri Ceket", value: "leather jacket, edgy" },
    { name: "Kot Ceket", value: "denim jacket, casual" },
    { name: "Blazer", value: "blazer, professional" },
    { name: "Palto", value: "coat, outerwear" },
    { name: "Günlük Elbise", value: "casual dress, everyday" },
    { name: "Resmi Elbise", value: "formal dress, elegant" },
    { name: "Yazlık Elbise", value: "sundress, light and breezy" },
    { name: "Bodysuit", value: "bodysuit, fitted" },
    { name: "Spor Sütyeni", value: "sports bra, athletic" },
    { name: "Tüp Top", value: "tube top, strapless" },
    { name: "Düşük Omuz", value: "off-shoulder top, exposed shoulders" },
    { name: "Boğazlı", value: "turtleneck, high collar" },
    { name: "V-Yaka", value: "v-neck top, flattering neckline" },
    { name: "Oversize Gömlek", value: "oversized shirt, loose fit" },
    { name: "Polo", value: "polo shirt, preppy" },
    { name: "Yelek", value: "vest, layering piece" },
    { name: "Kimono", value: "kimono style, flowing" },
    { name: "İp Askılı", value: "camisole, thin straps" },
    { name: "Boyundan Bağlı", value: "halter top, tied at neck" },
    { name: "Sargı Bluz", value: "wrap top, crossover style" },
    { name: "Korse Top", value: "corset top, structured" },
    { name: "Bikini Üst", value: "bikini top, swimwear" },
    { name: "Bralette", value: "bralette, delicate" }
  ],

  bottomWear: [
    { name: "Skinny Jean", value: "skinny jeans, tight fit" },
    { name: "Düz Kesim Jean", value: "straight jeans, classic" },
    { name: "Geniş Paça Jean", value: "wide-leg jeans, flowy" },
    { name: "Kot Şort", value: "denim shorts, casual" },
    { name: "Spor Şort", value: "athletic shorts, sporty" },
    { name: "Mini Etek", value: "mini skirt, short" },
    { name: "Midi Etek", value: "midi skirt, knee-length" },
    { name: "Uzun Etek", value: "maxi skirt, floor-length" },
    { name: "Tayt", value: "leggings, form-fitting" },
    { name: "Eşofman Altı", value: "sweatpants, comfortable" },
    { name: "Kumaş Pantolon", value: "dress pants, formal" },
    { name: "Kargo Pantolon", value: "cargo pants, utility pockets" },
    { name: "Culotte", value: "culottes, wide cropped" },
    { name: "Jogger", value: "joggers, athletic casual" },
    { name: "Bisikletçi Şort", value: "bike shorts, athletic" },
    { name: "Palazzo Pantolon", value: "palazzo pants, very wide" },
    { name: "Tulum", value: "overalls, jumpsuit style" },
    { name: "Yoga Pantolonu", value: "yoga pants, stretchy" },
    { name: "Yüksek Bel Pantolon", value: "high-waisted pants, flattering" },
    { name: "Bikini Alt", value: "bikini bottom, swimwear" }
  ],

  footwear: [
    { name: "Spor Ayakkabı", value: "sneakers, casual athletic" },
    { name: "Yüksek Topuk", value: "high heels, elegant" },
    { name: "Sandalet", value: "sandals, open-toe" },
    { name: "Bilek Bot", value: "ankle boots, trendy" },
    { name: "Dizüstü Çizme", value: "knee-high boots, tall" },
    { name: "Babet", value: "flats, comfortable" },
    { name: "Loafer", value: "loafers, slip-on" },
    { name: "Terlik", value: "slippers, indoor" },
    { name: "Çıplak Ayak", value: "barefoot, no shoes" },
    { name: "Platform", value: "platform shoes, elevated" },
    { name: "Dolgu Topuk", value: "wedges, wedge heels" },
    { name: "Koşu Ayakkabısı", value: "athletic running shoes, sporty" }
  ],

  accessories: [
    { name: "Aksesuar Yok", value: "no accessories, minimal" },
    { name: "Basit Kolye", value: "simple necklace, delicate chain" },
    { name: "Katmanlı Kolye", value: "layered necklaces, stacked" },
    { name: "Küçük Küpe", value: "stud earrings, subtle" },
    { name: "Halka Küpe", value: "hoop earrings, circular" },
    { name: "Sallantılı Küpe", value: "dangle earrings, hanging" },
    { name: "Yüzükler", value: "rings on fingers, jewelry" },
    { name: "Bileklik", value: "bracelet, wrist accessory" },
    { name: "Kol Saati", value: "wristwatch, timepiece" },
    { name: "Güneş Gözlüğü", value: "sunglasses, shades" },
    { name: "Şapka", value: "hat, headwear" },
    { name: "Saç Bandı", value: "headband, hair accessory" },
    { name: "Saç Tokası", value: "hair clips, decorative" },
    { name: "Çanta", value: "handbag, purse" },
    { name: "Atkı/Fular", value: "scarf, neck accessory" }
  ],

  // ==================== SAHNE & MEKAN ====================
  indoorLocation: [
    { name: "Modern Yatak Odası", value: "modern bedroom, clean lines, minimalist decor" },
    { name: "Rahat Yatak Odası", value: "cozy bedroom, warm lighting, comfortable bed" },
    { name: "Oturma Odası", value: "living room, sofa, home environment" },
    { name: "Mutfak", value: "kitchen, cooking area, appliances" },
    { name: "Banyo", value: "bathroom, tiles, mirror" },
    { name: "Ofis", value: "office space, desk, professional environment" },
    { name: "Kafe İçi", value: "cafe interior, coffee shop ambiance, cozy" },
    { name: "Restoran", value: "restaurant interior, dining atmosphere" },
    { name: "Otel Odası", value: "hotel room, travel, temporary accommodation" },
    { name: "Stüdyo Daire", value: "studio apartment, open plan, compact" },
    { name: "Kütüphane", value: "library, bookshelves, quiet" },
    { name: "Spor Salonu", value: "gym, fitness equipment, workout space" },
    { name: "Alışveriş Merkezi", value: "mall interior, shopping environment" },
    { name: "Giyim Mağazası", value: "clothing store, fitting room area" },
    { name: "Sanat Galerisi", value: "art gallery, white walls, exhibitions" }
  ],

  outdoorLocation: [
    { name: "Şehir Sokağı", value: "city street, urban environment, buildings" },
    { name: "Park", value: "park setting, greenery, nature" },
    { name: "Plaj", value: "beach, sand, ocean, coastal" },
    { name: "Orman", value: "forest, trees, woodland" },
    { name: "Dağ", value: "mountain, scenic view, nature" },
    { name: "Çatı Katı", value: "rooftop, city views, elevated" },
    { name: "Köprü", value: "bridge, architectural, over water" },
    { name: "Bahçe", value: "garden, flowers, landscaped" },
    { name: "Havuz Kenarı", value: "poolside, swimming pool area" },
    { name: "Balkon", value: "balcony, outdoor private space" },
    { name: "Otopark", value: "parking lot, concrete, urban" },
    { name: "Tren İstasyonu", value: "train station, platform, travel" },
    { name: "Havalimanı", value: "airport, departure area, travel" },
    { name: "Üniversite Kampüsü", value: "university campus, academic buildings" },
    { name: "Şehir Merkezi", value: "downtown, busy streets, urban core" }
  ],

  studioBackdrop: [
    { name: "Beyaz Fon", value: "white backdrop, clean studio" },
    { name: "Gri Fon", value: "gray backdrop, neutral studio" },
    { name: "Siyah Fon", value: "black backdrop, dramatic studio" },
    { name: "Renkli Fon", value: "colored backdrop, vibrant studio" },
    { name: "Doğal Işıklı Stüdyo", value: "natural light studio, large windows" }
  ],

  atmosphere: [
    { name: "Sıcak Rahat", value: "cozy warm atmosphere, inviting" },
    { name: "Minimal Temiz", value: "minimal clean aesthetic, uncluttered" },
    { name: "Loş Dramatik", value: "moody dramatic atmosphere, shadows" },
    { name: "Aydınlık Ferah", value: "bright airy environment, well-lit" },
    { name: "Kentsel Ham", value: "urban gritty atmosphere, raw" },
    { name: "Doğal Organik", value: "natural organic feeling, earthy" },
    { name: "Lüks", value: "luxurious atmosphere, high-end" },
    { name: "Vintage Retro", value: "vintage retro vibe, nostalgic" },
    { name: "Modern Şık", value: "modern sleek aesthetic, contemporary" },
    { name: "Romantik Yumuşak", value: "romantic soft atmosphere, dreamy" }
  ],

  // ==================== TEKNİK AYARLAR ====================
  lighting: [
    { name: "Doğal Gün Işığı Yumuşak", value: "natural soft daylight, diffused sunlight" },
    { name: "Doğal Gün Işığı Sert", value: "harsh natural daylight, direct sun, strong shadows" },
    { name: "Altın Saat", value: "golden hour lighting, warm sunset tones, long shadows" },
    { name: "Mavi Saat", value: "blue hour lighting, cool twilight, soft ambient" },
    { name: "Bulutlu Gün", value: "overcast diffused lighting, soft even light" },
    { name: "Pencere Işığı", value: "window light, side lighting, natural" },
    { name: "Ring Light", value: "ring light, even facial lighting, catchlights" },
    { name: "Stüdyo Softbox", value: "softbox studio lighting, professional even" },
    { name: "Dramatik Yan Işık", value: "dramatic side lighting, high contrast, shadows" },
    { name: "Arka Aydınlatma", value: "backlit, silhouette edge, rim light" },
    { name: "Neon Ortam", value: "neon ambient lighting, colorful reflections" },
    { name: "Mum Işığı", value: "candlelight, warm flickering, intimate" }
  ],

  camera: [
    { name: "iPhone 15 Pro", value: "iPhone 15 Pro camera, smartphone photography" },
    { name: "Samsung Galaxy", value: "Samsung Galaxy camera, mobile shot" },
    { name: "DSLR 50mm f/1.8", value: "DSLR with 50mm f/1.8 lens, shallow depth of field" },
    { name: "DSLR 85mm f/1.4", value: "DSLR with 85mm f/1.4 lens, portrait bokeh" },
    { name: "DSLR 35mm", value: "DSLR with 35mm lens, environmental portrait" },
    { name: "Orta Format", value: "medium format camera, ultra high detail" },
    { name: "35mm Film", value: "35mm film camera, analog grain, vintage" },
    { name: "Polaroid", value: "polaroid instant camera, nostalgic" },
    { name: "GoPro Geniş Açı", value: "GoPro wide angle, distortion, action" },
    { name: "Ayna Yansıması", value: "mirror reflection shot, selfie style" }
  ],

  qualityStyle: [
    { name: "Ultra Gerçekçi 8K", value: "ultra realistic, 8K resolution, hyper-detailed, photorealistic" },
    { name: "RAW Fotoğraf", value: "photorealistic RAW photography, unedited, true colors" },
    { name: "Profesyonel Fotoğraf", value: "professional photography, well-composed, high quality" },
    { name: "Sokak Fotoğrafı", value: "candid street photography, authentic moment, documentary" },
    { name: "Moda Çekimi", value: "fashion editorial photography, Vogue style, high fashion" },
    { name: "Film Fotoğrafçılığı", value: "film photography aesthetic, Kodak Portra 400, grain" },
    { name: "Belgesel Tarzı", value: "documentary style, authentic, unposed" },
    { name: "Stüdyo Portre", value: "portrait studio photography, controlled lighting, professional" }
  ],

  negativePrompt: [
    { name: "Minimal", value: "CGI, 3D render, cartoon, illustration" },
    { name: "Standart", value: "CGI, 3D render, anime, cartoon, plastic skin, blurry, low quality" },
    { name: "Gelişmiş", value: "CGI, 3D render, anime, cartoon, plastic skin, distorted, extra fingers, bad anatomy, watermark, signature" },
    { name: "Maksimum", value: "CGI, 3D render, anime, cartoon, plastic skin, extra fingers, distorted limbs, bad anatomy, logos, watermarks, oversaturated, low quality, cropped, out of frame, duplicate, deformed" },
    { name: "Karakter Tutarlılığı", value: "CGI, 3D render, cartoon, inconsistent features, different person, morphed face, plastic skin, distorted proportions, bad anatomy" }
  ]
};

// Preset kategorilerinin Türkçe adları
const PRESET_LABELS = {
  ethnicity: "Etnik Köken",
  age: "Yaş",
  bodyType: "Vücut Tipi",
  height: "Boy",
  faceShape: "Yüz Şekli",
  eyeShape: "Göz Şekli",
  eyeColor: "Göz Rengi",
  eyeSize: "Göz Boyutu",
  noseType: "Burun Tipi",
  lipShape: "Dudak Şekli",
  jawCheeks: "Çene/Elmacık",
  eyebrows: "Kaş Şekli",
  skinTexture: "Ten Detayı",
  makeup: "Makyaj",
  expression: "Yüz İfadesi",
  hairLength: "Saç Uzunluğu",
  hairStyle: "Saç Stili",
  hairColor: "Saç Rengi",
  hairTexture: "Saç Dokusu",
  bodyPose: "Vücut Pozu",
  armPosition: "Kol/El Pozisyonu",
  headAngle: "Baş Açısı",
  gazeDirection: "Bakış Yönü",
  action: "Eylem/Aktivite",
  topWear: "Üst Giyim",
  bottomWear: "Alt Giyim",
  footwear: "Ayakkabı",
  accessories: "Aksesuar",
  indoorLocation: "İç Mekan",
  outdoorLocation: "Dış Mekan",
  studioBackdrop: "Stüdyo Fon",
  atmosphere: "Atmosfer",
  lighting: "Işık",
  camera: "Kamera/Lens",
  qualityStyle: "Kalite/Stil",
  negativePrompt: "Negative Prompt"
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRESETS, PRESET_LABELS };
}
