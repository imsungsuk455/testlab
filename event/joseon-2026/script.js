// 조선시대 관상 테스트 테스트 — 독립 페이지
const joseonCharacters = [
    {
        type: "카리스마 넘치는 왕",
        tags: ["#리더십", "#명예", "#천하를가질관상"],
        desc: "귀하의 이마는 넓고 높아 기세가 등등하며, 눈썹 산이 뚜렷하니 만인의 우두머리가 될 상입니다. 하관이 꽉 차 있으니 말년의 운세 또한 평탄하고 영화로울 것입니다.",
        stats: [90, 85, 80, 75, 90], // 이마, 눈, 코, 입, 턱
        img: "../../images/joseon_king.webp"
    },
    {
        type: "지혜로운 영의정",
        tags: ["#전략가", "#이성적", "#학식과덕망"],
        desc: "가늘고 긴 봉황의 눈매를 지녔으니 지혜가 구름 위를 뚫고 나아가며, 얼굴의 대칭이 완벽하니 공정함과 학식을 겸비한 재상의 상입니다.",
        stats: [80, 95, 70, 75, 80],
        img: "../../images/joseon_minister.webp"
    },
    {
        type: "기개가 높은 장군",
        tags: ["#용기", "#강직함", "#불의를못참음"],
        desc: "눈썹이 짙고 거칠며 콧대가 대나무처럼 곧게 뻗었으니 기개가 하늘을 찌르는 무인의 상입니다. 각진 턱선은 그 어떤 고난에도 굴하지 않을 강인함을 뜻합니다.",
        stats: [70, 85, 95, 70, 90],
        img: "../../images/joseon_general.webp"
    },
    {
        type: "풍류를 즐기는 선비",
        tags: ["#예술가", "#낭만", "#유유자적"],
        desc: "매끄러운 콧날과 부드러운 입술 라인은 예술적 감수성이 풍부함을 뜻하며, 선하고 깊은 눈동자가 자연의 아름다움을 쫓는 선비의 관상입니다.",
        stats: [85, 75, 70, 90, 70],
        img: "../../images/joseon_scholar.webp"
    },
    {
        type: "천재적인 도화서 화원",
        tags: ["#관찰력", "#창의성", "#섬세한감각"],
        desc: "눈가에 잔잔한 웃음기가 서려 있고 눈동자가 작지만 반짝이니 세상을 꿰뚫어 보는 안목이 예사롭지 않습니다. 섬세한 감각으로 천하를 화폭에 담을 상입니다.",
        stats: [75, 90, 65, 80, 65],
        img: "../../images/joseon_artist.webp"
    },
    {
        type: "만능 재주꾼 보부상",
        tags: ["#생활력", "#사교성", "#전국팔도인싸"],
        desc: "광대뼈가 발달하고 입꼬리가 항상 위를 향하니 사교성이 뛰어나고 어디서든 환영받을 상입니다. 다부진 얼굴형은 험난한 세상에서도 생활력을 뜻합니다.",
        stats: [65, 70, 75, 95, 80],
        img: "../../images/joseon_merchant.webp"
    },
    {
        type: "신비로운 국무(무녀)",
        tags: ["#직관력", "#신비로움", "#사람을꿰뚫어봄"],
        desc: "올라간 눈꼬리와 갸름한 얼굴형은 사람의 마음을 꿰뚫어 보는 비범한 통찰력을 상징합니다. 도드라진 눈 밑 애교살은 신비로운 기운을 머금고 있음을 뜻합니다.",
        stats: [75, 95, 60, 75, 70],
        img: "../../images/joseon_shaman.webp"
    },
    {
        type: "엄격한 사간원 판관",
        tags: ["#정의로움", "#원칙주의", "#완벽주의"],
        desc: "일자 눈썹과 얇고 단호한 입술은 시비곡직을 가림에 있어 한 치의 흔들림도 없음을 뜻합니다. 고집 서린 미간은 원칙을 지키는 굳건한 신념의 상입니다.",
        stats: [80, 80, 85, 95, 75],
        img: "../../images/joseon_judge.webp"
    },
    {
        type: "자애로운 안방마님",
        tags: ["#포용력", "#인덕", "#평화주의자"],
        desc: "둥근 얼굴형과 도톰한 귓불은 복이 가득하고 성품이 온화하여 주변에 사람이 끊이지 않을 상입니다. 여유로운 인상은 만인을 품어줄 포용력을 뜻합니다.",
        stats: [70, 75, 75, 85, 85],
        img: "../../images/joseon_lady.webp"
    },
    {
        type: "자유로운 영혼의 광대",
        tags: ["#유머감각", "#자유", "#분위기메이커"],
        desc: "큰 입과 움직임이 많은 눈썹은 타고난 예능인의 끼가 다분함을 뜻합니다. 비대칭적인 표정근육은 정형화된 세상에 즐거움을 선사할 행운아의 상입니다.",
        stats: [60, 85, 60, 95, 60],
        img: "../../images/joseon_clown.webp"
    },
    {
        type: "야생의 전문가 백정",
        tags: ["#장인정신", "#야성미", "#거친카리스마"],
        desc: "두툼한 콧볼과 강하게 발달한 턱 근육은 험난한 세상을 헤쳐가는 야성적인 생존력을 뜻하며, 깊고 굵은 미간 주름은 본인의 분야에서 일가를 이룬 장인의 기운을 내뿜고 있습니다.",
        stats: [50, 70, 95, 60, 95],
        img: "../../images/joseon_butcher.webp"
    }
];

// State
let currentImage = null;
let currentFile = null;
const currentTest = 'joseon';

// Navigation Function
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    if (id === 'joseon-home' || id === 'joseon-result' || id === 'upload' || id === 'loading') {
        document.body.classList.add('joseon-theme-active');
    } else {
        document.body.classList.remove('joseon-theme-active');
    }
    const uploadEl = document.getElementById('upload');
    if (uploadEl) {
        if (id === 'loading') { uploadEl.classList.add('joseon-loading'); }
        else { uploadEl.classList.remove('joseon-loading'); }
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
    const joseonResImg = document.getElementById('joseon-res-img');
    if (joseonResImg) joseonResImg.src = '';
}

function resetTest() {
    location.href = '../../';
}

function initApp() {
    // Start Button
    const startBtn = document.getElementById('joseon-start-btn');
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
    const retryBtn = document.getElementById('joseon-retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', () => {
        resetUploadUI();
        showSection('upload');
    });

    // Share Buttons
    const shareActions = [
        ['joseon-copy-link-btn', copyToClipboard],
        ['joseon-share-native-btn', shareNative]
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

    showSection('joseon-home');
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
        "상 아래의 기운을 살피는 중입니다...",
        "이목구비의 조화를 대조하고 있습니다...",
        "전생의 연을 찾고 있습니다...",
        "관상을 기록하는 중입니다...",
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
            const index = hash % joseonCharacters.length;
            const result = joseonCharacters[index];

            const resType = document.getElementById('joseon-res-type');
            const resImg = document.getElementById('joseon-res-img');
            const resDesc = document.getElementById('joseon-res-desc');
            const tagsBox = document.getElementById('joseon-res-tags');

            if (resType) resType.innerText = result.type;
            if (resImg) {
                resImg.onerror = function () {
                    this.onerror = null;
                    this.src = this.src.replace('.webp', '.webp');
                };
                resImg.src = result.img;
            }
            if (resDesc) resDesc.innerText = result.desc;

            if (tagsBox) {
                tagsBox.innerHTML = '';
                result.tags.forEach(t => {
                    const span = document.createElement('span');
                    span.className = 'joseon-tag';
                    span.innerText = t;
                    tagsBox.appendChild(span);
                });
            }

            showSection('joseon-result');
            drawJoseonRadarChart(result.stats);}
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
            title: '테스트랩 - 조선시대 관상 테스트',
            text: '조선시대 나의 관상 유형은? 지금 확인해보세요!',
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
