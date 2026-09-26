// 첫인상 분위기 테스트 테스트 — 독립 페이지
const moralCharacters = [
    {
        type: "냉혹한 전략가",
        theme: "villain",
        stat: 15,
        trait: "차갑고 이성적인 눈매에서 뿜어지는 천재적인 지략가형 관상입니다.",
        ability: "냉철한 상황 판단력과 목적을 위해 감정을 배제하는 추진력.",
        tip: "가끔은 주변 사람들의 감정을 살피는 여유가 필요합니다.",
        img: "../../images/char_strategist.webp"
    },
    {
        type: "열혈 트러블메이커",
        theme: "villain",
        stat: 30,
        trait: "넘치는 에너지를 주체하지 못하는 다혈질적인 사고뭉치형 관상입니다.",
        ability: "압도적인 행동력과 위기 상황에서도 굴하지 않는 맷집.",
        tip: "행동하기 전 딱 3초만 더 생각하는 습관을 들여보세요.",
        img: "../../images/char_sports.webp"
    },
    {
        type: "그림자 배후",
        theme: "villain",
        stat: 20,
        trait: "조용히 뒤에서 모든 상황을 설계하는 전략가형 분위기입니다.",
        ability: "남들이 보지 못하는 정보의 흐름을 읽는 통찰력.",
        tip: "본인의 능력을 선한 영향력을 위해 사용해보는 건 어떨까요?",
        img: "../../images/char_villain.webp"
    },
    {
        type: "폭발적 반항아",
        theme: "villain",
        stat: 40,
        trait: "규칙과 억압을 거부하며 본인만의 길을 걷는 자유분방형 관상입니다.",
        ability: "기성 권위에 도전하는 혁신적 사고와 강인한 독립심.",
        tip: "때로는 타협이 더 큰 결과를 만들어낼 수 있음을 기억하세요.",
        img: "../../images/char_hacker.webp"
    },
    {
        type: "신출귀몰 괴도",
        theme: "villain",
        stat: 25,
        trait: "잡힐 듯 잡히지 않는 유연함과 매력을 가진 자유영혼형 관상입니다.",
        ability: "순발력 넘치는 임기응변과 타인의 마음을 훔치는 매력.",
        tip: "중요한 약속은 조금 더 책임감 있게 지키는 노력이 필요합니다.",
        img: "../../images/char_rival.webp"
    },
    {
        type: "천의 얼굴",
        theme: "villain",
        stat: 35,
        trait: "상황에 따라 자유자재로 이미지를 변주하는 카멜레온형 분위기입니다.",
        ability: "탁월한 공감 능력으로 상대를 완벽히 이해하고 동화됨.",
        tip: "연기 속에 가려진 진짜 자신의 모습을 잃지 마세요.",
        img: "../../images/char_idol.webp"
    },
    {
        type: "예리한 감시자",
        theme: "villain",
        stat: 10,
        trait: "상대의 말하지 않은 부분까지 읽어내는 날카로운 통찰력의 전략가형 분위기입니다.",
        ability: "데이터 기반의 완벽한 분석력과 허점을 찌르는 예리함.",
        tip: "비판보다는 칭찬으로 사람들의 마음을 얻어보는 건 어떨까요?",
        img: "../../images/char_genius.webp"
    },
    {
        type: "평화의 수호자",
        theme: "sage",
        stat: 90,
        trait: "자비로움과 포용력이 느껴지는 온화한 평화주의자형 관상입니다.",
        ability: "갈등을 해소하고 주변을 조화롭게 만드는 중재 능력.",
        tip: "가끔은 본인의 필요에 대해서도 당당히 요구할 필요가 있습니다.",
        img: "../../images/char_supporter.webp"
    },
    {
        type: "지혜로운 멘토",
        theme: "sage",
        stat: 85,
        trait: "전문성과 신뢰가 느껴지는 올바른 지도자형 관상입니다.",
        ability: "경험을 바탕으로 타인에게 명확한 방향을 제시하는 힘.",
        tip: "지적보다는 따뜻한 위로 한마디가 더 큰 변화를 만듭니다.",
        img: "../../images/char_knight.webp"
    },
    {
        type: "햇살 같은 이타주의자",
        theme: "sage",
        stat: 95,
        trait: "존재만으로 주변을 밝히는 순수한 선의를 가진 관상입니다.",
        ability: "긍정적인 정서를 전파하고 타인의 고통을 보듬는 치유력.",
        tip: "남을 돕기 전에 자신의 에너지가 소진되지 않게 잘 돌보세요.",
        img: "../../images/char_ghibli.webp"
    }
];

// State
let currentImage = null;
let currentFile = null;
const currentTest = 'moral';

// Navigation Function
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    if (id === 'moral-home' || id === 'moral-result' || id === 'upload' || id === 'loading') {
        document.body.classList.add('moral-theme-active');
    } else {
        document.body.classList.remove('moral-theme-active');
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
    const moralResImg = document.getElementById('moral-res-img');
    if (moralResImg) moralResImg.src = '';
}

function resetTest() {
    location.href = '../../';
}

function initApp() {
    // Start Button
    const startBtn = document.getElementById('moral-start-btn');
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
    const retryBtn = document.getElementById('moral-retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', () => {
        resetUploadUI();
        showSection('upload');
    });

    // Share Buttons
    const shareActions = [
        ['moral-copy-link-btn', copyToClipboard],
        ['moral-share-native-btn', shareNative]
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

    showSection('moral-home');
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
        "얼굴의 주요 랜드마크 스캔 중...",
        "첫인상 분위기 스캔 중...",
        "잠재적 성향 분석 중...",
        "미세 표정 기운 감지하는 중...",
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
            const index = hash % moralCharacters.length;
            const result = moralCharacters[index];

            const resType = document.getElementById('moral-res-type');
            const resImg = document.getElementById('moral-res-img');
            const resTrait = document.getElementById('moral-res-trait');
            const resAbility = document.getElementById('moral-res-ability');
            const resTip = document.getElementById('moral-res-tip');

            if (resType) resType.innerText = result.type;
            if (resImg) resImg.src = currentImage;
            if (resTrait) resTrait.innerText = result.trait;
            if (resAbility) resAbility.innerText = result.ability;
            if (resTip) resTip.innerText = result.tip;

            const statFill = document.getElementById('moral-stat-fill');
            const statValue = document.getElementById('moral-stat-value');
            if (statFill) statFill.style.width = '0%';
            if (statValue) statValue.innerText = '0%';

            showSection('moral-result');

            setTimeout(() => {
                if (statFill) {
                    statFill.style.width = result.stat + '%';
                    statFill.style.background = result.theme === 'villain'
                        ? 'linear-gradient(90deg, #ff7eb9, #6c5ce7)'
                        : 'linear-gradient(90deg, #ffd700, #00d2ff)';
                }
                if (statValue) statValue.innerText = result.stat + '%';
            }, 300);}
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
            title: '테스트랩 - 첫인상 분위기 테스트',
            text: '사진으로 보는 나의 첫인상 분위기는? 지금 확인해보세요!',
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
