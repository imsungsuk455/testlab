/* 플러팅 능력 테스트 로직 (퀴즈형)
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

    const resCharImg = document.getElementById('q-res-char-img');

    // ===== 결과 유형 정의 (플러팅 8단계) =====
    const results = [
        {
            id: "frozen",
            icon: "🧊",
            title: "플러팅 불능형",
            desc: "관심 표현 자체가 안 되는 얼음왕국형입니다. 좋아하는 사람이 옆에 있어도 표정은 무, 멘트는 무기. 상대는 당신이 나한테 관심 있는지 없는지 1도 모른 채 계절만 바뀝니다.",
            tags: ["플러팅 Lv.0", "무표정", "마음은 따뜻"],
            extra: "일단 웃는 연습부터 시작해봐요. 🍀 보유 아이템: 거울 앞 미소 연습",
            img: "../../images/char_flirtskill_frozen.webp"
        },
        {
            id: "shy",
            icon: "🐢",
            title: "눈치백단 소심형",
            desc: "눈치는 백단인데 입이 안 떨어지는 타입. 상대의 기분은 귀신같이 알아채면서 정작 하고 싶은 말은 목구멍에서만 맴돕니다. '말할 걸...' 하고 집에서 이불 킥하는 게 일상.",
            tags: ["플러팅 Lv.1", "눈치 만렙", "입은 소심"],
            extra: "눈치가 무기예요. 입까지 열리면 무적. 🍀 보유 아이템: 용기 한 스푼",
            img: "../../images/char_flirtskill_shy.webp"
        },
        {
            id: "manual",
            icon: "📖",
            title: "매뉴얼 의존형",
            desc: "플러팅을 이론으로 배운 공부파. 연애 칼럼 100개 정독, 영상 저장 목록 가득. 그런데 실전에서는 매뉴얼 3페이지에서 멈춥니다. 지식과 실전의 간극이 가장 큰 유형.",
            tags: ["플러팅 Lv.2", "이론 만렙", "실전 쫄보"],
            extra: "이제는 저장 목록이 아니라 실전이다. 🍀 보유 아이템: 연애 칼럼 구독 취소",
            img: "../../images/char_flirtskill_manual.webp"
        },
        {
            id: "nice",
            icon: "🙂",
            title: "친절 오해형",
            desc: "그냥 친절한 건데 자꾸 플러팅하는 줄 안다는 평을 듣는 타입. 누구에게나 다정해서 '나한테 관심 있나?' 오해를 삽니다. 본인은 해명하느라 바쁘고 상대는 착각하느라 바쁨.",
            tags: ["플러팅 Lv.3", "국민 친절", "오해 유발"],
            extra: "친절은 무기지만 대상은 가려 쓰자. 🍀 보유 아이템: 적당한 선 긋기",
            img: "../../images/char_flirtskill_nice.webp"
        },
        {
            id: "natural",
            icon: "💬",
            title: "자연스러운 멘트 장인형",
            desc: "억지 없이 술술, 부담 없이 매력을 뿜는 타입. '오늘따라 기분 좋아 보이네' 같은 한 마디가 상대 하루를 통째로 바꿉니다. 계산 없이 나오는 자연스러움이 가장 큰 무기.",
            tags: ["플러팅 Lv.4", "멘트 장인", "부담 제로"],
            extra: "자연스러움이 곧 고수다. 🍀 보유 아이템: 일상 멘트 3종 세트",
            img: "../../images/char_flirtskill_natural.webp"
        },
        {
            id: "timing",
            icon: "🎯",
            title: "타이밍의 달인형",
            desc: "언제 던져야 할지 아는 고수. 상대가 지쳤을 때 건네는 커피 한 잔, 어색한 순간을 풀어주는 유머 한 방. 타이밍이 곧 플러팅이라는 걸 몸으로 아는 사람입니다.",
            tags: ["플러팅 Lv.5", "타이밍", "센스 폭발"],
            extra: "타이밍은 타고나기도 하지만 관찰로 번다. 🍀 보유 아이템: 상대 표정 읽기",
            img: "../../images/char_flirtskill_timing.webp"
        },
        {
            id: "mood",
            icon: "🔥",
            title: "분위기 지배자형",
            desc: "모임의 시선을 가져오는 존재. 등장만으로 분위기가 바뀌고 말 한마디에 좌중이 웃습니다. 호감의 중심이라 플러팅을 하지 않아도 플러팅이 되는 무서운 타입.",
            tags: ["플러팅 Lv.6", "분위기 메이커", "인기 폭발"],
            extra: "주목은 받되 한 사람에게 집중해봐요. 🍀 보유 아이템: 진심 어린 눈빛",
            img: "../../images/char_flirtskill_mood.webp"
        },
        {
            id: "pro",
            icon: "👑",
            title: "국민 연인급 프로",
            desc: "한 마디에 상대의 심박수가 올라가는 마성의 화법. 눈빛, 타이밍, 진심까지 3박자가 갖춰진 완성형. 독박투어에 나가도 첫 화에 커플이 성사될 운명입니다.",
            tags: ["플러팅 Lv.8", "만렙", "국민 연인"],
            extra: "능력에 책임이 따른다. 진심 한 스푼 잊지 말기. 💡 보유 무기: 눈빛 + 타이밍 + 진심",
            img: "../../images/char_flirtskill_pro.webp"
        }
    ];

    // ===== 질문 정의 (8문항) =====
    const questions = [
        {
            q: "마음에 드는 사람이 생겼다. 첫 행동은?",
            options: [
                { text: "아무것도 못 하고 멀리서만 본다", scores: { "frozen": 2 } },
                { text: "주변 사람들한테 슬쩍 물어본다", scores: { "shy": 2 } },
                { text: "어떻게 말 걸지 검색부터 한다", scores: { "manual": 2 } },
                { text: "자연스럽게 옆에 가서 말을 건다", scores: { "natural": 1, "timing": 1, "mood": 1 } }
            ]
        },
        {
            q: "썸 타는 상대가 '심심하다'고 톡을 보냈다. 답장은?",
            options: [
                { text: "'ㅇㅇ' 하고 끝낸다", scores: { "frozen": 2 } },
                { text: "뭐라고 보내야 할지 10분 고민한다", scores: { "shy": 1, "manual": 1 } },
                { text: "'그럼 같이 뭐할까?' 바로 제안한다", scores: { "natural": 2 } },
                { text: "'심심하면 재밌는 거 보여줄까?' 미끼를 던진다", scores: { "timing": 1, "pro": 2 } }
            ]
        },
        {
            q: "모임에서 관심 가는 사람이 옆자리다. 당신은?",
            options: [
                { text: "긴장해서 밥만 먹는다", scores: { "frozen": 1, "shy": 1 } },
                { text: "다 같이 있을 때만 얘기한다", scores: { "nice": 2 } },
                { text: "옆자리 특권 살려서 자연스럽게 대화한다", scores: { "natural": 1, "mood": 1 } },
                { text: "분위기 띄우면서 시선을 가져온다", scores: { "mood": 2, "pro": 1 } }
            ]
        },
        {
            q: "상대가 힘들어 보인다. 당신의 대처는?",
            options: [
                { text: "눈치만 보고 아무 말 못 한다", scores: { "shy": 2 } },
                { text: "'힘내' 한 마디만 하고 만다", scores: { "frozen": 1, "nice": 1 } },
                { text: "'커피 한 잔 할래?' 딱 맞는 타이밍에 제안한다", scores: { "timing": 2 } },
                { text: "얘기 들어주고 기분까지 풀어준다", scores: { "natural": 1, "pro": 2 } }
            ]
        },
        {
            q: "연애 고수에게 조언을 구한다면 무엇을 묻겠나?",
            options: [
                { text: "관심 표현은 대체 어떻게 하는 거야?", scores: { "frozen": 2 } },
                { text: "고백 타이밍은 언제야?", scores: { "manual": 2 } },
                { text: "매력적인 말투 비법이 있을까?", scores: { "timing": 1, "natural": 1 } },
                { text: "묻기 전에 이미 실천하고 있다", scores: { "mood": 1, "pro": 2 } }
            ]
        },
        {
            q: "모임 끝나고 관심 가는 사람과 단둘이 남았다.",
            options: [
                { text: "어색해서 빨리 자리를 뜬다", scores: { "frozen": 1, "shy": 1 } },
                { text: "다 같이 있던 얘기를 이어간다", scores: { "nice": 1, "manual": 1 } },
                { text: "'같이 걸어갈까?' 자연스럽게 제안한다", scores: { "natural": 2 } },
                { text: "둘만의 농담을 만들며 거리를 좁힌다", scores: { "timing": 1, "pro": 1, "mood": 1 } }
            ]
        },
        {
            q: "주변에서 당신을 보고 자주 하는 말은?",
            options: [
                { text: "'넌 왜 이렇게 말이 없어?'", scores: { "frozen": 2 } },
                { text: "'넌 참 착하다'", scores: { "nice": 2, "shy": 1 } },
                { text: "'넌 센스가 있어'", scores: { "timing": 1, "natural": 1 } },
                { text: "'너랑 있으면 재밌다'", scores: { "mood": 2, "pro": 1 } }
            ]
        },
        {
            q: "마지막 질문. 당신에게 플러팅이란?",
            options: [
                { text: "남의 나라 이야기", scores: { "frozen": 2 } },
                { text: "배우고 싶은 기술", scores: { "manual": 2, "shy": 1 } },
                { text: "상대를 기분 좋게 만드는 매너", scores: { "natural": 1, "nice": 1, "timing": 1 } },
                { text: "숨 쉬듯이 하는 일상", scores: { "mood": 1, "pro": 2 } }
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
            navigator.share({ title: '플러팅 능력 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
