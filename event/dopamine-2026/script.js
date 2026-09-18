/* 도파민 중독 테스트 로직 (퀴즈형)
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

    // ===== 결과 유형 정의 (도파민 중독 단계별 6유형) =====
    const results = [
        {
            id: "detox",
            icon: "🧘",
            title: "도파민 디톡스 장인",
            desc: "폰보다 내 시간이 소중한 당신! 알림에 휘둘리지 않고 집중할 줄 아는 요즘 시대의 진귀한 인재예요. 주변 사람들이 당신의 집중력을 부러워한답니다.",
            tags: ["집중력갑", "폰주인", "갓생러"],
            extra: "이 평온함을 주변에도 전파해보세요. 당신은 이미 완성형입니다."
        },
        {
            id: "balance",
            icon: "⚖️",
            title: "밸런스 유지자",
            desc: "즐길 땐 즐기고, 끊을 땐 끊는 균형 감각의 소유자예요. 쇼츠도 보고 할 일도 하는 당신은 도파민과 건강한 거리 두기 중이랍니다.",
            tags: ["균형감각", "자기조절", "현생충실"],
            extra: "지금 밸런스만 유지하면 평생 도파민 걱정 없어요."
        },
        {
            id: "beginner",
            icon: "📱",
            title: "쇼츠 입문자",
            desc: "'나 정도면 양호하지!'라고 생각하시나요? 이미 한 발은 담그셨어요. 아직은 가벼운 단계지만, 알고리즘의 손길이 점점 거세지고 있답니다.",
            tags: ["입문단계", "알고리즘주의보", "아직괜찮아"],
            extra: "하루 시청 시간을 정해두는 것만으로도 입문 탈출이 빨라져요."
        },
        {
            id: "slave",
            icon: "🔔",
            title: "알림 노예",
            desc: "띠링 소리만 나면 심장이 뛰시나요? 당신은 알림의 노예가 되어가고 있어요. 폰이 주인이 되고 당신이 종이 되기 직전, 지금이 바로 독립운동 타이밍입니다.",
            tags: ["알림중독", "확인강박", "독립운동시급"],
            extra: "오늘부터 불필요한 앱 알림을 꺼보세요. 해방감이 밀려옵니다."
        },
        {
            id: "zombie",
            icon: "🧟",
            title: "밤샘 스크롤 좀비",
            desc: "'5분만 더...'가 새벽 3시가 되는 마법을 매일 경험 중이시군요. 눈은 충혈되고 손가락은 자동 스크롤 모드, 당신의 뇌는 재미 자극에 절어 있답니다.",
            tags: ["새벽스크롤", "시간순삭", "눈밑다크서클"],
            extra: "자기 전 1시간만 폰을 멀리 두세요. 아침이 달라질 거예요."
        },
        {
            id: "patient",
            icon: "🚨",
            title: "도파민 말기 환자",
            desc: "화장실에서도, 밥 먹을 때도, 심지어 꿈속에서도 스크롤하는 당신! 뇌가 '재밌는 거 내놔!'를 외치는 상태예요. 하지만 자각이 치료의 시작, 당신은 이미 첫걸음을 뗐답니다.",
            tags: ["폰이분신", "중증스크롤", "디톡스시급"],
            extra: "거창하게 시작 마세요. 오늘 단 30분, 폰 없이 산책부터 해보세요."
        },
    ];

    // ===== 질문 정의 (8문항) =====
    const questions = [
        {
            q: "아침에 눈 뜨자마자 하는 일은?",
            options: [
                { text: "물 한 잔 마시며 멍 때리기", scores: { "detox": 2, "balance": 1 } },
                { text: "알람 끄면서 시간 확인 정도", scores: { "balance": 2, "beginner": 1 } },
                { text: "알림 확인하다 10분 순삭", scores: { "slave": 2, "zombie": 1 } },
                { text: "침대에서 릴스 30분으로 하루 출발", scores: { "zombie": 2, "patient": 2 } },
            ]
        },
        {
            q: "하루 쇼츠·릴스 시청 시간은?",
            options: [
                { text: "30분 이내로 딱 끊음", scores: { "detox": 2, "balance": 1 } },
                { text: "1~2시간 정도 보는 듯", scores: { "beginner": 2, "balance": 1 } },
                { text: "3시간 이상, 시간 순삭", scores: { "zombie": 2, "patient": 1 } },
                { text: "재본 적 없음 (보면 늘어날까 봐 무서움)", scores: { "patient": 2, "slave": 1 } },
            ]
        },
        {
            q: "폰 알림이 오면 어떻게 해?",
            options: [
                { text: "나중에 몰아서 확인", scores: { "detox": 2, "balance": 1 } },
                { text: "바로 확인하고 다시 집중", scores: { "beginner": 2, "slave": 1 } },
                { text: "무슨 알림인지 궁금해 못 참음", scores: { "slave": 2, "zombie": 1 } },
                { text: "알림 없어도 5분마다 폰 만짐", scores: { "patient": 2, "zombie": 1 } },
            ]
        },
        {
            q: "밥 먹을 때 당신의 모습은?",
            options: [
                { text: "음식 맛에 집중하며 먹기", scores: { "detox": 2, "balance": 1 } },
                { text: "대화하면서 가끔 확인", scores: { "balance": 2, "beginner": 1 } },
                { text: "뭐라도 틀어놔야 밥이 넘어감", scores: { "slave": 2, "beginner": 1 } },
                { text: "폰 없으면 밥맛도 없음", scores: { "zombie": 2, "patient": 2 } },
            ]
        },
        {
            q: "화장실 갈 때 폰은?",
            options: [
                { text: "폰 없이 3분 컷", scores: { "detox": 2, "balance": 1 } },
                { text: "급할 땐 두고 감", scores: { "balance": 2, "beginner": 1 } },
                { text: "거의 항상 들고 감", scores: { "slave": 2, "zombie": 1 } },
                { text: "다리 저릴 때까지 스크롤", scores: { "patient": 2, "zombie": 1 } },
            ]
        },
        {
            q: "한 가지 일에 집중할 수 있는 시간은?",
            options: [
                { text: "2시간 이상 거뜬함", scores: { "detox": 2, "balance": 1 } },
                { text: "30분~1시간은 가능", scores: { "beginner": 2, "balance": 1 } },
                { text: "10분 넘기면 손이 근질근질", scores: { "slave": 2, "zombie": 1 } },
                { text: "5분 집중도 힘들다", scores: { "patient": 2, "zombie": 1 } },
            ]
        },
        {
            q: "자기 전 마지막 행동은?",
            options: [
                { text: "독서나 명상으로 마무리", scores: { "detox": 2, "balance": 1 } },
                { text: "침대에서 유튜브 30분 보고 자기", scores: { "beginner": 2, "slave": 1 } },
                { text: "잘래놓고 폰 붙잡고 1시간 고민", scores: { "slave": 2, "patient": 1 } },
                { text: "새벽까지 스크롤하다 기절", scores: { "zombie": 2, "patient": 2 } },
            ]
        },
        {
            q: "폰을 집에 두고 나오면?",
            options: [
                { text: "불편하지만 괜찮음", scores: { "detox": 2, "balance": 1 } },
                { text: "살짝 불안하지만 버팀", scores: { "beginner": 2, "balance": 1 } },
                { text: "유턴할지 진지하게 고민", scores: { "slave": 2, "zombie": 1 } },
                { text: "상상만으로 식은땀", scores: { "patient": 2, "zombie": 1 } },
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
            navigator.share({ title: '도파민 중독 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
