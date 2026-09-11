/* 이상형 동물 테스트 로직 (퀴즈형)
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

    const retryBtn = document.getElementById('q-retry-btn');
    const shareLinkBtn = document.getElementById('q-share-link');
    const shareNativeBtn = document.getElementById('q-share-native');

    // ===== 결과 유형 정의 (이상형 동물 8종) =====
    const results = [
        {
            id: "dog",
            icon: "🐶",
            title: "주인공만 바라보는 리트리버형",
            desc: "한번 좋아하면 끝까지 직진하는 타입이에요. 상대의 사소한 변화도 가장 먼저 알아채고, 기념일보다 평범한 오늘이 더 소중하다고 말하는 사람이죠. 다만 좋아하는 마음이 커서 가끔은 나를 뒷전으로 미루니, 사랑도 적당히 숨쉬기! 당신의 진심은 결국 상대에게 그대로 전해집니다.",
            tags: ["헌신도 100%", "직진 순정파"],
            extra: "💘 잘 맞는 상성: 고양이형 — 밀고 당기는 묘한 균형이 오래 갑니다"
        },
        {
            id: "cat",
            icon: "🐱",
            title: "잡힐 듯 말 듯 고양이형",
            desc: "관심 없는 척하면서 다 보고 있는 타입이에요. 연락은 뜸한데 만날 때마다 설레게 만드는 재주가 있죠. 혼자만의 시간이 꼭 필요해서 연애 중에도 개인 공간은 사수합니다. 이 밀당이 답답하면서도 계속 생각나는 이유, 바로 당신이에요.",
            tags: ["밀당 장인", "츤데레 매력"],
            extra: "💘 잘 맞는 상성: 리트리버형 — 지치지 않는 직진이 문을 엽니다"
        },
        {
            id: "fox",
            icon: "🦊",
            title: "어딜 가나 눈에 띄는 여우형",
            desc: "첫 만남에서 호감을 사는 데 3분이면 충분한 타입이에요. 눈빛, 멘트, 타이밍이 다 살아 있어서 썸이 끊이지 않죠. 다만 진심과 장난의 경계가 모호해서 오해를 사기도 해요. 진짜 좋아하는 사람 앞에서는 의외로 서툴러지는 게 반전 매력입니다.",
            tags: ["매력 발산", "분위기 메이커"],
            extra: "💘 잘 맞는 상성: 곰형 — 가벼워 보일 때 무게를 잡아줍니다"
        },
        {
            id: "rabbit",
            icon: "🐰",
            title: "쓰다듬고 싶은 토끼형",
            desc: "'보고 싶어'를 하루 열 번 말해도 안 질리는 타입이에요. 스킨십과 애정 표현이 자연스러워 연애 초반 텐션이 폭발하죠. 대신 서운함도 빨리 표현해서 잔잔한 갈등이 잦은 편이에요. 그래도 미워할 수 없는 게 이 유형의 무기입니다.",
            tags: ["애교 만렙", "사랑스러움 담당"],
            extra: "💘 잘 맞는 상성: 호랑이형 — 리드해주는 든든함이 토끼를 안심시킵니다"
        },
        {
            id: "bear",
            icon: "🐻",
            title: "기댈 수 있는 곰형",
            desc: "화려하진 않지만 옆에 있으면 마음이 놓이는 타입이에요. 말보다 행동으로 보여주고, 데이트 비용부터 미래 계획까지 야무지게 챙기죠. 이벤트는 서툴러도 비 오는 날 우산은 꼭 들고 나타납니다. 결혼하고 싶은 이상형 1순위!",
            tags: ["든든 안정", "현실 연애파"],
            extra: "💘 잘 맞는 상성: 여우형 — 평범한 일상에 반짝임을 더해줍니다"
        },
        {
            id: "tiger",
            icon: "🐯",
            title: "연애를 주도하는 호랑이형",
            desc: "썸인지 연애인지 애매한 거 딱 질색, 좋아하면 먼저 고백하는 타입이에요. 데이트 코스부터 기념일까지 계획을 주도해서 상대는 편하게 따라가면 되죠. 다만 자기 방식이 정답이라고 믿는 경향이 있으니, 상대 의견 듣기가 평생 숙제입니다.",
            tags: ["주도 리더", "카리스마"],
            extra: "💘 잘 맞는 상성: 토끼형 — 따르는 달콤함이 리더십을 빛나게 합니다"
        },
        {
            id: "penguin",
            icon: "🐧",
            title: "평생 한 사람만 보는 펭귄형",
            desc: "한번 정하면 흔들리지 않는 평생 짝꿍형이에요. 연락 빈도보다 만남의 질을 중시하고, 권태기가 와도 대화를 선택하는 성숙함이 있죠. 대신 시작이 느려서 썸에서 연애로 넘어가는 데 시간이 걸립니다. 시작만 하면 끝까지 가는 타입!",
            tags: ["순정 일편단심", "깊은 사랑"],
            extra: "💘 잘 맞는 상성: 햄스터형 — 서로를 아껴주는 따뜻함이 통합니다"
        },
        {
            id: "hamster",
            icon: "🐹",
            title: "볼을 붉히는 햄스터형",
            desc: "좋아하는 사람 앞에만 서면 평소의 50%도 못 보여주는 타입이에요. 카톡은 10분 고민하고, 좋아요는 몰래 누르죠. 하지만 마음속 사랑의 크기는 누구보다 큽니다. 용기 내어 한 걸음만 다가가면 의외로 깊어지는 연애를 하게 돼요.",
            tags: ["소심 순둥", "첫사랑 감성"],
            extra: "💘 잘 맞는 상성: 펭귄형 — 재촉하지 않는 여유가 햄스터를 엽니다"
        },
    ];

    // ===== 질문 정의 (8문항, 유형별 균등 가중) =====
    const questions = [
        {
            q: "첫 만남에서 나는?",
            options: [
                { text: "먼저 말을 건다", scores: { "tiger": 2, "fox": 1 } },
                { text: "눈빛을 보낸다", scores: { "fox": 2, "cat": 1 } },
                { text: "웃으며 기다린다", scores: { "rabbit": 2, "hamster": 1 } },
                { text: "일단 지켜본다", scores: { "cat": 2, "bear": 1 } },
            ]
        },
        {
            q: "좋아하는 사람이 생기면?",
            options: [
                { text: "바로 고백한다", scores: { "tiger": 2, "dog": 1 } },
                { text: "티 내며 다가간다", scores: { "dog": 2, "fox": 1 } },
                { text: "밀당하며 떠본다", scores: { "cat": 2, "fox": 1 } },
                { text: "마음에만 담아둔다", scores: { "hamster": 2, "penguin": 1 } },
            ]
        },
        {
            q: "이상적인 데이트는?",
            options: [
                { text: "든든한 풀코스, 내가 준비", scores: { "bear": 2, "tiger": 1 } },
                { text: "소소한 일상 데이트", scores: { "dog": 2, "rabbit": 1 } },
                { text: "핫플에서 분위기 있게", scores: { "fox": 2, "rabbit": 1 } },
                { text: "조용한 둘만의 시간", scores: { "penguin": 2, "cat": 1 } },
            ]
        },
        {
            q: "내 연락 스타일은?",
            options: [
                { text: "보고 싶으면 수시로 연락", scores: { "rabbit": 2, "dog": 1 } },
                { text: "필요할 때 묵직하게", scores: { "bear": 2, "penguin": 1 } },
                { text: "밤마다 길게 통화", scores: { "dog": 2, "penguin": 1 } },
                { text: "마음은 크고 연락은 뜸", scores: { "hamster": 2, "cat": 1 } },
            ]
        },
        {
            q: "연인과 싸웠을 때 나는?",
            options: [
                { text: "먼저 풀려고 직진", scores: { "dog": 2, "tiger": 1 } },
                { text: "시간 갖고 생각한다", scores: { "penguin": 2, "bear": 1 } },
                { text: "애교로 푼다", scores: { "rabbit": 2, "fox": 1 } },
                { text: "말 못 하고 속앓이", scores: { "hamster": 2, "cat": 1 } },
            ]
        },
        {
            q: "친구들이 보는 나는?",
            options: [
                { text: "추진력 갑", scores: { "tiger": 2, "dog": 1 } },
                { text: "츤데레", scores: { "cat": 2, "penguin": 1 } },
                { text: "분위기 메이커", scores: { "fox": 2, "rabbit": 1 } },
                { text: "든든한 상담역", scores: { "bear": 2, "hamster": 1 } },
            ]
        },
        {
            q: "기념일에는?",
            options: [
                { text: "서프라이즈 이벤트", scores: { "fox": 2, "tiger": 1 } },
                { text: "손편지와 정성", scores: { "penguin": 2, "dog": 1 } },
                { text: "맛있는 거 사준다", scores: { "rabbit": 2, "bear": 1 } },
                { text: "챙기는 게 쑥스럽다", scores: { "cat": 2, "hamster": 1 } },
            ]
        },
        {
            q: "내 연애 좌우명은?",
            options: [
                { text: "사랑은 직진이다", scores: { "tiger": 2, "dog": 1 } },
                { text: "천천히 알아가는 맛", scores: { "hamster": 2, "penguin": 1 } },
                { text: "오래 보는 사이가 진짜", scores: { "penguin": 2, "bear": 1 } },
                { text: "편안함이 최고", scores: { "bear": 2, "rabbit": 1 } },
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
            navigator.share({ title: '이상형 동물 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
