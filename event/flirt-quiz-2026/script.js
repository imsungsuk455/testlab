/* 바람기 테스트 로직 (퀴즈형)
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

    // ===== 결과 유형 정의 (바람기 8단계) =====
    const results = [
        {
            id: "pure",
            icon: "😇",
            title: "순정만점 순둥이형",
            desc: "바람기라는 개념 자체가 당신 사전에 없습니다. 이성과 눈이 마주치면 어색해서 시선부터 피하고, 연인에게는 오직 한 곳만 보는 진심파. 독박투어 바람기 테스트에서 당신은 채점조차 되지 않는 '안전 등급'입니다.",
            tags: ["바람기 Lv.0", "순정", "연인 최고"],
            extra: "당신 연인이 부럽습니다. 이대로만 유지하세요. 🍀 보유 아이템: 눈치 제로",
            img: "../../images/char_flirt_pure.webp"
        },
        {
            id: "wall",
            icon: "🛡️",
            title: "국가대표 철벽형",
            desc: "접근 자체가 불가능한 국가대표급 철벽입니다. 말을 걸어도 단칼에 끊고, 의심스러운 자리는 선제적으로 회피. 바람이 불려고 해도 당신 앞에서는 방풍창에 부딪혀 다 불어나갑니다.",
            tags: ["바람기 Lv.1", "철벽", "회피 마스터"],
            extra: "철벽이 연인에겐 가장 든든한 보호막이 됩니다. 🍀 보유 아이템: 단칼 거절",
            img: "../../images/char_flirt_wall.webp"
        },
        {
            id: "sprout",
            icon: "🌱",
            title: "무해 새싹형",
            desc: "바람기의 씨앗은 있지만 자랄 환경이 안 됩니다. 눈여겨보긴 하는데 행동으로 옮기기 전에 마음이 먼저 식는 타입. '그냥 친구' 선을 넘지 못하고 끝나는 경우가 대부분입니다.",
            tags: ["바람기 Lv.2", "새싹", "생각만 함"],
            extra: "새싹은 키우지 않는 게 제일 안전합니다. 🍀 보유 아이템: 마음의 절제",
            img: "../../images/char_flirt_sprout.webp"
        },
        {
            id: "tease",
            icon: "😏",
            title: "썸 기본소양형",
            desc: "분위기를 만드는 게 기본 소양이 된 사람들. 다정한 말 한마디, 자연스러운 미소로 상대가 '나한테 왜 이러지?' 하게 만듭니다. 본인은 아무것도 아닌 척하지만 상대는 벌써 심장이 뛰고 있어요.",
            tags: ["바람기 Lv.3", "분위기 장인", "썸 유치원생"],
            extra: "썸은 썸일 뿐, 선은 지키는 게 중요합니다. 🍀 보유 아이템: 자연스러운 미소",
            img: "../../images/char_flirt_tease.webp"
        },
        {
            id: "heart",
            icon: "💘",
            title: "마음만 플러터형",
            desc: "행동은 못 하고 마음만 다니 다니는 타입입니다. 예쁜 사람 보면 마음속으로는 이미 소개팅 코스까지 짜놨지만, 현실에서는 연인에게 잘하는 게 전부. 마음의 바람기는 물리 바람기로 인정되지 않습니다.",
            tags: ["바람기 Lv.4", "상상 만렙", "행동 제로"],
            extra: "마음속 여행은 무죄...라고 본인은 믿고 있습니다. 🍀 보유 아이템: 풍부한 상상력",
            img: "../../images/char_flirt_heart.webp"
        },
        {
            id: "secret",
            icon: "🕶️",
            title: "은밀한 스캔들 후보생",
            desc: "아무도 모르게 슬쩍 슬쩍, 흔적을 남기지 않는 백도어 라인. 연인에게 말 안 하는 사이가 하나쯤 있고, 필요 없는 기억은 미리 정리하는 스타일. 지금까지 들키지 않은 건 반은 실력, 반은 운입니다.",
            tags: ["바람기 Lv.5", "은밀 모드", "흔적 제로"],
            extra: "들키지만 않는 게 최고의 스킬은 아닙니다. 🍀 보유 아이템: 알림 삭제 기능",
            img: "../../images/char_flirt_secret.webp"
        },
        {
            id: "alert",
            icon: "🚨",
            title: "경고등 점등형",
            desc: "연인이 알면 소름 돋을 행동 패턴이 이미 여러 개 관측됩니다. 말 안 하고 만나고, DM은 기본, 연인 모르는 옆길이 하나쯤 뚫려있는 레벨. 김준호도 당신 결과지를 보면 조용히 연인에게 사과를 권할 듯합니다.",
            tags: ["바람기 Lv.6", "위험 신호", "감시 필요"],
            extra: "경고등이 깜빡일 땐 정비소에 가야 합니다. ⚠️ 권장 아이템: 연인 위치 공유",
            img: "../../images/char_flirt_alert.webp"
        },
        {
            id: "pro",
            icon: "🔥",
            title: "프로급 플레이어",
            desc: "눈빛만으로 상대의 마음을 훔치는 국보급 플레이어. 독박투어의 바람기 테스트도 당신 앞에서는 무의미합니다. 스킬로 갈고닦은 바람기는 이제 취미를 넘어 예술의 경지. 다만 연인의 눈물은 예술이 아니라는 점, 잊지 마세요.",
            tags: ["바람기 Lv.8", "만렙", "전설의 시작"],
            extra: "만렙의 길은 연인의 신뢰로 완성됩니다. ⚠️ 권장 아이템: 솔직함 대량 보충",
            img: "../../images/char_flirt_pro.webp"
        }
    ];

    // ===== 질문 정의 (8문항, 보기별 유형 가중치) =====
    const questions = [
        {
            q: "친구 커플이 '우리 사이엔 절대 비밀없다'고 자랑한다. 당신의 속마음은?",
            options: [
                { text: "부럽다... 나는 숨길 게 없다", scores: { "pure": 2 } },
                { text: "검사받는 기분이라 살짝 불편하다", scores: { "wall": 1, "sprout": 1 } },
                { text: "나도 하나 정도는 숨기고 있긴 하다", scores: { "tease": 1, "heart": 1 } },
                { text: "숨기는 것도 능력인데?", scores: { "secret": 2, "pro": 1 } }
            ]
        },
        {
            q: "짝사랑하는 사람이 '주말에 심심하다'고 톡을 보냈다. 답장은?",
            options: [
                { text: "혼자 하셈 ㅋㅋ 하고 끊는다", scores: { "wall": 2 } },
                { text: "재밌는 영화 하나 추천해주고 끝", scores: { "pure": 1, "sprout": 1 } },
                { text: "'심심하면 같이 볼까?' 미끼를 던진다", scores: { "tease": 2 } },
                { text: "이미 데이트 코스 짜서 3줄 답장 완성", scores: { "heart": 1, "pro": 2 } }
            ]
        },
        {
            q: "연인과 화해한 다음 날, 매력적인 후배가 놀자고 권유한다.",
            options: [
                { text: "\"안 갑니다\" 단칼 거절", scores: { "pure": 2, "wall": 1 } },
                { text: "다음에 꼭요! 하고 부드럽게 미룬다", scores: { "sprout": 2 } },
                { text: "커피 한잔은 괜찮지 않을까?", scores: { "tease": 1, "heart": 1 } },
                { text: "연인한테는 말 안 하고 간다", scores: { "secret": 2, "alert": 1 } }
            ]
        },
        {
            q: "SNS에서 반대편 성별 지인의 예쁜 사진을 봤다.",
            options: [
                { text: "지나가다가 하트도 안 누른다", scores: { "pure": 1, "wall": 1 } },
                { text: "스토리에 은근히 반응한다", scores: { "sprout": 1, "tease": 1 } },
                { text: "DM으로 '예쁘네요~' 한 마디 보낸다", scores: { "heart": 2 } },
                { text: "즉시 연락, 밥 약속까지 잡는다", scores: { "alert": 1, "pro": 2 } }
            ]
        },
        {
            q: "연인이 '전 첫사랑 얘기 해줘'라고 조른다.",
            options: [
                { text: "없습니다. 그게 전부입니다", scores: { "pure": 2 } },
                { text: "딱 사실만 짧고 담백하게", scores: { "wall": 1, "sprout": 1 } },
                { text: "재밌게 풀어서 에피소드처럼 얘기한다", scores: { "tease": 1, "heart": 1 } },
                { text: "필요 없는 부분은 이미 삭제 완료", scores: { "secret": 2, "alert": 1 } }
            ]
        },
        {
            q: "회사/학교에 매력적인 새 사람이 들어왔다.",
            options: [
                { text: "관심 없음. 할 일 하기 바쁨", scores: { "pure": 1, "wall": 2 } },
                { text: "눈여겨보긴 하는데 그뿐이다", scores: { "sprout": 2 } },
                { text: "어쩔 수 없이 잘 보이게 행동하게 됨", scores: { "heart": 1, "tease": 1 } },
                { text: "카톡 먼저 보내는 건 기본", scores: { "alert": 2, "pro": 1 } }
            ]
        },
        {
            q: "소개팅 나갔는데 상대가 마음에 든다. 연락 패턴은?",
            options: [
                { text: "상대가 먼저 올 때까지 기다린다", scores: { "wall": 1, "pure": 1 } },
                { text: "하루에 한 번 정도 여유롭게", scores: { "sprout": 2 } },
                { text: "답장이 늦어지면 살짝 재촉한다", scores: { "tease": 1, "heart": 1 } },
                { text: "매일 아침 굿모닝 톡부터 시작", scores: { "secret": 1, "alert": 1, "pro": 1 } }
            ]
        },
        {
            q: "마지막 질문. 바람기란 무엇이라고 생각하나?",
            options: [
                { text: "그런 거 있어서 어떻게 사냐", scores: { "pure": 2, "wall": 1 } },
                { text: "다들 조금씩은 있지 않나", scores: { "sprout": 1, "tease": 1 } },
                { text: "관리만 잘하면 괜찮은 취미...", scores: { "heart": 1, "secret": 2 } },
                { text: "스킬이다. 갈고닦는 것", scores: { "alert": 1, "pro": 2 } }
            ]
        }
    ];

    const retryBtn = document.getElementById('q-retry-btn');
    const shareLinkBtn = document.getElementById('q-share-link');
    const shareNativeBtn = document.getElementById('q-share-native');

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
            navigator.share({ title: '바람기 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
