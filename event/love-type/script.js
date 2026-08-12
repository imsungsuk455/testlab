/* 연애 유형 테스트 로직 (퀴즈형)
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
            id: "passion",
            icon: "🔥",
            title: "열정적인 불꽃형",
            desc: "사랑에 빠지면 마치 불꽃처럼 뜨겁게 타오르는 타입. 데이트 계획부터 이벤트까지 모든 걸 열정적으로 준비하며, 연인의 감정을 매번 새롭게 흔들어 놓습니다. 연애의 재미를 가장 잘 아는 로맨티스트예요.",
            tags: ["열정", "로맨틱", "이벤트"],
            extra: "당신의 뜨거운 마음은 연인을 항상 설레게 합니다.",
            img: "../../images/char_love_passion.webp"
        },
        {
            id: "logic",
            icon: "🧠",
            title: "논리적인 분석형",
            desc: "감정보다 논리로 사랑을 푸는 타입. 연인과 갈등이 생기면 '왜'와 '어떻게'를 따지며 차분하게 문제를 해결합니다. 이성적인 접근으로 연애의 함정을 피해가는 현실주의자예요.",
            tags: ["이성적", "분석", "합리적"],
            extra: "당신의 논리적인 사랑은 오래갑니다.",
            img: "../../images/char_love_logic.webp"
        },
        {
            id: "caring",
            icon: "💗",
            title: "다정한 배려형",
            desc: "연인의 마음을 읽는 데 타고난 공감 요정. 작은 선물부터 힘들 때의 위로까지, 상대가 필요한 순간을 정확히 알고 행동하는 타입입니다. 연애에서 가장 안정감을 주는 존재예요.",
            tags: ["공감", "다정", "사랑꾼"],
            extra: "당신의 다정함은 사랑을 키우는 비료입니다.",
            img: "../../images/char_love_caring.webp"
        },
        {
            id: "free",
            icon: "🦋",
            title: "자유로운 바람형",
            desc: "누구에게도 묶이지 않는 자유로운 영혼. 데이트도 즉흥적으로 떠나고, 연애도 틀에 박히지 않게 즐기는 타입입니다. 지루한 연애를 가장 싫어하는 스릴러 연인!",
            tags: ["자유", "즉흥", "스릴"],
            extra: "당신과 함께면 매일이 새로운 모험입니다.",
            img: "../../images/char_love_free.webp"
        },
        {
            id: "stable",
            icon: "🏠",
            title: "안정적인 현실형",
            desc: "화려한 이벤트보다 평범한 일상의 행복을 추구하는 타입. 주말 데이트, 함께 만드는 저녁, 티끌 같은 일상을 소중히 여기며 긴 연애를 지켜나가는 믿음직한 연인입니다.",
            tags: ["안정", "성실", "신뢰"],
            extra: "당신의 꾸준함이 사랑을 든든하게 만듭니다.",
            img: "../../images/char_love_stable.webp"
        },
        {
            id: "humor",
            icon: "😂",
            title: "센스 만점 유머형",
            desc: "대화를 즐겁게 만드는 분위기 메이커. 어색한 침묵이 흐르면 순간적으로 개그를 터뜨리는 재주가 있으며, 연인을 언제나 웃게 만드는 타입입니다. 연애 내내 웃음이 끊이지 않아요.",
            tags: ["유머", "유쾌", "분위기"],
            extra: "당신 곁에 있으면 웃음이 끊이지 않습니다.",
            img: "../../images/char_love_humor.webp"
        },
        {
            id: "observer",
            icon: "👀",
            title: "조용한 관찰형",
            desc: "말이 많지 않지만 눈은 항상 연인을 향한 타입. 연인의 취향, 버릇, 좋아하는 것까지 꼼꼼히 기억하고 있으면서 오히려 말없이 행동으로 보여줍니다. 깊고 진중한 사랑을 하는 관찰자예요.",
            tags: ["관찰", "진중", "깊은 사랑"],
            extra: "당신의 조용한 눈빛이 연인의 마음을 읽습니다.",
            img: "../../images/char_love_observer.webp"
        },
        {
            id: "leader",
            icon: "👑",
            title: "주도적인 리더형",
            desc: "연애의 방향을 자신 있게 이끄는 타입. 데이트 코스부터 미래 계획까지, 결정해야 할 순간이 오면 먼저 나서서 책임지고 해결합니다. 연인이 의지하고 싶어 하는 존재예요.",
            tags: ["리더십", "책임감", "결단력"],
            extra: "당신의 결단력이 사랑을 이끌어 갑니다.",
            img: "../../images/char_love_leader.webp"
        },
    ];

    // ===== 질문 정의 =====
    const questions = [
        {
            q: "연인과의 첫 데이트, 어디로 가고 싶나요?",
            options: [
                { text: "놀이공원에서 하루 종일 신나게!", scores: { "passion": 2, "free": 1 } },
                { text: "조용한 카페에서 깊은 대화", scores: { "caring": 1, "observer": 2 } },
                { text: "계획 짜둔 맛집 + 영화 코스", scores: { "stable": 2, "leader": 1 } },
                { text: "아무 데나 좋아, 즉흥적으로 가자!", scores: { "free": 2, "humor": 1 } },
            ]
        },
        {
            q: "연인과 다퉜을 때 나의 반응은?",
            options: [
                { text: "감정이 북받쳐 먼저 사과부터 한다", scores: { "passion": 2, "caring": 1 } },
                { text: "차분히 '왜 그랬는지' 따져본다", scores: { "logic": 2, "stable": 1 } },
                { text: "상대 기분이 풀릴 때까지 기다린다", scores: { "observer": 2, "caring": 1 } },
                { text: "유머로 분위기를 전환해본다", scores: { "humor": 2 } },
            ]
        },
        {
            q: "가장 이상적으로 생각하는 연애의 모습은?",
            options: [
                { text: "매일 새롭고 자극적인 연애", scores: { "passion": 2, "free": 1 } },
                { text: "서로를 존중하는 이성적인 관계", scores: { "logic": 2 } },
                { text: "아무 말 없이 있어도 편한 관계", scores: { "observer": 2, "caring": 1 } },
                { text: "함께 미래를 설계하는 든든한 연애", scores: { "stable": 2, "leader": 1 } },
            ]
        },
        {
            q: "연인이 힘들다고 하소연하면?",
            options: [
                { text: "바로 달려가 안아주고 위로한다", scores: { "caring": 2, "passion": 1 } },
                { text: "해결책을 차근차근 알려준다", scores: { "logic": 2, "leader": 1 } },
                { text: "조용히 들어주며 곁을 지킨다", scores: { "observer": 2 } },
                { text: "웃게 만들어서 기분을 돌려준다", scores: { "humor": 2, "free": 1 } },
            ]
        },
        {
            q: "연인에게 가장 바라는 것은?",
            options: [
                { text: "매일 나를 사랑한다고 말해주는 것", scores: { "passion": 2 } },
                { text: "내 생각을 이해하려는 노력", scores: { "logic": 2, "observer": 1 } },
                { text: "작은 관심과 다정한 말 한마디", scores: { "caring": 2 } },
                { text: "나를 믿고 자유롭게 두는 것", scores: { "free": 2, "stable": 1 } },
            ]
        },
        {
            q: "주말에 연인이랑 보내는 이상적인 시간은?",
            options: [
                { text: "새로운 카페나 전시회 탐방", scores: { "passion": 1, "free": 2 } },
                { text: "집에서 둘만의 요리와 영화", scores: { "stable": 2, "caring": 1 } },
                { text: "당일치기 여행 떠나기", scores: { "free": 2, "humor": 1 } },
                { text: "다음 한 달 계획을 같이 세우기", scores: { "leader": 2, "logic": 1 } },
            ]
        },
        {
            q: "친구들이 나를 연애할 때 이렇게 표현해요:",
            options: [
                { text: "사랑꾼! 너만 보면 눈이 하트야", scores: { "passion": 2, "caring": 1 } },
                { text: "이성의 화신, 계산이 빨라", scores: { "logic": 2 } },
                { text: "분위기 메이커, 같이 있으면 웃겨", scores: { "humor": 2, "free": 1 } },
                { text: "오지라퍼, 상대만 바라봐", scores: { "observer": 2, "stable": 1 } },
            ]
        },
        {
            q: "결혼 전에 반드시 정하고 싶은 것은?",
            options: [
                { text: "서로에 대한 확실한 사랑", scores: { "passion": 2, "caring": 1 } },
                { text: "금전, 육아 등 현실적인 계획", scores: { "logic": 2, "stable": 1 } },
                { text: "두 사람의 자유로운 생활 보장", scores: { "free": 2 } },
                { text: "집안일 분담과 역할 분배", scores: { "leader": 2, "stable": 1 } },
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
            navigator.share({ title: '연애 유형 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
