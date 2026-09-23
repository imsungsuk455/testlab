/* MBTI 관상 테스트 로직 - 상견례 테스트와 동일한 hash 기반 결정론적 결과 선택 방식 */
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
    // MBTI 관상 테스트 결과 배열. 각 항목:
    //   mbti  : MBTI 유형명 (배지에 표시)
    //   type  : pass(외향 E) or fail(내향 I) — 배지 색상 구분용
    //   icon  : 결과 이모지
    //   title : 결과 제목 (재미있고 구체적으로)
    //   desc  : 결과 설명 (2~4문장, 친근한 존댓말)
    //   extra : 한 줄 코멘트 + 최고의 궁합
    //   img   : 결과 캐릭터 이미지
    const resultsData = [
        { id: 1, mbti: "ENTJ", type: "pass", icon: "👑", title: "눈빛부터 리더, 타고난 리더상", desc: "또렷한 눈매와 당당한 인상이 압도적인 리더 관상입니다. 가만히 있어도 '이 사람 뭔가 한다'는 기운이 풍겨 주변 사람들이 자연스럽게 따르게 돼요. 목표를 향한 직진 본능이 얼굴에 그대로 드러나는 타입입니다.", extra: "당신의 추진력은 주변의 나침반입니다. 💘 최고의 궁합: INFP 순수 몽상가상", img: "../../images/char_mbti_entj.webp" },
        { id: 2, mbti: "ENFP", type: "pass", icon: "🌈", title: "웃으면 세상이 밝아지는 해피 바이러스상", desc: "초롱초롱한 눈빛과 올라간 입꼬리가 행운을 부르는 해피 관상입니다. 처음 만난 사람도 5분이면 친구가 되는 마성의 친화력이 얼굴에 다 보여요. 어디서든 분위기를 살리는 무드메이커 타입이에요.", extra: "당신의 미소는 전염되는 행복입니다. 💘 최고의 궁합: INTJ 천재 전략가상", img: "../../images/char_mbti_enfp.webp" },
        { id: 3, mbti: "INFP", type: "fail", icon: "🌙", title: "맑고 깊은 눈망울, 순수 몽상가상", desc: "맑으면서도 어딘가 아련한 눈빛이 순수한 감성을 품은 몽상가 관상입니다. 겉은 조용해 보여도 속에는 누구보다 뜨거운 이야기가 가득한 타입이에요. 섬세한 눈매가 예술가적 기질을 그대로 보여줍니다.", extra: "당신의 감성은 세상을 따뜻하게 합니다. 💘 최고의 궁합: ENTJ 타고난 리더상", img: "../../images/char_mbti_infp.webp" },
        { id: 4, mbti: "INTJ", type: "fail", icon: "🧠", title: "속마음 다 보이는 천재 전략가상", desc: "차분하고 깊은 눈빛에서 치밀한 두뇌 회전이 느껴지는 전략가 관상입니다. 말수는 적지만 한마디 한마디가 핵심을 찌르는 타입이에요. 단정한 이마와 예리한 눈매가 '믿고 맡기는 얼굴'의 정석입니다.", extra: "당신의 침묵은 생각이 깊다는 증거입니다. 💘 최고의 궁합: ENFP 해피 바이러스상", img: "../../images/char_mbti_intj.webp" },
        { id: 5, mbti: "ESFP", type: "pass", icon: "🎉", title: "인싸력 만렙 분위기 메이커상", desc: "생기 넘치는 눈웃음과 활짝 열린 표정이 사람들을 끌어당기는 인싸 관상입니다. 모임만 가면 주인공이 되고 사진만 찍어도 '잘 나왔다'는 소리를 듣는 타입이에요. 즐거움이 얼굴에 새겨져 있습니다.", extra: "당신이 있는 곳이 곧 파티입니다. 💘 최고의 궁합: ISFJ 따뜻한 수호자상", img: "../../images/char_mbti_esfp.webp" },
        { id: 6, mbti: "ISTJ", type: "fail", icon: "🛡️", title: "보면 안심되는 믿음직 반듯상", desc: "단정하고 흐트러짐 없는 인상이 신뢰를 주는 반듯 관상입니다. 약속은 칼같이 지키고 맡은 일은 끝까지 해내는 성실함이 얼굴에 그대로 드러나요. 옆에 있으면 든든한 '사람 기둥' 타입이에요.", extra: "당신의 성실함은 모두의 버팀목입니다. 💘 최고의 궁합: ESFP 분위기 메이커상", img: "../../images/char_mbti_istj.webp" },
        { id: 7, mbti: "ENTP", type: "pass", icon: "⚡", title: "장난기 가득한 천재 발명가상", desc: "반짝이는 눈빛과 영리한 미소가 호기심 많은 발명가 관상입니다. 엉뚱한 아이디어로 주변을 놀라게 하고 토론만 시작하면 밤을 새우는 타입이에요. 재치가 얼굴 곳곳에 묻어나는 매력 부자입니다.", extra: "당신의 엉뚱함이 세상을 앞으로 이끕니다. 💘 최고의 궁합: ISFJ 따뜻한 수호자상", img: "../../images/char_mbti_entp.webp" },
        { id: 8, mbti: "ISFJ", type: "fail", icon: "🍀", title: "포근함 그 자체, 따뜻한 수호자상", desc: "온화한 눈매와 부드러운 미소가 사람을 편안하게 만드는 수호자 관상입니다. 남의 고민을 내 일처럼 들어주고 묵묵히 챙기는 따뜻함이 얼굴에 배어 있어요. 곁에 두면 평생 든든한 타입이에요.", extra: "당신의 다정함은 모두의 안식처입니다. 💘 최고의 궁합: ENTP 천재 발명가상", img: "../../images/char_mbti_isfj.webp" },
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

            resLabel.textContent = `${res.icon} ${res.mbti} 관상`;
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
            navigator.share({ title: 'MBTI 관상 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
