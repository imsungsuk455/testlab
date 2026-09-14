/* 나의 오라컬러 테스트 로직 (퀴즈형)
 *
 * 방식: 질문의 각 보기(옵션)가 특정 결과 유형에 가중치 점수를 준다.
 *       모든 질문에 답하면 유형별 점수를 합산해 가장 높은 유형이 결과가 된다.
 *
 * 데이터 구조:
 *   results    : 결과 유형 배열. 각 항목: { id, icon, title, desc, tags[], extra }
 *   questions  : 질문 배열. 각 항목: { q, options: [ { text, scores: { <resultId>: 가중치 } } ] }
 *
 * 예) scores: { "passion": 2, "logic": 1 } → 이 보기를 고르면 passion +2, logic +1
 */
document.addEventListener('DOMContentLoaded', () => {

    const homeSec = document.getElementById('q-home');
    const quizSec = document.getElementById('q-quiz');
    const loadingSec = document.getElementById('q-loading');
    const resultSec = document.getElementById('q-result');

    const startBtn = document.getElementById('q-start-btn');
    const questionText = document.getElementById('q-question-text');
    const optionsBox = document.getElementById('q-options');
    const prevBtn = document.getElementById('q-prev-btn');
    const currentNum = document.getElementById('q-current');
    const totalNum = document.getElementById('q-total');
    const progressFill = document.getElementById('q-progress-fill');

    const loadingText = document.getElementById('q-loading-text');

    const resTitle = document.getElementById('q-res-title');
    const resIcon = document.getElementById('q-res-icon');
    const resTags = document.getElementById('q-res-tags');
    const resDesc = document.getElementById('q-res-desc-text');
    const resExtra = document.getElementById('q-res-extra');
    const resCharImg = document.getElementById('q-res-char-img');

    const retryBtn = document.getElementById('q-retry-btn');
    const shareLinkBtn = document.getElementById('q-share-link');
    const shareNativeBtn = document.getElementById('q-share-native');

    // ===== 결과 유형 정의 =====
    const results = [
        {
            id: "red",
            icon: "❤️‍🔥",
            title: "열정 레드 오라",
            desc: "불같은 추진력의 소유자예요. 하고 싶은 게 생기면 바로 움직이고, 주변 사람까지 들뜨게 만드는 에너지가 있습니다. 모임에서는 자연스럽게 앞장서는 리더가 되곤 해요. 가끔 너무 앞서 나가서 지칠 때도 있지만, 그 열정 덕분에 일이 굴러갑니다.",
            tags: ["리더", "추진력", "열정"],
            extra: "당신의 열정이 주변을 움직입니다.",
            img: "../../images/char_aura_red.webp"
        },
        {
            id: "yellow",
            icon: "💛",
            title: "해피 옐로우 오라",
            desc: "어디서든 분위기를 밝히는 해피 바이러스예요. 어색한 자리도 금세 웃음바다로 만들고, 친구들이 힘들 때 가장 먼저 찾는 사람이랍니다. 긍정적인 말 한마디로 하루를 바꾸는 재주가 있어요. 가끔 속마음을 숨기고 웃을 때가 있으니 쉬어가는 것도 잊지 마세요.",
            tags: ["분위기메이커", "긍정", "에너지"],
            extra: "당신만 있으면 웃음이 끊이지 않아요.",
            img: "../../images/char_aura_yellow.webp"
        },
        {
            id: "green",
            icon: "💚",
            title: "힐링 그린 오라",
            desc: "조용히 곁을 지켜주는 포근한 힐링형이에요. 말보다 행동으로 위로하고, 함께하는 것만으로 편안함을 줍니다. 식물을 돌보듯 주변을 살피는 따뜻함이 있어요. 무리하지 않고 자기 페이스를 지키는 모습이 모두의 쉼터가 됩니다.",
            tags: ["힐링", "안정", "배려"],
            extra: "당신의 평온함이 모두의 쉼터입니다.",
            img: "../../images/char_aura_green.webp"
        },
        {
            id: "blue",
            icon: "💙",
            title: "차분 블루 오라",
            desc: "냉철하고 신뢰감 있는 지성파예요. 감정에 휩쓸리기보다 상황을 차분히 정리하고, 꼭 필요한 말을 건넵니다. 약속을 지키고 마무리가 깔끔해서 주변의 믿음이 두터워요. 가끔은 계산보다 마음 가는 대로 움직여도 괜찮답니다.",
            tags: ["이성적", "신뢰", "차분함"],
            extra: "당신의 말 한마디가 중심을 잡아줍니다.",
            img: "../../images/char_aura_blue.webp"
        },
        {
            id: "purple",
            icon: "💜",
            title: "몽환 퍼플 오라",
            desc: "감성과 상상력이 풍부한 아티스트형이에요. 남들이 못 보는 디테일을 캐치하고, 평범한 일상도 특별하게 해석합니다. 음악, 그림, 글 같은 창작에서 진가가 발휘돼요. 혼자만의 시간이 꼭 필요한 타입이라 충전 시간을 확보하면 매력이 폭발합니다.",
            tags: ["감성", "예술가", "몽환"],
            extra: "당신의 감성이 세상을 물들입니다.",
            img: "../../images/char_aura_purple.webp"
        },
        {
            id: "pink",
            icon: "🩷",
            title: "공감 핑크 오라",
            desc: "눈물 많고 정 많은 공감왕이에요. 상대의 기분을 누구보다 빨리 알아채고, 진심 어린 위로를 건넵니다. 사랑이 많은 만큼 사랑도 많이 받는 타입이랍니다. 남 챙기느라 정작 본인을 놓치지 않도록, 가끔은 나에게도 다정해지세요.",
            tags: ["공감", "다정", "사랑"],
            extra: "당신의 따뜻함이 사랑을 부릅니다.",
            img: "../../images/char_aura_pink.webp"
        },
    ];

    // ===== 질문 정의 =====
    const questions = [
        {
            q: "완벽하게 비어 있는 주말 아침, 가장 먼저 하고 싶은 건?",
            options: [
                { text: "바로 밖으로! 약속 잡고 나가기", scores: { "red": 2 } },
                { text: "친구에게 연락해서 수다 떨기", scores: { "yellow": 2 } },
                { text: "이불 속에서 뒹굴며 여유 부리기", scores: { "green": 2 } },
                { text: "밀린 할 일 정리하고 계획 세우기", scores: { "blue": 2 } },
            ]
        },
        {
            q: "처음 만난 사람들이 자주 하는 말이 있다면?",
            options: [
                { text: "신비롭고 독특하다는 말을 듣는다", scores: { "purple": 2 } },
                { text: "따뜻하고 편하다는 말을 듣는다", scores: { "pink": 2 } },
                { text: "눈빛이 강렬하다는 말을 듣는다", scores: { "red": 2 } },
                { text: "밝고 재밌다는 말을 듣는다", scores: { "yellow": 2 } },
            ]
        },
        {
            q: "스트레스가 폭발할 때 나는?",
            options: [
                { text: "공원 산책이나 혼자 멍 때리기", scores: { "green": 2 } },
                { text: "방 정리·할 일 정리를 하며 리셋", scores: { "blue": 2 } },
                { text: "좋아하는 음악·그림에 몰입하기", scores: { "purple": 2 } },
                { text: "친구에게 전화해서 털어놓기", scores: { "pink": 2 } },
            ]
        },
        {
            q: "단톡방에서 내 역할은?",
            options: [
                { text: "드립 치고 분위기 띄우기", scores: { "yellow": 2 } },
                { text: "약속 잡고 추진하기", scores: { "red": 2 } },
                { text: "정보 정리하고 일정 잡아주기", scores: { "blue": 2 } },
                { text: "하트·리액션 정성껏 눌러주기", scores: { "pink": 2 } },
            ]
        },
        {
            q: "이번 주말 가장 끌리는 장소는?",
            options: [
                { text: "감성 전시회·독립 서점", scores: { "purple": 2 } },
                { text: "햇살 좋은 공원·식물원", scores: { "green": 2 } },
                { text: "조용한 카페·도서관", scores: { "blue": 2 } },
                { text: "핫한 팝업·페스티벌", scores: { "red": 2 } },
            ]
        },
        {
            q: "옷장에서 손이 가장 자주 가는 무드는?",
            options: [
                { text: "부드러운 파스텔·니트", scores: { "pink": 2 } },
                { text: "쨍한 비비드·포인트 컬러", scores: { "yellow": 2 } },
                { text: "몽환적인 레이어드·빈티지", scores: { "purple": 2 } },
                { text: "편안한 내추럴·어스톤", scores: { "green": 2 } },
            ]
        },
        {
            q: "연애할 때 내 모습에 가장 가까운 건?",
            options: [
                { text: "좋으면 바로 직진한다", scores: { "red": 2 } },
                { text: "상대 기분을 먼저 살핀다", scores: { "pink": 2 } },
                { text: "신중하게 알아가며 천천히", scores: { "blue": 2 } },
                { text: "썸도 유쾌하게 즐긴다", scores: { "yellow": 1, "pink": 1 } },
            ]
        },
        {
            q: "2026 하반기, 가장 이루고 싶은 소원은?",
            options: [
                { text: "마음이 평온한 일상 되찾기", scores: { "green": 2 } },
                { text: "커리어·목표 확실하게 달성", scores: { "blue": 2 } },
                { text: "나만의 창작·취미 완성하기", scores: { "purple": 2 } },
                { text: "새로운 도전·여행 떠나기", scores: { "red": 2 } },
            ]
        },
    ];

    let currentIdx = 0;
    let answers = new Array(questions.length).fill(null); // 각 질문 선택 인덱스

    function showSection(id) {
        [homeSec, quizSec, loadingSec, resultSec].forEach(s => {
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

    function renderQuestion() {
        const q = questions[currentIdx];
        questionText.textContent = q.q;
        currentNum.textContent = currentIdx + 1;
        totalNum.textContent = questions.length;
        progressFill.style.width = ((currentIdx + 1) / questions.length * 100) + '%';

        optionsBox.innerHTML = '';
        q.options.forEach((opt, oi) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option' + (answers[currentIdx] === oi ? ' selected' : '');
            btn.innerHTML = `<span class="quiz-option-idx">${String.fromCharCode(65 + oi)}</span><span>${opt.text}</span>`;
            btn.addEventListener('click', () => {
                answers[currentIdx] = oi;
                renderQuestion();
                setTimeout(() => nextQuestion(), 200);
            });
            optionsBox.appendChild(btn);
        });

        prevBtn.style.display = currentIdx > 0 ? 'block' : 'none';
    }

    function nextQuestion() {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            renderQuestion();
        } else {
            computeResult();
        }
    }

    function prevQuestion() {
        if (currentIdx > 0) {
            currentIdx--;
            renderQuestion();
        }
    }

    function computeResult() {
        showSection('q-loading');
        let i = 0;
        const msgs = ["답변을 취합하고 있습니다...", "유형을 분석하고 있습니다...", "결과를 정리하고 있습니다..."];
        const interval = setInterval(() => {
            loadingText.style.opacity = 0;
            setTimeout(() => {
                loadingText.textContent = msgs[++i % msgs.length];
                loadingText.style.opacity = 1;
            }, 300);
        }, 800);

        setTimeout(() => {
            clearInterval(interval);
            const scores = {};
            results.forEach(r => scores[r.id] = 0);
            questions.forEach((q, qi) => {
                const opt = q.options[answers[qi]];
                if (opt && opt.scores) {
                    for (const [rid, w] of Object.entries(opt.scores)) {
                        scores[rid] = (scores[rid] || 0) + w;
                    }
                }
            });
            let topId = null;
            let topScore = -1;
            for (const [rid, s] of Object.entries(scores)) {
                if (s > topScore) {
                    topScore = s;
                    topId = rid;
                }
            }
            const res = results.find(r => r.id === topId) || results[0];

            resTitle.textContent = res.title;
            resIcon.textContent = res.icon;
            if (resCharImg && res.img) {
                resCharImg.src = res.img;
                resCharImg.alt = res.title;
            }
            resDesc.innerHTML = res.desc;
            resTags.innerHTML = (res.tags || []).map(t => `<span class="q-result-tag">#${t}</span>`).join('');
            resExtra.innerHTML = res.extra ? `<strong>한 줄 조언</strong><br>${res.extra}` : '';

            showSection('q-result');
        }, 2500);
    }

    function resetQuiz() {
        currentIdx = 0;
        answers = new Array(questions.length).fill(null);
        showSection('q-home');
    }

    startBtn.addEventListener('click', () => {
        currentIdx = 0;
        renderQuestion();
        showSection('q-quiz');
    });

    prevBtn.addEventListener('click', prevQuestion);
    retryBtn.addEventListener('click', resetQuiz);

    shareLinkBtn.addEventListener('click', () => {
        const toast = document.getElementById('toast');
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        });
    });

    shareNativeBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({ title: '나의 오라컬러 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
