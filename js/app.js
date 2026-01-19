// Prompt Studio Pro - Ana Uygulama
// State yönetimi ve event handlers

const App = {
    state: null,

    // Uygulama başlat
    init() {
        // State yükle veya varsayılan oluştur
        this.state = Storage.load() || Storage.getDefaultState();

        // Aktif karakter kontrolü
        if (!this.state.activeCharId && this.state.characters.length > 0) {
            this.state.activeCharId = this.state.characters[0].id;
        }

        // UI render
        this.renderAll();

        // Event listeners
        this.bindEvents();

        // Prompt güncelle
        this.updatePrompt();

        UI.toast('Hazır!');
    },

    // Aktif karakter
    getActiveChar() {
        return this.state.characters.find(c => c.id === this.state.activeCharId) || null;
    },

    // Tüm UI render
    renderAll() {
        UI.renderCharacterList(this.state.characters, this.state.activeCharId);
        UI.fillCharacterForm(this.getActiveChar());
        this.updateActiveCharInfo();
    },

    // Aktif karakter bilgisi güncelle
    updateActiveCharInfo() {
        const char = this.getActiveChar();
        const badge = document.getElementById('activeCharBadge');
        if (badge) {
            badge.textContent = char ? char.name : 'Seçili değil';
        }
    },

    // Prompt güncelle
    updatePrompt() {
        const char = this.getActiveChar();
        const format = document.getElementById('promptFormat')?.value || 'structured';
        const prompt = UI.buildPrompt(char, format);

        const output = document.getElementById('promptOutput');
        if (output) {
            output.textContent = prompt;
        }
    },

    // Karakter kaydet
    saveCharacter() {
        const char = this.getActiveChar();
        if (!char) {
            UI.toast('Aktif karakter yok');
            return;
        }

        const formData = UI.getCharacterFromForm();
        Object.assign(char, formData);
        char.updatedAt = Date.now();

        Storage.save(this.state);
        UI.renderCharacterList(this.state.characters, this.state.activeCharId);
        this.updateActiveCharInfo();
        this.updatePrompt();

        UI.toast('Karakter kaydedildi');
    },

    // Yeni karakter
    newCharacter() {
        const char = Storage.createEmptyCharacter();
        this.state.characters.unshift(char);
        this.state.activeCharId = char.id;

        Storage.save(this.state);
        this.renderAll();
        this.updatePrompt();

        UI.toast('Yeni karakter oluşturuldu');
    },

    // Karakter çoğalt
    duplicateCharacter() {
        const char = this.getActiveChar();
        if (!char) return;

        const clone = JSON.parse(JSON.stringify(char));
        clone.id = Storage.uid();
        clone.name = char.name + ' (kopya)';
        clone.createdAt = Date.now();

        this.state.characters.unshift(clone);
        this.state.activeCharId = clone.id;

        Storage.save(this.state);
        this.renderAll();
        this.updatePrompt();

        UI.toast('Karakter çoğaltıldı');
    },

    // Karakter sil
    deleteCharacter() {
        const char = this.getActiveChar();
        if (!char) return;

        if (this.state.characters.length <= 1) {
            UI.toast('En az 1 karakter kalmalı');
            return;
        }

        if (!confirm(`"${char.name}" karakterini silmek istediğinize emin misiniz?`)) {
            return;
        }

        this.state.characters = this.state.characters.filter(c => c.id !== char.id);
        this.state.activeCharId = this.state.characters[0]?.id || null;

        Storage.save(this.state);
        this.renderAll();
        this.updatePrompt();

        UI.toast('Karakter silindi');
    },

    // Karakter seç
    selectCharacter(id) {
        this.state.activeCharId = id;
        Storage.save(this.state);
        this.renderAll();
        this.updatePrompt();
    },

    // Prompt kopyala
    async copyPrompt() {
        const output = document.getElementById('promptOutput');
        if (!output) return;

        try {
            await navigator.clipboard.writeText(output.textContent);
            UI.toast('Prompt kopyalandı!');
        } catch (e) {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = output.textContent;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            UI.toast('Prompt kopyalandı!');
        }
    },

    // Snapshot kaydet
    saveSnapshot() {
        const char = this.getActiveChar();
        const output = document.getElementById('promptOutput');
        if (!output || !char) return;

        const title = `${char.name} - ${new Date().toLocaleString('tr-TR')}`;
        Storage.addSnapshot(this.state, title, output.textContent);

        UI.toast('Snapshot kaydedildi');
    },

    // Snapshot listesini göster
    showSnapshots() {
        UI.renderSnapshotList(this.state.promptSnapshots);
        UI.toggleModal('snapshotModal', true);
    },

    // Snapshot kopyala
    async copySnapshot(id) {
        const snap = this.state.promptSnapshots.find(s => s.id === id);
        if (!snap) return;

        try {
            await navigator.clipboard.writeText(snap.text);
            UI.toast('Kopyalandı!');
        } catch (e) {
            UI.toast('Kopyalama başarısız');
        }
    },

    // Snapshot sil
    deleteSnapshot(id) {
        Storage.deleteSnapshot(this.state, id);
        UI.renderSnapshotList(this.state.promptSnapshots);
        UI.toast('Silindi');
    },

    // Export
    exportData() {
        Storage.exportJSON(this.state);
        UI.toast('Export indirildi');
    },

    // Import
    async importData(file) {
        const result = await Storage.importJSON(file);

        if (!result.success) {
            UI.toast('Import başarısız: ' + result.error);
            return;
        }

        this.state = result.data;
        this.state.activeCharId = this.state.characters[0]?.id || null;

        Storage.save(this.state);
        this.renderAll();
        this.updatePrompt();

        UI.toast('Import tamamlandı');
    },

    // Sıfırla
    resetAll() {
        if (!confirm('Tüm veriler silinecek. Emin misiniz?')) {
            return;
        }

        this.state = Storage.reset();
        this.state.activeCharId = this.state.characters[0]?.id || null;

        Storage.save(this.state);
        this.renderAll();
        this.updatePrompt();

        UI.toast('Sıfırlandı');
    },

    // Event listeners
    bindEvents() {
        // Tab geçişleri
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                UI.switchTab(tab.dataset.tab);
            });
        });

        // Karakter butonları
        document.getElementById('btnSaveChar')?.addEventListener('click', () => this.saveCharacter());
        document.getElementById('btnNewChar')?.addEventListener('click', () => this.newCharacter());
        document.getElementById('btnDuplicateChar')?.addEventListener('click', () => this.duplicateCharacter());
        document.getElementById('btnDeleteChar')?.addEventListener('click', () => this.deleteCharacter());

        // Prompt butonları
        document.getElementById('btnCopyPrompt')?.addEventListener('click', () => this.copyPrompt());
        document.getElementById('btnSaveSnapshot')?.addEventListener('click', () => this.saveSnapshot());
        document.getElementById('promptFormat')?.addEventListener('change', () => this.updatePrompt());

        // Header butonları
        document.getElementById('btnSnapshots')?.addEventListener('click', () => this.showSnapshots());
        document.getElementById('btnExport')?.addEventListener('click', () => this.exportData());
        document.getElementById('btnReset')?.addEventListener('click', () => this.resetAll());

        document.getElementById('fileImport')?.addEventListener('change', (e) => {
            const file = e.target.files?.[0];
            if (file) this.importData(file);
            e.target.value = '';
        });

        // Karakter listesi tıklama
        document.getElementById('characterList')?.addEventListener('click', (e) => {
            const item = e.target.closest('.character-item');
            if (item) {
                this.selectCharacter(item.dataset.id);
            }
        });

        // Snapshot modal
        document.getElementById('closeSnapshotModal')?.addEventListener('click', () => {
            UI.toggleModal('snapshotModal', false);
        });

        document.getElementById('snapshotModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'snapshotModal') {
                UI.toggleModal('snapshotModal', false);
            }
        });

        // Snapshot aksiyonları
        document.getElementById('snapshotList')?.addEventListener('click', (e) => {
            const copyBtn = e.target.closest('.copy-snapshot');
            const deleteBtn = e.target.closest('.delete-snapshot');

            if (copyBtn) {
                this.copySnapshot(copyBtn.dataset.id);
            } else if (deleteBtn) {
                this.deleteSnapshot(deleteBtn.dataset.id);
            }
        });

        // Preset select değişiklikleri
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('preset-select')) {
                const field = e.target.dataset.field;
                const value = e.target.value;

                if (value && field) {
                    // İlgili textarea'yı bul ve değeri ekle
                    const textarea = document.querySelector(`textarea[data-field="${field}"]`);
                    if (textarea) {
                        textarea.value = value;
                        this.updatePrompt();
                    }
                }
            }
        });

        // Input ve Textarea değişiklikleri - canlı prompt güncelleme
        document.addEventListener('input', (e) => {
            const isInput = e.target.tagName === 'INPUT' && e.target.type === 'text';
            const isTextarea = e.target.tagName === 'TEXTAREA';

            if ((isInput || isTextarea) && e.target.dataset.field) {
                // Karakter verisini güncelle
                const char = this.getActiveChar();
                if (char) {
                    char[e.target.dataset.field] = e.target.value;
                }
                this.updatePrompt();
            }

            // İsim değişikliği
            if (e.target.id === 'charName') {
                const char = this.getActiveChar();
                if (char) {
                    char.name = e.target.value.trim() || 'İsimsiz';
                    UI.renderCharacterList(this.state.characters, this.state.activeCharId);
                    this.updateActiveCharInfo();
                }
            }
        });

        // Karakter arama
        document.getElementById('charSearch')?.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = query
                ? this.state.characters.filter(c =>
                    c.name.toLowerCase().includes(query) ||
                    (c.ethnicity || '').toLowerCase().includes(query)
                )
                : this.state.characters;

            UI.renderCharacterList(filtered, this.state.activeCharId);
        });
    }
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Global erişim
window.App = App;
