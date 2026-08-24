/* 재물운 부자 관상 테스트 로직 - 상견례 테스트와 동일한 hash 기반 결정론적 결과 선택 방식 */
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
    const resCharImg = document.getElementById('t-res-char-img');
    const resTitle = document.getElementById('t-res-title');
    const resDesc = document.getElementById('t-res-desc-text');
    const resExtra = document.getElementById('t-res-extra-text');
    const resIcon = document.getElementById('t-res-icon');
    const resUserImg = document.getElementById('t-res-user-img');

    const retryBtn = document.getElementById('t-retry-btn');
    const shareLinkBtn = document.getElementById('t-share-link');
    const shareNativeBtn = document.getElementById('t-share-native');

    let currentImageData = null;
    let currentImageFile = null;

    // ===== 결과 유형 정의 =====
    // 부자 6유형(type: pass) + 가난 3유형(type: fail), 총 9개
    const resultsData = [
        { id: 1, type: "pass", grade: "재물운 SS급", icon: "💰", title: "천하대부상", desc: "넓은 이마와 오목하게 서 있는 코, 타원형 턱까지 갖춘 전통 관상학 최고 등급의 얼굴입니다. 옛말에 '천리 길에 황금이 깔린 상'이라 하였는데, 당신이 걸어가는 곳마다 돈이 먼저 도착해 기다리고 있어요. 큰돈을 다루는 자리에 오르면 그 능력이 배로 커지는 타입입니다.", extra: "당신의 지갑에서는 빈손이 나올 수 없습니다. 🍀 행운 아이템: 황금 반지", img: "../../images/char_wealth_tycoon.webp" },
        { id: 2, type: "pass", grade: "재물운 A급", icon: "🏦", title: "성실 축재상", desc: "단정한 눈썹과 꼼꼼하게 모아진 인중이 특징인 '모아서 버는 상'입니다. 화끈하게 한 방보다 매달 꾸준히 쌓는 저축과 투자에서 진짜 실력을 발휘하는 타입이에요. 10년 뒤 당신 통장 잔고를 보면 지금 이 말을 믿게 될 겁니다.", extra: "복리의 신은 성실한 사람을 배신하지 않아요. 🍀 행운 아이템: 자동이체", img: "../../images/char_wealth_saver.webp" },
        { id: 3, type: "pass", grade: "재물운 A급", icon: "🍀", title: "횡재 행운상", desc: "동그랗게 발달한 광대뼈와 밝은 눈매는 '복이 밖으로 새어 나오지 않는 상'으로 해석됩니다. 노력해서 버는 돈도 좋지만, 당신에게는 뜻밖의 경품, 환급금, 깜짝 이벤트 같은 횡재운이 따르는 타입이에요. 아무 때나 복권을 사지 마세요. 필요할 때 알아서 들어옵니다.", extra: "운명이 당신 몫의 복을 따로 챙겨두고 있습니다. 🍀 행운 아이템: 편의점 복권", img: "../../images/char_wealth_lucky.webp" },
        { id: 4, type: "pass", grade: "재물운 S급", icon: "👑", title: "왕후장상", desc: "관상학에서 일컫는 '왕후장상(王侯將相)', 돈과 명예를 동시에 품는 귀한 얼굴입니다. 또렷한 이목구비와 흐름 있는 윤곽선이 사람을 끌어당기는 카리스마를 만들어, 주변 사람들이 자연스럽게 당신을 따르게 돼요. 돈은 이미 당신을 향해 걸어오고 있습니다.", extra: "부와 명예, 두 마리 토끼를 잡을 상입니다. 🍀 행운 아이템: 새 명함", img: "../../images/char_wealth_royal.webp" },
        { id: 5, type: "pass", grade: "재물운 B+급", icon: "🌊", title: "수완가 상", desc: "날카롭지만 반짝이는 눈매와 여유 있는 입매는 '돈을 굴려 불리는 상'입니다. 벌 때 확실하게 벌되, 굴릴 줄 아는 사람은 결국 남는 게 많다는 게 관상학의 정설이죠. 당신 손에 들어간 돈은 멈추지 않고 불어납니다.", extra: "돈은 잘 굴리는 사람 곁으로 모입니다. 🍀 행운 아이템: 모아보기 앱", img: "../../images/char_wealth_player.webp" },
        { id: 6, type: "pass", grade: "재물운 B급", icon: "☕", title: "소확행 부자상", desc: "부드러운 눈매와 안정감 있는 턱선은 '작지만 확실한 복을 누리는 상'입니다. 대박보다 매일의 여유를 아는 것이야말로 진짜 부자라는 걸 당신은 이미 직관적으로 알고 있어요. 오늘의 라떼 한 잔이 당신에게는 금강산입니다.", extra: "소확행이 쌓이면 그게 진짜 대박입니다. 🍀 행운 아이템: 좋아하는 디저트", img: "../../images/char_wealth_smalljoy.webp" },
        { id: 7, type: "fail", grade: "재물운 C급", icon: "💸", title: "월급날 한척상", desc: "반짝이는 눈빛과 통통한 볼살은 '쓰고 싶을 때 다 쓰는 상'의 전형입니다. 평소에는 지갑이 허하다 못해 바람이 불지만, 월급이 들어온 그날만큼은 대한민국 상위 1%의 기분을 맛볼 수 있어요. 문제는 그 기분이 정확히 72시간이라는 것.", extra: "월급날의 영웅, 월말의 유랑민. ⚠️ 주의 아이템: 카드 명세서", img: "../../images/char_wealth_payday.webp" },
        { id: 8, type: "fail", grade: "재물운 D급", icon: "🕳️", title: "구멍 뚫린 지갑상", desc: "관상학적으로 눈매가 반짝이면 쓸 돈도 많다고 보는데, 당신은 그 반짝임이 고스란히 카드값으로 새고 있습니다. 돈이 손에 잡히기는커녕 스쳐 지나가는 '바람등지기 상'이라 하겠습니다. 다만 걱정 마세요. 새는 구멍이 있다는 건 들어올 물량이 있다는 뜻이니까요.", extra: "지갑은 가벼워도 미래는 무겁게 준비하세요. ⚠️ 주의 아이템: 가계부", img: "../../images/char_wealth_holewallet.webp" },
        { id: 9, type: "fail", grade: "잠재력 무한급", icon: "🌱", title: "숨겨진 예비부자상", desc: "겉으로는 평범해 보여도, 관상학에서 말하는 '대기만성(大器晩成)'의 기운이 가득 차 있습니다. 지금은 복이 아직 꽃피우기 전일 뿐, 시기를 놓치지만 않으면 늦게 피는 복이 제일 크게 피어납니다. 조급해하지 않는 것이 당신의 최고 전략이에요.", extra: "늦게 핀 꽃이 가장 오래 핍니다. 🌱 응원 아이템: 종잣독", img: "../../images/char_wealth_latebloomer.webp" }
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

            resLabel.textContent = `${res.icon} ${res.grade}`;
            resLabel.className = `custom-badge ${res.type === 'pass' ? 'custom-pass' : 'custom-fail'}`;

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
            navigator.share({ title: '재물운 부자 관상 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
