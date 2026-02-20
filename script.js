// Moral Test Result Types
const moralCharacters = [
    {
        type: "?‰í˜¹???„ëžµê°€",
        theme: "villain",
        stat: 15,
        trait: "ì°¨ê°‘ê³??´ì„±?ì¸ ?ˆë§¤?ì„œ ë¿œì–´ì§€??ì²œìž¬?ì¸ ì§€?µê???ê´€?ìž…?ˆë‹¤.",
        ability: "?‰ì² ???í™© ?ë‹¨?¥ê³¼ ëª©ì ???„í•´ ê°ì •??ë°°ì œ?˜ëŠ” ì¶”ì§„??",
        tip: "ê°€?”ì? ì£¼ë? ?¬ëžŒ?¤ì˜ ê°ì •???´í”¼???¬ìœ ê°€ ?„ìš”?©ë‹ˆ??",
        img: "images/moral_res_1.png"
    },
    {
        type: "?´í˜ˆ ?¸ëŸ¬ë¸”ë©”?´ì»¤",
        theme: "villain",
        stat: 30,
        trait: "?˜ì¹˜???ë„ˆì§€ë¥?ì£¼ì²´?˜ì? ëª»í•˜???¤í˜ˆì§ˆì ???¬ê³ ë­‰ì¹˜??ê´€?ìž…?ˆë‹¤.",
        ability: "?•ë„?ì¸ ?‰ë™?¥ê³¼ ?„ê¸° ?í™©?ì„œ??êµ´í•˜ì§€ ?ŠëŠ” ë§·ì§‘.",
        tip: "?‰ë™?˜ê¸° ????3ì´ˆë§Œ ???ê°?˜ëŠ” ?µê????¤ì—¬ë³´ì„¸??",
        img: "images/moral_res_2.png"
    },
    {
        type: "ê·¸ë¦¼??ë°°í›„",
        theme: "villain",
        stat: 20,
        trait: "ì¡°ìš©???¤ì—??ëª¨ë“  ?í™©???¤ê³„?˜ê³  ì¡°ì¢…?˜ëŠ” ?‘ë§‰??ê´€?ìž…?ˆë‹¤.",
        ability: "?¨ë“¤??ë³´ì? ëª»í•˜???•ë³´???ë¦„???½ëŠ” ?µì°°??",
        tip: "ë³¸ì¸???¥ë ¥??? í•œ ?í–¥?¥ì„ ?„í•´ ?¬ìš©?´ë³´??ê±??´ë–¨ê¹Œìš”?",
        img: "images/moral_res_3.png"
    },
    {
        type: "??°œ??ë°˜í•­??,
        theme: "villain",
        stat: 40,
        trait: "ê·œì¹™ê³??µì••??ê±°ë??˜ë©° ë³¸ì¸ë§Œì˜ ê¸¸ì„ ê±·ëŠ” ?ìœ ë¶„ë°©??ê´€?ìž…?ˆë‹¤.",
        ability: "ê¸°ì„± ê¶Œìœ„???„ì „?˜ëŠ” ?ì‹ ???¬ê³ ?€ ê°•ì¸???…ë¦½??",
        tip: "?Œë¡œ???€?‘ì´ ????ê²°ê³¼ë¥?ë§Œë“¤?´ë‚¼ ???ˆìŒ??ê¸°ì–µ?˜ì„¸??",
        img: "images/moral_res_4.png"
    },
    {
        type: "? ì¶œê·€ëª?ê´´ë„",
        theme: "villain",
        stat: 25,
        trait: "?¡íž ???¡ížˆì§€ ?ŠëŠ” ? ì—°?¨ê³¼ ë§¤ë ¥??ê°€ì§??ìœ ?í˜¼??ê´€?ìž…?ˆë‹¤.",
        ability: "?œë°œ???˜ì¹˜???„ê¸°?‘ë?ê³??€?¸ì˜ ë§ˆìŒ???”ì¹˜??ë§¤ë ¥.",
        tip: "ì¤‘ìš”???½ì†?€ ì¡°ê¸ˆ ??ì±…ìž„ê°??ˆê²Œ ì§€?¤ëŠ” ?¸ë ¥???„ìš”?©ë‹ˆ??",
        img: "images/moral_res_5.png"
    },
    {
        type: "ì²œì˜ ?¼êµ´",
        theme: "villain",
        stat: 35,
        trait: "?í™©???°ë¼ ?ìœ ?ìž¬ë¡??´ë?ì§€ë¥?ë³€ì£¼í•˜??ê¸°ë§Œ??ê´€?ìž…?ˆë‹¤.",
        ability: "?ì›”??ê³µê° ?¥ë ¥?¼ë¡œ ?ë?ë¥??„ë²½???´í•´?˜ê³  ?™í™”??",
        tip: "?°ê¸° ?ì— ê°€?¤ì§„ ì§„ì§œ ?ì‹ ??ëª¨ìŠµ???ƒì? ë§ˆì„¸??",
        img: "images/moral_res_6.png"
    },
    {
        type: "?ˆë¦¬??ê°ì‹œ??,
        theme: "villain",
        stat: 10,
        trait: "?ë????¬ì†Œ???½ì ê¹Œì? ?Œê³ ?œëŠ” ? ì¹´ë¡œìš´ ?µì°°?¥ì˜ ë¹ŒëŸ°??ê´€?ìž…?ˆë‹¤.",
        ability: "?°ì´??ê¸°ë°˜???„ë²½??ë¶„ì„?¥ê³¼ ?ˆì ??ì°Œë¥´???ˆë¦¬??",
        tip: "ë¹„íŒë³´ë‹¤??ì¹?°¬?¼ë¡œ ?¬ëžŒ?¤ì˜ ë§ˆìŒ???»ì–´ë³´ëŠ” ê±??´ë–¨ê¹Œìš”?",
        img: "images/moral_res_7.png"
    },
    {
        type: "?‰í™”???˜í˜¸??,
        theme: "sage",
        stat: 90,
        trait: "?ë¹„ë¡œì?ê³??¬ìš©?¥ì´ ?ê»´ì§€???¨í™”???‰í™”ì£¼ì˜?í˜• ê´€?ìž…?ˆë‹¤.",
        ability: "ê°ˆë“±???´ì†Œ?˜ê³  ì£¼ë???ì¡°í™”ë¡?²Œ ë§Œë“œ??ì¤‘ìž¬ ?¥ë ¥.",
        tip: "ê°€?”ì? ë³¸ì¸???„ìš”???€?´ì„œ???¹ë‹¹???”êµ¬???„ìš”ê°€ ?ˆìŠµ?ˆë‹¤.",
        img: "images/moral_res_8.png"
    },
    {
        type: "ì§€?œë¡œ??ë©˜í† ",
        theme: "sage",
        stat: 85,
        trait: "?„ë¬¸?±ê³¼ ? ë¢°ê°€ ?ê»´ì§€???¬ë°”ë¥?ì§€?„ìž??ê´€?ìž…?ˆë‹¤.",
        ability: "ê²½í—˜??ë°”íƒ•?¼ë¡œ ?€?¸ì—ê²?ëª…í™•??ë°©í–¥???œì‹œ?˜ëŠ” ??",
        tip: "ì§€?ë³´?¤ëŠ” ?°ëœ»???„ë¡œ ?œë§ˆ?”ê? ????ë³€?”ë? ë§Œë“­?ˆë‹¤.",
        img: "images/moral_res_9.png"
    },
    {
        type: "?‡ì‚´ ê°™ì? ?´í?ì£¼ì˜??,
        theme: "sage",
        stat: 95,
        trait: "ì¡´ìž¬ë§Œìœ¼ë¡?ì£¼ë???ë°ížˆ???œìˆ˜??? ì˜ë¥?ê°€ì§?ê´€?ìž…?ˆë‹¤.",
        ability: "ê¸ì •?ì¸ ?•ì„œë¥??„íŒŒ?˜ê³  ?€?¸ì˜ ê³ í†µ??ë³´ë“¬??ì¹˜ìœ ??",
        tip: "?¨ì„ ?•ê¸° ?„ì— ?ì‹ ???ë„ˆì§€ê°€ ?Œì§„?˜ì? ?Šê²Œ ???Œë³´?¸ìš”.",
        img: "images/moral_res_10.png"
    }
];

// Joseon Test Result Types
const joseonCharacters = [
    {
        type: "ì¹´ë¦¬?¤ë§ˆ ?˜ì¹˜????,
        tags: ["#ë¦¬ë”??, "#ëª…ì˜ˆ", "#ì²œí•˜ë¥¼ê?ì§ˆê???],
        desc: "ê·€?˜ì˜ ?´ë§ˆ???“ê³  ?’ì•„ ê¸°ì„¸ê°€ ?±ë“±?˜ë©°, ?ˆì¹ ?°ì´ ?œë ·?˜ë‹ˆ ë§Œì¸???°ë‘ë¨¸ë¦¬ê°€ ???ìž…?ˆë‹¤. ?˜ê???ê½?ì°??ˆìœ¼??ë§ë…„???´ì„¸ ?í•œ ?‰íƒ„?˜ê³  ?í™”ë¡œìš¸ ê²ƒìž…?ˆë‹¤.",
        stats: [90, 85, 80, 75, 90], // ?´ë§ˆ, ?? ì½? ?? ??
        img: "images/ì¹´ë¦¬?¤ë§ˆ ?˜ì¹˜????png"
    },
    {
        type: "ì§€?œë¡œ???ì˜??,
        tags: ["#?„ëžµê°€", "#?´ì„±??, "#?™ì‹ê³¼ë•ë§?],
        desc: "ê°€?˜ê³  ê¸?ë´‰í™©???ˆë§¤ë¥?ì§€?”ìœ¼??ì§€?œê? êµ¬ë¦„ ?„ë? ?«ê³  ?˜ì•„ê°€ë©? ?¼êµ´???€ì¹?´ ?„ë²½?˜ë‹ˆ ê³µì •?¨ê³¼ ?™ì‹??ê²¸ë¹„???¬ìƒ???ìž…?ˆë‹¤.",
        stats: [80, 95, 70, 75, 80],
        img: "images/ì§€?œë¡œ???ì˜??png"
    },
    {
        type: "ê¸°ê°œê°€ ?’ì? ?¥êµ°",
        tags: ["#?©ê¸°", "#ê°•ì§??, "#ë¶ˆì˜ë¥¼ëª»ì°¸ìŒ"],
        desc: "?ˆì¹??ì§™ê³  ê±°ì¹ ë©?ì½§ë?ê°€ ?€?˜ë¬´ì²˜ëŸ¼ ê³§ê²Œ ë»—ì—ˆ?¼ë‹ˆ ê¸°ê°œê°€ ?˜ëŠ˜??ì°Œë¥´??ë¬´ì¸???ìž…?ˆë‹¤. ê°ì§„ ?±ì„ ?€ ê·??´ë–¤ ê³ ë‚œ?ë„ êµ´í•˜ì§€ ?Šì„ ê°•ì¸?¨ì„ ?»í•©?ˆë‹¤.",
        stats: [70, 85, 95, 70, 90],
        img: "images/ê¸°ê°œê°€ ?’ì? ?¥êµ°.png"
    },
    {
        type: "?ë¥˜ë¥?ì¦ê¸°??? ë¹„",
        tags: ["#?ˆìˆ ê°€", "#??§Œ", "#? ìœ ?ì "],
        desc: "ë§¤ë„?¬ìš´ ì½§ë‚ ê³?ë¶€?œëŸ¬???…ìˆ  ?¼ì¸?€ ?ˆìˆ ??ê°ìˆ˜?±ì´ ?ë??¨ì„ ?»í•˜ë©? ? í•˜ê³?ê¹Šì? ?ˆë™?ê? ?ì—°???„ë¦„?¤ì???ì«“ëŠ” ? ë¹„??ê´€?ìž…?ˆë‹¤.",
        stats: [85, 75, 70, 90, 70],
        img: "images/?ë¥˜ë¥?ì¦ê¸°??? ë¹„.png"
    },
    {
        type: "ì²œìž¬?ì¸ ?„í™”???”ì›",
        tags: ["#ê´€ì°°ë ¥", "#ì°½ì˜??, "#?¬ì„¸?œê°ê°?],
        desc: "?ˆê????”ìž”???ƒìŒê¸°ê? ?œë ¤ ?ˆê³  ?ˆë™?ê? ?‘ì?ë§?ë°˜ì§?´ë‹ˆ ?¸ìƒ??ê¿°ëš«??ë³´ëŠ” ?ˆëª©???ˆì‚¬ë¡?? ?ŠìŠµ?ˆë‹¤. ?¬ì„¸??ê°ê°?¼ë¡œ ì²œí•˜ë¥??”í­???´ì„ ?ìž…?ˆë‹¤.",
        stats: [75, 90, 65, 80, 65],
        img: "images/ì²œìž¬?ì¸ ?„í™”???”ì›.png"
    },
    {
        type: "ë§ŒëŠ¥ ?¬ì£¼ê¾?ë³´ë???,
        tags: ["#?í™œ??, "#?¬êµ??, "#?„êµ­?”ë„?¸ì‹¸"],
        desc: "ê´‘ë?ë¼ˆê? ë°œë‹¬?˜ê³  ?…ê¼¬ë¦¬ê? ??ƒ ?„ë? ?¥í•˜???¬êµ?±ì´ ?°ì–´?˜ê³  ?´ë””?œë“  ?˜ì˜ë°›ì„ ?ìž…?ˆë‹¤. ?¤ë?ì§??¼êµ´?•ì? ?˜ë‚œ???¸ìƒ?ì„œ???í™œ?¥ì„ ?»í•©?ˆë‹¤.",
        stats: [65, 70, 75, 95, 80],
        img: "images/ë§ŒëŠ¥ ?¬ì£¼ê¾?ë³´ë???png"
    },
    {
        type: "? ë¹„ë¡œìš´ êµ?¬´(ë¬´ë?)",
        tags: ["#ì§ê???, "#? ë¹„ë¡œì?", "#?¬ëžŒ?„ê¿°?«ì–´ë´?],
        desc: "?¬ë¼ê°??ˆê¼¬ë¦¬ì? ê°¸ë¦„???¼êµ´?•ì? ?¬ëžŒ??ë§ˆìŒ??ê¿°ëš«??ë³´ëŠ” ë¹„ë²”???µì°°?¥ì„ ?ì§•?©ë‹ˆ?? ?„ë“œ?¼ì§„ ??ë°?? êµ?´ì? ? ë¹„ë¡œìš´ ê¸°ìš´??ë¨¸ê¸ˆê³??ˆìŒ???»í•©?ˆë‹¤.",
        stats: [75, 95, 60, 75, 70],
        img: "images/ë¬´ë?.png"
    },
    {
        type: "?„ê²©???¬ê°„???ê?",
        tags: ["#?•ì˜ë¡œì?", "#?ì¹™ì£¼ì˜", "#?„ë²½ì£¼ì˜"],
        desc: "?¼ìž ?ˆì¹ê³??‡ê³  ?¨í˜¸???…ìˆ ?€ ?œë¹„ê³¡ì§??ê°€ë¦¼ì— ?ˆì–´ ??ì¹˜ì˜ ?”ë“¤ë¦¼ë„ ?†ìŒ???»í•©?ˆë‹¤. ê³ ì§‘ ?œë¦° ë¯¸ê°„?€ ?ì¹™??ì§€?¤ëŠ” êµ³ê±´??? ë…???ìž…?ˆë‹¤.",
        stats: [80, 80, 85, 95, 75],
        img: "images/?¬ê°„???ê?.png"
    },
    {
        type: "?ì• ë¡œìš´ ?ˆë°©ë§ˆë‹˜",
        tags: ["#?¬ìš©??, "#?¸ë•", "#?‰í™”ì£¼ì˜??],
        desc: "?¥ê·¼ ?¼êµ´?•ê³¼ ?„í†°??ê·“ë¶ˆ?€ ë³µì´ ê°€?í•˜ê³??±í’ˆ???¨í™”?˜ì—¬ ì£¼ë????¬ëžŒ???Šì´ì§€ ?Šì„ ?ìž…?ˆë‹¤. ?¬ìœ ë¡œìš´ ?¸ìƒ?€ ë§Œì¸???ˆì–´ì¤??¬ìš©?¥ì„ ?»í•©?ˆë‹¤.",
        stats: [70, 75, 75, 85, 85],
        img: "images/?ˆë°©ë§ˆë‹˜.png"
    },
    {
        type: "?ìœ ë¡œìš´ ?í˜¼??ê´‘ë?",
        tags: ["#? ë¨¸ê°ê°", "#?ìœ ", "#ë¶„ìœ„ê¸°ë©”?´ì»¤"],
        desc: "???…ê³¼ ?€ì§ìž„??ë§Žì? ?ˆì¹?€ ?€ê³ ë‚œ ?ˆëŠ¥?¸ì˜ ?¼ê? ?¤ë¶„?¨ì„ ?»í•©?ˆë‹¤. ë¹„ë?ì¹? ???œì •ê·¼ìœ¡?€ ?•í˜•?”ëœ ?¸ìƒ??ì¦ê±°?€??? ì‚¬???‰ìš´?„ì˜ ?ìž…?ˆë‹¤.",
        stats: [60, 85, 60, 95, 60],
        img: "images/?ìœ ë¡œìš´ ê´‘ë?.png"
    },
    {
        type: "?¼ìƒ???„ë¬¸ê°€ ë°±ì •",
        tags: ["#?¥ì¸?•ì‹ ", "#?¼ì„±ë¯?, "#ê±°ì¹œì¹´ë¦¬?¤ë§ˆ"],
        desc: "?íˆ¼??ì½§ë³¼ê³?ê°•í•˜ê²?ë°œë‹¬????ê·¼ìœ¡?€ ?˜ë‚œ???¸ìƒ???¤ì³ê°€???¼ì„±?ì¸ ?ì¡´?¥ì„ ?»í•˜ë©? ê¹Šê³  êµµì? ë¯¸ê°„ ì£¼ë¦„?€ ë³¸ì¸??ë¶„ì•¼?ì„œ ?¼ê?ë¥??´ë£¬ ?¥ì¸??ê¸°ìš´???´ë¿œê³??ˆìŠµ?ˆë‹¤.",
        stats: [50, 70, 95, 60, 95],
        img: "images/ë°±ì •.png"
    }
];

const characters = [
    {
        name: "ê°•ë¶ˆ??,
        title: "?•ì˜ë¡œìš´ ?´í˜ˆ ?Œë…„ë§Œí™” ì£¼ì¸ê³?,
        keywords: ["#?©ê¸°", "#ì§ì§„", "#?ë„ˆì§€", "#?˜ë¦¬"],
        desc: "ë¶ˆì˜ë¥?ë³´ë©´ ì°¸ì? ëª»í•˜??ê´€?ìž…?ˆë‹¤. ?ë„ˆì§€ê°€ ?˜ì¹˜ë©?ì£¼ë? ?¬ëžŒ?¤ì„ ?´ë„??ë¦¬ë”??´ ?ì›”?©ë‹ˆ??",
        img: "images/char_shonen.png"
    },
    {
        name: "?œì•„",
        title: "? ë¹„ë¡œìš´ ì§€ë¸Œë¦¬???œë¸Œ ì£¼ì¸ê³?,
        keywords: ["#ëª½í™˜", "#?¤ì •", "#ë¹„ë?", "#?±ìˆ™"],
        desc: "ë§ìˆ˜ê°€ ?ì–´??ë¶„ìœ„ê¸°ë§Œ?¼ë¡œ ?•ë„?˜ëŠ” ê´€?ìž…?ˆë‹¤. ?ì´ ê¹Šê³  ?€?¸ì˜ ?„í””????ê³µê°?´ì£¼??ì¹˜ìœ ???€?…ìž…?ˆë‹¤.",
        img: "images/char_ghibli.png"
    },
    {
        name: "?ˆì´",
        title: "?‰ì² ??ì²œìž¬ ?ë‡Œ???¼ì´ë²?,
        keywords: ["#?´ì„±??, "#ë¶„ì„", "#?„ë²½ì£¼ì˜", "#ì¸¤ë°??],
        desc: "ê°ì •ë³´ë‹¤ ?¼ë¦¬ê°€ ?žì„œ??ê´€?ìž…?ˆë‹¤. ì²˜ìŒ??ì°¨ê???ë³´ì´ì§€ë§? ?ê¸° ?¬ëžŒ?ê²Œ???€ê·¼ížˆ ?½í•œ ë©´ëª¨ë¥?ë³´ìž…?ˆë‹¤.",
        img: "images/char_rival.png"
    },
    {
        name: "?˜ëŠë¦?,
        title: "?‡ì‚´ ê°€?í•œ ?œì •ë§Œí™” ?¬ì£¼?¸ê³µ",
        keywords: ["#ê¸ì •", "#?¬ëž‘?¤ëŸ¬?€", "#ê³µê°??, "#ëª…ëž‘"],
        desc: "ì¡´ìž¬ë§Œìœ¼ë¡?ì£¼ë???ë°ê²Œ ë§Œë“œ??ê´€?ìž…?ˆë‹¤. ?¬ì†Œ??ê²ƒì—???‰ë³µ???ë¼ë©?ì£¼ë???ì¹œêµ¬ê°€ ?Šì´ì§€ ?ŠìŠµ?ˆë‹¤.",
        img: "images/char_shojo.png"
    },
    {
        name: "?”ì•ˆ",
        title: "?´íë¯??˜ì¹˜???ì?ë¥´í’ ë¹ŒëŸ°",
        keywords: ["#ì¹´ë¦¬?¤ë§ˆ", "#?…ë³´??, "#ê³ ë…", "#ë¯¸ìŠ¤?°ë¦¬"],
        desc: "?ë‚´ë¥??????†ëŠ” ?„í—˜??ë§¤ë ¥??ê°€ì§?ê´€?ìž…?ˆë‹¤. ?…ë¦½?ì¸ ?±í–¥??ê°•í•˜ë©?ë³¸ì¸ë§Œì˜ ?•ê³ ???¸ê³„ê´€???ˆìŠµ?ˆë‹¤.",
        img: "images/char_villain.png"
    },
    {
        name: "ëª½ì´",
        title: "?‰ëš±?˜ê³  ë°œëž„??ê°œê·¸ ìºë¦­??,
        keywords: ["#ë¶„ìœ„ê¸°ë©”?´ì»¤", "#ì°½ì˜??, "#?ìœ ?í˜¼", "#? ë¨¸"],
        desc: "?´ë””ë¡??ˆì? ëª¨ë¥´??ë§¤ë ¥???Œìœ ?ìž…?ˆë‹¤. ì°½ì˜?ì¸ ?ê°?¼ë¡œ ?¬ëžŒ?¤ì„ ?€?¼ê²Œ ?˜ë©° ?¤íŠ¸?ˆìŠ¤ë¥???ë°›ì? ?ŠìŠµ?ˆë‹¤.",
        img: "images/char_gag.png"
    },
    {
        name: "?ë“œë¦?,
        title: "?¨ë‹¨???´ë©´??ê¸°ì‚¬?¨ìž¥??,
        keywords: ["#ì±…ìž„ê°?, "#?ì¹™ì£¼ì˜", "#? ë¢°", "#ê°•ì¸??],
        desc: "?œë²ˆ ë§¡ì? ?¼ì? ?ê¹Œì§€ ?´ë‚´??ë¯¿ìŒì§í•œ ê´€?ìž…?ˆë‹¤. ê·œì¹™??ì¤‘ì‹œ?˜ë©° ì¡°ì§ ?´ì—??ì¤‘ì‹¬???¡ì•„ì£¼ëŠ” ??• ???©ë‹ˆ??",
        img: "images/char_knight.png"
    },
    {
        name: "?˜ë¥¸",
        title: "?˜ë¥¸???ë§ë¬???ê³ ì–‘?´ìƒ",
        keywords: ["#ë§ˆì´?¨ì´", "#?¬ìœ ", "#?¨ìœ¨??, "#?…ë¦½??],
        desc: "ê·€ì°?? ê±??«ì?ë§????¼ì? ê¸°ë§‰?ˆê²Œ ?˜í•˜??ê´€?ìž…?ˆë‹¤. ë³µìž¡??ê´€ê³„ë³´?¤ëŠ” ?¼ìžë§Œì˜ ?‰í™”ë¡œìš´ ?œê°„??ì¦ê¹?ˆë‹¤.",
        img: "images/char_healing.png"
    },
    {
        name: "?œë°•??,
        title: "ë°˜ì „ ë§¤ë ¥???ˆê²½ ??ì§€?µê?",
        keywords: ["#?„ëžµê°€", "#ì¹˜ë???, "#ë°˜ì „ë§¤ë ¥", "#?±ì·¨??],
        desc: "ê²‰ìœ¼ë¡??‰ë²”??ë³´ì´ì§€ë§?ë¨¸ë¦¿?ìœ¼ë¡??˜ë§Œ ê°€ì§€ ?˜ë? ?½ëŠ” ê´€?ìž…?ˆë‹¤. ëª©í‘œë¥??•í•˜ë©??˜ë‹¨ê³?ë°©ë²•??ê°€ë¦¬ì? ?Šê³  ?ì·¨?©ë‹ˆ??",
        img: "images/char_strategist.png"
    },
    {
        name: "ë¬´ëª…",
        title: "?¸ê³„ë¥??€ë¦¬ëŠ” ?€?”í˜• ì²œìž¬",
        keywords: ["#ì²œìž¬??, "#ì§‘ì¤‘??, "#?¬ì»¤?˜ì´??, "#?€?”í˜•"],
        desc: "?¤ë ¥???¨ê¸°ê³??ˆëŠ” ê³ ìˆ˜??ê´€?ìž…?ˆë‹¤. ?‰ì†Œ???ˆí—ˆ?¤ì‹¤ ?˜ì?ë§?ì¤‘ìš”???œê°„??ë³¸ì¸??ì²œìž¬?±ì„ ë°œíœ˜??ëª¨ë‘ë¥?êµ¬í•´?´ëŠ” ?ì›…??ê¸°ì§ˆ???ˆìŠµ?ˆë‹¤.",
        img: "images/char_genius.png"
    },
    {
        name: "?„ì´ë¦¬ìŠ¤",
        title: "ê³ ê³ ???¼ìŒ??ê³µì£¼/?•ìž??,
        keywords: ["#?ˆê²©", "#? ì¤‘", "#?°ì•„", "#ì² ë²½"],
        desc: "?½ê²Œ ê³ì„ ?´ì£¼ì§€ ?Šì?ë§? ?œë²ˆ ë§ˆìŒ???´ë©´ ?„êµ¬ë³´ë‹¤ ?¼íŽ¸?¨ì‹¬??ê´€?ìž…?ˆë‹¤. ?ê¸°ê´€ë¦¬ê? ë§¤ìš° ì² ì??©ë‹ˆ??",
        img: "images/char_ice.png"
    },
    {
        name: "?¤ì˜¨",
        title: "?‰ë™???¬ì´ë²„íŽ‘???ˆì–´ë¡?,
        keywords: ["#?ì‹ ", "#?„ì „", "#?¤í”¼??, "#ëª¨í—˜"],
        desc: "?ˆë¡œ??ê¸°ìˆ ?´ë‚˜ ë³€?”ì— ë¯¼ê°?˜ë©° ?„ì „??ì¦ê¸°??ê´€?ìž…?ˆë‹¤. ?•ì²´???˜ê²½??ì°¸ì? ëª»í•˜ê³????ˆë¡œ??ê¸¸ì„ ê°œì²™?©ë‹ˆ??",
        img: "images/char_cyberpunk.png"
    },
    {
        name: "?¤ì •",
        title: "?°ëœ»???™ë„¤ ???„ë‚˜ ê°™ì? ì¡°ë ¥??,
        keywords: ["#?Œì‹ ", "#ë°°ë ¤", "#?ë‹´??, "#?¸ê·¼??],
        desc: "ì£¼ì¸ê³?ê³ì—????? ë“ ?˜ê²Œ ë°›ì³ì£¼ëŠ” ì¡°ë ¥?ì˜ ê´€?ìž…?ˆë‹¤. ë³¸ì¸ë³´ë‹¤ ?¨ì„ ë¨¼ì? ì±™ê¸°???´í??ì¸ ?±ê²©?…ë‹ˆ??",
        img: "images/char_supporter.png"
    },
    {
        name: "?˜ë Œ",
        title: "?¤í¬ ?í?ì§€ ??ë¹„ìš´??ì£¼ì¸ê³?,
        keywords: ["#ê°ìˆ˜??, "#?ˆìˆ ê°€", "#?¬ìƒ‰", "#ê¹Šì´ê°?],
        desc: "?ê°??ê¹Šê³  ê°ìˆ˜?±ì´ ?ë??˜ì—¬ ?ˆìˆ ??ê¸°ì§ˆ???°ì–´??ê´€?ìž…?ˆë‹¤. ê³ ë…??ì¦ê¸°ë©??¬ìƒ‰??? ê¸°??ê²ƒì„ ì¢‹ì•„?©ë‹ˆ??",
        img: "images/char_tragic.png"
    },
    {
        name: "?œì˜¤",
        title: "?ë„ˆ?œí‹±???¤í¬ì¸?ë§Œí™” ?ì´??,
        keywords: ["#?¹ë???, "#?´ì •", "#?¨ìˆœëª…ë£Œ", "#?œë ¥"],
        desc: "?¤ë? ?Œì•„ë³´ì? ?Šê³  ëª©í‘œë¥??¥í•´ ?¬ë¦¬??ê´€?ìž…?ˆë‹¤. ?¤íŒ¨?´ë„ ?¤ëš?´ì²˜???¼ì–´?˜ëŠ” ê¸ì •?ì¸ ë©˜íƒˆ???Œìœ ?ìž…?ˆë‹¤.",
        img: "images/char_sports.png"
    },
    {
        name: "ë£¨ë???,
        title: "? ë¹„ë¡œìš´ ë§ˆë²•?™êµ ?°ë“±??,
        keywords: ["#?êµ¬??, "#ì§€??, "#?±ìž¥??, "#?±ì‹¤"],
        desc: "ë°°ìš°??ê²ƒì„ ì¦ê¸°ê³?ì§€?ìš•??ê°•í•œ ê´€?ìž…?ˆë‹¤. ë³¸ì¸??ë¶€ì¡±í•¨???¸ì •?˜ê³  ê¾¸ì????¸ë ¥?˜ì—¬ ê²°êµ­ ?±ê³µ?˜ëŠ” ?€?…ìž…?ˆë‹¤.",
        img: "images/char_mage.png"
    },
    {
        name: "ë³´ë¦¬",
        title: "?ê¸‹???¼ìƒë¬???ë¹µì§‘ ì£¼ì¸",
        keywords: ["#?Œí™•??, "#?ˆì •", "#?ë§", "#ë¯¸ë‹ˆë©€ë¦¬ì¦˜"],
        desc: "?Œì†Œ???¼ìƒ???‰ë³µ???Œì¤‘???¬ê¸°??ê´€?ìž…?ˆë‹¤. ê²½ìŸë³´ë‹¤???‰í™”ë¡œìš´ ?¶ì„ ì§€?¥í•˜ë©?ì£¼ë????¸ì•ˆ?¨ì„ ? ë¬¼?©ë‹ˆ??",
        img: "images/char_bakery.png"
    },
    {
        name: "?¤í?",
        title: "?”ë ¤???¤í¬?¸ë¼?´íŠ¸ ?„ì´?Œí˜•",
        keywords: ["#?¤í???, "#?ì‹ ê°?, "#?œí˜„??, "#?¸ê¸°"],
        desc: "?´ë””ë¥?ê°€??ì£¼ì¸ê³µì´ ?˜ëŠ” ê´€?ìž…?ˆë‹¤. ?ì‹ ???œí˜„?˜ëŠ” ??ê±°ì¹¨???†ìœ¼ë©??¬ëžŒ?¤ì˜ ê´€?¬ì„ ì¦ê¸¸ ì¤??•ë‹ˆ??",
        img: "images/char_idol.png"
    },
    {
        name: "?œë¡œ",
        title: "?œë?ë¥??žì„œê°€???´ì»¤/ë°œëª…ê°€",
        keywords: ["#?…íŠ¹??, "#ì²œìž¬??, "#ì§‘ì¤‘??, "#ê´´ì§œ"],
        desc: "??ë¶„ì•¼??ê½‚ížˆë©?ë¬´ì„œ??ì§‘ì¤‘?¥ì„ ë°œíœ˜?˜ëŠ” ê´€?ìž…?ˆë‹¤. ?¨ë“¤??ë³´ì? ëª»í•˜??ê´€?ì„ ?œì‹œ?˜ëŠ” ?…ë³´?ì¸ ì¡´ìž¬?…ë‹ˆ??",
        img: "images/char_hacker.png"
    },
    {
        name: "?í”¼",
        title: "?¬ëž‘???„í•˜???í”¼???”ì •??,
        keywords: ["#ì¤‘ìž¬??, "#?‰í™”", "#ì¹œí™”??, "#?¬ë¸”ë¦?],
        desc: "?¬ëžŒ ?¬ì´??ê°ˆë“±???´ê²°?˜ê³  ?”í•©???´ëŒ?´ë‚´??ê´€?ìž…?ˆë‹¤. ì£¼ë??¸ë“¤???°ì•  ?ë‹´ ?¨ê³¨ ?€?ì´ê¸°ë„ ?©ë‹ˆ??",
        img: "images/char_cupid.png"
    }
];

// State
let currentImage = null;
let currentTest = 'manhwa'; // 'manhwa', 'moral', or 'joseon'

// Navigation Function
function showSection(id) {
    console.log('Showing section:', id, 'Current test:', currentTest);
    const sections = document.querySelectorAll('.section');

    // Theme handling
    if (id === 'moral-home' || id === 'moral-result' || (currentTest === 'moral' && (id === 'upload' || id === 'loading'))) {
        document.body.classList.add('moral-theme-active');
    } else {
        document.body.classList.remove('moral-theme-active');
    }

    if (id === 'joseon-home' || id === 'joseon-result' || (currentTest === 'joseon' && (id === 'upload' || id === 'loading'))) {
        document.body.classList.add('joseon-theme-active');
    } else {
        document.body.classList.remove('joseon-theme-active');
    }

    const uploadEl = document.getElementById('upload');
    if (uploadEl) {
        if (currentTest === 'joseon' && id === 'loading') {
            uploadEl.classList.add('joseon-loading');
        } else {
            uploadEl.classList.remove('joseon-loading');
        }
    }

    let found = false;
    sections.forEach(s => {
        s.classList.remove('active');
        if (s.id === id) {
            s.classList.add('active');
            window.scrollTo(0, 0);
            found = true;
        }
    });

    if (!found) {
        console.error('Section not found:', id);
    }
}

function resetUploadUI() {
    currentImage = null;
    const imagePreview = document.getElementById('image-preview');
    const scanImg = document.getElementById('scan-img');
    const previewBox = document.getElementById('preview-box');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (imagePreview) imagePreview.src = '#';
    if (scanImg) scanImg.src = '#';
    if (previewBox) previewBox.style.display = 'none';
    if (dropZone) dropZone.style.display = 'block';
    if (fileInput) fileInput.value = "";

    // Clear result images
    const resImg = document.getElementById('res-img');
    const moralResImg = document.getElementById('moral-res-img');
    const joseonResImg = document.getElementById('joseon-res-img');
    if (resImg) resImg.src = '';
    if (moralResImg) moralResImg.src = '';
    if (joseonResImg) joseonResImg.src = '';
}

function resetTest() {
    resetUploadUI();
    const scanContainer = document.querySelector('.scan-box');
    if (scanContainer) {
        const existingOverlay = scanContainer.querySelector('.landmark-overlay');
        if (existingOverlay) existingOverlay.remove();
        scanContainer.classList.remove('landmark-active');
    }
    showSection('main-hub');
}

// Robust Initialization
function initApp() {
    console.log('TesterLab initializing...');

    // Hub Navigation
    const cards = {
        'test-manhwa-card': 'manhwa',
        'test-moral-card': 'moral',
        'test-joseon-card': 'joseon'
    };

    Object.keys(cards).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => {
                console.log('Hub card clicked:', id);
                currentTest = cards[id];
                showSection(currentTest + '-home');
            });
        } else {
            console.warn('Hub card element missing:', id);
        }
    });

    // Start Buttons
    const startBtns = {
        'start-btn': 'manhwa',
        'moral-start-btn': 'moral',
        'joseon-start-btn': 'joseon'
    };

    Object.keys(startBtns).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => {
                resetUploadUI();
                showSection('upload');
            });
        }
    });

    // Other Buttons
    ['retry-btn', 'moral-retry-btn', 'joseon-retry-btn', 'logo-home'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', resetTest);
    });

    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            showSection('loading');
            startAnalysis();
        });
    }

    // File Handling
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    if (fileInput && dropZone) {
        dropZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFile);
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderWidth = '3px';
        });
        dropZone.addEventListener('dragleave', () => dropZone.style.borderWidth = '2px');
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            handleFile(e);
        });
    }

    // Share Buttons
    const shareActions = [
        ['copy-link-btn', copyToClipboard],
        ['share-native-btn', shareNative],
        ['moral-copy-link-btn', copyToClipboard],
        ['moral-share-native-btn', shareNative],
        ['joseon-copy-link-btn', copyToClipboard],
        ['joseon-share-native-btn', shareNative]
    ];

    shareActions.forEach(([id, action]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', action);
    });
}

// Safer event listener execution (Robust Pattern)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function handleFile(e) {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            currentImage = event.target.result;
            const imagePreview = document.getElementById('image-preview');
            const scanImg = document.getElementById('scan-img');
            const previewBox = document.getElementById('preview-box');
            const dropZone = document.getElementById('drop-zone');

            if (imagePreview) imagePreview.src = currentImage;
            if (scanImg) scanImg.src = currentImage;
            if (previewBox) previewBox.style.display = 'block';
            if (dropZone) dropZone.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.value = "";
}

function startAnalysis() {
    const scanContainer = document.querySelector('.scan-box');
    const statusText = document.getElementById('status-text');

    if (scanContainer) {
        const existingOverlay = scanContainer.querySelector('.landmark-overlay');
        if (existingOverlay) existingOverlay.remove();
        scanContainer.classList.remove('landmark-active');
    }

    let statuses = [];
    if (currentTest === 'manhwa') {
        statuses = [
            "?ˆë§¤??ê°ë„ë¥?ì¸¡ì •?˜ê³  ?ˆìŠµ?ˆë‹¤...",
            "?¼êµ´?•ì˜ ì¡°í™”ë¥?ë¶„ì„?˜ëŠ” ì¤?..",
            "?…ë§¤??ê¸°ìš´???Œì•…?˜ê³  ?ˆìŠµ?ˆë‹¤...",
            "ìºë¦­???¼ì´ë¸ŒëŸ¬ë¦¬ì—??ë§¤ì¹­ ì¤?..",
            "ìµœì ??ìºë¦­?°ë? ì°¾ì•˜?µë‹ˆ??"
        ];
    } else if (currentTest === 'joseon') {
        statuses = [
            "???„ëž˜??ê¸°ìš´???´í”¼??ì¤‘ìž…?ˆë‹¤...",
            "?´ëª©êµ¬ë¹„??ì¡°í™”ë¥??€ì¡°í•˜ê³??ˆìŠµ?ˆë‹¤...",
            "?„ìƒ???°ì„ ì°¾ê³  ?ˆìŠµ?ˆë‹¤...",
            "ê´€?ì„ ê¸°ë¡?˜ëŠ” ì¤‘ìž…?ˆë‹¤...",
            "ë¶„ì„???„ë£Œ?˜ì—ˆ?µë‹ˆ??"
        ];
    } else {
        createLandmarks();
        statuses = [
            "?¼êµ´??ì£¼ìš” ?œë“œë§ˆí¬ ?¤ìº” ì¤?..",
            "?„ë•??ì§€???¤ìº” ì¤?..",
            "? ìž¬???±í–¥ ë¶„ì„ ì¤?..",
            "ë¯¸ì„¸ ?œì • ê¸°ìš´ ê°ì??˜ëŠ” ì¤?..",
            "ë¶„ì„???„ë£Œ?˜ì—ˆ?µë‹ˆ??"
        ];
    }

    let i = 0;
    const interval = setInterval(() => {
        if (statusText) statusText.innerText = statuses[i];
        i++;
        if (i === statuses.length) {
            clearInterval(interval);
            setTimeout(showResult, 1000);
        }
    }, 1200);
}

function createLandmarks() {
    const scanContainer = document.querySelector('.scan-box');
    if (!scanContainer) return;

    const overlay = document.createElement('div');
    overlay.className = 'landmark-overlay';

    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.top = Math.random() * 80 + 10 + '%';
        dot.style.left = Math.random() * 80 + 10 + '%';
        dot.style.transitionDelay = (Math.random() * 1) + 's';
        overlay.appendChild(dot);
    }

    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line-v2';
    overlay.appendChild(scanLine);

    scanContainer.appendChild(overlay);
    setTimeout(() => scanContainer.classList.add('landmark-active'), 100);
}

function getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

function showResult() {
    if (!currentImage) return;

    const hash = getHash(currentImage + currentTest);

    if (currentTest === 'manhwa') {
        const index = hash % characters.length;
        const result = characters[index];
        const resTitle = document.getElementById('res-title');
        const resDesc = document.getElementById('res-desc');
        const resImg = document.getElementById('res-img');
        const keywordsBox = document.getElementById('res-keywords');

        if (resTitle) resTitle.innerHTML = `<span style="font-size: 0.8em; color: #888;">${result.name}</span><br>${result.title}`;
        if (resDesc) resDesc.innerText = result.desc;
        if (keywordsBox) {
            keywordsBox.innerHTML = '';
            result.keywords.forEach(k => {
                const span = document.createElement('span');
                span.className = 'keyword';
                span.innerText = k;
                keywordsBox.appendChild(span);
            });
        }
        if (resImg) resImg.src = result.img;
        showSection('result');
    } else if (currentTest === 'moral') {
        const index = hash % moralCharacters.length;
        const result = moralCharacters[index];

        const resType = document.getElementById('moral-res-type');
        const resImg = document.getElementById('moral-res-img');
        const resTrait = document.getElementById('moral-res-trait');
        const resAbility = document.getElementById('moral-res-ability');
        const resTip = document.getElementById('moral-res-tip');

        if (resType) resType.innerText = result.type;
        if (resImg) resImg.src = currentImage;
        if (resTrait) resTrait.innerText = result.trait;
        if (resAbility) resAbility.innerText = result.ability;
        if (resTip) resTip.innerText = result.tip;

        const statFill = document.getElementById('moral-stat-fill');
        const statValue = document.getElementById('moral-stat-value');
        if (statFill) statFill.style.width = '0%';
        if (statValue) statValue.innerText = '0%';

        showSection('moral-result');

        setTimeout(() => {
            if (statFill) {
                statFill.style.width = result.stat + '%';
                statFill.style.background = result.theme === 'villain'
                    ? 'linear-gradient(90deg, #ff7eb9, #6c5ce7)'
                    : 'linear-gradient(90deg, #ffd700, #00d2ff)';
            }
            if (statValue) statValue.innerText = result.stat + '%';
        }, 300);
    } else if (currentTest === 'joseon') {
        const index = hash % joseonCharacters.length;
        const result = joseonCharacters[index];

        const resType = document.getElementById('joseon-res-type');
        const resImg = document.getElementById('joseon-res-img');
        const resDesc = document.getElementById('joseon-res-desc');
        const tagsBox = document.getElementById('joseon-res-tags');

        if (resType) resType.innerText = result.type;
        if (resImg) resImg.src = result.img;
        if (resDesc) resDesc.innerText = result.desc;

        if (tagsBox) {
            tagsBox.innerHTML = '';
            result.tags.forEach(t => {
                const span = document.createElement('span');
                span.className = 'joseon-tag';
                span.innerText = t;
                tagsBox.appendChild(span);
            });
        }

        showSection('joseon-result');
        drawJoseonRadarChart(result.stats);
    }
}

function drawJoseonRadarChart(stats) {
    const canvas = document.getElementById('joseon-radar-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 65;
    const labels = ["?´ë§ˆ", "??, "ì½?, "??, "??];
    const angleStep = (Math.PI * 2) / labels.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        for (let j = 0; j < labels.length; j++) {
            const r = (radius / 5) * i;
            const x = centerX + r * Math.cos(j * angleStep - Math.PI / 2);
            const y = centerY + r * Math.sin(j * angleStep - Math.PI / 2);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    ctx.beginPath();
    for (let i = 0; i < labels.length; i++) {
        const x = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);

        ctx.font = 'bold 11px Gungsuh, serif';
        ctx.fillStyle = '#777';
        const labelX = centerX + (radius + 18) * Math.cos(i * angleStep - Math.PI / 2);
        const labelY = centerY + (radius + 18) * Math.sin(i * angleStep - Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], labelX, labelY);
    }
    ctx.strokeStyle = '#ddd';
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < stats.length; i++) {
        const r = (stats[i] / 100) * radius;
        const x = centerX + r * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + r * Math.sin(i * angleStep - Math.PI / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(17, 17, 17, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("ë§í¬ê°€ ë³µì‚¬?˜ì—ˆ?µë‹ˆ??");
    }).catch(() => {
        // Fallback for non-HTTPS
        const input = document.createElement('input');
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast("ë§í¬ê°€ ë³µì‚¬?˜ì—ˆ?µë‹ˆ??");
    });
}

function shareNative() {
    if (navigator.share) {
        navigator.share({
            title: '?ŒìŠ¤?¸ëž© - ê´€???ŒìŠ¤??,
            text: 'AIê°€ ë¶„ì„?˜ëŠ” ?˜ì˜ ? ìž¬??ê´€?ì?? ì§€ê¸??•ì¸?´ë³´?¸ìš”!',
            url: window.location.href,
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert("??ë¸Œë¼?°ì???ê³µìœ  ê¸°ëŠ¥??ì§€?í•˜ì§€ ?ŠìŠµ?ˆë‹¤. ë§í¬ ë³µì‚¬ë¥??´ìš©?´ì£¼?¸ìš”!");
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 2500);
}
