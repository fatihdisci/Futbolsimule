// Prompt Studio Pro - UI Manager
// UI render ve event fonksiyonları

const UI = {
    // Toast göster
    toast(message, duration = 2000) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },

    // Tab değiştir
    switchTab(tabId) {
        // Tüm tab butonları
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });

        // Tüm tab içerikleri
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tabId}`);
        });
    },

    // Preset select oluştur
    createPresetSelect(presetKey, currentValue) {
        const presets = PRESETS[presetKey];
        if (!presets) return '';

        const label = PRESET_LABELS[presetKey] || presetKey;

        let options = `<option value="">-- ${label} seç --</option>`;
        presets.forEach(p => {
            const selected = currentValue === p.value ? 'selected' : '';
            options += `<option value="${this.escapeHtml(p.value)}" ${selected}>${this.escapeHtml(p.name)}</option>`;
        });

        return options;
    },

    // Hybrid input oluştur (select + textarea)
    createHybridInput(presetKey, fieldName, currentValue, textareaClass = '') {
        const label = PRESET_LABELS[presetKey] || presetKey;

        return `
      <div class="form-group">
        <label>${label}</label>
        <div class="hybrid-input">
          <select class="preset-select" data-field="${fieldName}" data-preset="${presetKey}">
            ${this.createPresetSelect(presetKey, currentValue)}
          </select>
          <textarea 
            class="small ${textareaClass}" 
            data-field="${fieldName}" 
            placeholder="Özelleştir veya preset seç..."
          >${this.escapeHtml(currentValue || '')}</textarea>
        </div>
      </div>
    `;
    },

    // Karakter listesi render
    renderCharacterList(characters, activeId) {
        const list = document.getElementById('characterList');
        if (!list) return;

        if (!characters || characters.length === 0) {
            list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">👤</div>
          <p>Henüz karakter yok</p>
        </div>
      `;
            return;
        }

        list.innerHTML = characters.map(char => `
      <div class="character-item ${char.id === activeId ? 'active' : ''}" data-id="${char.id}">
        <div class="character-info">
          <h4>${this.escapeHtml(char.name)}</h4>
          <p>${this.escapeHtml(char.ethnicity || '')} ${char.age ? '• ' + char.age.split(',')[0] : ''}</p>
        </div>
        ${char.id === activeId ? '<span class="character-badge">Aktif</span>' : ''}
      </div>
    `).join('');
    },

    // Snapshot listesi render
    renderSnapshotList(snapshots) {
        const list = document.getElementById('snapshotList');
        if (!list) return;

        if (!snapshots || snapshots.length === 0) {
            list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <p>Henüz kaydedilmiş prompt yok</p>
        </div>
      `;
            return;
        }

        list.innerHTML = snapshots.map(snap => `
      <div class="snapshot-item" data-id="${snap.id}">
        <div class="snapshot-title">${this.escapeHtml(snap.title)}</div>
        <div class="snapshot-preview">${this.escapeHtml(snap.text.slice(0, 150))}...</div>
        <div class="snapshot-actions">
          <button class="btn btn-sm btn-primary copy-snapshot" data-id="${snap.id}">📋 Kopyala</button>
          <button class="btn btn-sm btn-danger delete-snapshot" data-id="${snap.id}">🗑️ Sil</button>
        </div>
      </div>
    `).join('');
    },

    // Modal aç/kapat
    toggleModal(modalId, show) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.toggle('show', show);
        }
    },

    // HTML escape
    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    // Prompt oluştur
    buildPrompt(char, format = 'structured') {
        if (!char) return 'Karakter seçili değil.';

        // Tüm alanları topla
        const fields = {
            // Temel
            ethnicity: char.ethnicity || '',
            age: char.age || '',
            bodyType: char.bodyType || '',
            height: char.height || '',

            // Yüz
            faceShape: char.faceShape || '',
            eyeShape: char.eyeShape || '',
            eyeColor: char.eyeColor || '',
            eyeSize: char.eyeSize || '',
            noseType: char.noseType || '',
            lipShape: char.lipShape || '',
            jawCheeks: char.jawCheeks || '',
            eyebrows: char.eyebrows || '',
            skinTexture: char.skinTexture || '',
            makeup: char.makeup || '',
            expression: char.expression || '',

            // Saç
            hairLength: char.hairLength || '',
            hairStyle: char.hairStyle || '',
            hairColor: char.hairColor || '',
            hairTexture: char.hairTexture || '',

            // Poz
            bodyPose: char.bodyPose || '',
            armPosition: char.armPosition || '',
            headAngle: char.headAngle || '',
            gazeDirection: char.gazeDirection || '',
            action: char.action || '',

            // Kıyafet
            topWear: char.topWear || '',
            bottomWear: char.bottomWear || '',
            footwear: char.footwear || '',
            accessories: char.accessories || '',

            // Sahne
            location: char.location || '',
            atmosphere: char.atmosphere || '',
            lighting: char.lighting || '',
            camera: char.camera || '',
            qualityStyle: char.qualityStyle || '',
            negativePrompt: char.negativePrompt || '',

            customNotes: char.customNotes || ''
        };

        if (format === 'singleline') {
            return this.buildSingleLinePrompt(fields);
        } else if (format === 'mj') {
            return this.buildMidjourneyPrompt(fields);
        }

        return this.buildStructuredPrompt(fields);
    },

    // Structured format
    buildStructuredPrompt(f) {
        let prompt = `### 1. Subject - Identity & Body
* Ethnicity: ${f.ethnicity}
* Age: ${f.age}
* Body Type: ${f.bodyType}
* Height: ${f.height}

### 2. Face Details
* Face Shape: ${f.faceShape}
* Eyes: ${f.eyeShape}, ${f.eyeColor}, ${f.eyeSize}
* Nose: ${f.noseType}
* Lips: ${f.lipShape}
* Jaw/Cheeks: ${f.jawCheeks}
* Eyebrows: ${f.eyebrows}
* Skin: ${f.skinTexture}
* Makeup: ${f.makeup}
* Expression: ${f.expression}

### 3. Hair
* Length: ${f.hairLength}
* Style: ${f.hairStyle}
* Color: ${f.hairColor}
* Texture: ${f.hairTexture}

### 4. Pose & Action
* Body Pose: ${f.bodyPose}
* Arms/Hands: ${f.armPosition}
* Head Angle: ${f.headAngle}
* Gaze: ${f.gazeDirection}
* Action: ${f.action}

### 5. Clothing & Accessories
* Top: ${f.topWear}
* Bottom: ${f.bottomWear}
* Footwear: ${f.footwear}
* Accessories: ${f.accessories}

### 6. Scene & Environment
* Location: ${f.location}
* Atmosphere: ${f.atmosphere}

### 7. Technical Specifications
* Lighting: ${f.lighting}
* Camera: ${f.camera}
* Quality/Style: ${f.qualityStyle}

### 8. Negative Prompts
* Avoid: ${f.negativePrompt}`;

        if (f.customNotes) {
            prompt += `\n\n### 9. Additional Notes\n* ${f.customNotes}`;
        }

        return prompt;
    },

    // Single line format
    buildSingleLinePrompt(f) {
        const parts = [
            f.action,
            f.location,
            f.atmosphere,
            `${f.ethnicity} ${f.age}`,
            f.bodyType,
            `Face: ${f.faceShape}, ${f.expression}`,
            `Eyes: ${f.eyeShape} ${f.eyeColor}`,
            `${f.noseType}, ${f.lipShape}`,
            f.skinTexture,
            f.makeup,
            `Hair: ${f.hairLength} ${f.hairStyle} ${f.hairColor}`,
            `Pose: ${f.bodyPose}, ${f.armPosition}`,
            `Outfit: ${f.topWear}, ${f.bottomWear}`,
            f.accessories,
            f.lighting,
            f.camera,
            f.qualityStyle,
            f.customNotes
        ].filter(p => p && p.trim());

        let prompt = parts.join(' | ');
        prompt += ` | Negative: ${f.negativePrompt}`;

        return prompt;
    },

    // Midjourney format
    buildMidjourneyPrompt(f) {
        const parts = [
            f.action,
            f.location,
            `(${f.atmosphere})`,
            `${f.ethnicity} ${f.age}`,
            f.bodyType,
            f.faceShape,
            `${f.eyeShape} ${f.eyeColor}`,
            f.expression,
            f.skinTexture,
            f.makeup,
            `${f.hairStyle} ${f.hairColor} hair`,
            f.bodyPose,
            f.topWear,
            f.bottomWear,
            f.lighting,
            f.camera,
            f.qualityStyle,
            f.customNotes
        ].filter(p => p && p.trim());

        let prompt = parts.join(', ');
        prompt += ` --no ${f.negativePrompt}`;

        return prompt;
    },

    // Karakter formunu doldur
    fillCharacterForm(char) {
        if (!char) return;

        // İsim
        const nameInput = document.getElementById('charName');
        if (nameInput) nameInput.value = char.name || '';

        // Tüm textarea'ları doldur
        document.querySelectorAll('textarea[data-field]').forEach(textarea => {
            const field = textarea.dataset.field;
            if (char[field] !== undefined) {
                textarea.value = char[field] || '';
            }
        });

        // Select'leri güncelle
        document.querySelectorAll('select[data-field]').forEach(select => {
            const field = select.dataset.field;
            if (char[field]) {
                // Değeri bul ve seç
                const options = select.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === char[field]) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    },

    // Formdan karakter verilerini al
    getCharacterFromForm() {
        const data = {};

        // İsim
        const nameInput = document.getElementById('charName');
        if (nameInput) data.name = nameInput.value.trim() || 'İsimsiz Karakter';

        // Tüm textarea'lardan
        document.querySelectorAll('textarea[data-field]').forEach(textarea => {
            const field = textarea.dataset.field;
            data[field] = textarea.value.trim();
        });

        return data;
    }
};

// Global erişim
window.UI = UI;
