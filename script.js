// TesterLab 홈 허브 (탭 필터링 전용 — 테스트 로직은 event/{slug}/ 독립 페이지로 분리됨)
function initApp() {
    // 테스트 유형 탭 필터링
    const tabs = document.querySelectorAll('.test-tab');
    if (tabs.length) {
        const filterCards = (tabName) => {
            const cards = document.querySelectorAll('.test-card[data-tab]');
            cards.forEach(c => {
                const show = tabName === 'all' || c.dataset.tab === tabName;
                c.style.display = show ? '' : 'none';
            });
        };
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                filterCards(tab.dataset.tab);
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
