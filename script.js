// Moral Test Result Types
const moralCharacters = [
    {
        type: "냉혹한 전략가",
        theme: "villain",
        stat: 15,
        trait: "차갑고 이성적인 눈매에서 뿜어지는 천재적인 지략가형 관상입니다.",
        ability: "냉철한 상황 판단력과 목적을 위해 감정을 배제하는 추진력.",
        tip: "가끔은 주변 사람들의 감정을 살피는 여유가 필요합니다.",
        img: "images/moral_res_1.png"
    },
    {
        type: "열혈 트러블메이커",
        theme: "villain",
        stat: 30,
        trait: "넘치는 에너지를 주체하지 못하는 다혈질적인 사고뭉치형 관상입니다.",
        ability: "압도적인 행동력과 위기 상황에서도 굴하지 않는 맷집.",
        tip: "행동하기 전 딱 3초만 더 생각하는 습관을 들여보세요.",
        img: "images/moral_res_2.png"
    },
    {
        type: "그림자 배후",
        theme: "villain",
        stat: 20,
        trait: "조용히 뒤에서 모든 상황을 설계하고 조종하는 흑막형 관상입니다.",
        ability: "남들이 보지 못하는 정보의 흐름을 읽는 통찰력.",
        tip: "본인의 능력을 선한 영향력을 위해 사용해보는 건 어떨까요?",
        img: "images/moral_res_3.png"
    },
    {
        type: "폭발적 반항아",
        theme: "villain",
        stat: 40,
        trait: "규칙과 억압을 거부하며 본인만의 길을 걷는 자유분방형 관상입니다.",
        ability: "기성 권위에 도전하는 혁신적 사고와 강인한 독립심.",
        tip: "때로는 타협이 더 큰 결과를 만들어낼 수 있음을 기억하세요.",
        img: "images/moral_res_4.png"
    },
    {
        type: "신출귀몰 괴도",
        theme: "villain",
        stat: 25,
        trait: "잡힐 듯 잡히지 않는 유연함과 매력을 가진 자유영혼형 관상입니다.",
        ability: "순발력 넘치는 임기응변과 타인의 마음을 훔치는 매력.",
        tip: "중요한 약속은 조금 더 책임감 있게 지키는 노력이 필요합니다.",
        img: "images/moral_res_5.png"
    },
    {
        type: "천의 얼굴",
        theme: "villain",
        stat: 35,
        trait: "상황에 따라 자유자재로 이미지를 변주하는 기만형 관상입니다.",
        ability: "탁월한 공감 능력으로 상대를 완벽히 이해하고 동화됨.",
        tip: "연기 속에 가려진 진짜 자신의 모습을 잃지 마세요.",
        img: "images/moral_res_6.png"
    },
    {
        type: "예리한 감시자",
        theme: "villain",
        stat: 10,
        trait: "상대의 사소한 약점까지 파고드는 날카로운 통찰력의 빌런형 관상입니다.",
        ability: "데이터 기반의 완벽한 분석력과 허점을 찌르는 예리함.",
        tip: "비판보다는 칭찬으로 사람들의 마음을 얻어보는 건 어떨까요?",
        img: "images/moral_res_7.png"
    },
    {
        type: "평화의 수호자",
        theme: "sage",
        stat: 90,
        trait: "자비로움과 포용력이 느껴지는 온화한 평화주의자형 관상입니다.",
        ability: "갈등을 해소하고 주변을 조화롭게 만드는 중재 능력.",
        tip: "가끔은 본인의 필요에 대해서도 당당히 요구할 필요가 있습니다.",
        img: "images/moral_res_8.png"
    },
    {
        type: "지혜로운 멘토",
        theme: "sage",
        stat: 85,
        trait: "전문성과 신뢰가 느껴지는 올바른 지도자형 관상입니다.",
        ability: "경험을 바탕으로 타인에게 명확한 방향을 제시하는 힘.",
        tip: "지적보다는 따뜻한 위로 한마디가 더 큰 변화를 만듭니다.",
        img: "images/moral_res_9.png"
    },
    {
        type: "햇살 같은 이타주의자",
        theme: "sage",
        stat: 95,
        trait: "존재만으로 주변을 밝히는 순수한 선의를 가진 관상입니다.",
        ability: "긍정적인 정서를 전파하고 타인의 고통을 보듬는 치유력.",
        tip: "남을 돕기 전에 자신의 에너지가 소진되지 않게 잘 돌보세요.",
        img: "images/moral_res_10.png"
    }
];

// Joseon Test Result Types
const joseonCharacters = [
    {
        type: "카리스마 넘치는 왕",
        tags: ["#리더십", "#명예", "#천하를가질관상"],
        desc: "귀하의 이마는 넓고 높아 기세가 등등하며, 눈썹 산이 뚜렷하니 만인의 우두머리가 될 상입니다. 하관이 꽉 차 있으니 말년의 운세 또한 평탄하고 영화로울 것입니다.",
        stats: [90, 85, 80, 75, 90], // 이마, 눈, 코, 입, 턱
        img: "images/카리스마 넘치는 왕.png"
    },
    {
        type: "지혜로운 영의정",
        tags: ["#전략가", "#이성적", "#학식과덕망"],
        desc: "가늘고 긴 봉황의 눈매를 지녔으니 지혜가 구름 위를 뚫고 나아가며, 얼굴의 대칭이 완벽하니 공정함과 학식을 겸비한 재상의 상입니다.",
        stats: [80, 95, 70, 75, 80],
        img: "images/지혜로운 영의정.png"
    },
    {
        type: "기개가 높은 장군",
        tags: ["#용기", "#강직함", "#불의를못참음"],
        desc: "눈썹이 짙고 거칠며 콧대가 대나무처럼 곧게 뻗었으니 기개가 하늘을 찌르는 무인의 상입니다. 각진 턱선은 그 어떤 고난에도 굴하지 않을 강인함을 뜻합니다.",
        stats: [70, 85, 95, 70, 90],
        img: "images/기개가 높은 장군.png"
    },
    {
        type: "풍류를 즐기는 선비",
        tags: ["#예술가", "#낭만", "#유유자적"],
        desc: "매끄러운 콧날과 부드러운 입술 라인은 예술적 감수성이 풍부함을 뜻하며, 선하고 깊은 눈동자가 자연의 아름다움을 쫓는 선비의 관상입니다.",
        stats: [85, 75, 70, 90, 70],
        img: "images/풍류를 즐기는 선비.png"
    },
    {
        type: "천재적인 도화서 화원",
        tags: ["#관찰력", "#창의성", "#섬세한감각"],
        desc: "눈가에 잔잔한 웃음기가 서려 있고 눈동자가 작지만 반짝이니 세상을 꿰뚫어 보는 안목이 예사롭지 않습니다. 섬세한 감각으로 천하를 화폭에 담을 상입니다.",
        stats: [75, 90, 65, 80, 65],
        img: "images/천재적인 도화서 화원.png"
    },
    {
        type: "만능 재주꾼 보부상",
        tags: ["#생활력", "#사교성", "#전국팔도인싸"],
        desc: "광대뼈가 발달하고 입꼬리가 항상 위를 향하니 사교성이 뛰어나고 어디서든 환영받을 상입니다. 다부진 얼굴형은 험난한 세상에서도 생활력을 뜻합니다.",
        stats: [65, 70, 75, 95, 80],
        img: "images/만능 재주꾼 보부상.png"
    },
    {
        type: "신비로운 국무(무녀)",
        tags: ["#직관력", "#신비로움", "#사람을꿰뚫어봄"],
        desc: "올라간 눈꼬리와 갸름한 얼굴형은 사람의 마음을 꿰뚫어 보는 비범한 통찰력을 상징합니다. 도드라진 눈 밑 애교살은 신비로운 기운을 머금고 있음을 뜻합니다.",
        stats: [75, 95, 60, 75, 70],
        img: "images/무녀.png"
    },
    {
        type: "엄격한 사간원 판관",
        tags: ["#정의로움", "#원칙주의", "#완벽주의"],
        desc: "일자 눈썹과 얇고 단호한 입술은 시비곡직을 가림에 있어 한 치의 흔들림도 없음을 뜻합니다. 고집 서린 미간은 원칙을 지키는 굳건한 신념의 상입니다.",
        stats: [80, 80, 85, 95, 75],
        img: "images/사간원 판관.png"
    },
    {
        type: "자애로운 안방마님",
        tags: ["#포용력", "#인덕", "#평화주의자"],
        desc: "둥근 얼굴형과 도톰한 귓불은 복이 가득하고 성품이 온화하여 주변에 사람이 끊이지 않을 상입니다. 여유로운 인상은 만인을 품어줄 포용력을 뜻합니다.",
        stats: [70, 75, 75, 85, 85],
        img: "images/안방마님.png"
    },
    {
        type: "자유로운 영혼의 광대",
        tags: ["#유머감각", "#자유", "#분위기메이커"],
        desc: "큰 입과 움직임이 많은 눈썹은 타고난 예능인의 끼가 다분함을 뜻합니다. 비대칭적인 표정근육은 정형화된 세상에 즐거움을 선사할 행운아의 상입니다.",
        stats: [60, 85, 60, 95, 60],
        img: "images/자유로운 광대.png"
    },
    {
        type: "야생의 전문가 백정",
        tags: ["#장인정신", "#야성미", "#거친카리스마"],
        desc: "두툼한 콧볼과 강하게 발달한 턱 근육은 험난한 세상을 헤쳐가는 야성적인 생존력을 뜻하며, 깊고 굵은 미간 주름은 본인의 분야에서 일가를 이룬 장인의 기운을 내뿜고 있습니다.",
        stats: [50, 70, 95, 60, 95],
        img: "images/백정.png"
    }
];

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

// State
let currentImage = null;
let currentTest = 'manhwa'; // 'manhwa', 'moral', or 'joseon'

// Navigation Function
function showSection(id) {
    console.log('Showing section:', id, 'Current test:', currentTest);
    const sections = document.querySelectorAll('.section');

    // Theme handling
    if (id === 'moral-home' || id === 'moral-result' || (currentTest === 'moral' && (id === 'upload' || id === 'loading'))) {
        document.body.classList.add('moral-theme-active');
    } else {
        document.body.classList.remove('moral-theme-active');
    }

    if (id === 'joseon-home' || id === 'joseon-result' || (currentTest === 'joseon' && (id === 'upload' || id === 'loading'))) {
        document.body.classList.add('joseon-theme-active');
    } else {
        document.body.classList.remove('joseon-theme-active');
    }

    const uploadEl = document.getElementById('upload');
    if (uploadEl) {
        if (currentTest === 'joseon' && id === 'loading') {
            uploadEl.classList.add('joseon-loading');
        } else {
            uploadEl.classList.remove('joseon-loading');
        }
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

    if (!found) {
        console.error('Section not found:', id);
    }
}

function resetUploadUI() {
    currentImage = null;
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

    // Clear result images
    const resImg = document.getElementById('res-img');
    const moralResImg = document.getElementById('moral-res-img');
    const joseonResImg = document.getElementById('joseon-res-img');
    if (resImg) resImg.src = '';
    if (moralResImg) moralResImg.src = '';
    if (joseonResImg) joseonResImg.src = '';
}

function resetTest() {
    resetUploadUI();
    const scanContainer = document.querySelector('.scan-box');
    if (scanContainer) {
        const existingOverlay = scanContainer.querySelector('.landmark-overlay');
        if (existingOverlay) existingOverlay.remove();
        scanContainer.classList.remove('landmark-active');
    }
    showSection('main-hub');
}

// Robust Initialization
function initApp() {
    console.log('Test Lab initializing...');

    // Hub Navigation
    const cards = {
        'test-manhwa-card': 'manhwa',
        'test-moral-card': 'moral',
        'test-joseon-card': 'joseon'
    };

    Object.keys(cards).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => {
                console.log('Hub card clicked:', id);
                currentTest = cards[id];
                showSection(currentTest + '-home');
            });
        } else {
            console.warn('Hub card element missing:', id);
        }
    });

    // Start Buttons
    const startBtns = {
        'start-btn': 'manhwa',
        'moral-start-btn': 'moral',
        'joseon-start-btn': 'joseon'
    };

    Object.keys(startBtns).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => {
                resetUploadUI();
                showSection('upload');
            });
        }
    });

    // Other Buttons
    ['retry-btn', 'moral-retry-btn', 'joseon-retry-btn', 'logo-home'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', resetTest);
    });

    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            showSection('loading');
            startAnalysis();
        });
    }

    // File Handling
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    if (fileInput && dropZone) {
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
    }

    // Share Buttons
    const shareActions = [
        ['copy-link-btn', copyToClipboard],
        ['share-native-btn', shareNative],
        ['moral-copy-link-btn', copyToClipboard],
        ['moral-share-native-btn', shareNative],
        ['joseon-copy-link-btn', copyToClipboard],
        ['joseon-share-native-btn', shareNative]
    ];

    shareActions.forEach(([id, action]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', action);
    });
}

// Safer event listener execution (Robust Pattern)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function handleFile(e) {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
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

    let statuses = [];
    if (currentTest === 'manhwa') {
        statuses = [
            "눈매의 각도를 측정하고 있습니다...",
            "얼굴형의 조화를 분석하는 중...",
            "입매의 기운을 파악하고 있습니다...",
            "캐릭터 라이브러리에서 매칭 중...",
            "최적의 캐릭터를 찾았습니다!"
        ];
    } else if (currentTest === 'joseon') {
        statuses = [
            "상 아래의 기운을 살피는 중입니다...",
            "이목구비의 조화를 대조하고 있습니다...",
            "전생의 연을 찾고 있습니다...",
            "관상을 기록하는 중입니다...",
            "분석이 완료되었습니다!"
        ];
    } else {
        createLandmarks();
        statuses = [
            "얼굴의 주요 랜드마크 스캔 중...",
            "도덕성 지수 스캔 중...",
            "잠재적 성향 분석 중...",
            "미세 표정 기운 감지하는 중...",
            "분석이 완료되었습니다!"
        ];
    }

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

function createLandmarks() {
    const scanContainer = document.querySelector('.scan-box');
    if (!scanContainer) return;

    const overlay = document.createElement('div');
    overlay.className = 'landmark-overlay';

    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.top = Math.random() * 80 + 10 + '%';
        dot.style.left = Math.random() * 80 + 10 + '%';
        dot.style.transitionDelay = (Math.random() * 1) + 's';
        overlay.appendChild(dot);
    }

    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line-v2';
    overlay.appendChild(scanLine);

    scanContainer.appendChild(overlay);
    setTimeout(() => scanContainer.classList.add('landmark-active'), 100);
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
    if (!currentImage) return;

    const hash = getHash(currentImage + currentTest);

    if (currentTest === 'manhwa') {
        const index = hash % characters.length;
        const result = characters[index];
        const resTitle = document.getElementById('res-title');
        const resDesc = document.getElementById('res-desc');
        const resImg = document.getElementById('res-img');
        const keywordsBox = document.getElementById('res-keywords');

        if (resTitle) resTitle.innerHTML = `<span style="font-size: 0.8em; color: #888;">${result.name}</span><br>${result.title}`;
        if (resDesc) resDesc.innerText = result.desc;
        if (keywordsBox) {
            keywordsBox.innerHTML = '';
            result.keywords.forEach(k => {
                const span = document.createElement('span');
                span.className = 'keyword';
                span.innerText = k;
                keywordsBox.appendChild(span);
            });
        }
        if (resImg) resImg.src = result.img;
        showSection('result');
    } else if (currentTest === 'moral') {
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
        }, 300);
    } else if (currentTest === 'joseon') {
        const index = hash % joseonCharacters.length;
        const result = joseonCharacters[index];

        const resType = document.getElementById('joseon-res-type');
        const resImg = document.getElementById('joseon-res-img');
        const resDesc = document.getElementById('joseon-res-desc');
        const tagsBox = document.getElementById('joseon-res-tags');

        if (resType) resType.innerText = result.type;
        if (resImg) resImg.src = result.img;
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
        drawJoseonRadarChart(result.stats);
    }
}

function drawJoseonRadarChart(stats) {
    const canvas = document.getElementById('joseon-radar-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 65;
    const labels = ["이마", "눈", "코", "입", "턱"];
    const angleStep = (Math.PI * 2) / labels.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        for (let j = 0; j < labels.length; j++) {
            const r = (radius / 5) * i;
            const x = centerX + r * Math.cos(j * angleStep - Math.PI / 2);
            const y = centerY + r * Math.sin(j * angleStep - Math.PI / 2);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    ctx.beginPath();
    for (let i = 0; i < labels.length; i++) {
        const x = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);

        ctx.font = 'bold 11px Gungsuh, serif';
        ctx.fillStyle = '#777';
        const labelX = centerX + (radius + 18) * Math.cos(i * angleStep - Math.PI / 2);
        const labelY = centerY + (radius + 18) * Math.sin(i * angleStep - Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], labelX, labelY);
    }
    ctx.strokeStyle = '#ddd';
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < stats.length; i++) {
        const r = (stats[i] / 100) * radius;
        const x = centerX + r * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + r * Math.sin(i * angleStep - Math.PI / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(17, 17, 17, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("링크가 복사되었습니다!");
    }).catch(() => {
        // Fallback for non-HTTPS
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
            title: '테스트랩 - 관상 테스트',
            text: 'AI가 분석하는 나의 잠재적 관상은? 지금 확인해보세요!',
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
