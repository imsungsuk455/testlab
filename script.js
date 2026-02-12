const characters = [
    {
        name: "강불휘",
        title: "정의로운 열혈 소년만화 주인공",
        keywords: ["#용기", "#직진", "#에너지", "#의리"],
        desc: "불의를 보면 참지 못하는 관상입니다. 에너지가 넘치며 주변 사람들을 이끄는 리더십이 탁월합니다.",
        img: "images/char_shonen.png"
    },
    {
        name: "시아",
        title: "신비로운 지브리풍 서브 주인공",
        keywords: ["#몽환", "#다정", "#비밀", "#성숙"],
        desc: "말수가 적어도 분위기만으로 압도하는 관상입니다. 속이 깊고 타인의 아픔을 잘 공감해주는 치유자 타입입니다.",
        img: "images/char_ghibli.png"
    },
    {
        name: "레이",
        title: "냉철한 천재 두뇌파 라이벌",
        keywords: ["#이성적", "#분석", "#완벽주의", "#츤데레"],
        desc: "감정보다 논리가 앞서는 관상입니다. 처음엔 차가워 보이지만, 자기 사람에게는 은근히 약한 면모를 보입니다.",
        img: "images/char_rival.png"
    },
    {
        name: "하느리",
        title: "햇살 가득한 순정만화 여주인공",
        keywords: ["#긍정", "#사랑스러움", "#공감왕", "#명랑"],
        desc: "존재만으로 주변을 밝게 만드는 관상입니다. 사소한 것에도 행복을 느끼며 주변에 친구가 끊이지 않습니다.",
        img: "images/char_shojo.png"
    },
    {
        name: "디안",
        title: "퇴폐미 넘치는 느와르풍 빌런",
        keywords: ["#카리스마", "#독보적", "#고독", "#미스터리"],
        desc: "속내를 알 수 없는 위험한 매력을 가진 관상입니다. 독립적인 성향이 강하며 본인만의 확고한 세계관이 있습니다.",
        img: "images/char_villain.png"
    },
    {
        name: "몽이",
        title: "엉뚱하고 발랄한 개그 캐릭터",
        keywords: ["#분위기메이커", "#창의적", "#자유영혼", "#유머"],
        desc: "어디로 튈지 모르는 매력의 소유자입니다. 창의적인 생각으로 사람들을 놀라게 하며 스트레스를 잘 받지 않습니다.",
        img: "images/char_gag.png"
    },
    {
        name: "에드릭",
        title: "단단한 내면의 기사단장형",
        keywords: ["#책임감", "#원칙주의", "#신뢰", "#강인함"],
        desc: "한번 맡은 일은 끝까지 해내는 믿음직한 관상입니다. 규칙을 중시하며 조직 내에서 중심을 잡아주는 역할을 합니다.",
        img: "images/char_knight.png"
    },
    {
        name: "나른",
        title: "나른한 힐링물 속 고양이상",
        keywords: ["#마이웨이", "#여유", "#효율성", "#독립심"],
        desc: "귀찮은 건 싫지만 할 일은 기막히게 잘하는 관상입니다. 복잡한 관계보다는 혼자만의 평화로운 시간을 즐깁니다.",
        img: "images/char_healing.png"
    },
    {
        name: "한박사",
        title: "반전 매력의 안경 쓴 지략가",
        keywords: ["#전략가", "#치밀함", "#반전매력", "#성취욕"],
        desc: "겉으론 평범해 보이지만 머릿속으론 수만 가지 수를 읽는 관상입니다. 목표를 정하면 수단과 방법을 가리지 않고 쟁취합니다.",
        img: "images/char_strategist.png"
    },
    {
        name: "무명",
        title: "세계를 홀리는 은둔형 천재",
        keywords: ["#천재적", "#집중력", "#포커페이스", "#은둔형"],
        desc: "실력을 숨기고 있는 고수의 관상입니다. 평소엔 허허실실 하지만 중요한 순간에 본인의 천재성을 발휘해 모두를 구해내는 영웅적 기질이 있습니다.",
        img: "images/char_genius.png"
    },
    {
        name: "아이리스",
        title: "고고한 얼음성 공주/왕자님",
        keywords: ["#품격", "#신중", "#우아", "#철벽"],
        desc: "쉽게 곁을 내주지 않지만, 한번 마음을 열면 누구보다 일편단심인 관상입니다. 자기관리가 매우 철저합니다.",
        img: "images/char_ice.png"
    },
    {
        name: "네온",
        title: "행동파 사이버펑크 히어로",
        keywords: ["#혁신", "#도전", "#스피드", "#모험"],
        desc: "새로운 기술이나 변화에 민감하며 도전을 즐기는 관상입니다. 정체된 환경을 참지 못하고 늘 새로운 길을 개척합니다.",
        img: "images/char_cyberpunk.png"
    },
    {
        name: "다정",
        title: "따뜻한 동네 형/누나 같은 조력자",
        keywords: ["#헌신", "#배려", "#상담원", "#푸근함"],
        desc: "주인공 곁에서 늘 든든하게 받쳐주는 조력자의 관상입니다. 본인보다 남을 먼저 챙기는 이타적인 성격입니다.",
        img: "images/char_supporter.png"
    },
    {
        name: "엘렌",
        title: "다크 판타지 속 비운의 주인공",
        keywords: ["#감수성", "#예술가", "#사색", "#깊이감"],
        desc: "생각이 깊고 감수성이 풍부하여 예술적 기질이 뛰어난 관상입니다. 고독을 즐기며 사색에 잠기는 것을 좋아합니다.",
        img: "images/char_tragic.png"
    },
    {
        name: "태오",
        title: "에너제틱한 스포츠 만화 에이스",
        keywords: ["#승부욕", "#열정", "#단순명료", "#활력"],
        desc: "뒤를 돌아보지 않고 목표를 향해 달리는 관상입니다. 실패해도 오뚝이처럼 일어나는 긍정적인 멘탈의 소유자입니다.",
        img: "images/char_sports.png"
    },
    {
        name: "루미엘",
        title: "신비로운 마법학교 우등생",
        keywords: ["#탐구심", "#지식", "#성장형", "#성실"],
        desc: "배우는 것을 즐기고 지식욕이 강한 관상입니다. 본인의 부족함을 인정하고 꾸준히 노력하여 결국 성공하는 타입입니다.",
        img: "images/char_mage.png"
    },
    {
        name: "보리",
        title: "느긋한 일상물 속 빵집 주인",
        keywords: ["#소확행", "#안정", "#힐링", "#미니멀리즘"],
        desc: "소소한 일상의 행복을 소중히 여기는 관상입니다. 경쟁보다는 평화로운 삶을 지향하며 주변에 편안함을 선물합니다.",
        img: "images/char_bakery.png"
    },
    {
        name: "스타",
        title: "화려한 스포트라이트 아이돌형",
        keywords: ["#스타성", "#자신감", "#표현력", "#인기"],
        desc: "어디를 가든 주인공이 되는 관상입니다. 자신을 표현하는 데 거침이 없으며 사람들의 관심을 즐길 줄 압니다.",
        img: "images/char_idol.png"
    },
    {
        name: "제로",
        title: "시대를 앞서가는 해커/발명가",
        keywords: ["#독특함", "#천재적", "#집중력", "#괴짜"],
        desc: "한 분야에 꽂히면 무서운 집중력을 발휘하는 관상입니다. 남들이 보지 못하는 관점을 제시하는 독보적인 존재입니다.",
        img: "images/char_hacker.png"
    },
    {
        name: "큐피",
        title: "사랑을 전하는 큐피트 요정형",
        keywords: ["#중재자", "#평화", "#친화력", "#러블리"],
        desc: "사람 사이의 갈등을 해결하고 화합을 이끌어내는 관상입니다. 주변인들의 연애 상담 단골 대상이기도 합니다.",
        img: "images/char_cupid.png"
    }
];

// DOM elements
const sections = document.querySelectorAll('.section');
const mainHub = document.getElementById('main-hub');
const logoHome = document.getElementById('logo-home');
const testManhwaCard = document.getElementById('test-manhwa-card');
const btnBackToHub = document.getElementById('btn-back-to-hub');

const startBtn = document.getElementById('start-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const retryBtn = document.getElementById('retry-btn');
const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const imagePreview = document.getElementById('image-preview');
const previewBox = document.getElementById('preview-box');
const scanImg = document.getElementById('scan-img');
const statusText = document.getElementById('status-text');

const copyLinkBtn = document.getElementById('copy-link-btn');
const shareNativeBtn = document.getElementById('share-native-btn');
const toast = document.getElementById('toast');

// State
let currentImage = null;

// Navigation
function showSection(id) {
    sections.forEach(s => {
        s.classList.remove('active');
        if (s.id === id) {
            s.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Hub Navigation
testManhwaCard.addEventListener('click', () => showSection('manhwa-home'));
logoHome.addEventListener('click', () => showSection('main-hub'));
btnBackToHub.addEventListener('click', () => showSection('main-hub'));

// Test Flow
startBtn.addEventListener('click', () => showSection('upload'));

retryBtn.addEventListener('click', () => {
    currentImage = null;
    imagePreview.src = '#';
    previewBox.style.display = 'none';
    dropZone.style.display = 'block';
    showSection('manhwa-home');
});

// File Handling
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFile);
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderWidth = '3px';
});
dropZone.addEventListener('dragleave', () => dropZone.style.borderWidth = '2px');
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    handleFile(e);
});

function handleFile(e) {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            currentImage = event.target.result;
            imagePreview.src = currentImage;
            scanImg.src = currentImage;
            previewBox.style.display = 'block';
            dropZone.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

// Analysis
analyzeBtn.addEventListener('click', () => {
    showSection('loading');
    startAnalysis();
});

function startAnalysis() {
    const statuses = [
        "눈매의 각도를 측정하고 있습니다...",
        "얼굴형의 조화를 분석하는 중...",
        "입매의 기운을 파악하고 있습니다...",
        "캐릭터 라이브러리에서 매칭 중...",
        "최적의 캐릭터를 찾았습니다!"
    ];

    let i = 0;
    const interval = setInterval(() => {
        statusText.innerText = statuses[i];
        i++;
        if (i === statuses.length) {
            clearInterval(interval);
            setTimeout(showResult, 1000);
        }
    }, 1200);
}

// Deterministic result based on image data
function getHash(str) {
    let hash = 0;
    // Use a subset of the string if it's too long for performance, 
    // but base64 strings for images are usually manageable.
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

function showResult() {
    if (!currentImage) return;

    const hash = getHash(currentImage);
    const index = hash % characters.length;
    const result = characters[index];

    document.getElementById('res-title').innerHTML = `<span style="font-size: 0.8em; color: #888;">${result.name}</span><br>${result.title}`;
    document.getElementById('res-desc').innerText = result.desc;

    const keywordsBox = document.getElementById('res-keywords');
    keywordsBox.innerHTML = '';
    result.keywords.forEach(k => {
        const span = document.createElement('span');
        span.className = 'keyword';
        span.innerText = k;
        keywordsBox.appendChild(span);
    });

    document.getElementById('res-img').src = result.img;
    showSection('result');
}

// Share Functionality
copyLinkBtn.addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast("링크가 클립보드에 복사되었습니다!");
    });
});

shareNativeBtn.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: '테스트랩 - 만화 관상 테스트',
            text: '나와 닮은 만화 캐릭터는 누구일까? 지금 확인해보세요!',
            url: window.location.href,
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert("이 브라우저는 공유 기능을 지원하지 않습니다. 링크 복사를 이용해주세요!");
    }
});

function showToast(message) {
    toast.innerText = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}
