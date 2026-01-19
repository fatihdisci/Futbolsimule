// Prompt Studio Pro - Storage Manager
// LocalStorage işlemleri

const STORAGE_KEY = 'promptstudio_v3';

const Storage = {
    // Benzersiz ID oluştur
    uid() {
        return crypto.randomUUID ? crypto.randomUUID() : Date.now() + '_' + Math.random().toString(36).slice(2);
    },

    // Varsayılan state
    getDefaultState() {
        return {
            version: 3,
            activeCharId: null,
            promptSnapshots: [],
            characters: [this.createDefaultCharacter()]
        };
    },

    // Varsayılan karakter oluştur
    createDefaultCharacter() {
        return {
            id: this.uid(),
            name: 'Varsayılan Karakter',
            createdAt: Date.now(),

            // Temel
            ethnicity: 'East Asian',
            age: '25-28 years old',
            bodyType: 'slim, slender build',
            height: 'average height, around 165cm',

            // Yüz
            faceShape: 'oval face shape, balanced proportions',
            eyeShape: 'almond-shaped eyes',
            eyeColor: 'dark brown eyes, nearly black',
            eyeSize: 'medium-sized eyes, balanced',
            noseType: 'button nose, small and rounded',
            lipShape: 'full lips, plump',
            jawCheeks: 'high cheekbones, defined',
            eyebrows: 'natural eyebrows, soft arch',
            skinTexture: 'natural pores visible, realistic skin texture',
            makeup: 'natural minimal makeup, barely there',
            expression: 'soft smile, gentle',

            // Saç
            hairLength: 'shoulder length hair',
            hairStyle: 'loose waves, flowing',
            hairColor: 'dark brown hair',
            hairTexture: 'naturally wavy hair',

            // Poz
            bodyPose: 'standing relaxed, casual stance',
            armPosition: 'arms at sides, natural',
            headAngle: 'head straight ahead, facing camera',
            gazeDirection: 'direct eye contact with camera, engaging',
            action: 'taking a selfie, holding phone up',

            // Kıyafet
            topWear: 'casual t-shirt',
            bottomWear: 'jeans, classic fit',
            footwear: 'sneakers, casual',
            accessories: 'no accessories, minimal',

            // Sahne
            location: 'modern bedroom, clean lines',
            atmosphere: 'cozy warm atmosphere, inviting',
            lighting: 'natural soft daylight, diffused sunlight',
            camera: 'iPhone 15 Pro camera, smartphone photography',
            qualityStyle: 'ultra realistic, 8K resolution, hyper-detailed, photorealistic',
            negativePrompt: 'CGI, 3D render, anime, cartoon, plastic skin, distorted, extra fingers, bad anatomy, watermark, signature',

            // Özel notlar
            customNotes: ''
        };
    },

    // Yeni boş karakter oluştur
    createEmptyCharacter() {
        const char = this.createDefaultCharacter();
        char.id = this.uid();
        char.name = 'Yeni Karakter';
        char.createdAt = Date.now();
        return char;
    },

    // State yükle
    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);
            if (!data || typeof data !== 'object') return null;
            return data;
        } catch (e) {
            console.error('Storage load error:', e);
            return null;
        }
    },

    // State kaydet
    save(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    },

    // State sıfırla
    reset() {
        localStorage.removeItem(STORAGE_KEY);
        return this.getDefaultState();
    },

    // JSON Export
    exportJSON(state) {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `promptstudio-export-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // JSON Import
    async importJSON(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);

            // Doğrulama
            if (!data || !Array.isArray(data.characters)) {
                throw new Error('Geçersiz format');
            }

            return { success: true, data };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },

    // Snapshot kaydet
    addSnapshot(state, title, text) {
        const snapshot = {
            id: this.uid(),
            title,
            text,
            createdAt: Date.now()
        };

        state.promptSnapshots.unshift(snapshot);

        // Maksimum 50 snapshot tut
        if (state.promptSnapshots.length > 50) {
            state.promptSnapshots = state.promptSnapshots.slice(0, 50);
        }

        this.save(state);
        return snapshot;
    },

    // Snapshot sil
    deleteSnapshot(state, id) {
        state.promptSnapshots = state.promptSnapshots.filter(s => s.id !== id);
        this.save(state);
    }
};

// Global erişim için
window.Storage = Storage;
