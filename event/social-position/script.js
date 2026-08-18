/* 사교 포지션 테스트 로직 (퀴즈형)
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
            id: "leader",
            icon: "👑",
            title: "파티의 중심 리더형",
            desc: "모임이 열리면 사람들을 자연스럽게 모으고, 어디서든 분위기의 중심이 되는 타입. 일정 조율부터 분위기까지 모든 걸 주도하며, 친구들이 항상 '이 사람 없으면 모임이 안 돼'라고 말하는 핵심 인물입니다.",
            tags: ["리더", "중심", "주도"],
            extra: "당신이 있으면 모임은 항상 성공합니다.",
            img: "../../images/char_social_leader.webp"
        },
        {
            id: "mood",
            icon: "😂",
            title: "분위기 메이커 유쾌형",
            desc: "어색한 분위기는 순식간에 풀어내는 유쾌한 타입. 웃긴 이야기와 센스 있는 리액션으로 모두를 즐겁게 만들며, 친구들이 스트레스받을 때 가장 먼저 찾는 존재입니다.",
            tags: ["유머", "유쾌", "분위기"],
            extra: "당신의 웃음은 모임의 비타민입니다.",
            img: "../../images/char_social_mood.webp"
        },
        {
            id: "soul",
            icon: "💞",
            title: "진정한 베프 소울메이트형",
            desc: "많은 친구보다 깊은 한두 명과의 인연을 소중히 여기는 타입. 서로 말하지 않아도 통하는 단짝이 있으며, 친구의 마음을 누구보다 잘 읽어주는 진정한 베프입니다.",
            tags: ["베프", "공감", "깊은 우정"],
            extra: "당신의 진심은 친구들의 힘입니다.",
            img: "../../images/char_social_soul.webp"
        },
        {
            id: "advisor",
            icon: "📚",
            title: "고민 해결사 현명형",
            desc: "친구들의 고민을 차분히 듣고 지혜로운 조언을 건네는 타입. 감정에 치우치지 않고 현실적인 해결책을 제시해, 주변 사람들이 인생 상담을 가장 많이 찾는 멘토 같은 존재입니다.",
            tags: ["조언", "지혜", "멘토"],
            extra: "당신의 한마디는 친구들의 등불입니다.",
            img: "../../images/char_social_advisor.webp"
        },
        {
            id: "steady",
            icon: "🛡️",
            title: "믿음직한 든든형",
            desc: "어려울 때 아무 말 없이 곁을 지켜주는 든든한 타입. 화려한 말보다 행동으로 보여주는 우정의 소유자이며, 친구들이 위기 상황에서 가장 의지하는 존재입니다.",
            tags: ["든든", "의리", "신뢰"],
            extra: "당신의 존재 자체가 친구들의 버팀목입니다.",
            img: "../../images/char_social_steady.webp"
        },
        {
            id: "observer",
            icon: "👀",
            title: "조용한 관찰자형",
            desc: "말수가 적지만 눈은 항상 주변을 향한 타입. 친구들의 취향과 고민을 꼼꼼히 관찰하며, 필요할 때 정확한 도움을 주는 소수의 정예입니다.",
            tags: ["관찰", "차분", "소수정예"],
            extra: "당신의 조용한 눈빛이 친구들의 마음을 읽습니다.",
            img: "../../images/char_social_observer.webp"
        },
        {
            id: "carer",
            icon: "🍚",
            title: "세심한 챙김형",
            desc: "친구들을 살뜰히 챙기는 타입. 누가 아픈지, 누가 밥을 거른 건 아닌지 늘 세심하게 살피며, 모임의 음식과 분위기를 가장 잘 챙기는 엄마 같은 존재입니다.",
            tags: ["배려", "챙김", "따뜻함"],
            extra: "당신의 세심함은 친구들의 따뜻한 밥상입니다.",
            img: "../../images/char_social_carer.webp"
        },
        {
            id: "social",
            icon: "✨",
            title: "어디서든 인싸 에너지형",
            desc: "낯선 곳에서도 금방 사람들과 친해지는 타입. 처음 보는 모임에서도 어색함 없이 대화를 이끌며, 새로운 인연을 만드는 걸 즐기는 인싸 에너지의 소유자입니다.",
            tags: ["인싸", "친화력", "적응력"],
            extra: "당신의 친화력은 어디서나 통합니다.",
            img: "../../images/char_social_social.webp"
        },
    ];

    // ===== 질문 정의 =====
    const questions = [
        {
            q: "모임이 열렸다! 나는 주로?",
            options: [
                { text: "사람들을 모으고 분위기를 이끈다", scores: { "leader": 2, "social": 1 } },
                { text: "웃긴 이야기로 모두를 즐겁게 만든다", scores: { "mood": 2 } },
                { text: "조용히 옆에서 대화에 참여한다", scores: { "observer": 2 } },
                { text: "다들 잘 있는지 살피고 챙긴다", scores: { "carer": 2 } },
            ]
        },
        {
            q: "낯선 사람들이 많은 모임에 갔다면?",
            options: [
                { text: "금방 사람들과 친해진다", scores: { "social": 2, "leader": 1 } },
                { text: "유머로 어색함을 깬다", scores: { "mood": 2 } },
                { text: "먼저 다가가 고민을 들어준다", scores: { "advisor": 2 } },
                { text: "누구와 대화해야 할지 관찰한다", scores: { "observer": 2 } },
            ]
        },
        {
            q: "친구가 밤늦게 울면서 전화하면?",
            options: [
                { text: "바로 달려가서 같이 있어준다", scores: { "steady": 2, "soul": 1 } },
                { text: "차분히 듣고 해결책을 알려준다", scores: { "advisor": 2 } },
                { text: "웃게 만들어서 기분을 돌려준다", scores: { "mood": 2 } },
                { text: "내일 해장하자며 살뜰히 챙긴다", scores: { "carer": 2 } },
            ]
        },
        {
            q: "친구 관계에서 가장 중요한 것은?",
            options: [
                { text: "함께 즐거운 시간 보내기", scores: { "social": 2, "mood": 1 } },
                { text: "어려울 때 서로 돕기", scores: { "steady": 2 } },
                { text: "마음을 나누는 깊은 인연", scores: { "soul": 2 } },
                { text: "서로의 고민을 들어주는 것", scores: { "advisor": 2 } },
            ]
        },
        {
            q: "내 주변 친구들의 모습은?",
            options: [
                { text: "어디 가든 항상 많은 사람들", scores: { "social": 2, "leader": 1 } },
                { text: "오래된 단짝 몇 명", scores: { "soul": 2, "observer": 1 } },
                { text: "어떤 고민이든 상담하는 사람들", scores: { "advisor": 2 } },
                { text: "나에게 기대는 사람들", scores: { "steady": 2, "carer": 1 } },
            ]
        },
        {
            q: "친구에게 밥을 사준다면?",
            options: [
                { text: "새로 생긴 맛집에 다 데려간다", scores: { "social": 2 } },
                { text: "오늘 고생한 친구에게만 산다", scores: { "carer": 2, "steady": 1 } },
                { text: "친구가 좋아하는 메뉴를 정확히 안다", scores: { "soul": 2 } },
                { text: "돈 문제는 아예 얘기 안 한다", scores: { "steady": 2 } },
            ]
        },
        {
            q: "친구에게 듣는 말 중 가장 자주 들리는 것은?",
            options: [
                { text: "너는 어디서나 친구가 많다!", scores: { "social": 2, "leader": 1 } },
                { text: "너만 보면 힘이 난다!", scores: { "mood": 2 } },
                { text: "고민은 너에게 상담해", scores: { "advisor": 2 } },
                { text: "참 세심하다, 역시 너야", scores: { "carer": 2 } },
            ]
        },
        {
            q: "10년 뒤에도 그대로일 것 같은 우정은?",
            options: [
                { text: "여전히 새 친구를 만드는 나", scores: { "social": 2 } },
                { text: "그때도 함께할 단짝들", scores: { "soul": 2, "observer": 1 } },
                { text: "여전히 고민 상담하는 친구들", scores: { "advisor": 2 } },
                { text: "한결같이 지키는 약속과 우정", scores: { "steady": 2, "carer": 1 } },
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
            navigator.share({ title: '사교 포지션 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
