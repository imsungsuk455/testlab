/* 정신연령 테스트 로직 (퀴즈형)
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

    // ===== 결과 유형 정의 (정신연령 6개 연령대) =====
    const results = [
        {
            id: "child",
            icon: "🧸",
            title: "유아기 (10대 미만)",
            desc: "당신의 정신연령은 순수함 그 자체인 유아기! 세상을 호기심 가득한 눈으로 바라보며, 작은 것에도 즐거움을 느끼는 순수한 영혼입니다. 장난기와 천진난만함이 당신의 가장 큰 매력이에요.",
            tags: ["순수", "호기심", "장난기"],
            extra: "당신의 천진함은 주변을 밝게 만듭니다.",
            img: "../../images/char_age_child.webp"
        },
        {
            id: "teen",
            icon: "🎧",
            title: "청소년기 (10~19세)",
            desc: "당신의 정신연령은 감수성이 폭발하는 청소년기! 새로운 것에 빠르게 적응하고, 좋아하는 것에 뜨거운 열정을 쏟는 타입입니다. 트렌드에 민감하고 감정의 기복이 있는 반면, 넘치는 에너지가 매력이에요.",
            tags: ["열정", "감수성", "트렌드"],
            extra: "당신의 열정은 이 시대의 보물입니다.",
            img: "../../images/char_age_teen.webp"
        },
        {
            id: "young",
            icon: "💼",
            title: "청년기 (20~29세)",
            desc: "당신의 정신연령은 꿈과 현실 사이에서 균형을 잡아가는 청년기! 미래에 대한 설렘과 불안을 동시에 품고 있지만, 도전을 두려워하지 않는 용기를 지녔습니다. 사회생활에 적응하며 성장 중인 영혼이에요.",
            tags: ["도전", "성장", "열정"],
            extra: "당신의 도전 정신은 미래의 자산입니다.",
            img: "../../images/char_age_young.webp"
        },
        {
            id: "mature",
            icon: "🌳",
            title: "성숙기 (30~39세)",
            desc: "당신의 정신연령은 현실과 꿈 사이의 균형을 잡은 성숙기! 안정된 판단력과 여유로운 마음가짐을 지녔으며, 중요한 일과 여유로운 일을 구분하는 지혜가 있습니다. 책임감이 있으면서도 융통성을 겸비했어요.",
            tags: ["성숙", "안정", "균형"],
            extra: "당신의 균형 감각은 인생의 자산입니다.",
            img: "../../images/char_age_mature.webp"
        },
        {
            id: "wise",
            icon: "🦉",
            title: "지혜기 (40~49세)",
            desc: "당신의 정신연령은 경험에서 우러나는 지혜기! 인생의 깊이를 이해하고, 사람과 상황을 꿰뚫는 통찰력을 지녔습니다. 조급함 없이 느긋하게 세상을 바라보는 여유가 있어요.",
            tags: ["지혜", "통찰", "여유"],
            extra: "당신의 통찰력은 이 시대의 스승입니다.",
            img: "../../images/char_age_wise.webp"
        },
        {
            id: "elder",
            icon: "🏮",
            title: "노련기 (50세 이상)",
            desc: "당신의 정신연령은 모든 것을 꿰뚫는 노련기! 세상일의 흐름을 꿰뚫는 혜안과, 어떤 상황에서도 흔들리지 않는 평정심을 지녔습니다. 세상에 대해 이미 다 알고 있는 듯한 고요한 자신감이 있어요.",
            tags: ["혜안", "평정", "노련"],
            extra: "당신의 평정심은 모두의 귀감입니다.",
            img: "../../images/char_age_elder.webp"
        },
    ];

    // ===== 질문 정의 (정신연령 측정) =====
    const questions = [
        {
            q: "주말 오후, 가장 하고 싶은 것은?",
            options: [
                { text: "놀이공원 가서 신나게 놀기", scores: { "child": 2, "teen": 1 } },
                { text: "친구들과 신나게 놀기", scores: { "teen": 2 } },
                { text: "새로운 취미나 운동 도전하기", scores: { "young": 2 } },
                { text: "집에서 차분히 쉬며 책 읽기", scores: { "mature": 2, "wise": 1 } },
                { text: "혼자 조용히 산책하며 생각하기", scores: { "wise": 2, "elder": 1 } },
            ]
        },
        {
            q: "친구가 충동적으로 위험한 결정을 하려 한다면?",
            options: [
                { text: "재밌어 보인다, 같이 하자!", scores: { "child": 1, "teen": 2 } },
                { text: "어차피 후회할 거 안다, 그냥 둔다", scores: { "teen": 1, "young": 1 } },
                { text: "장단점을 정리해 조언해준다", scores: { "mature": 2, "wise": 1 } },
                { text: "이미 예견된 일, 조용히 지켜본다", scores: { "elder": 2 } },
            ]
        },
        {
            q: "화가 났을 때 나의 반응은?",
            options: [
                { text: "펑펑 울거나 소리친다", scores: { "child": 2 } },
                { text: "SNS에 올려 하소연한다", scores: { "teen": 2 } },
                { text: "한동안 삐져서 말을 안 한다", scores: { "young": 2 } },
                { text: "깊게 숨 쉬고 대화로 풀려 한다", scores: { "mature": 2 } },
                { text: "화날 일이 없다, 다 흘러간다", scores: { "elder": 2 } },
            ]
        },
        {
            q: "SNS를 보는 나의 모습은?",
            options: [
                { text: "내가 재밌는 걸 올리는 게 최고", scores: { "child": 1, "teen": 2 } },
                { text: "인스타 감성 피드 꾸미기 좋아함", scores: { "teen": 2 } },
                { text: "업무/정보용으로만 사용", scores: { "young": 1, "mature": 2 } },
                { text: "잘 안 봄, 실컷 봐도 뭐가 재밌는지", scores: { "wise": 2, "elder": 1 } },
            ]
        },
        {
            q: "돈을 관리하는 나의 스타일은?",
            options: [
                { text: "돈은 쓰라고 있는 것!", scores: { "child": 1, "teen": 2 } },
                { text: "매달 저금, 목표 모으기", scores: { "young": 2 } },
                { text: "가계부를 정리하며 계획적으로", scores: { "mature": 2, "wise": 1 } },
                { text: "큰 그림으로 투자, 초연함", scores: { "elder": 2 } },
            ]
        },
        {
            q: "새로운 기술이나 기기를 접하면?",
            options: [
                { text: "무서워요, 안 배워도 돼요", scores: { "elder": 2 } },
                { text: "이해할 때까지 공부한다", scores: { "mature": 1, "wise": 2 } },
                { text: "일단 써보고 필요하면 배운다", scores: { "young": 2, "mature": 1 } },
                { text: "바로 사고 신나게 사용해본다", scores: { "teen": 2, "child": 1 } },
            ]
        },
        {
            q: "인생에서 가장 중요한 것은?",
            options: [
                { text: "재미! 놀기! 행복!", scores: { "child": 2 } },
                { text: "사랑과 우정, 나의 감정", scores: { "teen": 2, "young": 1 } },
                { text: "자기 개발과 성장", scores: { "young": 2 } },
                { text: "건강과 가족, 안정", scores: { "mature": 2, "wise": 1 } },
                { text: "평온함과 내면의 평화", scores: { "wise": 1, "elder": 2 } },
            ]
        },
        {
            q: "주변 사람들이 나를 이렇게 표현한다:",
            options: [
                { text: "아이 같다, 귀엽다", scores: { "child": 2 } },
                { text: "지금 이 순간을 산다", scores: { "teen": 2 } },
                { text: "미래를 향해 달려간다", scores: { "young": 2 } },
                { text: "믿음직하고 든든하다", scores: { "mature": 2 } },
                { text: "세상을 다 아는 것 같다", scores: { "wise": 1, "elder": 2 } },
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
            resDesc.innerHTML = res.desc;
            resTags.innerHTML = (res.tags || []).map(t => `<span class="q-result-tag">#${t}</span>`).join('');
            resExtra.innerHTML = res.extra ? `<strong>한 줄 조언</strong><br>${res.extra}` : '';
            resCharImg.src = res.img || '';

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
            navigator.share({ title: '정신연령 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
