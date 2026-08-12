/* 전생 직업 테스트 로직 (퀴즈형)
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
            id: "scholar",
            icon: "📜",
            title: "조선시대 선비",
            desc: "전생의 당신은 책을 사랑하고 차를 즐기며 조용히 지혜를 갈고닦은 선비였습니다. 학문과 풍류를 중시하며, 세상의 이치를 꿰뚫는 통찰력을 지녔죠. 과거시험보다는 바른 길을 걷는 삶을 추구했던 인물입니다.",
            tags: ["학문", "풍류", "지혜"],
            extra: "당신의 지혜는 이번 생에서도 빛나고 있습니다.",
            img: "../../images/char_past_scholar.webp"
        },
        {
            id: "warrior",
            icon: "⚔️",
            title: "전장의 무사",
            desc: "전생의 당신은 강한 의지와 뛰어난 검술 실력을 지닌 무사였습니다. 전장에서도 용맹을 잃지 않았고, 약자를 지키기 위해 목숨을 걸었죠. 충성과 의리를 최고의 가치로 여겼던 인물입니다.",
            tags: ["용맹", "의리", "강인함"],
            extra: "당신의 강인함은 이번 생의 무기입니다.",
            img: "../../images/char_past_warrior.webp"
        },
        {
            id: "merchant",
            icon: "💰",
            title: "부지런한 상인",
            desc: "전생의 당신은 남다른 장사 수완을 지닌 상인이었습니다. 물건의 가치를 꿰뚫는 안목과 재물을 모으는 지혜를 겸비했죠. 하지만 탐욕스럽지 않아 주변 사람들의 존경을 받았던 인물입니다.",
            tags: ["수완", "안목", "재물"],
            extra: "당신의 눈썰미는 이번 생의 자산입니다.",
            img: "../../images/char_past_merchant.webp"
        },
        {
            id: "shaman",
            icon: "🔮",
            title: "신비로운 무녀",
            desc: "전생의 당신은 신과 소통하는 신비로운 능력을 지닌 무녀였습니다. 사람들의 고민을 듣고 미래를 점쳐주며 마을의 귀중한 존재였죠. 직감과 영감이 뛰어나 많은 이들의 길잡이가 되었던 인물입니다.",
            tags: ["영감", "직감", "신비"],
            extra: "당신의 직감은 이번 생의 나침반입니다.",
            img: "../../images/char_past_shaman.webp"
        },
        {
            id: "clown",
            icon: "🎭",
            title: "화려한 광대",
            desc: "전생의 당신은 사람들을 웃게 만드는 재주를 지닌 광대였습니다. 좌중을 압도하는 재담과 흥이 넘치는 몸짓으로 모두의 사랑을 받았죠. 겉은 가벼워 보여도 속은 누구보다 깊은 통찰력을 지녔던 인물입니다.",
            tags: ["재담", "흥", "통찰"],
            extra: "당신의 유쾌함은 이번 생의 매력입니다.",
            img: "../../images/char_past_clown.webp"
        },
        {
            id: "craftsman",
            icon: "🛠️",
            title: "솜씨 좋은 장인",
            desc: "전생의 당신은 손끝으로 예술을 만드는 대장장이이자 장인이었습니다. 백 년을 가는 물건을 만들기 위해 끊임없이 연마했죠. 묵묵히 자신의 일에 정진하며 완벽함을 추구했던 인물입니다.",
            tags: ["장인정신", "완벽", "성실"],
            extra: "당신의 집중력은 이번 생의 힘입니다.",
            img: "../../images/char_past_craftsman.webp"
        },
        {
            id: "doctor",
            icon: "🌿",
            title: "지혜로운 의원",
            desc: "전생의 당신은 사람을 살리는 의술을 지닌 의원이었습니다. 손대는 곳마다 병이 낫는다는 명성이 자자했으며, 가난한 이들에게는 치료비를 받지 않기도 했죠. 생명을 가장 소중히 여겼던 인물입니다.",
            tags: ["의술", "자비", "생명"],
            extra: "당신의 따뜻함은 이번 생의 치유력입니다.",
            img: "../../images/char_past_doctor.webp"
        },
        {
            id: "painter",
            icon: "🎨",
            title: "여유로운 화가",
            desc: "전생의 당신은 자연의 아름다움을 캔버스에 담던 화가였습니다. 사계절의 풍경과 사람의 마음을 섬세하게 그려내는 재능을 지녔죠. 물질보다 아름다움을 우선시했던 자유로운 영혼이었습니다.",
            tags: ["예술", "감성", "자유"],
            extra: "당신의 감성은 이번 생의 색채입니다.",
            img: "../../images/char_past_painter.webp"
        },
    ];

    // ===== 질문 정의 =====
    const questions = [
        {
            q: "전생에 가장 큰 보람을 느꼈던 순간은?",
            options: [
                { text: "책 한 권을 끝까지 완독했을 때", scores: { "scholar": 2 } },
                { text: "전투에서 승리해 고을을 지켰을 때", scores: { "warrior": 2 } },
                { text: "좋은 물건을 좋은 가격에 거래했을 때", scores: { "merchant": 2 } },
                { text: "사람의 미래를 정확히 점쳐줬을 때", scores: { "shaman": 2 } },
            ]
        },
        {
            q: "하루를 시작할 때 어떤 기분이었나요?",
            options: [
                { text: "오늘도 새로운 것을 배울 생각에 설렌다", scores: { "scholar": 2, "painter": 1 } },
                { text: "오늘도 몸을 단련할 생각에 다짐한다", scores: { "warrior": 2 } },
                { text: "오늘 장사가 잘 될지 계산해본다", scores: { "merchant": 2 } },
                { text: "오늘은 누구를 만나 도울까 고민한다", scores: { "shaman": 1, "doctor": 2 } },
            ]
        },
        {
            q: "사람들이 나를 부르는 별명은?",
            options: [
                { text: "책벌레 / 공부벌레", scores: { "scholar": 2 } },
                { text: "무서운 검사 / 싸움꾼", scores: { "warrior": 2 } },
                { text: "장사왕 / 계산의 달인", scores: { "merchant": 2 } },
                { text: "분위기 메이커 / 흥부자", scores: { "clown": 2, "painter": 1 } },
            ]
        },
        {
            q: "가장 소중하게 여긴 재산은?",
            options: [
                { text: "먼지 쌓인 책들과 붓", scores: { "scholar": 2 } },
                { text: "피로 벌어들인 검과 갑옷", scores: { "warrior": 2 } },
                { text: "구슬처럼 모은 돈과 물건", scores: { "merchant": 2 } },
                { text: "정성껏 갈고닦은 솜씨", scores: { "craftsman": 2, "painter": 1 } },
            ]
        },
        {
            q: "마을 잔치에서 나는 보통?",
            options: [
                { text: "한쪽에서 조용히 차를 마시며 관찰", scores: { "scholar": 2, "shaman": 1 } },
                { text: "무예 시연으로 좌중을 압도", scores: { "warrior": 2 } },
                { text: "물건 흥정으로 잔치판을 즐김", scores: { "merchant": 2 } },
                { text: "재담으로 사람들을 웃게 만듦", scores: { "clown": 2 } },
            ]
        },
        {
            q: "남들이 나에게 자주 부탁하는 일은?",
            options: [
                { text: "글을 대신 써달라, 편지를 읽어달라", scores: { "scholar": 2 } },
                { text: "무술을 가르쳐 달라", scores: { "warrior": 2 } },
                { text: "물건 값을 정해 달라", scores: { "merchant": 2 } },
                { text: "아픈 곳을 치료해 달라", scores: { "doctor": 2 } },
            ]
        },
        {
            q: "휴식할 때 즐기는 방법은?",
            options: [
                { text: "정원에서 차를 끓이며 시를 읊는다", scores: { "scholar": 2, "painter": 1 } },
                { text: "산으로 올라가 몸을 풀며 경치를 본다", scores: { "warrior": 1, "painter": 2 } },
                { text: "시장을 돌며 물건 구경을 한다", scores: { "merchant": 2 } },
                { text: "숲에서 약초를 캐며 자연을 즐긴다", scores: { "doctor": 2, "shaman": 1 } },
            ]
        },
        {
            q: "다음 중 가장 두려웠던 것은?",
            options: [
                { text: "길을 잃고 방향을 못 찾는 것", scores: { "scholar": 1, "merchant": 1 } },
                { text: "힘이 없어 약자를 지키지 못하는 것", scores: { "warrior": 2 } },
                { text: "솜씨가 퇴보하는 것", scores: { "craftsman": 2 } },
                { text: "재주로 사람을 웃기지 못하는 것", scores: { "clown": 2 } },
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
            navigator.share({ title: '전생 직업 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
