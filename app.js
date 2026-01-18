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
        ballPosition: 50, 
        possessionTeam: 1 
    }
};

const formations = {
    "4-4-2": [
        { role: "Kale", top: 90, left: 50 }, 
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

const els = {
    teamNameInput: document.getElementById('team-name-input'),
    formationBtns: document.querySelectorAll('.formation-btn'),
    pitchContainer: document.getElementById('player-slots-layer'),
    nextBtn: document.getElementById('next-stage-btn'),
    selectedCount: document.getElementById('selected-count'),
    teamRating: document.getElementById('team-rating'),
    gameStatus: document.getElementById('game-status'),
    randomMatchBtn: document.getElementById('random-match-btn'), // YENİ
    
    modal: document.getElementById('player-selection-modal'),
    modalList: document.getElementById('players-list-container'),
    modalTitle: document.getElementById('modal-position-title'),
    closeModalBtn: document.getElementById('close-modal-btn'),

    selectionScreen: document.getElementById('selection-screen'),
    matchScreen: document.getElementById('match-screen'),

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
    
    els.pitchContainer.innerHTML = ''; 

    formationData.forEach((pos, index) => {
        const player = teamData.players[index];
        const slot = document.createElement('div');
        
        if (player) {
            slot.className = 'player-slot filled';
            slot.innerHTML = `
                <span class="player-rating">${player.rating}</span>
                <span class="player-name">${player.name}</span>
            `;
        } else {
            slot.className = 'player-slot empty';
            slot.innerHTML = `<span class="position-label">${pos.role}</span>`;
            slot.onclick = () => openPlayerModal(pos.role, index);
        }

        slot.style.top = pos.top + '%';
        slot.style.left = pos.left + '%';
        els.pitchContainer.appendChild(slot);
    });

    updateUIStats();
}

function updateUIStats() {
    const teamData = getCurrentTeamData();
    const filledCount = teamData.players.filter(p => p !== null).length;
    
    const totalRating = teamData.players.reduce((acc, p) => acc + (p ? p.rating : 0), 0);
    const avgRating = filledCount > 0 ? Math.round(totalRating / filledCount) : 0;
    teamData.rating = avgRating;

    els.selectedCount.textContent = filledCount;
    els.teamRating.textContent = avgRating;

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
let currentSlotIndex = -1;

function openPlayerModal(role, index) {
    currentSlotIndex = index;
    els.modalTitle.textContent = role;
    els.modalList.innerHTML = '';

    const usedIds = [...gameState.team1.players, ...gameState.team2.players]
                    .filter(p => p !== null)
                    .map(p => p.id);

    let filteredPlayers = players.filter(p => p.position === role && !usedIds.includes(p.id));
    filteredPlayers.sort((a, b) => b.rating - a.rating);

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
// 4. RASTGELE MAÇ (YENİ ÖZELLİK)
// ==========================================
function setupRandomMatch() {
    // Rastgele isimler
    gameState.team1.name = "Rastgele United";
    gameState.team2.name = "Rastgele City";
    
    // Rastgele Formasyon
    const keys = Object.keys(formations);
    gameState.team1.formation = keys[Math.floor(Math.random() * keys.length)];
    gameState.team2.formation = keys[Math.floor(Math.random() * keys.length)];

    // Takımları Otomatik Doldur
    autoFillTeam(gameState.team1, []);
    // İkinci takımı doldururken, birinci takımdakileri (usedIds) hariç tut
    const usedIds = gameState.team1.players.map(p => p.id);
    autoFillTeam(gameState.team2, usedIds);

    // Maç ekranına git
    prepareMatchScreen();
    // Otomatik başlat (Opsiyonel, kullanıcı basınca başlasın istedik)
}

function autoFillTeam(teamObj, existingUsedIds) {
    const formationRoles = formations[teamObj.formation];
    
    // Her slot için uygun oyuncu bul
    formationRoles.forEach((slot, index) => {
        // Zaten seçilmişleri kontrol et (Takım içi + Karşı takım)
        const currentTeamIds = teamObj.players.filter(p => p).map(p => p.id);
        const allUsedIds = [...existingUsedIds, ...currentTeamIds];

        // O mevkiye uygun, kullanılmamış oyuncuları bul
        const pool = players.filter(p => p.position === slot.role && !allUsedIds.includes(p.id));
        
        if (pool.length > 0) {
            // Rastgele birini seç (En iyileri değil, rastgele olsun ki her maç farklı olsun)
            // Ama biraz kalite olsun diye ilk 20'den seçelim
            const subPool = pool.slice(0, 20); // Güce göre sıralı gelirse üstten al
            // Veri sırasızsa rastgele al. Bizim veritabanı karışıktı, o yüzden tam random:
            const randomPlayer = pool[Math.floor(Math.random() * pool.length)];
            
            teamObj.players[index] = randomPlayer;
        } else {
            // Yedek plan (Oyuncu kalmazsa)
            console.warn("Oyuncu kalmadı:", slot.role);
        }
    });

    // Güç hesapla
    const totalRating = teamObj.players.reduce((acc, p) => acc + (p ? p.rating : 0), 0);
    teamObj.rating = Math.round(totalRating / 11);
}


// ==========================================
// 5. SAYFA GEÇİŞLERİ & MAÇ
// ==========================================
function setupEventListeners() {
    els.formationBtns.forEach(btn => {
        btn.onclick = () => {
            els.formationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.currentTeam === 1 ? gameState.team1.formation = btn.dataset.formation : gameState.team2.formation = btn.dataset.formation;
            renderPitch();
        };
    });

    els.teamNameInput.addEventListener('input', (e) => {
        getCurrentTeamData().name = e.target.value || (gameState.currentTeam === 1 ? "Takım 1" : "Takım 2");
    });

    els.nextBtn.onclick = () => {
        if (gameState.currentTeam === 1) {
            gameState.currentTeam = 2;
            els.teamNameInput.value = "";
            els.teamNameInput.placeholder = "2. Takım Adı";
            els.gameStatus.textContent = "2. Takım Kurulumu (Deplasman)";
            els.nextBtn.textContent = "MAÇ EKRANINA GEÇ >";
            els.formationBtns.forEach(b => b.classList.remove('active'));
            els.formationBtns[0].classList.add('active');
            renderPitch();
        } else {
            prepareMatchScreen();
        }
    };

    els.randomMatchBtn.onclick = setupRandomMatch; // Butonu bağla
    els.closeModalBtn.onclick = closeModal;
    els.startMatchBtn.onclick = startMatch;
    els.resetBtn.onclick = () => location.reload();
}

function prepareMatchScreen() {
    els.selectionScreen.classList.add('hidden');
    els.matchScreen.classList.remove('hidden');
    document.querySelector('header').style.display = 'none';

    els.homeName.textContent = gameState.team1.name;
    els.awayName.textContent = gameState.team2.name;
    els.startMatchBtn.classList.remove('hidden');
    
    logCommentary("🎤 Spiker: Ve büyük maç için her şey hazır!", "neutral");
    logCommentary(`🏟️ ${gameState.team1.name} (Ort: ${gameState.team1.rating}) vs ${gameState.team2.name} (Ort: ${gameState.team2.rating})`, "neutral");
}

function startMatch() {
    els.startMatchBtn.classList.add('hidden');
    gameState.match.time = 0;
    logCommentary("⚽ HAKEM DÜDÜĞÜNÜ ÇALDI! MAÇ BAŞLADI!", "important");
    gameState.match.interval = setInterval(gameLoop, 1000); 
}

function gameLoop() {
    gameState.match.time += 1;
    els.timer.textContent = gameState.match.time + "'";

    if (gameState.match.time > 90) {
        endMatch();
        return;
    }

    const dice = Math.random();
    const powerDiff = (gameState.team1.rating - gameState.team2.rating) / 200;
    
    if (Math.random() > 0.3) { 
        gameState.match.ballPosition += (gameState.match.possessionTeam === 1 ? 10 : -10);
    } else {
        gameState.match.possessionTeam = gameState.match.possessionTeam === 1 ? 2 : 1;
        // Top değişince yorum yapmasın, çok spam oluyor.
    }

    gameState.match.ballPosition = Math.max(0, Math.min(100, gameState.match.ballPosition));
    updateBallVisual();

    if (gameState.match.ballPosition > 90 && gameState.match.possessionTeam === 1) {
        attemptGoal(gameState.team1, gameState.team2);
    } else if (gameState.match.ballPosition < 10 && gameState.match.possessionTeam === 2) {
        attemptGoal(gameState.team2, gameState.team1);
    } else {
        if (dice < 0.15) {
            const currentAttacker = gameState.match.possessionTeam === 1 ? gameState.team1 : gameState.team2;
            const randomPlayer = getRandomPlayer(currentAttacker);
            logCommentary(`👟 ${randomPlayer.name} topla ilerliyor...`, "neutral");
        }
    }
}

function attemptGoal(attackerTeam, defenderTeam) {
    const attackRoll = Math.random() * attackerTeam.rating;
    const defenseRoll = Math.random() * defenderTeam.rating;

    if (attackRoll > defenseRoll * 0.9) { 
        scoreGoal(attackerTeam);
    } else {
        const randomPlayer = getRandomPlayer(attackerTeam);
        logCommentary(`❌ ${randomPlayer.name} şutunu çekti ama top dışarıda!`, "danger");
        gameState.match.ballPosition = gameState.match.possessionTeam === 1 ? 100 : 0; 
        gameState.match.possessionTeam = gameState.match.possessionTeam === 1 ? 2 : 1; 
    }
}

function scoreGoal(team) {
    const scorer = getRandomPlayer(team, "Forvet"); 
    
    if (team === gameState.team1) {
        gameState.match.score1++;
        els.homeScore.textContent = gameState.match.score1;
    } else {
        gameState.match.score2++;
        els.awayScore.textContent = gameState.match.score2;
    }

    logCommentary(`⚽ GOOOOOL!!! ${scorer.name} ağları havalandırıyor! (${team.name})`, "goal");
    gameState.match.ballPosition = 50;
    gameState.match.possessionTeam = team === gameState.team1 ? 2 : 1;
}

function endMatch() {
    clearInterval(gameState.match.interval);
    logCommentary("🏁 VE MAÇ BİTTİ!", "important");
    logCommentary(`Skor: ${gameState.team1.name} ${gameState.match.score1} - ${gameState.match.score2} ${gameState.team2.name}`, "important");
    els.resetBtn.classList.remove('hidden');
}

function updateBallVisual() {
    els.ballVisual.style.left = gameState.match.ballPosition + '%';
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
        const posPlayers = validPlayers.filter(p => p.position === positionFilter);
        if (posPlayers.length > 0) validPlayers = posPlayers;
    }
    return validPlayers[Math.floor(Math.random() * validPlayers.length)] || {name: "Bilinmeyen"};
}

function logCommentary(text, type) {
    const p = document.createElement('div');
    p.textContent = `${gameState.match.time}' ${text}`;
    
    if (type === 'goal') p.className = "text-green-400 font-bold text-lg border-l-4 border-green-500 pl-2 my-1";
    else if (type === 'danger') p.className = "text-red-400";
    else if (type === 'important') p.className = "text-accentGold font-bold";
    else p.className = "text-gray-400"; 

    els.commentary.appendChild(p);
    
    // YENİ: Otomatik kaydırma ama kullanıcı yukarı kaydırdıysa zorlamıyoruz
    // Basit çözüm: Her zaman en alta at, kullanıcı tutarsa durur.
    els.commentary.scrollTop = els.commentary.scrollHeight;
}

init();
