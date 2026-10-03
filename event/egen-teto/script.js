/* 에겐남 테토남 테스트 로직 (퀴즈형)
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
    const resCharImg = document.getElementById('q-res-char-img');
    const resTags = document.getElementById('q-res-tags');
    const resDesc = document.getElementById('q-res-desc-text');
    const resExtra = document.getElementById('q-res-extra');

    const retryBtn = document.getElementById('q-retry-btn');
    const shareLinkBtn = document.getElementById('q-share-link');
    const shareNativeBtn = document.getElementById('q-share-native');

    // ===== 결과 유형 정의 (에겐 4 + 테토 4) =====
    const results = [
        {
            id: "egen-sprout",
            icon: "🌱",
            char: "../../images/char_egen-sprout.webp",
            title: "순수 새싹 에겐형",
            desc: "마음이 얼굴에 다 드러나는 순수형입니다. 좋아하면 좋아한다고 말하고, 서운하면 숨기지 못합니다. 계산 없이 다가가는 모습에 주변 사람들이 절로 챙겨주게 됩니다. 가끔은 순수함이 약점으로 보일 수 있으니, 중요한 결정 앞에서는 하루만 더 생각해보세요.",
            tags: ["순수함", "솔직함", "보호본능 유발"],
            extra: "최고의 궁합: 카리스마 테토형 — 챙겨주는 사람과 챙김 받는 사람의 완벽 분담입니다."
        },
        {
            id: "egen-puppy",
            icon: "🐶",
            char: "../../images/char_egen-puppy.webp",
            title: "댕댕미 에겐형",
            desc: "사람을 좋아하고 표현하는 데 거리낌이 없는 댕댕이형입니다. 반갑게 맞이하고, 리액션이 크고, 함께 있으면 기분이 좋아집니다. 애정 표현이 풍부한 만큼 혼자 있는 시간을 어려워할 수 있으니, 가끔은 혼자만의 충전 시간도 가져보세요.",
            tags: ["애교", "리액션", "분위기 메이커"],
            extra: "최고의 궁합: 야생 테토형 — 밝은 에너지와 자유로운 영혼이 만나면 매일 소풍 같습니다."
        },
        {
            id: "egen-fox",
            icon: "🦊",
            char: "../../images/char_egen-fox.webp",
            title: "여우 에겐형",
            desc: "부드러운 얼굴로 밀당을 즐기는 여우형입니다. 관심 없는 척하면서 다 챙기고, 모르는 척하면서 다 알고 있습니다. 눈치가 빠르고 상대의 마음을 읽는 데 능숙합니다. 다만 밀당이 길어지면 상대가 지칠 수 있으니, 가끔은 직진 모드도 보여주세요.",
            tags: ["밀당", "눈치", "은근한 챙김"],
            extra: "최고의 궁합: 직진 테토형 — 밀당과 직진이 만나면 연애가 드라마가 됩니다."
        },
        {
            id: "egen-tsun",
            icon: "🧊",
            char: "../../images/char_egen-tsun.webp",
            title: "츤데레 에겐형",
            desc: "말은 툴툴해도 행동은 따뜻한 츤데레형입니다. 걱정된다면서 챙겨주고, 관심 없다면서 다 기억합니다. 겉과 속이 달라 처음엔 오해를 받지만, 알수록 빠져드는 타입입니다. 고마우면 고맙다고 말하는 연습을 하면 인간관계가 훨씬 편해집니다.",
            tags: ["츤데레", "겉차속따", "행동파"],
            extra: "최고의 궁합: 순수 새싹 에겐형 — 솔직함이 츤데레의 껍질을 녹여줍니다."
        },
        {
            id: "teto-direct",
            icon: "🔥",
            char: "../../images/char_teto-direct.webp",
            title: "직진 테토형",
            desc: "좋으면 좋다고 바로 말하는 직진형입니다. 연락도 만남고백도 망설이지 않고, 썸의 기간이 짧은 편입니다. 추진력이 강해 원하는 것을 쟁취하지만, 상대의 속도도 가끔은 배려해주세요. 직진 뒤에 오는 책임감까지 갖추면 최강입니다.",
            tags: ["직진", "추진력", "빠른 썸"],
            extra: "최고의 궁합: 여우 에겐형 — 직진과 밀당이 만나면 연애가 드라마가 됩니다."
        },
        {
            id: "teto-wild",
            icon: "🐺",
            char: "../../images/char_teto-wild.webp",
            title: "야생 테토형",
            desc: "틀에 갇히기를 싫어하는 자유로운 영혼입니다. 갑자기 여행을 떠나고, 꽂힌 취미에는 올인합니다. 예측 불가능한 매력이 사람을 끌어당깁니다. 자유를 존중해주는 사람을 만나면 오래 가고, 구속하려 들면 멀어집니다.",
            tags: ["자유로움", "즉흥적", "매력적인 예측불가"],
            extra: "최고의 궁합: 댕댕미 에겐형 — 밝은 에너지와 자유로운 영혼이 만나면 매일 소풍 같습니다."
        },
        {
            id: "teto-charisma",
            icon: "👑",
            char: "../../images/char_teto-charisma.webp",
            title: "카리스마 테토형",
            desc: "어디서든 자연스럽게 리더가 되는 카리스마형입니다. 결정이 빠르고 책임을 지며, \u2018나만 믿어\u2019라는 말을 실제로 지킵니다. 믿음직한 모습에 따르는 사람이 많습니다. 다만 모든 결정을 혼자 하려 하면 주변인이 수동적으로 변하니, 가끔은 맡기는 연습도 필요합니다.",
            tags: ["리더십", "결단력", "신뢰감"],
            extra: "최고의 궁합: 순수 새싹 에겐형 — 챙겨주는 사람과 챙김 받는 사람의 완벽 분담입니다."
        },
        {
            id: "teto-twist",
            icon: "🎭",
            char: "../../images/char_teto-twist.webp",
            title: "반전 테토형",
            desc: "겉보기엔 강해 보이지만 속은 여린 반전형입니다. 무심한 척 챙기고, 쿨한 척 속으로 끙끙 앓습니다. 이런 갭 차이가 가장 큰 매력 포인트입니다. 속마음을 조금만 더 꺼내 보이면 주변 사람들이 훨씬 다가오기 쉬워집니다.",
            tags: ["갭 차이", "겉테 속 에겐", "무심한 챙김"],
            extra: "최고의 궁합: 츤데레 에겐형 — 무심한 챙김끼리 만나면 서로에게 스며듭니다."
        },
    ];

    // ===== 질문 정의 (8문항, 유형별 4개 보기 균등 배분) =====
    const questions = [
        {
            q: "첫 모임에서 나는?",
            options: [
                { text: "먼저 자기소개하며 분위기를 띄운다", scores: { "teto-direct": 2 } },
                { text: "옆자리 한 명과 깊게 이야기한다", scores: { "teto-twist": 2 } },
                { text: "웃으며 리액션을 담당한다", scores: { "egen-puppy": 2 } },
                { text: "자리 배치부터 정하고 시작한다", scores: { "teto-charisma": 2 } },
            ]
        },
        {
            q: "썸 상대의 답장이 느리다. 나는?",
            options: [
                { text: "바로 전화해버린다", scores: { "teto-direct": 2 } },
                { text: "기다리다가 삐진다", scores: { "egen-tsun": 2 } },
                { text: "바쁜가보다 이해한다", scores: { "egen-sprout": 2 } },
                { text: "나도 똑같이 늦게 답장한다", scores: { "egen-fox": 2 } },
            ]
        },
        {
            q: "친구가 고민 상담을 해온다. 나는?",
            options: [
                { text: "해결책을 바로 제시한다", scores: { "teto-charisma": 2 } },
                { text: "일단 맛있는 거 사준다", scores: { "egen-puppy": 2 } },
                { text: "밤새 들어준다", scores: { "egen-sprout": 2 } },
                { text: "내 경험담으로 간접 조언한다", scores: { "teto-twist": 2 } },
            ]
        },
        {
            q: "팀플에서 의견이 갈렸다. 나는?",
            options: [
                { text: "내 안을 밀어붙인다", scores: { "teto-wild": 2 } },
                { text: "투표하자고 제안한다", scores: { "teto-charisma": 2 } },
                { text: "다수 의견을 따른다", scores: { "egen-sprout": 2 } },
                { text: "뒤에서 조용히 중재한다", scores: { "egen-tsun": 2 } },
            ]
        },
        {
            q: "데이트 코스를 정한다면?",
            options: [
                { text: "서프라이즈 코스를 준비한다", scores: { "teto-direct": 2 } },
                { text: "상대가 가고 싶던 곳으로 간다", scores: { "egen-puppy": 2 } },
                { text: "분위기 좋은 곳으로 슬쩍 유도한다", scores: { "egen-fox": 2 } },
                { text: "액티비티 데이트를 잡는다", scores: { "teto-wild": 2 } },
            ]
        },
        {
            q: "칭찬을 들었다. 반응은?",
            options: [
                { text: "\"알지~\" 하며 장난친다", scores: { "teto-wild": 2 } },
                { text: "쑥스러워하며 부정한다", scores: { "egen-sprout": 2 } },
                { text: "\"너도 멋져\" 하며 받아친다", scores: { "egen-fox": 2 } },
                { text: "덤덤하게 넘긴다", scores: { "teto-charisma": 2 } },
            ]
        },
        {
            q: "화났을 때 나는?",
            options: [
                { text: "바로 말한다", scores: { "teto-direct": 2 } },
                { text: "말없이 티를 낸다", scores: { "egen-tsun": 2 } },
                { text: "혼자 삭힌다", scores: { "teto-twist": 2 } },
                { text: "서운해서 눈물부터 난다", scores: { "egen-puppy": 2 } },
            ]
        },
        {
            q: "이상형에 가까운 말은?",
            options: [
                { text: "\"자꾸 생각나\"", scores: { "egen-fox": 2 } },
                { text: "\"티는 안 내도 다 챙겨줄게\"", scores: { "egen-tsun": 2 } },
                { text: "\"어디든 가자, 내가 있지\"", scores: { "teto-twist": 2 } },
                { text: "\"재밌게 놀아보자\"", scores: { "teto-wild": 2 } },
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
        const msgs = ["답변을 모으고 있습니다...", "유형을 고르고 있습니다...", "결과를 정리하고 있습니다..."];
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

            const egenIds = ["egen-sprout", "egen-puppy", "egen-fox", "egen-tsun"];
            const tetoIds = ["teto-direct", "teto-wild", "teto-charisma", "teto-twist"];
            const egenTotal = egenIds.reduce((a, id) => a + (scores[id] || 0), 0);
            const tetoTotal = tetoIds.reduce((a, id) => a + (scores[id] || 0), 0);
            const all = egenTotal + tetoTotal || 1;
            const egenPct = Math.round(egenTotal / all * 100);

            resTitle.textContent = res.title;
            resIcon.textContent = res.icon;
            if (resCharImg && res.char) {
                resCharImg.src = res.char;
                resCharImg.alt = res.title + ' 캐릭터';
            }
            resDesc.innerHTML = res.desc;
            resTags.innerHTML = (res.tags || []).map(t => `<span class="q-result-tag">#${t}</span>`).join('');
            resExtra.innerHTML = (res.extra ? `<strong>한 줄 조언</strong><br>${res.extra}<br><br>` : '')
                + `<strong>에겐 지수 ${egenPct}% · 테토 지수 ${100 - egenPct}%</strong><br>답변 패턴을 에겐·테토 계열로 나눈 재미용 비율입니다.`;

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
            navigator.share({ title: '에겐남 테토남 테스트', url: window.location.href });
        } else {
            const toast = document.getElementById('toast');
            toast.innerText = "이 브라우저는 공유 기능을 지원하지 않습니다.";
            toast.className = 'show';
            setTimeout(() => toast.className = toast.className.replace('show', ''), 2500);
        }
    });
});
