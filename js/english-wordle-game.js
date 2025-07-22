// English Wordle Game
class EnglishWordleGame {
    constructor() {
        this.targetWord = '';
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.guesses = [];
        
        // Common 5-letter English words for educational purposes
        this.wordList = [
            'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
            'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
            'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
            'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AVOID', 'AWAKE',
            'AWARD', 'AWARE', 'BADLY', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW', 'BENCH',
            'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLAST', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD',
            'BOAST', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK',
            'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BURST', 'BUYER',
            'CABLE', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE',
            'CHEAP', 'CHECK', 'CHEST', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN',
            'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST', 'COULD', 'COUNT',
            'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN',
            'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY',
            'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DRAWN', 'DREAM', 'DRESS',
            'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELITE',
            'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT',
            'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT',
            'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH',
            'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FROST', 'FUNNY',
            'GHOST', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GLORY', 'GOODS', 'GRACE', 'GRADE', 'GRAIN',
            'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD',
            'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HARSH', 'HEART', 'HEAVY', 'HENCE', 'HORSE', 'HOTEL',
            'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JOINT',
            'JUDGE', 'KNIFE', 'KNOCK', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER',
            'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LIGHT', 'LIMIT', 'LIVED', 'LOCAL',
            'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MATCH',
            'MAYBE', 'MAYOR', 'MEANT', 'MEDAL', 'MEDIA', 'METAL', 'METER', 'MIGHT', 'MINOR', 'MINUS',
            'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED',
            'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL',
            'NURSE', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER',
            'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH',
            'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE',
            'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK',
            'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REALM',
            'REBEL', 'REFER', 'RELAX', 'REPAY', 'REPLY', 'RIGHT', 'RIGID', 'RIVAL', 'RIVER', 'ROBOT',
            'ROCKY', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE',
            'SCORE', 'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET',
            'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT',
            'SILLY', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART',
            'SMILE', 'SMOKE', 'SNAKE', 'SNOW', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE',
            'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE',
            'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STICK', 'STILL', 'STOCK',
            'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE',
            'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'SWIFT', 'SWING', 'SWORD', 'TABLE', 'TAKEN', 'TASTE',
            'TAXES', 'TEACH', 'TEAMS', 'TEETH', 'TEMPO', 'TENDS', 'TERMS', 'TESTS', 'THANK', 'THEFT',
            'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE',
            'THREW', 'THROW', 'THUMB', 'TIGHT', 'TILED', 'TIMER', 'TIMES', 'TIRED', 'TITLE', 'TODAY',
            'TOKEN', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND',
            'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE',
            'TWIST', 'TYPED', 'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN',
            'USAGE', 'USUAL', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE',
            'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN',
            'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE',
            'YOUNG', 'YOUTH'
        ];
        
        // Word definitions
        this.definitions = {
            'ABOUT': 'concerning or regarding; approximately',
            'ABOVE': 'at a higher level than; more than',
            'ABUSE': 'to use wrongly; cruel treatment',
            'ACTOR': 'person who acts in plays or films',
            'ACUTE': 'sharp; severe; having keen perception',
            'ADMIT': 'to confess; allow to enter',
            'ADOPT': 'to take as one\'s own; choose',
            'ADULT': 'fully grown; mature person',
            'AFTER': 'following in time; behind',
            'AGAIN': 'once more; another time',
            'AGENT': 'person acting on behalf of another',
            'AGREE': 'to have same opinion; consent',
            'AHEAD': 'in front; in advance',
            'ALARM': 'warning signal; cause fear',
            'ALBUM': 'book for photos; collection',
            'ALERT': 'watchful; warning signal',
            'ALIEN': 'foreign; extraterrestrial being',
            'ALIGN': 'to arrange in straight line',
            'ALIKE': 'similar; in same manner',
            'ALIVE': 'living; full of life',
            'ALLOW': 'to permit; give permission',
            'ALONE': 'by oneself; solitary',
            'ALONG': 'by length of; together with',
            'ALTER': 'to change; modify',
            'AMONG': 'surrounded by; part of group',
            'ANGER': 'strong feeling of displeasure',
            'ANGLE': 'corner; point of view',
            'ANGRY': 'feeling anger; mad',
            'APART': 'separated; away from others',
            'APPLE': 'round fruit from apple tree',
            'APPLY': 'to put to use; request formally',
            'ARENA': 'enclosed area for sports',
            'ARGUE': 'to give reasons; dispute',
            'ARISE': 'to get up; come into being',
            'ARRAY': 'ordered arrangement; display',
            'ASIDE': 'to one side; apart',
            'ASSET': 'valuable possession; advantage',
            'AUDIO': 'relating to sound or hearing',
            'AVOID': 'to keep away from; prevent',
            'AWAKE': 'not sleeping; alert',
            'AWARD': 'prize given for achievement',
            'AWARE': 'having knowledge; conscious',
            'BASIC': 'fundamental; essential',
            'BEACH': 'shore of sea or lake',
            'BEGIN': 'to start; commence',
            'BEING': 'existence; living creature',
            'BELOW': 'at lower level; underneath',
            'BENCH': 'long seat; work table',
            'BIRTH': 'act of being born',
            'BLACK': 'darkest color; without light',
            'BLAME': 'to find fault; responsibility',
            'BLANK': 'empty; without writing',
            'BLAST': 'explosion; strong wind',
            'BLIND': 'cannot see; without sight',
            'BLOCK': 'solid piece; obstruct',
            'BLOOD': 'red liquid in body',
            'BOARD': 'flat piece of wood; committee',
            'BOOST': 'to increase; help upward',
            'BOOTH': 'small enclosed space',
            'BOUND': 'tied; certain to happen',
            'BRAIN': 'organ of thought in head',
            'BRAND': 'trademark; mark with hot iron',
            'BRAVE': 'showing courage; fearless',
            'BREAD': 'food made from flour',
            'BREAK': 'to separate into pieces',
            'BREED': 'to produce offspring; type',
            'BRIEF': 'short in time; concise',
            'BRING': 'to carry here; cause',
            'BROAD': 'wide; extensive',
            'BROWN': 'color like chocolate',
            'BUILD': 'to construct; create',
            'BUILT': 'constructed; made',
            'BURST': 'to break open suddenly',
            'CARRY': 'to transport; support weight',
            'CATCH': 'to capture; grab',
            'CAUSE': 'reason; make happen',
            'CHAIN': 'series of connected links',
            'CHAIR': 'seat with back',
            'CHAOS': 'complete disorder',
            'CHARM': 'attractiveness; lucky object',
            'CHART': 'map; graph showing data',
            'CHASE': 'to pursue; run after',
            'CHEAP': 'low in price; inferior',
            'CHECK': 'to examine; verify',
            'CHEST': 'body from neck to waist',
            'CHILD': 'young human being',
            'CHINA': 'country in Asia; porcelain',
            'CHOSE': 'past tense of choose',
            'CIVIL': 'relating to citizens; polite',
            'CLAIM': 'to assert; demand as right',
            'CLASS': 'group of students; category',
            'CLEAN': 'free from dirt; pure',
            'CLEAR': 'easy to see through; obvious',
            'CLICK': 'short sharp sound',
            'CLIMB': 'to go up; ascend',
            'CLOCK': 'instrument showing time',
            'CLOSE': 'near; to shut',
            'CLOUD': 'mass of water vapor in sky',
            'COACH': 'trainer; large vehicle',
            'COAST': 'land near sea; move easily',
            'COULD': 'past tense of can; might',
            'COUNT': 'to number; calculate',
            'COURT': 'place of justice; playing area',
            'COVER': 'to place over; protect',
            'CRAFT': 'skill; handmade object',
            'CRASH': 'violent collision; failure',
            'CRAZY': 'insane; very enthusiastic',
            'CREAM': 'rich part of milk; pale yellow',
            'CRIME': 'illegal act; wrongdoing',
            'CROSS': 'to go across; angry',
            'CROWD': 'large group of people',
            'CROWN': 'head covering of royalty',
            'CURVE': 'bent line; bend smoothly',
            'CYCLE': 'series of events; bicycle',
            'DAILY': 'every day; routine',
            'DANCE': 'move rhythmically to music',
            'DEATH': 'end of life; dying',
            'DEBUT': 'first appearance; beginning',
            'DELAY': 'to postpone; late arrival',
            'DEPTH': 'distance down; profundity',
            'DOUBT': 'uncertainty; question',
            'DOZEN': 'group of twelve',
            'DRAFT': 'rough copy; current of air',
            'DRAMA': 'play; emotional situation',
            'DREAM': 'images during sleep; aspiration',
            'DRESS': 'woman\'s garment; to clothe',
            'DRINK': 'liquid for consuming; alcohol',
            'DRIVE': 'to operate vehicle; urge',
            'EARLY': 'before usual time; first',
            'EARTH': 'planet we live on; soil',
            'EIGHT': 'number 8; one more than seven',
            'EMPTY': 'containing nothing; void',
            'ENEMY': 'opponent; hostile force',
            'ENJOY': 'to take pleasure in',
            'ENTER': 'to go into; join',
            'ENTRY': 'way in; item in list',
            'EQUAL': 'same in value; fair',
            'ERROR': 'mistake; wrong action',
            'EVENT': 'something that happens',
            'EVERY': 'each one; all possible',
            'EXACT': 'precise; completely accurate',
            'EXIST': 'to be; have reality',
            'EXTRA': 'additional; more than usual',
            'FAITH': 'trust; religious belief',
            'FALSE': 'not true; artificial',
            'FAULT': 'mistake; defect',
            'FIELD': 'open area of land; area of study',
            'FIFTH': 'number 5 in order',
            'FIFTY': 'number 50; five tens',
            'FIGHT': 'to battle; struggle',
            'FINAL': 'last; concluding',
            'FIRST': 'coming before all others',
            'FIXED': 'not moving; repaired',
            'FLASH': 'sudden bright light; brief moment',
            'FLOOR': 'bottom of room; level of building',
            'FOCUS': 'center of attention; concentrate',
            'FORCE': 'strength; make someone do',
            'FORTH': 'forward; onward',
            'FORTY': 'number 40; four tens',
            'FOUND': 'discovered; established',
            'FRAME': 'border; structure',
            'FRESH': 'new; not stale',
            'FRONT': 'forward part; face',
            'FUNNY': 'amusing; strange',
            'GHOST': 'spirit of dead person',
            'GIANT': 'very large person; huge',
            'GIVEN': 'provided; specified',
            'GLASS': 'transparent material; drinking vessel',
            'GLOBE': 'sphere; model of earth',
            'GLORY': 'great honor; magnificence',
            'GRACE': 'elegance; divine favor',
            'GRADE': 'level; mark of quality',
            'GRAIN': 'seed of cereal; texture',
            'GRAND': 'magnificent; large',
            'GRANT': 'to give; money for project',
            'GRASS': 'green plants in lawn',
            'GRAVE': 'burial place; serious',
            'GREAT': 'very good; large',
            'GREEN': 'color of grass; inexperienced',
            'GROUP': 'collection of people or things',
            'GROWN': 'developed; adult',
            'GUARD': 'to protect; watchman',
            'GUESS': 'to estimate; suppose',
            'GUEST': 'visitor; person invited',
            'GUIDE': 'to lead; person who shows way',
            'HAPPY': 'feeling joy; pleased',
            'HARSH': 'rough; severe',
            'HEART': 'organ that pumps blood; center',
            'HEAVY': 'weighing much; serious',
            'HENCE': 'therefore; from now',
            'HORSE': 'large four-legged animal',
            'HOTEL': 'place providing lodging',
            'HOUSE': 'building for living; family',
            'HUMAN': 'relating to people; person',
            'IDEAL': 'perfect; model to copy',
            'IMAGE': 'picture; mental impression',
            'INDEX': 'list of contents; pointer',
            'INNER': 'inside; private',
            'INPUT': 'data put into system',
            'ISSUE': 'problem; topic for debate',
            'JAPAN': 'country in East Asia',
            'JOINT': 'where bones meet; shared',
            'JUDGE': 'person who decides in court',
            'KNIFE': 'cutting tool with blade',
            'KNOCK': 'to hit; rap on door',
            'KNOWN': 'familiar; recognized',
            'LABEL': 'tag with information',
            'LARGE': 'big in size; extensive',
            'LASER': 'beam of concentrated light',
            'LATER': 'at future time; after',
            'LAUGH': 'to express amusement',
            'LAYER': 'sheet; level',
            'LEARN': 'to gain knowledge; study',
            'LEASE': 'rental agreement; rent',
            'LEAST': 'smallest amount; minimum',
            'LEAVE': 'to go away; depart',
            'LEGAL': 'according to law; lawful',
            'LEVEL': 'height; degree; flat',
            'LIGHT': 'illumination; not heavy',
            'LIMIT': 'boundary; restriction',
            'LOCAL': 'nearby; of this place',
            'LOWER': 'further down; reduce',
            'LUCKY': 'having good fortune',
            'LUNCH': 'midday meal',
            'MAGIC': 'supernatural power; wonderful',
            'MAJOR': 'important; main',
            'MAKER': 'person who creates',
            'MARCH': 'third month; walk in step',
            'MATCH': 'game; to pair up',
            'MAYBE': 'perhaps; possibly',
            'MAYOR': 'head of city government',
            'MEANT': 'intended; past tense of mean',
            'MEDAL': 'award for achievement',
            'MEDIA': 'means of communication',
            'METAL': 'hard shiny material',
            'METER': 'unit of measurement',
            'MIGHT': 'strength; may possibly',
            'MINOR': 'small; less important',
            'MINUS': 'less; negative',
            'MIXED': 'combined; blended',
            'MODEL': 'small copy; example',
            'MONEY': 'currency; wealth',
            'MONTH': 'period of about 30 days',
            'MORAL': 'concerning right and wrong',
            'MOTOR': 'engine; machine that moves',
            'MOUNT': 'to climb; mountain',
            'MOUSE': 'small rodent; computer device',
            'MOUTH': 'opening for eating',
            'MOVED': 'changed position; emotionally affected',
            'MOVIE': 'film; motion picture',
            'MUSIC': 'organized sound; melody',
            'NEEDS': 'requirements; necessities',
            'NEVER': 'not ever; at no time',
            'NEWLY': 'recently; just now',
            'NIGHT': 'dark period; evening',
            'NOISE': 'sound; unwanted sound',
            'NORTH': 'direction opposite south',
            'NOTED': 'famous; observed',
            'NOVEL': 'book of fiction; new',
            'NURSE': 'medical care worker',
            'OCEAN': 'large body of salt water',
            'OFFER': 'to present; proposal',
            'OFTEN': 'frequently; many times',
            'ORDER': 'command; arrangement',
            'OTHER': 'different; additional',
            'OUGHT': 'should; moral obligation',
            'PAINT': 'colored liquid; to color',
            'PANEL': 'flat section; group of experts',
            'PAPER': 'material for writing; newspaper',
            'PARTY': 'celebration; political group',
            'PEACE': 'absence of war; calm',
            'PHASE': 'stage; period',
            'PHONE': 'telephone; to call',
            'PHOTO': 'photograph; picture',
            'PIANO': 'musical instrument with keys',
            'PIECE': 'part of whole; item',
            'PILOT': 'person who flies aircraft',
            'PITCH': 'throw; musical tone',
            'PLACE': 'location; to put',
            'PLAIN': 'simple; flat land',
            'PLANE': 'aircraft; flat surface',
            'PLANT': 'living organism; factory',
            'PLATE': 'dish for food; flat sheet',
            'POINT': 'sharp end; purpose',
            'POUND': 'unit of weight; to hit',
            'POWER': 'strength; energy',
            'PRESS': 'to push; news media',
            'PRICE': 'cost; value',
            'PRIDE': 'feeling of satisfaction',
            'PRIME': 'main; best quality',
            'PRINT': 'to produce text; published material',
            'PRIOR': 'earlier; previous',
            'PRIZE': 'reward; award',
            'PROOF': 'evidence; demonstration',
            'PROUD': 'feeling pride; satisfied',
            'PROVE': 'to demonstrate truth',
            'QUEEN': 'female monarch; card',
            'QUICK': 'fast; rapid',
            'QUIET': 'making little noise; calm',
            'QUITE': 'rather; completely',
            'RADIO': 'wireless communication device',
            'RAISE': 'to lift up; increase',
            'RANGE': 'extent; area',
            'RAPID': 'very fast; quick',
            'RATIO': 'relationship between numbers',
            'REACH': 'to extend to; arrive at',
            'READY': 'prepared; willing',
            'REALM': 'kingdom; area of activity',
            'REBEL': 'to resist authority; revolutionary',
            'REFER': 'to mention; direct attention',
            'RELAX': 'to rest; become less tense',
            'REPAY': 'to pay back; return favor',
            'REPLY': 'to answer; response',
            'RIGHT': 'correct; opposite of left',
            'RIGID': 'stiff; inflexible',
            'RIVAL': 'competitor; opponent',
            'RIVER': 'large natural stream',
            'ROBOT': 'mechanical person; automated machine',
            'ROCKY': 'full of rocks; unsteady',
            'ROMAN': 'of ancient Rome; upright letters',
            'ROUGH': 'not smooth; harsh',
            'ROUND': 'circular; series',
            'ROUTE': 'way; path',
            'ROYAL': 'of king or queen; magnificent',
            'RURAL': 'of the countryside; agricultural',
            'SCALE': 'size; to climb',
            'SCENE': 'place of action; view',
            'SCOPE': 'extent; range',
            'SCORE': 'points in game; twenty',
            'SENSE': 'feeling; meaning',
            'SERVE': 'to help; provide',
            'SETUP': 'arrangement; organization',
            'SEVEN': 'number 7; one more than six',
            'SHALL': 'will; must',
            'SHAPE': 'form; condition',
            'SHARE': 'to divide; portion',
            'SHARP': 'having cutting edge; keen',
            'SHEET': 'large piece of cloth; paper',
            'SHELF': 'horizontal board for storage',
            'SHELL': 'hard outer covering',
            'SHIFT': 'to move; change',
            'SHINE': 'to give light; polish',
            'SHIRT': 'upper body garment',
            'SHOCK': 'sudden surprise; impact',
            'SHOOT': 'to fire; photograph',
            'SHORT': 'not long; brief',
            'SHOWN': 'displayed; demonstrated',
            'SIGHT': 'vision; something seen',
            'SILLY': 'foolish; ridiculous',
            'SINCE': 'from then till now; because',
            'SIXTH': 'number 6 in order',
            'SIXTY': 'number 60; six tens',
            'SIZED': 'having particular size',
            'SKILL': 'ability; expertise',
            'SLEEP': 'rest with eyes closed',
            'SLIDE': 'to move smoothly; playground equipment',
            'SMALL': 'little; not big',
            'SMART': 'intelligent; clever',
            'SMILE': 'happy facial expression',
            'SMOKE': 'gas from fire; to use tobacco',
            'SNAKE': 'legless reptile',
            'SOLID': 'firm; not liquid',
            'SOLVE': 'to find answer; resolve',
            'SORRY': 'feeling regret; apologetic',
            'SOUND': 'noise; healthy',
            'SOUTH': 'direction opposite north',
            'SPACE': 'empty area; outer space',
            'SPARE': 'extra; to save',
            'SPEAK': 'to talk; use voice',
            'SPEED': 'rate of movement; quickness',
            'SPEND': 'to pay money; use time',
            'SPENT': 'used up; exhausted',
            'SPLIT': 'to divide; separate',
            'SPOKE': 'past tense of speak; wheel part',
            'SPORT': 'athletic game; fun',
            'STAFF': 'employees; stick',
            'STAGE': 'platform; phase',
            'STAKE': 'pointed stick; risk',
            'STAND': 'to be upright; booth',
            'START': 'to begin; beginning',
            'STATE': 'condition; government region',
            'STEAM': 'water vapor; energy',
            'STEEL': 'strong metal; determination',
            'STEEP': 'having sharp slope',
            'STICK': 'piece of wood; to adhere',
            'STILL': 'not moving; even now',
            'STOCK': 'supply; shares in company',
            'STONE': 'rock; hard material',
            'STOOD': 'past tense of stand',
            'STORE': 'shop; to keep',
            'STORM': 'violent weather; attack',
            'STORY': 'tale; floor of building',
            'STRIP': 'narrow piece; to remove',
            'STUCK': 'unable to move; fixed',
            'STUDY': 'to learn; research',
            'STUFF': 'material; things',
            'STYLE': 'manner; fashion',
            'SUGAR': 'sweet substance; sweetheart',
            'SUITE': 'set of rooms; matched set',
            'SUPER': 'excellent; above normal',
            'SWEET': 'having sugar taste; pleasant',
            'SWIFT': 'fast; rapid',
            'SWING': 'to move back and forth',
            'SWORD': 'weapon with long blade',
            'TABLE': 'furniture with flat top',
            'TAKEN': 'captured; seized',
            'TASTE': 'flavor; to try food',
            'TAXES': 'money paid to government',
            'TEACH': 'to instruct; show how',
            'TEAMS': 'groups working together',
            'TEETH': 'plural of tooth',
            'TEMPO': 'speed of music; pace',
            'TENDS': 'cares for; inclines toward',
            'TERMS': 'conditions; words',
            'TESTS': 'examinations; trials',
            'THANK': 'to express gratitude',
            'THEFT': 'act of stealing',
            'THEIR': 'belonging to them',
            'THEME': 'main idea; topic',
            'THERE': 'in that place; exists',
            'THESE': 'plural of this',
            'THICK': 'wide; dense',
            'THING': 'object; matter',
            'THINK': 'to use mind; consider',
            'THIRD': 'number 3 in order',
            'THOSE': 'plural of that',
            'THREE': 'number 3; one more than two',
            'THREW': 'past tense of throw',
            'THROW': 'to toss; hurl',
            'THUMB': 'short thick finger',
            'TIGHT': 'firmly fixed; close-fitting',
            'TIMER': 'device measuring time',
            'TIMES': 'occasions; periods',
            'TIRED': 'weary; exhausted',
            'TITLE': 'name; heading',
            'TODAY': 'this present day',
            'TOKEN': 'symbol; small payment',
            'TOTAL': 'complete amount; whole',
            'TOUCH': 'to feel; contact',
            'TOUGH': 'strong; difficult',
            'TOWER': 'tall narrow structure',
            'TRACK': 'path; to follow',
            'TRADE': 'business; to exchange',
            'TRAIN': 'series of cars; to teach',
            'TREAT': 'to handle; special pleasure',
            'TREND': 'general direction; fashion',
            'TRIAL': 'test; court case',
            'TRIBE': 'group of people; clan',
            'TRICK': 'clever act; to deceive',
            'TRIED': 'attempted; tested',
            'TRIES': 'attempts; efforts',
            'TRULY': 'really; genuinely',
            'TRUNK': 'tree stem; large box',
            'TRUST': 'confidence; to believe',
            'TRUTH': 'fact; reality',
            'TWICE': 'two times; double',
            'TWIST': 'to turn; change meaning',
            'TYPED': 'written on keyboard',
            'UNDER': 'below; beneath',
            'UNION': 'joining; workers\' organization',
            'UNITY': 'oneness; harmony',
            'UNTIL': 'up to time; before',
            'UPPER': 'higher; top',
            'UPSET': 'disturbed; to overturn',
            'URBAN': 'of the city',
            'USAGE': 'way of using; custom',
            'USUAL': 'normal; ordinary',
            'VALUE': 'worth; importance',
            'VIDEO': 'moving pictures; film',
            'VIRUS': 'tiny infectious agent',
            'VISIT': 'to go see; call on',
            'VITAL': 'essential; full of life',
            'VOCAL': 'relating to voice; outspoken',
            'VOICE': 'sound from throat; opinion',
            'WASTE': 'to use carelessly; garbage',
            'WATCH': 'to look at; timepiece',
            'WATER': 'liquid essential for life',
            'WHEEL': 'circular object that rotates',
            'WHERE': 'at what place; location',
            'WHICH': 'what one; that',
            'WHILE': 'during time; although',
            'WHITE': 'color of snow; pale',
            'WHOLE': 'complete; entire',
            'WHOSE': 'belonging to whom',
            'WOMAN': 'adult female human',
            'WOMEN': 'plural of woman',
            'WORLD': 'earth; universe',
            'WORRY': 'to be anxious; concern',
            'WORSE': 'more bad; inferior',
            'WORST': 'most bad; poorest quality',
            'WORTH': 'value; deserving',
            'WOULD': 'past of will; conditional',
            'WRITE': 'to form letters; compose',
            'WRONG': 'incorrect; not right',
            'WROTE': 'past tense of write',
            'YOUNG': 'not old; youthful',
            'YOUTH': 'young person; early life'
        };
        
        this.stats = this.loadStats();
        this.initializeGame();
        this.bindEvents();
    }
    
    initializeGame() {
        this.selectRandomWord();
        this.updateStatsDisplay();
        this.clearBoard();
        this.resetKeyboard();
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.guesses = [];
        
        // Hide completion elements
        document.getElementById('game-complete').style.display = 'none';
        document.getElementById('word-definition').style.display = 'none';
    }
    
    selectRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.wordList.length);
        this.targetWord = this.wordList[randomIndex];
        console.log('Target word:', this.targetWord); // For testing
    }
    
    bindEvents() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // On-screen keyboard
        document.querySelectorAll('.key').forEach(key => {
            key.addEventListener('click', () => {
                this.handleKeyPress({ key: key.dataset.key });
            });
        });
    }
    
    handleKeyPress(e) {
        if (this.gameOver) return;
        
        const key = e.key.toUpperCase();
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (key.match(/[A-Z]/) && key.length === 1) {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        if (this.currentCol < 5) {
            const tile = this.getTile(this.currentRow, this.currentCol);
            tile.textContent = letter;
            tile.classList.add('filled');
            this.currentCol++;
        }
    }
    
    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const tile = this.getTile(this.currentRow, this.currentCol);
            tile.textContent = '';
            tile.classList.remove('filled');
        }
    }
    
    submitGuess() {
        if (this.currentCol !== 5) {
            this.showMessage('Not enough letters', 'error');
            return;
        }
        
        const guess = this.getCurrentGuess();
        
        if (!this.wordList.includes(guess)) {
            this.showMessage('Not in word list', 'error');
            return;
        }
        
        this.guesses.push(guess);
        this.evaluateGuess(guess);
        
        if (guess === this.targetWord) {
            this.gameWon();
        } else if (this.currentRow === 5) {
            this.gameLost();
        } else {
            this.currentRow++;
            this.currentCol = 0;
        }
    }
    
    getCurrentGuess() {
        let guess = '';
        for (let col = 0; col < 5; col++) {
            const tile = this.getTile(this.currentRow, col);
            guess += tile.textContent;
        }
        return guess;
    }
    
    evaluateGuess(guess) {
        const targetLetters = this.targetWord.split('');
        const guessLetters = guess.split('');
        const result = Array(5).fill('absent');
        
        // Mark correct positions
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                result[i] = 'correct';
                targetLetters[i] = null; // Mark as used
                guessLetters[i] = null;
            }
        }
        
        // Mark present letters
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] && targetLetters.includes(guessLetters[i])) {
                result[i] = 'present';
                targetLetters[targetLetters.indexOf(guessLetters[i])] = null;
            }
        }
        
        // Apply colors to tiles
        for (let col = 0; col < 5; col++) {
            const tile = this.getTile(this.currentRow, col);
            const letter = guess[col];
            
            setTimeout(() => {
                tile.classList.add(result[col]);
            }, col * 100);
            
            // Update keyboard
            this.updateKeyboard(letter, result[col]);
        }
    }
    
    updateKeyboard(letter, result) {
        const key = document.querySelector(`[data-key="${letter}"]`);
        if (!key) return;
        
        // Don't downgrade from correct to present/absent
        if (key.classList.contains('correct')) return;
        if (key.classList.contains('present') && result === 'absent') return;
        
        key.classList.remove('correct', 'present', 'absent');
        key.classList.add(result);
    }
    
    gameWon() {
        this.gameOver = true;
        this.stats.gamesPlayed++;
        this.stats.gamesWon++;
        this.stats.currentStreak++;
        this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);
        this.saveStats();
        this.updateStatsDisplay();
        
        setTimeout(() => {
            this.showMessage('Excellent! 🎉', 'success');
            this.showGameComplete(true);
            this.showWordDefinition();
        }, 1000);
    }
    
    gameLost() {
        this.gameOver = true;
        this.stats.gamesPlayed++;
        this.stats.currentStreak = 0;
        this.saveStats();
        this.updateStatsDisplay();
        
        setTimeout(() => {
            this.showMessage(`The word was ${this.targetWord}`, 'error');
            this.showGameComplete(false);
            this.showWordDefinition();
        }, 1000);
    }
    
    showGameComplete(won) {
        const completeDiv = document.getElementById('game-complete');
        const messageEl = document.getElementById('completion-message');
        const wordRevealEl = document.getElementById('word-reveal');
        
        if (won) {
            messageEl.textContent = `Congratulations! You guessed it in ${this.currentRow + 1} tries!`;
        } else {
            messageEl.textContent = 'Better luck next time!';
        }
        
        wordRevealEl.textContent = `The word was: ${this.targetWord}`;
        completeDiv.style.display = 'block';
    }
    
    showWordDefinition() {
        const definitionDiv = document.getElementById('word-definition');
        const definitionText = document.getElementById('definition-text');
        
        const definition = this.definitions[this.targetWord] || 'Definition not available.';
        definitionText.innerHTML = `<strong>${this.targetWord}:</strong> ${definition}`;
        definitionDiv.style.display = 'block';
    }
    
    showMessage(text, type) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type} show`;
        
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3000);
    }
    
    getTile(row, col) {
        const rows = document.querySelectorAll('.row');
        const tiles = rows[row].querySelectorAll('.tile');
        return tiles[col];
    }
    
    clearBoard() {
        document.querySelectorAll('.tile').forEach(tile => {
            tile.textContent = '';
            tile.className = 'tile';
        });
    }
    
    resetKeyboard() {
        document.querySelectorAll('.key').forEach(key => {
            key.classList.remove('correct', 'present', 'absent');
        });
    }
    
    loadStats() {
        const saved = localStorage.getItem('englishWordleStats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            maxStreak: 0
        };
    }
    
    saveStats() {
        localStorage.setItem('englishWordleStats', JSON.stringify(this.stats));
    }
    
    updateStatsDisplay() {
        document.getElementById('games-played').textContent = this.stats.gamesPlayed;
        document.getElementById('win-rate').textContent = 
            this.stats.gamesPlayed > 0 ? 
            Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) : 0;
        document.getElementById('current-streak').textContent = this.stats.currentStreak;
        document.getElementById('max-streak').textContent = this.stats.maxStreak;
    }
}

// Global function for new game button
function newGame() {
    window.englishWordleGame.initializeGame();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.englishWordleGame = new EnglishWordleGame();
});