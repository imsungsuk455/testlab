/* 친구 관계 유형 테스트 로직 (퀴즈형)
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
            id: "party",
            icon: "🎉",
            title: "인싸 에너지 파티형",
            desc: "친구들과 함께할 때 에너지가 폭발하는 인싸! 어디서든 분위기의 중심이 되며, 사람들을 자연스럽게 한자리에 모으는 재주가 있습니다. 모임이 있으면 반드시 필요한 핵심 인물이에요.",
            tags: ["인싸", "에너지", "중심"],
            extra: "당신이 있으면 모임은 항상 성공합니다.",
            img: "../../images/char_friend_party.webp"
        },
        {
            id: "steady",
            icon: "🛡️",
            title: "곁을 지키는 든든형",
            desc: "친구가 힘들 때 아무 말 없이 곁을 지켜주는 타입. 화려한 말보다 행동으로 보여주는 우정의 소유자입니다. 힘든 순간에 생각나는 첫 번째 친구, 바로 당신이에요.",
            tags: ["든든", "의리", "한결같음"],
            extra: "당신의 존재 자체가 친구들의 버팀목입니다.",
            img: "../../images/char_friend_steady.webp"
        },
        {
            id: "soulmate",
            icon: "💞",
            title: "영혼의 단짝 베프형",
            desc: "서로 말하지 않아도 통하는 영혼의 단짝! 친구의 마음을 누구보다 잘 알고, 위로가 필요한 순간을 정확히 알아채는 타입입니다. 인생의 소울메이트 같은 존재예요.",
            tags: ["베프", "공감", "소울메이트"],
            extra: "당신의 공감 능력은 친구들의 선물입니다.",
            img: "../../images/char_friend_soulmate.webp"
        },
        {
            id: "advisor",
            icon: "📚",
            title: "조언하는 현명형",
            desc: "친구의 고민을 차분히 듣고 지혜로운 조언을 건네는 타입. 덕담보다 현실적인 해결책을 제시하며, 친구들이 인생 상담을 가장 많이 찾는 존재입니다. 든든한 멘토 같은 친구예요.",
            tags: ["조언", "지혜", "멘토"],
            extra: "당신의 한마디는 친구들의 등불입니다.",
            img: "../../images/char_friend_advisor.webp"
        },
        {
            id: "funny",
            icon: "😂",
            title: "유쾌한 분위기형",
            desc: "어디서든 웃음을 만드는 유쾌한 친구! 어색한 분위기는 순식간에 풀어내고, 친구들의 스트레스를 날려버리는 재주가 있습니다. 당신이 있으면 대화가 끊이지 않아요.",
            tags: ["유머", "유쾌", "분위기 메이커"],
            extra: "당신의 웃음은 친구들의 비타민입니다.",
            img: "../../images/char_friend_funny.webp"
        },
        {
            id: "reliable",
            icon: "📌",
            title: "약속을 지키는 믿음형",
            desc: "약속한 시간은 반드시 지키고, 말한 것은 꼭 해내는 타입. 친구들이 가장 신뢰하는 존재로, 무슨 일을 맡겨도 걱정 없는 믿음직한 친구입니다. 정직함이 최고의 무기예요.",
            tags: ["신뢰", "성실", "약속"],
            extra: "당신의 정직함은 친구들의 안심입니다.",
            img: "../../images/char_friend_reliable.webp"
        },
        {
            id: "small",
            icon: "🤫",
            title: "내향적인 소수정예형",
            desc: "많은 친구보다 깊은 소수의 인연을 쌓는 타입. 말수가 적어 보여도 마음을 연 친구에게는 끝없이 다정합니다. 오래된 친구 한 명이 열 명보다 소중하다고 믿는 사람이에요.",
            tags: ["소수정예", "깊은 우정", "차분함"],
            extra: "당신의 깊은 마음은 친구들의 보물입니다.",
            img: "../../images/char_friend_small.webp"
        },
        {
            id: "mom",
            icon: "🍚",
            title: "배려 깊은 엄마형",
            desc: "친구들을 살뜰히 챙기는 타입. 누가 아픈지, 누가 밥을 거른 건 아닌지 늘 세심하게 살핍니다. 친구들이 힘들 때 첫 번째로 찾는, 마치 엄마 같은 존재예요.",
            tags: ["배려", "챙김", "따뜻함"],
            extra: "당신의 세심함은 친구들의 따뜻한 밥상입니다.",
            img: "../../images/char_friend_mom.webp"
        },
    ];

    // ===== 질문 정의 =====
    const questions = [
        {
            q: "모임이 열렸다! 나는 주로?",
            options: [
                { text: "사람들을 모으고 분위기를 이끈다", scores: { "party": 2, "funny": 1 } },
                { text: "조용히 옆에서 대화에 참여한다", scores: { "small": 2 } },
                { text: "다들 잘 먹고 있는지 살핀다", scores: { "mom": 2 } },
                { text: "웃긴 이야기로 분위기를 띄운다", scores: { "funny": 2 } },
            ]
        },
        {
            q: "친구가 밤늦게 울면서 전화하면?",
            options: [
                { text: "바로 달려가서 같이 있어준다", scores: { "steady": 2, "soulmate": 1 } },
                { text: "전화를 끊고 바로 뛰어간다", scores: { "soulmate": 2, "steady": 1 } },
                { text: "차분히 상황을 듣고 조언한다", scores: { "advisor": 2 } },
                { text: "내일 해장하자며 웃게 만든다", scores: { "funny": 2 } },
            ]
        },
        {
            q: "친구 관계에서 가장 중요하게 생각하는 것은?",
            options: [
                { text: "함께 즐거운 시간 보내기", scores: { "party": 2, "funny": 1 } },
                { text: "어려울 때 서로 돕기", scores: { "steady": 2 } },
                { text: "마음을 나눌 수 있는 깊이", scores: { "soulmate": 2, "small": 1 } },
                { text: "약속을 지키는 신뢰", scores: { "reliable": 2 } },
            ]
        },
        {
            q: "친구가 고민을 털어놓으면?",
            options: [
                { text: "마음을 완전히 공감해준다", scores: { "soulmate": 2 } },
                { text: "현실적인 해결책을 제시한다", scores: { "advisor": 2 } },
                { text: "조용히 들어주고 곁을 지킨다", scores: { "small": 2, "steady": 1 } },
                { text: "기운 나게 웃어주며 위로한다", scores: { "funny": 2 } },
            ]
        },
        {
            q: "내 주변 친구들의 모습은?",
            options: [
                { text: "어디 가든 항상 많은 사람들", scores: { "party": 2 } },
                { text: "오래된 단짝 몇 명", scores: { "small": 2, "soulmate": 1 } },
                { text: "어떤 고민이든 상담하는 사람들", scores: { "advisor": 2 } },
                { text: "나에게 기대는 사람들", scores: { "mom": 2, "steady": 1 } },
            ]
        },
        {
            q: "친구에게 밥을 사준다면?",
            options: [
                { text: "새로 생긴 맛집에 다 데려간다", scores: { "party": 2 } },
                { text: "오늘 고생한 친구에게만 산다", scores: { "mom": 2, "steady": 1 } },
                { text: "친구가 좋아하는 메뉴를 정확히 안다", scores: { "soulmate": 2 } },
                { text: "돈 문제는 아예 얘기 안 한다", scores: { "reliable": 2 } },
            ]
        },
        {
            q: "친구에게 듣는 말 중 가장 자주 들리는 것은?",
            options: [
                { text: "너는 어디서나 친구가 많다!", scores: { "party": 2 } },
                { text: "너만 보면 힘이 난다!", scores: { "funny": 2, "steady": 1 } },
                { text: "고민은 너에게 상담해", scores: { "advisor": 2 } },
                { text: "참 세심하다, 역시 너야", scores: { "mom": 2 } },
            ]
        },
        {
            q: "10년 뒤에도 그대로일 것 같은 우정은?",
            options: [
                { text: "여전히 새 친구를 만드는 나", scores: { "party": 2 } },
                { text: "그때도 함께할 단짝들", scores: { "soulmate": 2, "small": 1 } },
                { text: "여전히 고민 상담하는 친구들", scores: { "advisor": 2 } },
                { text: "한결같이 지키는 약속과 우정", scores: { "reliable": 2, "steady": 1 } },
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
            navigator.share({ title: '친구 관계 유형 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
