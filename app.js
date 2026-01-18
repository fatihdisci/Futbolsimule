/* app.js */

// ==========================================
// 1. GLOBAL DEĞİŞKENLER VE AYARLAR
// ==========================================
const gameState = {
    currentTeam: 1, // 1 veya 2
    team1: { name: "Ev Sahibi", formation: "4-4-2", players: new Array(11).fill(null), rating: 0 },
    team2: { name: "Deplasman", formation: "4-4-2", players: new Array(11).fill(null), rating: 0 },
    match: {
        time: 0,
        score1: 0,
        score2: 0,
        interval: null,
        ballPosition: 50, // 0 (Takım 1 Kale) - 100 (Takım 2 Kale)
        possessionTeam: 1 // Top kimde?
    }
};

// Formasyon Koordinatları (Top: %Y, Left: %X)
// Sahayı dikey (mobile) düşündüğümüz için: Top (Yukarıdan aşağı), Left (Soldan sağa)
const formations = {
    "4-4-2": [
        { role: "Kale", top: 90, left: 50 }, // GK
        { role: "Defans", top: 75, left: 20 }, { role: "Defans", top: 75, left: 40 }, { role: "Defans", top: 75, left: 60 }, { role: "Defans", top: 75, left: 80 },
        { role: "Orta Saha", top: 50, left: 20 }, { role: "Orta Saha", top: 50, left: 40 }, { role: "Orta Saha", top: 50, left: 60 }, { role: "Orta Saha", top: 50, left: 80 },
        { role: "Forvet", top: 25, left: 35 }, { role: "Forvet", top: 25, left: 65 }
    ],
    "4-3-3": [
        { role: "Kale", top: 90, left: 50 },
        { role: "Defans", top: 75, left: 20 }, { role: "Defans", top: 75, left: 40 }, { role: "Defans", top: 75, left: 60 }, { role: "Defans", top: 75, left: 80 },
        { role: "Orta Saha", top: 55, left: 30 }, { role: "Orta Saha", top: 50, left: 50 }, { role: "Orta Saha", top: 55, left: 70 },
        { role: "Forvet", top: 25, left: 20 }, { role: "Forvet", top: 20, left: 50 }, { role: "Forvet", top: 25, left: 80 }
    ],
    "3-5-2": [
        { role: "Kale", top: 90, left: 50 },
        { role: "Defans", top: 75, left: 30 }, { role: "Defans", top: 75, left: 50 }, { role: "Defans", top: 75, left: 70 },
        { role: "Orta Saha", top: 50, left: 15 }, { role: "Orta Saha", top: 50, left: 35 }, { role: "Orta Saha", top: 55, left: 50 }, { role: "Orta Saha", top: 50, left: 65 }, { role: "Orta Saha", top: 50, left: 85 },
        { role: "Forvet", top: 25, left: 35 }, { role: "Forvet", top: 25, left: 65 }
    ]
};

// DOM Elementleri
const els = {
    teamNameInput: document.getElementById('team-name-input'),
    formationBtns: document.querySelectorAll('.formation-btn'),
    pitchContainer: document.getElementById('player-slots-layer'),
    nextBtn: document.getElementById('next-stage-btn'),
    selectedCount: document.getElementById('selected-count'),
    teamRating: document.getElementById('team-rating'),
    gameStatus: document.getElementById('game-status'),
    
    // Modal
    modal: document.getElementById('player-selection-modal'),
    modalList: document.getElementById('players-list-container'),
    modalTitle: document.getElementById('modal-position-title'),
    closeModalBtn: document.getElementById('close-modal-btn'),

    // Ekranlar
    selectionScreen: document.getElementById('selection-screen'),
    matchScreen: document.getElementById('match-screen'),

    // Maç
    startMatchBtn: document.getElementById('start-match-btn'),
    homeName: document.getElementById('home-team-name'),
    awayName: document.getElementById('away-team-name'),
    homeScore: document.getElementById('home-score'),
    awayScore: document.getElementById('away-score'),
    timer: document.getElementById('match-time'),
    commentary: document.getElementById('commentary-log'),
    ballVisual: document.getElementById('ball-visual'),
    resetBtn: document.getElementById('reset-btn')
};

// ==========================================
// 2. BAŞLANGIÇ VE SAHA YÖNETİMİ
// ==========================================
function init() {
    renderPitch();
    setupEventListeners();
}

function getCurrentTeamData() {
    return gameState.currentTeam === 1 ? gameState.team1 : gameState.team2;
}

function renderPitch() {
    const teamData = getCurrentTeamData();
    const formationData = formations[teamData.formation];
    
    els.pitchContainer.innerHTML = ''; // Temizle

    formationData.forEach((pos, index) => {
        const player = teamData.players[index];
        const slot = document.createElement('div');
        
        // Slot Stili (Dolu veya Boş)
        if (player) {
            slot.className = 'player-slot filled';
            slot.innerHTML = `
                <span class="player-rating">${player.rating}</span>
                <span class="player-name">${player.name}</span>
            `;
            // Dolu slota tıklayınca silmek ister misin? (Şimdilik engelli, istersen ekleriz)
        } else {
            slot.className = 'player-slot empty';
            slot.innerHTML = `<span class="position-label">${pos.role}</span>`;
            // Boş slota tıklama olayı
            slot.onclick = () => openPlayerModal(pos.role, index);
        }

        // Konumlandırma
        slot.style.top = pos.top + '%';
        slot.style.left = pos.left + '%';
        
        els.pitchContainer.appendChild(slot);
    });

    updateUIStats();
}

function updateUIStats() {
    const teamData = getCurrentTeamData();
    const filledCount = teamData.players.filter(p => p !== null).length;
    
    // Takım Gücü Hesapla (Ortalama)
    const totalRating = teamData.players.reduce((acc, p) => acc + (p ? p.rating : 0), 0);
    const avgRating = filledCount > 0 ? Math.round(totalRating / filledCount) : 0;
    teamData.rating = avgRating;

    els.selectedCount.textContent = filledCount;
    els.teamRating.textContent = avgRating;

    // 11 kişi tamamlandıysa butonu aç
    if (filledCount === 11) {
        els.nextBtn.disabled = false;
        els.nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        els.nextBtn.textContent = gameState.currentTeam === 1 ? "TAKIM 2'YE GEÇ >" : "MAÇ EKRANINA GEÇ >";
    } else {
        els.nextBtn.disabled = true;
        els.nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// ==========================================
// 3. OYUNCU SEÇİMİ (MODAL)
// ==========================================
let currentSlotIndex = -1; // Hangi slotu dolduruyoruz?

function openPlayerModal(role, index) {
    currentSlotIndex = index;
    els.modalTitle.textContent = role;
    els.modalList.innerHTML = ''; // Listeyi temizle

    // Veritabanından uygun oyuncuları filtrele
    // Kural: 1. Mevkisi uymalı 2. Daha önce seçilmemiş olmalı (iki takımda da)
    const usedIds = [...gameState.team1.players, ...gameState.team2.players]
                    .filter(p => p !== null)
                    .map(p => p.id);

    // Mevki eşleşmesi (Veritabanındaki "Kale", "Defans" vs. ile eşleşmeli)
    // Kaleci hariç, yan mevkiler (Stoper-Bek ayrımı yok, hepsi Defans)
    let filteredPlayers = players.filter(p => p.position === role && !usedIds.includes(p.id));

    // Güce göre sırala (En yüksek en üstte)
    filteredPlayers.sort((a, b) => b.rating - a.rating);

    // Listeyi oluştur
    filteredPlayers.forEach(p => {
        const item = document.createElement('div');
        item.className = "flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer border border-gray-700 transition-colors";
        item.innerHTML = `
            <div>
                <div class="font-bold text-white">${p.name}</div>
                <div class="text-xs text-gray-400">${p.team}</div>
            </div>
            <div class="text-xl font-game font-bold text-accentGold">${p.rating}</div>
        `;
        item.onclick = () => selectPlayer(p);
        els.modalList.appendChild(item);
    });

    // Modalı Aç
    els.modal.classList.remove('hidden');
    setTimeout(() => els.modal.classList.add('modal-active'), 10);
}

function selectPlayer(player) {
    const teamData = getCurrentTeamData();
    teamData.players[currentSlotIndex] = player;
    
    closeModal();
    renderPitch();
}

function closeModal() {
    els.modal.classList.remove('modal-active');
    setTimeout(() => els.modal.classList.add('hidden'), 300);
}

// ==========================================
// 4. SAYFA GEÇİŞLERİ
// ==========================================
function setupEventListeners() {
    // Formasyon Butonları
    els.formationBtns.forEach(btn => {
        btn.onclick = () => {
            els.formationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const newFormation = btn.dataset.formation;
            getCurrentTeamData().formation = newFormation;
            
            // Formasyon değişince oyuncular sıfırlanmasın, sadece yerleri değişsin (Array indexi aynı kalır)
            // Ancak slot sayısı değişirse (Forvet 2'den 3'e çıkarsa) mantık karışabilir.
            // Basit tutmak için: Oyuncular korunur, yeni düzende render edilir.
            renderPitch();
        };
    });

    // İsim Girişi
    els.teamNameInput.addEventListener('input', (e) => {
        getCurrentTeamData().name = e.target.value || (gameState.currentTeam === 1 ? "Takım 1" : "Takım 2");
    });

    // İleri Butonu
    els.nextBtn.onclick = () => {
        if (gameState.currentTeam === 1) {
            // Takım 2'ye geçiş
            gameState.currentTeam = 2;
            
            // UI Sıfırla
            els.teamNameInput.value = "";
            els.teamNameInput.placeholder = "2. Takım Adı";
            els.gameStatus.textContent = "2. Takım Kurulumu (Deplasman)";
            els.nextBtn.textContent = "MAÇ EKRANINA GEÇ >";
            
            // Formasyon butonlarını resetle
            els.formationBtns.forEach(b => b.classList.remove('active'));
            els.formationBtns[0].classList.add('active'); // 4-4-2 default

            renderPitch(); // Takım 2'nin boş sahasını çiz
        } else {
            // Maç Ekranına Geçiş
            prepareMatchScreen();
        }
    };

    // Modal Kapat
    els.closeModalBtn.onclick = closeModal;

    // Maç Butonları
    els.startMatchBtn.onclick = startMatch;
    els.resetBtn.onclick = () => location.reload();
}

function prepareMatchScreen() {
    els.selectionScreen.classList.add('hidden');
    els.matchScreen.classList.remove('hidden');
    document.querySelector('header').style.display = 'none'; // Üst başlığı gizle, odak maçta olsun

    // İsimleri ve Skorları Yerleştir
    els.homeName.textContent = gameState.team1.name;
    els.awayName.textContent = gameState.team2.name;
    
    // Butonu göster
    els.startMatchBtn.classList.remove('hidden');
    
    logCommentary("🎤 Spiker: Ve büyük maç için her şey hazır!", "neutral");
    logCommentary(`🏟️ ${gameState.team1.name} ve ${gameState.team2.name} sahaya çıkıyor.`, "neutral");
}

// ==========================================
// 5. MAÇ SİMÜLASYON MOTORU
// ==========================================
function startMatch() {
    els.startMatchBtn.classList.add('hidden');
    gameState.match.time = 0;
    
    logCommentary("⚽ HAKEM DÜDÜĞÜNÜ ÇALDI! MAÇ BAŞLADI!", "important");

    gameState.match.interval = setInterval(gameLoop, 1000); // Her 1 saniye = 1 oyun dakikası (yaklaşık)
}

function gameLoop() {
    gameState.match.time += 1; // Dakika ilerler
    els.timer.textContent = gameState.match.time + "'";

    // 90 Dakika bitti mi?
    if (gameState.match.time > 90) {
        endMatch();
        return;
    }

    // --- SİMÜLASYON MANTIĞI ---
    
    // 1. Rastgele Olay Belirle (Pas, Şut, Top Kaybı)
    const dice = Math.random();
    
    // Top kimde? (Possession)
    // Takım gücüne göre topa sahip olma ihtimalini artır
    const powerDiff = (gameState.team1.rating - gameState.team2.rating) / 200; // Örn: +0.05
    const possessionChanceT1 = 0.5 + powerDiff;
    
    // Topun sahadaki konumu (Visualizer için)
    // Eğer T1 atak yapıyorsa top 50'den 100'e doğru gider.
    let currentAttacker = gameState.match.possessionTeam === 1 ? gameState.team1 : gameState.team2;
    let currentDefender = gameState.match.possessionTeam === 1 ? gameState.team2 : gameState.team1;

    // Her döngüde topun konumu ve sahibi değişebilir
    if (Math.random() > 0.3) { // %70 ihtimalle top el değiştirmez, atak gelişir veya durur
        // Atak yönünde ilerleme
        gameState.match.ballPosition += (gameState.match.possessionTeam === 1 ? 10 : -10);
    } else {
        // Top kaybı!
        gameState.match.possessionTeam = gameState.match.possessionTeam === 1 ? 2 : 1;
        logCommentary(`🔄 ${currentDefender.name} topu kazandı ve atağa kalkıyor.`, "neutral");
        // Yön değişti
    }

    // Top sınırları (0-100)
    gameState.match.ballPosition = Math.max(0, Math.min(100, gameState.match.ballPosition));
    updateBallVisual();

    // --- GOL POZİSYONU ---
    // Eğer top bir kaleye çok yaklaştıysa (>90 veya <10)
    if (gameState.match.ballPosition > 90 && gameState.match.possessionTeam === 1) {
        attemptGoal(gameState.team1, gameState.team2);
    } else if (gameState.match.ballPosition < 10 && gameState.match.possessionTeam === 2) {
        attemptGoal(gameState.team2, gameState.team1);
    } else {
        // Orta saha mücadelesi
        if (dice < 0.1) {
            const randomPlayer = getRandomPlayer(currentAttacker);
            logCommentary(`👟 ${randomPlayer.name} şık bir çalımla ilerliyor.`, "neutral");
        }
    }
}

function attemptGoal(attackerTeam, defenderTeam) {
    // Gol şansı: Hücum Gücü vs Defans Şansı
    // Basit bir RNG + Güç farkı
    const attackRoll = Math.random() * attackerTeam.rating;
    const defenseRoll = Math.random() * defenderTeam.rating;

    // Gol oldu mu?
    if (attackRoll > defenseRoll * 0.9) { // Defans biraz avantajlıdır
        scoreGoal(attackerTeam);
    } else {
        // Kaçtı
        const randomPlayer = getRandomPlayer(attackerTeam);
        logCommentary(`❌ ${randomPlayer.name} vurdu ama top dışarı gitti!`, "danger");
        // Top kaleciden başlar
        gameState.match.ballPosition = gameState.match.possessionTeam === 1 ? 100 : 0; 
        gameState.match.possessionTeam = gameState.match.possessionTeam === 1 ? 2 : 1; // Top rakibe geçer
    }
}

function scoreGoal(team) {
    const scorer = getRandomPlayer(team, "Forvet"); // Genelde forvet atar
    
    if (team === gameState.team1) {
        gameState.match.score1++;
        els.homeScore.textContent = gameState.match.score1;
    } else {
        gameState.match.score2++;
        els.awayScore.textContent = gameState.match.score2;
    }

    logCommentary(`⚽ GOOOOOL!!! ${scorer.name} harika bir gol atıyor! (${team.name})`, "goal");
    
    // Gol sonrası santra (Top ortaya gelir)
    gameState.match.ballPosition = 50;
    gameState.match.possessionTeam = team === gameState.team1 ? 2 : 1;
}

function endMatch() {
    clearInterval(gameState.match.interval);
    logCommentary("🏁 VE MAÇ BİTTİ!", "important");
    logCommentary(`Skor: ${gameState.team1.name} ${gameState.match.score1} - ${gameState.match.score2} ${gameState.team2.name}`, "important");
    els.resetBtn.classList.remove('hidden');
}

// ==========================================
// YARDIMCI FONKSİYONLAR
// ==========================================
function updateBallVisual() {
    // Topun soldan yüzdesi (0-100)
    // Görselde saha yatay değil, biz CSS ile topu hareket ettiriyoruz.
    // CSS'de left: %50 sabit, top değişiyor gibi değil; yatay bir bar yaptık.
    // Mini saha yataydı.
    els.ballVisual.style.left = gameState.match.ballPosition + '%';
    
    // Topun rengini topa sahip olana göre hafif değiştirebiliriz
    if(gameState.match.possessionTeam === 1) {
        els.ballVisual.classList.add('bg-yellow-400');
        els.ballVisual.classList.remove('bg-blue-400');
    } else {
        els.ballVisual.classList.add('bg-blue-400');
        els.ballVisual.classList.remove('bg-yellow-400');
    }
}

function getRandomPlayer(team, positionFilter = null) {
    let validPlayers = team.players.filter(p => p !== null);
    if (positionFilter) {
        // O mevki varsa oradan seç, yoksa rastgele seç
        const posPlayers = validPlayers.filter(p => p.position === positionFilter);
        if (posPlayers.length > 0) validPlayers = posPlayers;
    }
    return validPlayers[Math.floor(Math.random() * validPlayers.length)] || {name: "Bilinmeyen Oyuncu"};
}

function logCommentary(text, type) {
    const p = document.createElement('div');
    p.textContent = `${gameState.match.time}' ${text}`;
    
    // Renklendirme
    if (type === 'goal') p.className = "text-green-400 font-bold text-lg border-l-4 border-green-500 pl-2 my-1";
    else if (type === 'danger') p.className = "text-red-400";
    else if (type === 'important') p.className = "text-accentGold font-bold";
    else p.className = "text-gray-400"; // neutral

    els.commentary.appendChild(p);
    els.commentary.scrollTop = els.commentary.scrollHeight; // Otomatik aşağı kaydır
}

// Uygulamayı Başlat
init();
