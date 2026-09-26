// 동안 테스트 테스트 — 독립 페이지
const babyfaceResults = [
    {
        level: 1,
        title: "우주급 최강 동안",
        minScore: 90,
        tip: "세월이 당신만 비껴갔군요! 지금처럼 긍정적인 마음가짐을 유지하는 것이 최고의 비결입니다.",
        trait: "티 없이 맑은 피부톤과 둥글고 부드러운 얼굴형이 특징입니다.",
        ability: "상대방의 경계심을 해제시키는 무해하고 사랑스러운 매력.",
        theme: "#40C057"
    },
    {
        level: 2,
        title: "아이돌급 동안",
        minScore: 80,
        tip: "활동적인 에너지가 동안의 비결! 수분 섭취에 조금 더 신경 써주면 완벽하겠네요.",
        trait: "생기 넘치는 눈매와 탄력 있는 볼 살이 매력 포인트입니다.",
        ability: "어디서나 막내 같은 귀여움을 독차지하는 신비로운 친화력.",
        theme: "#40C057"
    },
    {
        level: 3,
        title: "세련된 동안 인상",
        minScore: 70,
        tip: "전형적인 관리형 동안! 꾸준한 세안과 미소 짓는 습관이 운을 불러옵니다.",
        trait: "이목구비의 조화가 균형 있고 인상이 매우 깔끔합니다.",
        ability: "나이보다 5~7살은 어려 보여 신선한 충격을 주는 반전 매력.",
        theme: "#40C057"
    },
    {
        level: 4,
        title: "중후한 매력의 성숙함",
        minScore: 50,
        tip: "세련된 성숙함이 돋보입니다. 나이에 걸맞은 품위 있는 인상을 가지고 계시네요.",
        trait: "전반적으로 차분하고 안정된 표정근육의 흐름이 보입니다.",
        ability: "상대방에게 깊은 신뢰감을 주는 묵직하고 따뜻한 아우라.",
        theme: "#1864ab"
    },
    {
        level: 5,
        title: "연륜이 깊게 묻어난 관상",
        minScore: 30,
        tip: "만성 피로와 스트레스가 얼굴에 그대로 보입니다. 비싼 화장품보다 일단 푹 자는 것이 급선무입니다.",
        trait: "눈가의 피로도와 깊어진 팔자 주름에서 세월의 흔적이 확연히 느껴집니다.",
        ability: "인생의 산전수전을 다 겪은 듯한 노련함과 범접할 수 없는 아우라.",
        theme: "#1864ab"
    },
    {
        level: 6,
        title: "세월의 흐름이 역력한 인상",
        minScore: 0,
        tip: "인상을 쓰는 습관이 주름을 고착화시켰습니다. 금주와 금연, 그리고 적극적인 안티에이징 관리가 매우 시급합니다.",
        trait: "쳐진 입꼬리와 거친 피부결 등 실제 나이보다 훨씬 더 많은 고생을 한 것으로 분석됩니다.",
        ability: "누구도 함부로 대할 수 없는 강한 인상과 독보적인 포스.",
        theme: "#1864ab"
    }
];

let userAge = null;

// State
let currentImage = null;
let currentFile = null;
const currentTest = 'babyface';

// Navigation Function
function showSection(id) {
    const sections = document.querySelectorAll('.section');

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
    const babyfaceResImg = document.getElementById('babyface-res-img');
    if (babyfaceResImg) babyfaceResImg.src = '';
}

function resetTest() {
    location.href = '../../';
}

function initApp() {
    // Start Button
    const startBtn = document.getElementById('babyface-start-btn');
    if (startBtn) startBtn.addEventListener('click', () => {
        resetUploadUI();
        showSection('upload');
    });

    // Analyze Button
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) analyzeBtn.addEventListener('click', () => {
        showSection('babyface-age-input');
    });

    const ageSubmitBtn = document.getElementById('age-submit-btn');
    const ageInput = document.getElementById('user-age-input');
    if (ageSubmitBtn && ageInput) {
        ageSubmitBtn.addEventListener('click', () => {
            const val = parseInt(ageInput.value);
            if (!val || val < 1 || val > 120) {
                alert('올바른 나이를 입력해주세요 (1~120세)');
                return;
            }
            userAge = val;
            showSection('loading');
            startAnalysis();
        });
    }


    // Retry
    const retryBtn = document.getElementById('babyface-retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', () => {
        resetUploadUI();
        showSection('upload');
    });

    // Share Buttons
    const shareActions = [
        ['babyface-copy-link-btn', copyToClipboard],
        ['babyface-share-native-btn', shareNative]
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

    showSection('babyface-home');
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
        "얼굴의 중안부와 하안부 비율 분석 중...",
        "눈, 코, 입의 앳된 정도 측정 중...",
        "피부결의 생기와 탄력도 스캔 중...",
        "동안 데이터베이스 대조 중...",
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
            hash = getHash(currentFile ? `${currentFile.name}-${currentFile.size}` : currentImage);

            // Deterministic photo-age estimate (range 18-65 based on hash)
            let photoAge = (hash % 48) + 18;

            // Diff = Photo_Age - Real_Age (negative means looking younger)
            const diff = photoAge - userAge;
            const diffAbs = Math.abs(diff);

            // Score for result selection (Higher score if looking younger)
            // If photo age < real age (Diff < 0), score is high.
            let score = 50 - (diff * 5);
            score = Math.max(10, Math.min(99, score));

            const resDiffText = document.getElementById('babyface-res-diff-text');
            const realAgeEl = document.getElementById('babyface-real-age');
            const photoAgeEl = document.getElementById('babyface-ai-age');
            const resTitle = document.getElementById('babyface-res-title');
            const resImg = document.getElementById('babyface-res-img');
            const resTip = document.getElementById('babyface-res-tip');
            const resTrait = document.getElementById('babyface-res-trait');
            const resAbility = document.getElementById('babyface-res-ability');

            // Text & Labels
            if (realAgeEl) realAgeEl.innerText = `${userAge}세`;
            if (photoAgeEl) photoAgeEl.innerText = `${photoAge}세`;

            let statusMsg = "";
            let themeColor = "#40C057";

            if (diff < 0) {
                statusMsg = `"${diffAbs}살만큼의 시간을 되돌렸습니다! 세월이 당신만 비껴갔네요!"`;
                themeColor = "#40C057"; // Emerald Green
            } else if (diff === 0) {
                statusMsg = `"나이에 걸맞은 가장 아름다운 모습입니다."`;
                themeColor = "#4dabf7"; // Soft Blue
            } else {
                statusMsg = `"성숙함이 돋보이는 클래식한 매력의 소유자!"`;
                themeColor = "#1864ab"; // Navy
            }

            if (resDiffText) {
                resDiffText.innerText = statusMsg;
                resDiffText.style.color = themeColor;
            }
            if (photoAgeEl) photoAgeEl.style.color = themeColor;

            // Find result based on score
            let result = babyfaceResults[babyfaceResults.length - 1];
            for (let r of babyfaceResults) {
                if (score >= r.minScore) {
                    result = r;
                    break;
                }
            }

            if (resTitle) resTitle.innerText = result.title;
            if (resImg) resImg.src = currentImage;
            if (resTip) resTip.innerText = result.tip;
            if (resTrait) resTrait.innerText = result.trait;
            if (resAbility) resAbility.innerText = result.ability;

            // Timeline Bar Logic
            const realDot = document.getElementById('timeline-real-dot');
            const aiDot = document.getElementById('timeline-ai-dot');

            // Map age 10-80 to 0-100% position
            const getPos = (age) => {
                let p = ((age - 10) / (80 - 10)) * 100;
                return Math.max(5, Math.min(95, p));
            };

            if (realDot) realDot.style.left = `${getPos(userAge)}%`;
            if (aiDot) {
                aiDot.style.left = `${getPos(photoAge)}%`;
                aiDot.style.background = themeColor;
                aiDot.style.boxShadow = `0 2px 10px ${themeColor}44`;
            }

            showSection('babyface-result');
        }
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
            title: '테스트랩 - 동안 테스트',
            text: '사진으로 보는 나의 동안도는? 지금 확인해보세요!',
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
