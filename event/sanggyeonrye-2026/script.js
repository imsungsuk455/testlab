document.addEventListener('DOMContentLoaded', () => {

    const homeSec = document.getElementById('sg-free-home');
    const uploadSec = document.getElementById('sg-free-upload');
    const loadingSec = document.getElementById('sg-free-loading');
    const resultSec = document.getElementById('sg-free-result');

    const startBtn = document.getElementById('sg-free-start-btn');
    const fileInput = document.getElementById('sg-free-file-input');
    const uploadBox = document.getElementById('sg-free-drop-zone');
    const previewBox = document.getElementById('sg-free-preview-box');
    const previewImg = document.getElementById('sg-free-image-preview');
    const analyzeBtn = document.getElementById('sg-free-analyze-btn');

    const scanImg = document.getElementById('sg-free-scan-image');
    const loadingText = document.getElementById('sg-free-loading-text');

    const resLabel = document.getElementById('sg-free-res-label');
    const resTitle = document.getElementById('sg-free-res-title');
    const resDesc = document.getElementById('sg-free-res-desc-text');
    const resParent = document.getElementById('sg-free-parent-thought');
    const resIcon = document.getElementById('sg-free-res-icon');
    const resUserImg = document.getElementById('sg-free-res-user-img');

    const retryBtn = document.getElementById('sg-free-retry-btn');
    const shareLinkBtn = document.getElementById('sg-free-share-link');
    const shareNativeBtn = document.getElementById('sg-free-share-native');

    let currentImageFile = null;
    let objectUrl = null;

    const resultsData = [
        { id: 1, type: "pass", icon: "👑", title: "\"어머님, 저한테 맡기시죠!\"<br>든든한 국보급 종손/맏며느리상", desc: "어른들이 보자마자 \"아이고 든든하다\"며 손부터 부여잡을 상. 어떤 시련이 와도 가정을 굳건히 지킬 것 같은 안정감 100%의 관상입니다. 젓가락 세팅부터 어색한 분위기 타파까지 분위기를 리드하는 능력이 뛰어납니다.", parent: "'우리 애가 든든한 사람을 만났구나!'" },
        { id: 2, type: "pass", icon: "🍑", title: "\"입만 열면 분위기 사르륵~\"<br>과즙 팡팡 애교 인간 복숭아상", desc: "무거운 상견례 분위기도 단숨에 아이스크림처럼 녹여버릴 애교 만점 관상. 눈꼬리가 부드럽고 웃는 상이라 숨만 쉬어도 어른들 입가에 미소가 번집니다. 침묵이 흐를 때 나오는 자연스러운 리액션은 어른들의 무장해제 버튼!", parent: "'어머, 웃는 모습이 참 예쁘고 싹싹하네~'" },
        { id: 3, type: "pass", icon: "💡", title: "\"어디 내놔도 안 부끄러운\"<br>싹싹 만렙 일잘러 재간둥이상", desc: "눈치가 빠르고 센스 넘치는 관상. 적재적소에 알맞은 호응과 예의범절을 장착했습니다. 양가 부모님의 취향을 빠르게 간파하고 맞춤형 대화 주제를 던져 점수를 땁니다.", parent: "'눈치도 빠르고, 우리 애가 참 사람을 잘 골랐네.'" },
        { id: 4, type: "pass", icon: "🕊️", title: "\"호수 같은 평온함\"<br>나긋나긋 다정다감 ASMR 인간상", desc: "화를 내는 법을 모를 것 같은 선함의 결정체. 물 흐르듯 유연하고 다정한 인상으로 예비 시부모님/장인장모님의 마음을 평온하게 만듭니다. 당황스러운 질문이 들어와도 우아하고 지혜롭게 넘기는 방어력이 일품입니다.", parent: "'참 선하고 차분해서 마음이 놓인다.'" },
        { id: 5, type: "pass", icon: "🌟", title: "어머니들의 영원한 원픽<br>임영웅/김호중급 호감상", desc: "설명이 필요 없는 최고의 프리패스상. 어른들의 아이돌 관상으로, 상견례 자리에서 용돈을 두둑하게 받을 확률이 가장 높습니다. 존재 자체로 프리패스 티켓을 쥔 거나 다름없습니다.", parent: "'아이고~ 인물이 아주 훤칠하구만!'" },
        { id: 6, type: "pass", icon: "💪", title: "\"어딜 가도 굶어 죽진 않을\"<br>생활력 만렙상", desc: "눈빛에 생기가 돌고 생활력이 강해 보이는 상. \"둘이 무인도에 떨어져도 잘 살겠네\"라는 강한 믿음을 주는 야무진 관상입니다. 매사에 열정적이고 긍정적인 에너지를 뿜어냅니다.", parent: "'둘이서 야무지게 잘 살겠어. 걱정 없네!'" },
        { id: 7, type: "fail", icon: "🍻", title: "\"주말마다 친구랑 술 마실 것 같은\"<br>뽀로로상", desc: "노는 게 제일 좋은 자유 영혼의 관상. 사람 좋은 웃음을 가졌지만, 어른들 속으로 '우리 애가 결혼해서 마음고생 좀 하겠네'라는 묘한 걱정을 유발할 수 있습니다. 상견례 날만큼은 단정한 코스프레가 필수입니다!", parent: "'사람 참 좋아 보이는데... 술은 적당히 마시려나?'" },
        { id: 8, type: "fail", icon: "👀", title: "\"말대꾸 꼬박꼬박 할 것 같은\"<br>맑은 눈의 광인상", desc: "맑고 초롱초롱한 눈망울 속에 숨겨진 굽히지 않는 기조. 어른들의 뼈 있는 농담에도 해맑은 얼굴로 팩트 폭력을 날릴 것 같은 아슬아슬한 상입니다. 상견례 날엔 눈에 묘한 광기를 조금 빼는 것을 추천합니다.", parent: "'...우리 애가 꽉 잡혀 살진 않겠지?'" },
        { id: 9, type: "fail", icon: "✈️", title: "\"명절 대신 호캉스 예약할\"<br>마이웨이 YOLO상", desc: "인생은 한 번뿐! 자기애가 넘치고 현재의 행복이 가장 중요한 자유로운 영혼의 관상입니다. \"명절엔 모름지기 해외여행이죠!\"라는 해맑은 폭탄 발언으로 어른들의 뒷목을 잡게 할 위험이 큽니다. 오늘은 마이웨이 본능을 잠시 숨겨두세요!", parent: "'우리 애가 명절마다 혼자 고생하는 건 아니겠지...?'" },
        { id: 10, type: "fail", icon: "🏄", title: "\"월급 스쳐 지나가는 소리가 들리는\"<br>태평양 베짱이상", desc: "인물은 훤칠하고 입담도 좋지만, 묘하게 통장 잔고가 걱정되는 '한량' 느낌을 풍기는 관상입니다. \"돈은 쓰라고 있는 거죠~\"라는 특유의 여유로운 미소가 아찔한 상상을 불러일으킬 수 있습니다. 오늘은 최대한 경제 관념 투철한 척이 필수입니다.", parent: "'사람 참 착해보이는데... 모아둔 돈은 있으려나?'" }
    ];

    function getHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return Math.abs(hash);
    }

    function showSection(id) {
        [homeSec, uploadSec, loadingSec, resultSec].forEach(s => {
            s.style.display = 'none';
            s.classList.remove('active');
        });
        const target = document.getElementById(id);
        if (target) {
            target.style.display = 'block';
            setTimeout(() => target.classList.add('active'), 10);
            window.scrollTo(0, 0);
        }
    }

    startBtn.addEventListener('click', () => showSection('sg-free-upload'));

    uploadBox.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            currentImageFile = this.files[0];
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            objectUrl = URL.createObjectURL(currentImageFile);

            previewImg.src = objectUrl;
            uploadBox.style.display = 'none';
            previewBox.style.display = 'block';
        }
    });

    analyzeBtn.addEventListener('click', () => {
        showSection('sg-free-loading');
        scanImg.src = objectUrl;

        let i = 0;
        const msgs = ["인상 데이터 스캔 중...", "어른들 심쿵 포인트 계산 중...", "관상 데이터 대조 중..."];
        const interval = setInterval(() => {
            loadingText.style.opacity = 0;
            setTimeout(() => {
                loadingText.textContent = msgs[++i % msgs.length];
                loadingText.style.opacity = 1;
            }, 300);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            const hash = getHash(currentImageFile.name + currentImageFile.size);
            const res = resultsData[hash % resultsData.length];

            resLabel.textContent = res.type === 'pass' ? "대망의 프리패스상" : "아슬아슬 재검토상";
            resLabel.className = `custom-badge ${res.type === 'pass' ? 'custom-pass' : 'custom-fail'}`;

            resTitle.innerHTML = res.title;
            resDesc.innerHTML = res.desc;
            resParent.innerHTML = "어른들 속마음: " + res.parent;
            resIcon.textContent = res.icon;
            resUserImg.src = objectUrl;

            showSection('sg-free-result');
        }, 3500);
    });

    retryBtn.addEventListener('click', () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = null;
        previewBox.style.display = 'none';
        uploadBox.style.display = 'block';
        fileInput.value = '';
        showSection('sg-free-home');
    });

    shareLinkBtn.addEventListener('click', () => {
        const toast = document.getElementById('toast');
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        });
    });

    shareNativeBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({ title: '상견례 관상 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
