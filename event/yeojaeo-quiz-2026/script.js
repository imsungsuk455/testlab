/* 여자어 능력고사 로직 (퀴즈형)
 *
 * 방식: 질문의 각 보기(옵션)가 특정 결과 유형에 가중치 점수를 준다.
 *       모든 질문에 답하면 유형별 점수를 합산해 가장 높은 유형이 결과가 된다.
 *
 * 데이터 구조:
 *   results    : 결과 유형 배열. 각 항목: { id, icon, title, desc, tags[], extra, img }
 *   questions  : 질문 배열. 각 항목: { q, options: [ { text, scores: { <resultId>: 가중치 } } ] }
 *
 * 예) scores: { "native": 2, "reader": 1 } → 이 보기를 고르면 native +2, reader +1
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

    // ===== 결과 유형 정의 (여자어 해석 레벨 5단계) =====
    const results = [
        {
            id: "native",
            icon: "🏆",
            title: "여자어 네이티브",
            desc: "행간이 아니라 공기까지 읽는 당신입니다. “알겠어”와 “알겠어^^”의 온도 차이를 구분하고, “괜찮아”가 괜찮지 않다는 걸 아는 사람. 단톡방에서 누군가 삐지면 가장 먼저 눈치채고 수습하는 것도 당신입니다. 주변에서는 “너랑 대화하면 속이 뻥 뚫린다”는 말을 자주 듣습니다.",
            tags: ["해석률 100%", "동시통역사", "공기까지 읽음"],
            extra: "당신과 대화하면 속이 뻥 뚫립니다. 이 능력, 연애할 때 아껴 쓰세요.",
            img: "../../images/char_yeojaeo_native.webp"
        },
        {
            id: "reader",
            icon: "🔍",
            title: "눈치 빠른 해석가",
            desc: "대부분의 여자어는 척척 알아듣는 눈치백단형입니다. “다음에 해요~”가 정중한 거절이라는 것도 알고, 단답이 오면 분위기가 식었다는 것도 감지합니다. 가끔 확신이 없어 한 번 더 묻다가 타이밍을 놓치는 게 유일한 약점. 조금만 더 밀어붙이면 네이티브 등급입니다.",
            tags: ["해석률 80%", "눈치백단", "네이티브 직전"],
            extra: "확신이 들 땐 묻지 말고 바로 움직이세요. 답은 이미 알고 있습니다.",
            img: "../../images/char_yeojaeo_reader.webp"
        },
        {
            id: "translator",
            icon: "📖",
            title: "노력형 번역가",
            desc: "들을 때는 반쯤 알아듣고 반은 놓치는, 열심히 공부 중인 번역가입니다. “맘대로 해”가 위험한 말이라는 건 알지만, 그다음에 뭘 해야 할지는 매번 헷갈립니다. 친구들에게 카톡 캡처를 보내 “이거 무슨 뜻이야?”라고 묻는 게 일상. 성실함만큼은 만점이라 언젠가는 통달할 사람입니다.",
            tags: ["해석률 50%", "사전 필요", "캡처 질문러"],
            extra: "모르면 묻는 게 상책. 캡처 공유는 계속하되, 가끔은 직접 부딪혀보세요.",
            img: "../../images/char_yeojaeo_translator.webp"
        },
        {
            id: "direct",
            icon: "🪨",
            title: "직진형 돌직구",
            desc: "말은 곧 뜻이라고 믿는 팩트주의자입니다. “괜찮아”는 괜찮다는 거고, “맘대로 해”는 정말 맘대로 하라는 거라고 받아들입니다. 그래서 오해가 생기면 본인은 억울하고 상대는 답답해하는 패턴이 반복됩니다. 악의는 전혀 없는데 결과는 늘 사고 현장. 돌직구도 때로는 빗나가야 합니다.",
            tags: ["문자 그대로", "팩트폭행", "억울함 담당"],
            extra: "상대 말이 곧이곧대로 들린다면, 한 템포 쉬고 “진짜?”라고 되물어보세요.",
            img: "../../images/char_yeojaeo_direct.webp"
        },
        {
            id: "outsider",
            icon: "🌫️",
            title: "여자어 문외한",
            desc: "해석이 아니라 정반대로 읽는 오역의 달인입니다. “바쁘면 다음에”를 진짜 다음 약속으로 알고 신나하고, “됐어, 됐어”를 쿨한 수락으로 착각합니다. 주변에서 “너 제발 아무것도 하지 마”라는 말을 듣는다면 바로 당신 이야기. 하지만 본인은 늘 당당해서 미워할 수 없는 타입입니다.",
            tags: ["해석률 0%", "오역왕", "당당함 만렙"],
            extra: "자신감은 유지하되, 중요한 대화 전에는 믿을 만한 통역사 한 명을 두세요.",
            img: "../../images/char_yeojaeo_outsider.webp"
        }
    ];

    // ===== 질문 정의 (8문항, 보기별 유형 가중치) =====
    const questions = [
        {
            q: "연인이 싸우다가 “아니야, 괜찮아”라고 말한다. 진짜 뜻은?",
            options: [
                { text: "괜찮지 않다는 뜻. 무슨 일인지 바로 물어본다", scores: { "native": 2 } },
                { text: "삐진 것 같으니 달래면서 슬쩍 캐묻는다", scores: { "reader": 2 } },
                { text: "말 그대로 괜찮다는 거겠지? 일단 넘어간다", scores: { "translator": 1, "direct": 1 } },
                { text: "진짜 괜찮은 거다. 해결됐네, 게임이나 하자", scores: { "outsider": 2 } }
            ]
        },
        {
            q: "썸 상대가 “바쁘면 다음에 해요~”라고 답했다. 이건?",
            options: [
                { text: "관심 없다는 정중한 거절. 깔끔하게 물러난다", scores: { "native": 2 } },
                { text: "아쉬우니 일단 물러나서 며칠 지켜본다", scores: { "reader": 1, "translator": 1 } },
                { text: "정말 바쁜 거겠지. 다음 주에 다시 연락한다", scores: { "direct": 2 } },
                { text: "밀당 성공? 오히려 좋아, 바로 또 연락한다", scores: { "outsider": 2 } }
            ]
        },
        {
            q: "같이 메뉴 고르다가 상대가 “맘대로 해”라고 말한다. 올바른 대응은?",
            options: [
                { text: "절대 맘대로 하면 안 된다. 원하는 답을 찾을 때까지 묻는다", scores: { "native": 2 } },
                { text: "눈치를 보며 상대가 좋아할 메뉴로 안전하게 유도한다", scores: { "reader": 2 } },
                { text: "말한 대로 내 맘대로 정한다. 말했으니 책임도 상대 몫", scores: { "direct": 2 } },
                { text: "고민 해결! 제일 먹고 싶은 걸로 정하고 당당하게 주문", scores: { "outsider": 1, "translator": 1 } }
            ]
        },
        {
            q: "평소엔 “응응!!”이던 상대가 갑자기 “ㅇㅇ”이라고만 답한다. 무슨 일인가?",
            options: [
                { text: "바쁜 거겠지. 나중에 다시 말 걸면 된다", scores: { "outsider": 2 } },
                { text: "그냥 기분 문제겠거니 하고 넘어간다", scores: { "direct": 1, "translator": 1 } },
                { text: "분위기가 식었다는 신호. 내가 뭘 잘못했는지 되짚어본다", scores: { "reader": 2 } },
                { text: "확실히 삐졌다. 늦기 전에 바로 전화해서 풀어야 한다", scores: { "native": 2 } }
            ]
        },
        {
            q: "회식 끝나고 썸녀가 “오늘 수고했어^^”라고 보냈다. 어떻게 답할까?",
            options: [
                { text: "예의상 인사다. “수고했어~” 하고 끝낸다", scores: { "direct": 1, "outsider": 1 } },
                { text: "호감의 여지가 있으니 가볍게 대화를 이어본다", scores: { "translator": 2 } },
                { text: "분위기 좋았다는 뜻. 다음 약속을 자연스럽게 꺼낸다", scores: { "reader": 2 } },
                { text: "확실한 그린라이트. 바로 데이트 신청 메시지를 보낸다", scores: { "native": 1, "outsider": 1 } }
            ]
        },
        {
            q: "밤 12시, 연인에게 “우리 얘기 좀 해”라는 문자가 왔다. 당신의 첫 행동은?",
            options: [
                { text: "무슨 얘기인지 일단 물어본다. 별일 아닐 수도 있잖아", scores: { "outsider": 2 } },
                { text: "심상치 않다. 오늘 있었던 일을 머릿속으로 복기한다", scores: { "reader": 1, "translator": 1 } },
                { text: "큰일 났다. 사과 멘트를 미리 준비하고 전화한다", scores: { "native": 2 } },
                { text: "내일 얘기하자고 하고 잔다. 밤에는 판단력이 흐려지니까", scores: { "direct": 2 } }
            ]
        },
        {
            q: "엄마에게 안부 카톡을 보냈더니 “오냐...”라고만 왔다. 이건?",
            options: [
                { text: "서운하다는 뜻. 바로 전화드려야 한다", scores: { "native": 2 } },
                { text: "뭔가 아쉬운 기색. 용돈 얘기라도 꺼내본다", scores: { "reader": 2 } },
                { text: "바쁘신가 보다. 이따 다시 연락드린다", scores: { "translator": 1, "direct": 1 } },
                { text: "잘 지내신다는 거지. 안심하고 다음에 또 연락드린다", scores: { "outsider": 2 } }
            ]
        },
        {
            q: "마지막 질문. 친구가 “됐어, 됐어”를 두 번 반복했다. 정답은?",
            options: [
                { text: "정말 됐다는 거다. 쿨하게 넘어간다", scores: { "outsider": 2 } },
                { text: "됐지 않았을 확률 99%. 왜 그랬는지 캐묻는다", scores: { "native": 2 } },
                { text: "일단 사과하고 본다. 억울해도 분위기가 먼저다", scores: { "reader": 1, "translator": 1 } },
                { text: "된 거면 된 거지. 다음 화제로 넘어간다", scores: { "direct": 2 } }
            ]
        }
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
            resCharImg.src = res.img || "";

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
            navigator.share({ title: '여자어 능력고사', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
