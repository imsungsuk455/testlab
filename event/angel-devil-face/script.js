/* 천사악마 관상 테스트 로직 - 상견례 테스트와 동일한 hash 기반 결정론적 결과 선택 방식 */
document.addEventListener('DOMContentLoaded', () => {

    const homeSec = document.getElementById('t-home');
    const uploadSec = document.getElementById('t-upload');
    const loadingSec = document.getElementById('t-loading');
    const resultSec = document.getElementById('t-result');

    const startBtn = document.getElementById('t-start-btn');
    const fileInput = document.getElementById('t-file-input');
    const uploadBox = document.getElementById('t-drop-zone');
    const previewBox = document.getElementById('t-preview-box');
    const previewImg = document.getElementById('t-image-preview');
    const analyzeBtn = document.getElementById('t-analyze-btn');

    const scanImg = document.getElementById('t-scan-image');
    const loadingText = document.getElementById('t-loading-text');

    const resLabel = document.getElementById('t-res-label');
    const resTitle = document.getElementById('t-res-title');
    const resDesc = document.getElementById('t-res-desc-text');
    const resExtra = document.getElementById('t-res-extra-text');
    const resIcon = document.getElementById('t-res-icon');
    const resUserImg = document.getElementById('t-res-user-img');
    const resCharImg = document.getElementById('t-res-char-img');

    const retryBtn = document.getElementById('t-retry-btn');
    const shareLinkBtn = document.getElementById('t-share-link');
    const shareNativeBtn = document.getElementById('t-share-native');

    let currentImageData = null;
    let currentImageFile = null;

    // ===== 결과 유형 정의 =====
    // 천사악마 관상 테스트 결과 배열. 각 항목:
    //   type  : angel(천사상) or devil(악마상)
    //   icon  : 결과 이모지
    //   title : 결과 제목 (재미있고 구체적으로)
    //   desc  : 결과 설명 (2~4문장, 친근한 존댓말)
    //   extra : 추가 코멘트 (선택)
    //   img   : 결과 캐릭터 이미지
    const resultsData = [
        { id: 1, type: "angel", icon: "👼", title: "순수 그 자체 수호천사상", desc: "아이처럼 맑은 눈빛과 순수한 인상의 소유자. 주변 사람들이 보기만 해도 마음이 치유되는 타입입니다. 천사 관상의 핵심인 부드러운 눈매와 맑은 피부 톤을 갖추고 있어, 어디서나 환영받는 존재예요.", extra: "당신의 미소는 남에게 축복입니다.", img: "../../images/char_angel_guardian.webp" },
        { id: 2, type: "angel", icon: "✨", title: "온화한 미소 대천사상", desc: "웃는 모습이 사람을 편안하게 만드는 대천사급 인상입니다. 관상학에서 말하는 '앙월구'처럼 입꼬리가 자연스럽게 올라가 있어, 주변에 긍정 에너지를 퍼뜨리는 타입이에요. 상대를 배려하는 눈빛이 매력 포인트!", extra: "당신의 존재 자체가 좋은 기운입니다.", img: "../../images/char_angel_archangel.webp" },
        { id: 3, type: "angel", icon: "💛", title: "따뜻한 조력자 세라핌상", desc: "남을 돕는 데 타고난 따뜻한 관상입니다. 넓은 이마와 온화한 인중이 웃음을 자아내는 얼굴로, 친구들이 고민 상담을 가장 많이 찾는 타입이에요. 천사 중에서도 가장 자상한 부류!", extra: "사람들은 당신 곁에서 안심합니다.", img: "../../images/char_angel_seraph.webp" },
        { id: 4, type: "angel", icon: "🕊️", title: "평화의 사절 천사장상", desc: "갈등을 중재하는 데 능한 평화주의자 관상입니다. 단정한 눈썹과 균형 잡힌 이목구비가 신뢰감을 주어, 어디서든 중재자 역할을 자연스럽게 맡게 되는 타입이에요. 차분한 말투의 소유자!", extra: "당신의 평온함이 주변을 진정시킵니다.", img: "../../images/char_angel_peace.webp" },
        { id: 5, type: "angel", icon: "🎀", title: "싹싹한 미소 천사상", desc: "인상을 쓰는 법이 없는 사랑스러운 관상입니다. 동그란 눈매와 부드러운 턱선이 귀여움을 담당하며, 주변 사람들을 기분 좋게 만드는 재주가 있어요. 모두가 좋아하는 '싹싹이' 타입!", extra: "당신의 천사 미소는 무기입니다.", img: "../../images/char_angel_cute.webp" },
        { id: 6, type: "devil", icon: "😈", title: "매혹적인 팔색조 악마상", desc: "남의 마음을 사로잡는 매력의 소유자. 날카롭지만 매혹적인 눈매가 특징으로, 처음 만난 사람도 단번에 사로잡는 치명적 관상입니다. 악마 관상답게 분위기 전환이 자유자재예요!", extra: "그 매력은 유일무이한 무기입니다.", img: "../../images/char_devil_charm.webp" },
        { id: 7, type: "devil", icon: "🔥", title: "카리스마 폭군 마왕상", desc: "가만히 있어도 존재감이 느껴지는 압도적 관상입니다. 높은 콧대와 날카로운 턱선이 리더의 기운을 풍기며, 주변 사람들이 자연스럽게 따르게 되는 타입이에요. 마왕급 카리스마의 소유자!", extra: "당신의 존재감은 그 자체로 리더십입니다.", img: "../../images/char_devil_king.webp" },
        { id: 8, type: "devil", icon: "🦊", title: "영리한 책략가 트릭스터상", desc: "눈치가 빠르고 상황 판단이 탁월한 영리한 관상입니다. 빛나는 눈빛과 영리한 미소가 특징으로, 복잡한 상황도 기발한 아이디어로 풀어내는 타입이에요. 악마 중에서도 가장 똑똑한 부류!", extra: "당신의 통찰력은 남다릅니다.", img: "../../images/char_devil_trickster.webp" },
        { id: 9, type: "devil", icon: "🖤", title: "냉철한 판단력 듀크상", desc: "감정에 휩쓸리지 않는 냉철한 관상입니다. 예리한 눈매와 단정한 입매가 이성적인 인상을 주며, 어려운 결정도 망설임 없이 내리는 타입이에요. 악마답게 확실한 원칙주의자!", extra: "당신의 판단은 늘 신중합니다.", img: "../../images/char_devil_duke.webp" },
        { id: 10, type: "devil", icon: "🌙", title: "신비로운 매력 쿨데미안상", desc: "쉽게 속마음을 보여주지 않는 신비로운 관상입니다. 가만히 있어도 분위기가 느껴지는 눈매가 특징으로, 다가가기 어려워 보이지만 알고 보면 매력 넘치는 타입이에요. 악마 중에서도 가장 신비로운 부류!", extra: "당신의 신비로움이 사람을 끌어당깁니다.", img: "../../images/char_devil_moon.webp" },
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

    startBtn.addEventListener('click', () => showSection('t-upload'));

    uploadBox.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            const file = this.files[0];
            currentImageFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                currentImageData = e.target.result;
                previewImg.src = currentImageData;
                uploadBox.style.display = 'none';
                previewBox.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    analyzeBtn.addEventListener('click', () => {
        showSection('t-loading');
        scanImg.src = currentImageData;

        let i = 0;
        const msgs = ["인상 데이터 스캔 중...", "관상 데이터 대조 중...", "결과를 정리하고 있습니다..."];
        const interval = setInterval(() => {
            loadingText.style.opacity = 0;
            setTimeout(() => {
                loadingText.textContent = msgs[++i % msgs.length];
                loadingText.style.opacity = 1;
            }, 300);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            const hashInput = currentImageFile ? `${currentImageFile.name}-${currentImageFile.size}-${currentImageFile.lastModified}` : currentImageData;
            const hash = getHash(hashInput);
            const res = resultsData[hash % resultsData.length];

            resLabel.textContent = res.type === 'angel' ? "😇 천사 관상" : "😈 악마 관상";
            resLabel.className = `custom-badge ${res.type === 'angel' ? 'custom-pass' : 'custom-fail'}`;

            resTitle.innerHTML = res.title;
            resDesc.innerHTML = res.desc;
            resExtra.innerHTML = res.extra || "";
            resIcon.textContent = res.icon;
            resUserImg.src = currentImageData;
            resCharImg.src = res.img || "";

            showSection('t-result');
        }, 3500);
    });

    retryBtn.addEventListener('click', () => {
        currentImageData = null;
        currentImageFile = null;
        previewBox.style.display = 'none';
        uploadBox.style.display = 'block';
        fileInput.value = '';
        showSection('t-home');
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
            navigator.share({ title: '천사악마 관상 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
