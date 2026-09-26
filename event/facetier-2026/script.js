// 첫인상 스타일 테스트 테스트 — 독립 페이지
const faceTierCharacters = {
    top: [
        { threshold: 0.1, title: "천상의 미", desc: "인간의 영역을 넘어선 완벽한 피조물." },
        { threshold: 1, title: "시대의 뮤즈", desc: "모든 시선이 당신의 궤적을 쫓습니다." },
        { threshold: 5, title: "압도적 아우라", desc: "설명할 필요 없는 존재감의 증명." },
        { threshold: 10, title: "정교한 조각", desc: "선과 면이 빚어낸 가장 아름다운 조화." },
        { threshold: 15, title: "도회적 세련미", desc: "차가우면서도 깊은 눈빛의 소유자." },
        { threshold: 20, title: "청량한 정석", desc: "누구나 꿈꾸는 가장 이상적인 이미지." },
        { threshold: 25, title: "매혹적 원석", desc: "다듬어지지 않아도 빛나는 고유의 결." },
        { threshold: 30, title: "부드러운 카리스마", desc: "강인함 속에 숨겨진 우아한 매력." },
        { threshold: 40, title: "이지적인 우아함", desc: "지적 가치가 외모로 투영된 완성형." },
        { threshold: 100, title: "호감의 정점", desc: "마음을 여는 가장 강력한 열쇠, 당신의 미소." },
    ],
    bottom: [
        { threshold: 0.1, title: "심연의 미스터리", desc: "쉽게 파악할 수 없는 신비로운 마스크." },
        { threshold: 1, title: "독특한 영혼", desc: "평범함을 거부하는 당신만의 세계관." },
        { threshold: 5, title: "야생의 생명력", desc: "가공되지 않은 날것 그대로의 강렬함." },
        { threshold: 10, title: "강렬한 존재감", desc: "외모의 기준을 새로 쓰는 파격적 개성." },
        { threshold: 15, title: "소박한 아름다움", desc: "작은 들꽃처럼 오래 보아야 예쁜 상." },
        { threshold: 20, title: "투박한 미학", desc: "거칠지만 따뜻함이 느껴지는 인간미." },
        { threshold: 25, title: "꾸밈없는 진솔함", desc: "가식 없는 얼굴에 담긴 정직한 에너지." },
        { threshold: 30, title: "개성적 마스크", desc: "정해진 틀을 거부하는 독보적 캐릭터." },
        { threshold: 40, title: "담백한 일상", desc: "화려함보다 깊이 있는 수수한 아름다움." },
        { threshold: 100, title: "친근한 훈풍", desc: "이웃집 같은 편안함 속에 깃든 매력." },
    ]
};

// State
let currentImage = null;
let currentFile = null;
const currentTest = 'facetier';

// Navigation Function
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    if (id === 'facetier-home' || id === 'facetier-result' || id === 'upload' || id === 'loading') {
        document.body.classList.add('facetier-theme-active');
    } else {
        document.body.classList.remove('facetier-theme-active');
    }
    let found = false;
    sections.forEach(s => {
        s.classList.remove('active');
        if (s.id === id) {
            s.classList.add('active');
            window.scrollTo(0, 0);
            found = true;
        }
    });
    if (!found) console.error('Section not found:', id);
}

function resetUploadUI() {
    currentImage = null;
    currentFile = null;
    const ageInput = document.getElementById('user-age-input');
    if (ageInput) ageInput.value = "";
    const imagePreview = document.getElementById('image-preview');
    const scanImg = document.getElementById('scan-img');
    const previewBox = document.getElementById('preview-box');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    if (imagePreview) imagePreview.src = '#';
    if (scanImg) scanImg.src = '#';
    if (previewBox) previewBox.style.display = 'none';
    if (dropZone) dropZone.style.display = 'block';
    if (fileInput) fileInput.value = "";
    const userImg = document.getElementById('facetier-user-img');
    if (userImg) userImg.src = '';
}

function resetTest() {
    location.href = '../../';
}

function initApp() {
    // Start Button
    const startBtn = document.getElementById('facetier-start-btn');
    if (startBtn) startBtn.addEventListener('click', () => {
        resetUploadUI();
        showSection('upload');
    });

    // Analyze Button
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) analyzeBtn.addEventListener('click', () => {
        showSection('loading');
        startAnalysis();
    });



    // Retry
    const retryBtn = document.getElementById('facetier-retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', () => {
        resetUploadUI();
        showSection('upload');
    });

    // Share Buttons
    const shareActions = [
        ['facetier-copy-link-btn', copyToClipboard],
        ['facetier-share-native-btn', shareNative]
    ];
    shareActions.forEach(([id, action]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', action);
    });

    // File Handling
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    if (fileInput && dropZone) {
        dropZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFile);
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderWidth = '3px'; });
        dropZone.addEventListener('dragleave', () => dropZone.style.borderWidth = '2px');
        dropZone.addEventListener('drop', (e) => { e.preventDefault(); handleFile(e); });
    }

    showSection('facetier-home');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function handleFile(e) {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        currentFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
            currentImage = event.target.result;
            const imagePreview = document.getElementById('image-preview');
            const scanImg = document.getElementById('scan-img');
            const previewBox = document.getElementById('preview-box');
            const dropZone = document.getElementById('drop-zone');
            if (imagePreview) imagePreview.src = currentImage;
            if (scanImg) scanImg.src = currentImage;
            if (previewBox) previewBox.style.display = 'block';
            if (dropZone) dropZone.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.value = "";
}

function startAnalysis() {
    const scanContainer = document.querySelector('.scan-box');
    const statusText = document.getElementById('status-text');
    if (scanContainer) {
        const existingOverlay = scanContainer.querySelector('.landmark-overlay');
        if (existingOverlay) existingOverlay.remove();
        scanContainer.classList.remove('landmark-active');
    }

    const statuses = [
        "첫인상 스타일 분석 중...",
        "분위기 요소 측정 중...",
        "매력 포인트 스캔 중...",
        "스타일 데이터베이스 대조 중...",
        "분석이 완료되었습니다!"
    ];
    let i = 0;
    const interval = setInterval(() => {
        if (statusText) statusText.innerText = statuses[i];
        i++;
        if (i === statuses.length) {
            clearInterval(interval);
            setTimeout(showResult, 1000);
        }
    }, 1200);
}

function getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

function showResult() {
    if (!currentImage) {
        console.error('No image for analysis');
        return;
    }
    const hashInput = currentFile ? currentFile.name + '-' + currentFile.size + '-' + currentFile.lastModified : currentImage;
    let hash = getHash(hashInput + currentTest);
{
            const resTitle = document.getElementById('facetier-title');
            const resDesc = document.getElementById('facetier-desc');
            const resPercent = document.getElementById('facetier-percent');
            const resUserImg = document.getElementById('facetier-user-img');
            if (resUserImg) resUserImg.src = currentImage;


            // Deterministic calculation logic based on hash (0.1 ~ 99.9)
            let finalScore = (hash % 998 + 1) / 10; // 0.1 to 99.9

            const type = finalScore >= 50 ? 'top' : 'bottom';
            let percentile = type === 'top' ? (100 - finalScore) : finalScore;
            if (percentile < 0.1) percentile = 0.1;
            percentile = parseFloat(percentile.toFixed(1));

            const personaList = faceTierCharacters[type];
            let matchedPersona = personaList[personaList.length - 1];
            for (let i = 0; i < personaList.length; i++) {
                if (percentile <= personaList[i].threshold) {
                    matchedPersona = personaList[i];
                    break;
                }
            }

            if (resTitle) resTitle.innerText = matchedPersona.title;
            if (resDesc) resDesc.innerText = matchedPersona.desc;

            const prefix = '스타일 매칭도';
            if (resPercent) resPercent.innerText = `${prefix} 50.0%`;

            showSection('facetier-result');

            // Counter animation
            let frame = 0;
            const frames = 60;
            const duration = 2000;
            const startVal = 50.0;
            const animate = setInterval(() => {
                frame++;
                const progress = frame / frames;
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = startVal - (startVal - percentile) * easeProgress;
                if (resPercent) resPercent.innerText = `${prefix} ${currentVal.toFixed(1)}%`;

                if (frame >= frames) {
                    clearInterval(animate);
                    if (resPercent) resPercent.innerText = `${prefix} ${percentile.toFixed(1)}%`;
                }
            }, duration / frames);}
}





function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("링크가 복사되었습니다!");
    }).catch(() => {
        const input = document.createElement('input');
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast("링크가 복사되었습니다!");
    });
}

function shareNative() {
    if (navigator.share) {
        navigator.share({
            title: '테스트랩 - 첫인상 스타일 테스트',
            text: '내 첫인상 스타일 매칭도는? 지금 확인해보세요!',
            url: window.location.href,
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert("이 브라우저는 공유 기능을 지원하지 않습니다. 링크 복사를 이용해주세요!");
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 2500);
}
