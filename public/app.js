const STORAGE_KEY = "atelier-companion-state-v1";

const COMPONENTS = [
  { id: "cutting", label: "裁片", icon: "scan-line" },
  { id: "zipper", label: "拉链", icon: "grip-vertical" },
  { id: "pocket", label: "口袋", icon: "panel-top" },
  { id: "collar", label: "领子", icon: "shirt" },
  { id: "sleeve", label: "袖子", icon: "fold-horizontal" },
  { id: "lining", label: "里布", icon: "layers-2" },
  { id: "button", label: "纽扣", icon: "circle-dot" },
  { id: "hem", label: "下摆", icon: "align-end-horizontal" },
  { id: "fitting", label: "试穿", icon: "user-round-check" },
  { id: "pressing", label: "整烫", icon: "sparkles" }
];

const GARMENT_TYPES = {
  dress: {
    label: "连衣裙",
    defaults: ["cutting", "zipper", "pocket", "collar", "sleeve", "lining", "hem", "fitting"],
    fabricBase: 1.9
  },
  jacket: {
    label: "外套/夹克",
    defaults: ["cutting", "zipper", "pocket", "collar", "sleeve", "lining", "button", "hem", "fitting", "pressing"],
    fabricBase: 2.2
  },
  shirt: {
    label: "衬衫",
    defaults: ["cutting", "pocket", "collar", "sleeve", "button", "hem", "pressing"],
    fabricBase: 1.55
  },
  skirt: {
    label: "半裙",
    defaults: ["cutting", "zipper", "pocket", "lining", "button", "hem", "fitting"],
    fabricBase: 1.25
  },
  trousers: {
    label: "裤装",
    defaults: ["cutting", "zipper", "pocket", "button", "hem", "fitting", "pressing"],
    fabricBase: 1.75
  },
  coat: {
    label: "大衣",
    defaults: ["cutting", "pocket", "collar", "sleeve", "lining", "button", "hem", "fitting", "pressing"],
    fabricBase: 2.8
  }
};

const PHASES = [
  { id: "drafting", label: "制版" },
  { id: "cutting", label: "裁剪" },
  { id: "basting", label: "假缝" },
  { id: "sewing", label: "车缝" },
  { id: "fitting", label: "试穿" },
  { id: "finishing", label: "收尾" }
];

const MEASUREMENTS = [
  ["height", "身高", 165, 0, "影响衣长、裤长和视觉比例"],
  ["neck", "领围", 36, 0.5, "领座、立领、翻领先看这里"],
  ["shoulder", "肩宽", 39, 0.5, "左右肩斜和袖窿平衡"],
  ["bust", "胸围", 84, 4, "上装净胸围加放松量"],
  ["waist", "腰围", 66, 2, "腰线、腰头、收省位置"],
  ["hip", "臀围", 90, 4, "半裙、裤装和贴身裙关键值"],
  ["armhole", "袖窿", 40, 1, "袖山吃势与活动量"],
  ["sleeve", "袖长", 58, 0, "袖口折边前核对"],
  ["frontRise", "前浪", 26, 0.5, "裤装坐下舒适度"],
  ["inseam", "内长", 72, 0, "裤脚长度和鞋跟高度"]
];

const SEAM_AREAS = [
  { id: "side", label: "侧缝", defaultSeam: 1 },
  { id: "zipper", label: "拉链位", defaultSeam: 1.5 },
  { id: "collar", label: "领口", defaultSeam: 0.7 },
  { id: "armhole", label: "袖窿", defaultSeam: 1 },
  { id: "hem", label: "下摆", defaultSeam: 3 },
  { id: "lining", label: "里布", defaultSeam: 1 }
];

const DELIVERABLES = [
  { id: "brief", label: "作业要求整理", note: "题目、老师要求、截止日、评分点" },
  { id: "moodboard", label: "灵感板/色彩板", note: "关键词、色卡、廓形参考" },
  { id: "sketch", label: "款式图与结构说明", note: "正背面、局部结构、设计逻辑" },
  { id: "pattern", label: "纸样与放码记录", note: "纸样编号、布纹、缝份和刀眼" },
  { id: "swatch", label: "面料小样实验", note: "缩水、熨烫、针距、厚薄和垂坠" },
  { id: "processPhotos", label: "过程照片", note: "裁剪、假缝、试穿、修改、成衣" },
  { id: "techSheet", label: "工艺单/BOM", note: "面辅料、用量、机器设置、成本" },
  { id: "finalPhotos", label: "成衣照片与复盘", note: "正侧背、细节、问题和修改结论" }
];

const RUBRIC_ITEMS = [
  { id: "concept", label: "概念完整度" },
  { id: "silhouette", label: "廓形与比例" },
  { id: "pattern", label: "版型准确度" },
  { id: "craft", label: "工艺完成度" },
  { id: "presentation", label: "展示表达" }
];

const FABRIC_GUIDES = {
  cotton: {
    label: "棉/府绸",
    needle: "80/12 通用针",
    stitch: "2.5-3.0 mm",
    tension: "中等张力，先试线迹",
    foot: "普通压脚或直线压脚",
    pressing: "可蒸汽熨，先试缩水"
  },
  chiffon: {
    label: "雪纺/薄纱",
    needle: "60/8 或 70/10 细针",
    stitch: "1.8-2.2 mm",
    tension: "低张力，垫纸防卷边",
    foot: "细料压脚或卷边压脚",
    pressing: "低温隔布，少蒸汽"
  },
  denim: {
    label: "牛仔/厚棉",
    needle: "90/14 或 100/16 牛仔针",
    stitch: "3.0-3.5 mm",
    tension: "略高张力，厚位慢车",
    foot: "滚轮压脚或补偿垫",
    pressing: "高温蒸汽，厚缝份先削薄"
  },
  wool: {
    label: "毛呢/粗纺",
    needle: "80/12 或 90/14",
    stitch: "2.8-3.2 mm",
    tension: "中等，先试压痕",
    foot: "普通压脚，厚料可用滚轮",
    pressing: "烫布+蒸汽，避免极光"
  },
  knit: {
    label: "针织/弹力",
    needle: "75/11 圆头针",
    stitch: "弹力线迹或窄三步曲折",
    tension: "略低，避免拉伸变形",
    foot: "上送料或特氟龙压脚",
    pressing: "低温轻压，不拉扯"
  },
  satin: {
    label: "缎面/醋酸",
    needle: "70/10 微尖针",
    stitch: "2.0-2.5 mm",
    tension: "低到中，使用细线",
    foot: "特氟龙压脚",
    pressing: "反面低温隔布，避免水印"
  }
};

const DEFECT_GUIDES = {
  puckering: {
    label: "缝线起皱",
    cause: "针距过短、张力过高、面料太薄或没稳定",
    fix: "降低张力，放长针距，垫薄纸或先疏缝，熨烫时只压不推"
  },
  skipped: {
    label: "跳针",
    cause: "针钝、针型不对、机针没装到底或面料弹性大",
    fix: "换新针，针织用圆头针，厚料用牛仔针，重新穿线并试车"
  },
  wavy: {
    label: "边缘波浪",
    cause: "车缝时拉扯面料、压脚压力偏大或弹力面料没稳定",
    fix: "放松手、降低压脚压力，贴透明胶条/水溶衬后再车"
  },
  zipper: {
    label: "拉链不顺",
    cause: "两侧齿距不一致、里布卷入、下止位置没对齐",
    fix: "拆到卡点前一段，重新画缝线，先疏缝试拉合再压线"
  },
  pocket: {
    label: "口袋不对称",
    cause: "定位线只凭目测、左右片没镜像核对",
    fix: "用纸样或透明尺重新定三点：袋口高、袋角、侧缝距离"
  },
  fit: {
    label: "试穿不平衡",
    cause: "肩线、腰线或侧缝不水平，局部先改导致整体跑偏",
    fix: "先拍正侧背，画水平线，再从肩颈点、胸腰臀线整体判断"
  }
};

const MATERIAL_PRESETS = [
  { name: "主面料", amount: "2.0 m", status: "待买" },
  { name: "里布", amount: "1.5 m", status: "待确认" },
  { name: "拉链", amount: "1 条", status: "待买" },
  { name: "衬布", amount: "0.8 m", status: "待确认" },
  { name: "同色线", amount: "2 卷", status: "已备" }
];

const STEP_TEMPLATES = {
  base: [
    "确认设计图、工艺和面辅料",
    "量体并记录放松量",
    "打版、标注布纹线和缝份",
    "裁剪前核对正反面、左右片和倒毛方向",
    "转印省道、刀眼、口袋位和对位线",
    "粘衬并试熨主面料",
    "假缝关键结构",
    "第一次试穿和修改",
    "正式车缝主体结构",
    "安装拉链、口袋、领袖或腰头",
    "处理里布和贴边",
    "下摆、扣眼、收尾和整烫",
    "拍照复盘并归档纸样"
  ],
  dress: ["缝合省道和肩侧缝", "安装隐形拉链", "处理领口贴边或领子", "合袖或袖窿包边", "连接里布", "吊挂后修下摆"],
  jacket: ["做口袋袋布或嵌线", "合肩侧缝并试穿", "装领和领座", "装袖并检查袖山", "处理里布和返口", "扣眼纽扣和整烫"],
  shirt: ["缝胸省或育克", "做门襟和口袋", "装领座与翻领", "开袖衩并装袖克夫", "锁扣眼和钉扣", "压线整烫"],
  skirt: ["合侧缝或后中缝", "安装拉链", "处理腰头或贴边", "连接里布", "试穿调整腰臀", "吊挂后修下摆"],
  trousers: ["缝省道和口袋", "处理门襟拉链", "合前后裆和侧缝", "装腰头", "试穿调整裤长", "锁眼钉扣和整烫"],
  coat: ["粘衬大片和领片", "制作袋盖或嵌线袋", "合肩侧缝并装领", "装袖和垫肩", "连接里布", "手缝下摆和整烫定型"]
};

const CHECK_LIBRARY = [
  {
    id: "grainline",
    component: "cutting",
    title: "纸样方向和布边距离已复核",
    detail: "先看经纬向、倒毛和图案方向，再压住纸样落剪。",
    severity: "high",
    applies: ["all"]
  },
  {
    id: "right-side",
    component: "cutting",
    title: "正反面、上下方向、倒毛方向已标记",
    detail: "丝绒、毛呢、印花、斜纹布尤其容易上下颠倒。",
    severity: "high",
    applies: ["all"]
  },
  {
    id: "mirror-pieces",
    component: "cutting",
    title: "左右裁片成对，不是两片同侧",
    detail: "口袋、袖子、前片、贴边都要看镜像关系。",
    severity: "high",
    applies: ["all"]
  },
  {
    id: "notches",
    component: "cutting",
    title: "刀眼、省道、口袋位和对位点已转印",
    detail: "转印后再收起纸样，避免后面靠猜。",
    severity: "high",
    applies: ["all"]
  },
  {
    id: "seam-allowance",
    component: "cutting",
    title: "缝份、折边、贴边宽度一致",
    detail: "拉链位、侧缝、下摆常常不是同一个缝份。",
    severity: "high",
    applies: ["all"]
  },
  {
    id: "fabric-shrink",
    component: "cutting",
    title: "面料预缩、试熨温度已确认",
    detail: "先用小布头测试蒸汽、温度和压痕。",
    severity: "medium",
    applies: ["all"]
  },
  {
    id: "interfacing",
    component: "cutting",
    title: "需要粘衬的位置已单独列出",
    detail: "领口、腰头、门襟、袋口、拉链口和扣眼位优先检查。",
    severity: "medium",
    applies: ["all"]
  },
  {
    id: "zipper-side",
    component: "zipper",
    title: "拉链装在正确侧和正确面",
    detail: "先把衣片穿在人台或身上比一次，再车第一道线。",
    severity: "high",
    applies: ["zipper"]
  },
  {
    id: "zipper-slider",
    component: "zipper",
    title: "拉头方向、开口端和止口位置一致",
    detail: "侧缝拉链最容易上下端颠倒，先临时固定再合缝。",
    severity: "high",
    applies: ["zipper"]
  },
  {
    id: "zipper-teeth",
    component: "zipper",
    title: "齿距缝线距离均匀，两边不拧",
    detail: "隐形拉链先熨开齿边，普通拉链先画车缝线。",
    severity: "high",
    applies: ["zipper"]
  },
  {
    id: "zipper-opening",
    component: "zipper",
    title: "开口长度、拉链长度和下止位置匹配",
    detail: "拉链短了会绷，长了需要先处理下止。",
    severity: "medium",
    applies: ["zipper"]
  },
  {
    id: "zipper-lining",
    component: "zipper",
    title: "里布和贴边不会卷进拉链",
    detail: "合里布前拉合几次，看齿边是否顺畅。",
    severity: "high",
    applies: ["zipper", "lining"]
  },
  {
    id: "pocket-pair",
    component: "pocket",
    title: "左右口袋高度、斜度和开口方向一致",
    detail: "先用尺量关键点，不只靠眼睛看。",
    severity: "high",
    applies: ["pocket"]
  },
  {
    id: "pocket-bag",
    component: "pocket",
    title: "袋布朝向身体内侧，袋口没有反装",
    detail: "把成衣想象成穿在身上，再翻看袋布方向。",
    severity: "high",
    applies: ["pocket"]
  },
  {
    id: "pocket-reinforce",
    component: "pocket",
    title: "袋口、袋角、嵌线端点已加固",
    detail: "易受力位置先回针或加衬条。",
    severity: "medium",
    applies: ["pocket"]
  },
  {
    id: "welt-lines",
    component: "pocket",
    title: "嵌线袋两条线等长且平行",
    detail: "剪开前先检查端点，剪错很难补。",
    severity: "high",
    applies: ["pocket"]
  },
  {
    id: "collar-notches",
    component: "collar",
    title: "上领、下领、领座刀眼已对应",
    detail: "后中、肩点、前端点先用珠针固定。",
    severity: "high",
    applies: ["collar"]
  },
  {
    id: "collar-roll",
    component: "collar",
    title: "领面略松、里领略修，翻折后不外翻",
    detail: "翻领和驳领要给滚折量。",
    severity: "medium",
    applies: ["collar"]
  },
  {
    id: "collar-interfacing",
    component: "collar",
    title: "领片衬布方向和硬度匹配",
    detail: "领尖、领座、驳头的支撑感不要混用。",
    severity: "medium",
    applies: ["collar"]
  },
  {
    id: "sleeve-front-back",
    component: "sleeve",
    title: "袖山前后刀眼没有反装",
    detail: "前袖窿更深，后袖窿更饱满，先找双刀眼。",
    severity: "high",
    applies: ["sleeve"]
  },
  {
    id: "sleeve-pair",
    component: "sleeve",
    title: "左右袖成对，袖衩位置在正确侧",
    detail: "袖口、袖衩、袖克夫很容易做成同手。",
    severity: "high",
    applies: ["sleeve"]
  },
  {
    id: "sleeve-ease",
    component: "sleeve",
    title: "袖山吃势均匀，无褶皱集中",
    detail: "先疏缝抽缩，再从肩点向两侧分配。",
    severity: "medium",
    applies: ["sleeve"]
  },
  {
    id: "lining-pleat",
    component: "lining",
    title: "里布有活动量和后中松量",
    detail: "外套、连衣裙里布不要做得比面布更紧。",
    severity: "medium",
    applies: ["lining"]
  },
  {
    id: "lining-hem",
    component: "lining",
    title: "里布下摆短于面布且预留跳量",
    detail: "走路和抬手时里布不能吊住面布。",
    severity: "medium",
    applies: ["lining", "hem"]
  },
  {
    id: "bagging-opening",
    component: "lining",
    title: "返口位置已预留，翻出路线清楚",
    detail: "合里布前先想好从哪里翻出来。",
    severity: "high",
    applies: ["lining"]
  },
  {
    id: "button-placket",
    component: "button",
    title: "门襟左右、扣眼方向和穿着习惯一致",
    detail: "女装常见右片压左片，但设计款要按效果图确认。",
    severity: "high",
    applies: ["button"]
  },
  {
    id: "button-spacing",
    component: "button",
    title: "扣位间距、受力点和胸腰位置已核对",
    detail: "先试穿再锁扣眼，扣眼做完很难改。",
    severity: "high",
    applies: ["button", "fitting"]
  },
  {
    id: "button-reinforce",
    component: "button",
    title: "扣眼位、四合扣位和暗扣位已加衬",
    detail: "薄料要垫衬或小布片，避免拉裂。",
    severity: "medium",
    applies: ["button"]
  },
  {
    id: "hem-hang",
    component: "hem",
    title: "斜裁、圆摆、裙摆已吊挂后再修齐",
    detail: "至少静置几个小时，重料和斜裁会继续下坠。",
    severity: "high",
    applies: ["hem", "dress", "skirt"]
  },
  {
    id: "hem-level",
    component: "hem",
    title: "下摆离地高度或左右长度一致",
    detail: "穿鞋试穿，前后侧都量一次。",
    severity: "medium",
    applies: ["hem"]
  },
  {
    id: "hem-bulk",
    component: "hem",
    title: "厚料折边已削薄或错开缝份",
    detail: "角位、侧缝交叉位先修剪，避免鼓包。",
    severity: "medium",
    applies: ["hem", "pressing"]
  },
  {
    id: "fit-balance",
    component: "fitting",
    title: "肩线、腰线、臀线保持水平",
    detail: "试穿时先看整体平衡，再改局部松紧。",
    severity: "high",
    applies: ["fitting"]
  },
  {
    id: "fit-movement",
    component: "fitting",
    title: "坐下、抬手、走路都测试过",
    detail: "静态合身不等于能活动，尤其是袖窿和裤裆。",
    severity: "high",
    applies: ["fitting"]
  },
  {
    id: "fit-marking",
    component: "fitting",
    title: "修改线左右对称并转回纸样",
    detail: "只改布不改版，下次会重复踩坑。",
    severity: "medium",
    applies: ["fitting"]
  },
  {
    id: "press-as-you-sew",
    component: "pressing",
    title: "每合一道结构就熨一道",
    detail: "先分烫、倒烫或劈烫，再进入下一步。",
    severity: "medium",
    applies: ["pressing", "all"]
  },
  {
    id: "press-cloth",
    component: "pressing",
    title: "亮面、毛料、深色面料使用烫布",
    detail: "避免极光、压痕和熨斗印。",
    severity: "medium",
    applies: ["pressing"]
  },
  {
    id: "needle-thread",
    component: "cutting",
    title: "针号、线色、压脚和针距适合面料",
    detail: "薄料先试针距，厚料先试压脚压力。",
    severity: "medium",
    applies: ["all"]
  }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  projectTitle: $("#projectTitle"),
  phasePill: $("#phasePill"),
  projectForm: $("#projectForm"),
  projectName: $("#projectName"),
  garmentType: $("#garmentType"),
  phaseSelect: $("#phaseSelect"),
  deadlineInput: $("#deadlineInput"),
  complexitySelect: $("#complexitySelect"),
  briefInput: $("#briefInput"),
  componentGrid: $("#componentGrid"),
  focusTitle: $("#focusTitle"),
  progressNumber: $("#progressNumber"),
  progressBar: $("#progressBar"),
  projectMetrics: $("#projectMetrics"),
  priorityList: $("#priorityList"),
  stepPreview: $("#stepPreview"),
  homePalette: $("#homePalette"),
  homeDeliverableProgress: $("#homeDeliverableProgress"),
  homeMachineTip: $("#homeMachineTip"),
  studentBoardTitle: $("#studentBoardTitle"),
  componentFilters: $("#componentFilters"),
  checkGroups: $("#checkGroups"),
  checkSummaryTitle: $("#checkSummaryTitle"),
  checkScore: $("#checkScore"),
  customCheckForm: $("#customCheckForm"),
  customCheckComponent: $("#customCheckComponent"),
  customCheckText: $("#customCheckText"),
  customCheckDetail: $("#customCheckDetail"),
  flowBoard: $("#flowBoard"),
  timerDisplay: $("#timerDisplay"),
  timerToggleButton: $("#timerToggleButton"),
  lapList: $("#lapList"),
  dailyNoteInput: $("#dailyNoteInput"),
  measurementTable: $("#measurementTable"),
  materialList: $("#materialList"),
  fabricWidthInput: $("#fabricWidthInput"),
  garmentLengthInput: $("#garmentLengthInput"),
  sleeveLengthInput: $("#sleeveLengthInput"),
  napSelect: $("#napSelect"),
  fabricResult: $("#fabricResult"),
  cleanSizeInput: $("#cleanSizeInput"),
  seamAllowanceInput: $("#seamAllowanceInput"),
  hemAllowanceInput: $("#hemAllowanceInput"),
  seamAreaSelect: $("#seamAreaSelect"),
  seamResult: $("#seamResult"),
  openingLengthInput: $("#openingLengthInput"),
  zipStopInput: $("#zipStopInput"),
  zipperTypeSelect: $("#zipperTypeSelect"),
  zipperPositionSelect: $("#zipperPositionSelect"),
  zipperResult: $("#zipperResult"),
  issueAreaSelect: $("#issueAreaSelect"),
  issueTitleInput: $("#issueTitleInput"),
  issueFixInput: $("#issueFixInput"),
  issuePhotoInput: $("#issuePhotoInput"),
  photoLabel: $("#photoLabel"),
  issueList: $("#issueList"),
  schoolForm: $("#schoolForm"),
  courseInput: $("#courseInput"),
  teacherInput: $("#teacherInput"),
  assignmentInput: $("#assignmentInput"),
  keywordsInput: $("#keywordsInput"),
  presentationSelect: $("#presentationSelect"),
  conceptInput: $("#conceptInput"),
  schoolProgressNumber: $("#schoolProgressNumber"),
  deliverableList: $("#deliverableList"),
  rubricAverage: $("#rubricAverage"),
  rubricList: $("#rubricList"),
  portfolioCopy: $("#portfolioCopy"),
  fabricGuideSelect: $("#fabricGuideSelect"),
  machineGuideResult: $("#machineGuideResult"),
  defectGuideSelect: $("#defectGuideSelect"),
  defectGuideResult: $("#defectGuideResult"),
  swatchBeforeInput: $("#swatchBeforeInput"),
  swatchAfterInput: $("#swatchAfterInput"),
  swatchNoteInput: $("#swatchNoteInput"),
  swatchResult: $("#swatchResult"),
  importInput: $("#importInput"),
  installButton: $("#installButton"),
  toast: $("#toast")
};

let state = loadState();
let pendingInstallEvent = null;
let pendingIssuePhoto = null;
let timerInterval = null;

const VALID_VIEWS = new Set(["dashboard", "school", "checks", "flow", "studio"]);
const VALID_STUDIO_TABS = new Set(["measurements", "materials", "calculator", "issues"]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emptyMeasurements() {
  return Object.fromEntries(
    MEASUREMENTS.map(([id, label, value, ease, note]) => [id, { label, value, ease, note }])
  );
}

function emptyDeliverables() {
  return Object.fromEntries(DELIVERABLES.map((item) => [item.id, false]));
}

function defaultRubric() {
  return Object.fromEntries(RUBRIC_ITEMS.map((item) => [item.id, 3]));
}

function defaultSchool() {
  return {
    course: "服装结构与工艺 II",
    teacher: "",
    assignment: "半裙/连衣裙样衣作业",
    keywords: "校园通勤、结构线、实穿",
    presentation: "portfolio",
    concept: "记录灵感来源、廓形选择、面料实验和工艺难点。",
    deliverables: emptyDeliverables(),
    rubric: defaultRubric(),
    palette: ["#101312", "#11665f", "#d7b98c", "#9d6042"],
    fabricGuide: "cotton",
    defectGuide: "puckering",
    swatchBefore: 10,
    swatchAfter: 9.8,
    swatchNote: "经向、纬向各测一次；记录熨烫温度和手感变化。"
  };
}

function templateSteps(type = "dress") {
  const names = [...STEP_TEMPLATES.base, ...(STEP_TEMPLATES[type] || [])];
  return names.map((name, index) => ({
    id: `step-${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
    name,
    note: "",
    status: index === 0 ? "doing" : "todo"
  }));
}

function defaultState() {
  return {
    activeView: "dashboard",
    activeFilter: "all",
    activeStudioTab: "measurements",
    project: {
      name: "她的新作品",
      type: "dress",
      phase: "drafting",
      deadline: "",
      complexity: "sample",
      brief: "记录款式结构、容易装反的部件、试穿修改点。",
      components: clone(GARMENT_TYPES.dress.defaults)
    },
    checks: {},
    customChecks: [],
    steps: templateSteps("dress"),
    measurements: emptyMeasurements(),
    materials: clone(MATERIAL_PRESETS),
    school: defaultSchool(),
    dailyNote: "",
    timer: { seconds: 0, running: false, startedAt: null, laps: [] },
    calc: {
      fabricWidth: 150,
      garmentLength: 110,
      sleeveLength: 58,
      nap: "no",
      cleanSize: 64,
      seamAllowance: 1,
      hemAllowance: 3,
      seamArea: "side",
      openingLength: 56,
      zipStop: 2,
      zipperType: "invisible",
      zipperPosition: "centerBack"
    },
    issues: []
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    return {
      ...base,
      ...parsed,
      project: { ...base.project, ...(parsed.project || {}) },
      calc: { ...base.calc, ...(parsed.calc || {}) },
      measurements: { ...base.measurements, ...(parsed.measurements || {}) },
      timer: { ...base.timer, ...(parsed.timer || {}) },
      steps: Array.isArray(parsed.steps) && parsed.steps.length ? parsed.steps : base.steps,
      materials: Array.isArray(parsed.materials) ? parsed.materials : base.materials,
      school: {
        ...base.school,
        ...(parsed.school || {}),
        deliverables: { ...base.school.deliverables, ...(parsed.school?.deliverables || {}) },
        rubric: { ...base.school.rubric, ...(parsed.school?.rubric || {}) },
        palette: Array.isArray(parsed.school?.palette) ? parsed.school.palette : base.school.palette
      },
      issues: Array.isArray(parsed.issues) ? parsed.issues : base.issues,
      customChecks: Array.isArray(parsed.customChecks) ? parsed.customChecks : base.customChecks
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(toast.hideTimer);
  toast.hideTimer = window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function createIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function componentLabel(id) {
  return COMPONENTS.find((item) => item.id === id)?.label || id;
}

function phaseLabel(id) {
  return PHASES.find((item) => item.id === id)?.label || id;
}

function severityLabel(severity) {
  return { high: "高", medium: "中", low: "低" }[severity] || "中";
}

function statusLabel(status) {
  return { todo: "待做", doing: "进行中", done: "完成" }[status] || "待做";
}

function statusClass(status) {
  return { todo: "status-todo", doing: "status-doing", done: "status-done" }[status] || "status-todo";
}

function selectedComponents() {
  const base = new Set(["cutting", "fitting", "pressing"]);
  (state.project.components || []).forEach((item) => base.add(item));
  return Array.from(base);
}

function allChecks() {
  const selected = new Set(selectedComponents());
  const type = state.project.type;
  const library = CHECK_LIBRARY.filter((item) => {
    if (item.applies.includes("all")) return true;
    if (item.applies.includes(type)) return true;
    if (selected.has(item.component)) return true;
    return item.applies.some((tag) => selected.has(tag));
  });

  const custom = state.customChecks.map((item) => ({
    ...item,
    severity: item.severity || "medium",
    custom: true
  }));

  return [...library, ...custom];
}

function filteredChecks() {
  const checks = allChecks();
  if (state.activeFilter === "all") return checks;
  if (state.activeFilter === "high") return checks.filter((item) => item.severity === "high");
  return checks.filter((item) => item.component === state.activeFilter || item.applies?.includes(state.activeFilter));
}

function checkProgress(checks = allChecks()) {
  if (!checks.length) return { done: 0, total: 0, percent: 0 };
  const done = checks.filter((item) => state.checks[item.id]).length;
  return { done, total: checks.length, percent: Math.round((done / checks.length) * 100) };
}

function stepProgress() {
  const total = state.steps.length || 1;
  const done = state.steps.filter((step) => step.status === "done").length;
  return { done, total, percent: Math.round((done / total) * 100) };
}

function deliverableProgress() {
  const total = DELIVERABLES.length;
  const done = DELIVERABLES.filter((item) => state.school.deliverables?.[item.id]).length;
  return { done, total, percent: Math.round((done / total) * 100) };
}

function rubricAverageScore() {
  const scores = RUBRIC_ITEMS.map((item) => Number(state.school.rubric?.[item.id] || 0));
  const average = scores.reduce((sum, value) => sum + value, 0) / scores.length;
  return Number.isFinite(average) ? average : 0;
}

function currentMachineGuide() {
  return FABRIC_GUIDES[state.school.fabricGuide] || FABRIC_GUIDES.cotton;
}

function currentDefectGuide() {
  return DEFECT_GUIDES[state.school.defectGuide] || DEFECT_GUIDES.puckering;
}

function projectProgress() {
  const check = checkProgress();
  const steps = stepProgress();
  const school = deliverableProgress();
  return Math.round(check.percent * 0.34 + steps.percent * 0.44 + school.percent * 0.22);
}

function daysUntil(dateValue) {
  if (!dateValue) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${dateValue}T00:00:00`);
  return Math.round((target - today) / 86400000);
}

function populateStaticControls() {
  els.garmentType.innerHTML = Object.entries(GARMENT_TYPES)
    .map(([id, item]) => `<option value="${id}">${item.label}</option>`)
    .join("");
  els.phaseSelect.innerHTML = PHASES.map((item) => `<option value="${item.id}">${item.label}</option>`).join("");
  els.customCheckComponent.innerHTML = COMPONENTS.map(
    (item) => `<option value="${item.id}">${item.label}</option>`
  ).join("");
  els.issueAreaSelect.innerHTML = COMPONENTS.map((item) => `<option value="${item.id}">${item.label}</option>`).join("");
  els.seamAreaSelect.innerHTML = SEAM_AREAS.map((item) => `<option value="${item.id}">${item.label}</option>`).join("");
  els.fabricGuideSelect.innerHTML = Object.entries(FABRIC_GUIDES)
    .map(([id, item]) => `<option value="${id}">${item.label}</option>`)
    .join("");
  els.defectGuideSelect.innerHTML = Object.entries(DEFECT_GUIDES)
    .map(([id, item]) => `<option value="${id}">${item.label}</option>`)
    .join("");
}

function renderProjectForm() {
  const project = state.project;
  els.projectName.value = project.name || "";
  els.garmentType.value = project.type;
  els.phaseSelect.value = project.phase;
  els.deadlineInput.value = project.deadline || "";
  els.complexitySelect.value = project.complexity || "sample";
  els.briefInput.value = project.brief || "";
  els.projectTitle.textContent = project.name || "新作品";
  els.phasePill.textContent = phaseLabel(project.phase);

  els.componentGrid.innerHTML = COMPONENTS.map((component) => {
    const active = state.project.components.includes(component.id);
    return `
      <label class="component-chip ${active ? "active" : ""}">
        <input type="checkbox" value="${component.id}" ${active ? "checked" : ""} />
        ${icon(component.icon)}
        <span>${component.label}</span>
      </label>
    `;
  }).join("");
}

function renderDashboard() {
  const progress = projectProgress();
  const check = checkProgress();
  const steps = stepProgress();
  const school = deliverableProgress();
  const guide = currentMachineGuide();
  const due = daysUntil(state.project.deadline);
  const dueLabel = due === null ? "未设定" : due < 0 ? `逾期 ${Math.abs(due)} 天` : due === 0 ? "今天" : `${due} 天`;
  const highPending = allChecks().filter((item) => item.severity === "high" && !state.checks[item.id]);
  const nextStep = state.steps.find((step) => step.status !== "done");

  els.focusTitle.textContent = highPending[0]?.title || nextStep?.name || "完善作业交付包";
  els.studentBoardTitle.textContent = state.school.assignment || "作业、工艺、试穿一起管";
  els.homeDeliverableProgress.textContent = `${school.done}/${school.total}`;
  els.homeMachineTip.textContent = `${guide.label} · ${guide.needle}`;
  els.homePalette.innerHTML = (state.school.palette || [])
    .slice(0, 4)
    .map((color) => `<div class="swatch-tile"><span style="background:${escapeHtml(color)}"></span></div>`)
    .join("");
  els.progressNumber.textContent = `${progress}%`;
  els.progressBar.style.width = `${progress}%`;
  els.projectMetrics.innerHTML = [
    ["防错", `${check.done}/${check.total}`],
    ["工序", `${steps.done}/${steps.total}`],
    ["课业", `${school.done}/${school.total}`],
    ["截止", dueLabel]
  ]
    .map(
      ([label, value]) => `
      <div class="metric-tile">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `
    )
    .join("");

  els.priorityList.innerHTML = highPending.length
    ? highPending
        .slice(0, 6)
        .map(
          (item) => `
          <button class="priority-row" type="button" data-view-target="checks" data-filter="${item.component}">
            <span>
              <span class="row-title">${escapeHtml(item.title)}</span>
              <span class="row-sub">${componentLabel(item.component)} · ${escapeHtml(item.detail)}</span>
            </span>
            <span class="severity-pill severity-high">高</span>
          </button>
        `
        )
        .join("")
    : `<div class="empty-state">高风险项已处理</div>`;

  const activeSteps = state.steps.filter((step) => step.status !== "done").slice(0, 5);
  els.stepPreview.innerHTML = activeSteps.length
    ? activeSteps
        .map(
          (step) => `
        <div class="preview-row">
          <span>
            <span class="row-title">${escapeHtml(step.name)}</span>
            <span class="row-sub">${escapeHtml(step.note || "等待记录")}</span>
          </span>
          <span class="status-pill ${statusClass(step.status)}">${statusLabel(step.status)}</span>
        </div>
      `
        )
        .join("")
    : `<div class="empty-state">这件作品已经收尾</div>`;
}

function renderFilters() {
  const checks = allChecks();
  const countByComponent = Object.fromEntries(COMPONENTS.map((component) => [component.id, 0]));
  checks.forEach((item) => {
    if (countByComponent[item.component] !== undefined) countByComponent[item.component] += 1;
  });
  const highCount = checks.filter((item) => item.severity === "high").length;
  const chips = [
    { id: "all", label: "全部", count: checks.length },
    { id: "high", label: "高风险", count: highCount },
    ...COMPONENTS.filter((component) => countByComponent[component.id]).map((component) => ({
      id: component.id,
      label: component.label,
      count: countByComponent[component.id]
    }))
  ];

  els.componentFilters.innerHTML = chips
    .map(
      (item) => `
      <button class="filter-chip ${state.activeFilter === item.id ? "active" : ""}" type="button" data-filter="${item.id}">
        <span>${item.label}</span>
        <small>${item.count}</small>
      </button>
    `
    )
    .join("");
}

function renderChecks() {
  const checks = filteredChecks();
  const summary = checkProgress(checks);
  els.checkSummaryTitle.textContent = `${summary.done} / ${summary.total}`;
  els.checkScore.textContent = `${summary.percent}%`;

  const groups = new Map();
  checks.forEach((item) => {
    const group = componentLabel(item.component);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(item);
  });

  els.checkGroups.innerHTML = Array.from(groups.entries())
    .map(([group, items]) => {
      const done = items.filter((item) => state.checks[item.id]).length;
      return `
        <section class="check-group">
          <div class="check-group-heading">
            <h3>${group}</h3>
            <span class="phase-pill">${done}/${items.length}</span>
          </div>
          ${items
            .map(
              (item) => `
              <label class="check-row ${state.checks[item.id] ? "checked" : ""}">
                <input type="checkbox" data-check-id="${item.id}" ${state.checks[item.id] ? "checked" : ""} />
                <span>
                  <span class="row-title">${escapeHtml(item.title)}</span>
                  <span class="row-sub">${escapeHtml(item.detail)}</span>
                </span>
                <span class="severity-pill severity-${item.severity}">${severityLabel(item.severity)}</span>
              </label>
            `
            )
            .join("")}
        </section>
      `;
    })
    .join("");

  if (!checks.length) {
    els.checkGroups.innerHTML = `<div class="empty-state">当前筛选没有检查项</div>`;
  }
}

function renderFlow() {
  els.flowBoard.innerHTML = state.steps
    .map(
      (step, index) => `
      <div class="step-row">
        <span class="step-index">${index + 1}</span>
        <div>
          <span class="row-title">${escapeHtml(step.name)}</span>
          <span class="row-sub">${escapeHtml(step.note || "无备注")}</span>
          <input class="step-note-input" type="text" value="${escapeHtml(step.note || "")}" data-step-note="${step.id}" placeholder="工艺细节、针距、试穿修改" />
        </div>
        <div class="step-actions">
          <button class="text-button ${statusClass(step.status)}" type="button" data-step-status="${step.id}">
            ${statusLabel(step.status)}
          </button>
          <button class="icon-button mini-icon" type="button" data-step-up="${step.id}" title="上移">
            ${icon("arrow-up")}
          </button>
          <button class="icon-button mini-icon" type="button" data-step-remove="${step.id}" title="删除">
            ${icon("trash-2")}
          </button>
        </div>
      </div>
    `
    )
    .join("");

  if (!state.steps.length) {
    els.flowBoard.innerHTML = `<div class="empty-state">还没有工序</div>`;
  }

  els.dailyNoteInput.value = state.dailyNote || "";
  renderTimer();
}

function elapsedSeconds() {
  if (!state.timer.running || !state.timer.startedAt) return state.timer.seconds || 0;
  return (state.timer.seconds || 0) + Math.floor((Date.now() - state.timer.startedAt) / 1000);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderTimer() {
  els.timerDisplay.textContent = formatTime(elapsedSeconds());
  els.timerToggleButton.innerHTML = state.timer.running
    ? `${icon("pause")} 暂停`
    : `${icon("play")} 开始`;
  els.lapList.innerHTML = (state.timer.laps || [])
    .slice()
    .reverse()
    .map(
      (lap) => `
      <div class="lap-row">
        <strong>${escapeHtml(lap.time)}</strong>
        <span>${escapeHtml(lap.note)}</span>
      </div>
    `
    )
    .join("");
  createIcons();
}

function renderMeasurements() {
  els.measurementTable.innerHTML = `
    <div class="measurement-row header">
      <span>部位</span>
      <span>净尺寸 cm</span>
      <span>放松量 cm</span>
      <span>备注</span>
    </div>
    ${MEASUREMENTS.map(([id, label]) => {
      const item = state.measurements[id] || { label, value: "", ease: "", note: "" };
      return `
        <div class="measurement-row">
          <span class="measurement-name">${label}</span>
          <input type="number" step="0.1" value="${escapeHtml(item.value)}" data-measure="${id}" data-field="value" />
          <input type="number" step="0.1" value="${escapeHtml(item.ease)}" data-measure="${id}" data-field="ease" />
          <input type="text" value="${escapeHtml(item.note || "")}" data-measure="${id}" data-field="note" />
        </div>
      `;
    }).join("")}
  `;
}

function renderMaterials() {
  els.materialList.innerHTML = state.materials.length
    ? state.materials
        .map(
          (item, index) => `
        <div class="material-row">
          <input type="text" value="${escapeHtml(item.name)}" data-material="${index}" data-field="name" />
          <input type="text" value="${escapeHtml(item.amount)}" data-material="${index}" data-field="amount" />
          <select class="material-status" data-material="${index}" data-field="status">
            ${["待确认", "待买", "已备", "缺货", "已替换"]
              .map((status) => `<option value="${status}" ${item.status === status ? "selected" : ""}>${status}</option>`)
              .join("")}
          </select>
          <button class="icon-button mini-icon" type="button" data-material-remove="${index}" title="删除">
            ${icon("trash-2")}
          </button>
        </div>
      `
        )
        .join("")
    : `<div class="empty-state">还没有面辅料</div>`;
}

function fabricEstimate() {
  const type = GARMENT_TYPES[state.project.type] || GARMENT_TYPES.dress;
  const width = Number(state.calc.fabricWidth) || 150;
  const length = Number(state.calc.garmentLength) || 0;
  const sleeve = Number(state.calc.sleeveLength) || 0;
  let meters = type.fabricBase;

  if (length > 0) meters = Math.max(meters, length / 100 + 0.65);
  if (sleeve > 0 && ["jacket", "coat", "shirt", "dress"].includes(state.project.type)) meters += Math.min(0.55, sleeve / 180);
  if (width < 120) meters *= 1.28;
  if (width >= 160) meters *= 0.92;
  if (state.calc.nap === "yes") meters += 0.35;
  if (state.project.components.includes("pocket")) meters += 0.12;
  if (state.project.components.includes("collar")) meters += 0.1;
  if (state.project.complexity === "showpiece") meters += 0.28;

  return Math.max(0.6, meters);
}

function renderCalculators() {
  els.fabricWidthInput.value = state.calc.fabricWidth;
  els.garmentLengthInput.value = state.calc.garmentLength;
  els.sleeveLengthInput.value = state.calc.sleeveLength;
  els.napSelect.value = state.calc.nap;

  els.cleanSizeInput.value = state.calc.cleanSize;
  els.seamAllowanceInput.value = state.calc.seamAllowance;
  els.hemAllowanceInput.value = state.calc.hemAllowance;
  els.seamAreaSelect.value = state.calc.seamArea;

  els.openingLengthInput.value = state.calc.openingLength;
  els.zipStopInput.value = state.calc.zipStop;
  els.zipperTypeSelect.value = state.calc.zipperType;
  els.zipperPositionSelect.value = state.calc.zipperPosition;

  const fabric = fabricEstimate();
  const lining = state.project.components.includes("lining") ? Math.max(0.8, fabric * 0.72) : 0;
  els.fabricResult.innerHTML = `
    <strong>${fabric.toFixed(2)} m</strong>
    <span>主面料建议预留。${lining ? `里布约 ${lining.toFixed(2)} m。` : "当前未选择里布。"}</span>
    <span>格纹、条纹、倒毛或毕业作品建议再加 10% 到 15%。</span>
  `;

  const clean = Number(state.calc.cleanSize) || 0;
  const seam = Number(state.calc.seamAllowance) || 0;
  const hem = Number(state.calc.hemAllowance) || 0;
  const area = SEAM_AREAS.find((item) => item.id === state.calc.seamArea);
  const cutSize = clean + seam * 2 + (state.calc.seamArea === "hem" ? hem : 0);
  els.seamResult.innerHTML = `
    <strong>${cutSize.toFixed(1)} cm</strong>
    <span>${area?.label || "部位"}裁剪参考尺寸。两侧缝份 ${seam.toFixed(1)} cm${state.calc.seamArea === "hem" ? `，折边 ${hem.toFixed(1)} cm` : ""}。</span>
    <span>拉链位和下摆可以单独标色，避免和普通侧缝混淆。</span>
  `;

  const opening = Number(state.calc.openingLength) || 0;
  const stop = Number(state.calc.zipStop) || 0;
  const suggested = Math.max(0, opening - stop);
  const typeLabel = {
    invisible: "隐形拉链",
    regular: "普通拉链",
    separating: "开尾拉链"
  }[state.calc.zipperType];
  els.zipperResult.innerHTML = `
    <strong>${suggested.toFixed(1)} cm</strong>
    <span>${typeLabel}参考长度。开口 ${opening.toFixed(1)} cm，止口预留 ${stop.toFixed(1)} cm。</span>
    <span>先疏缝试拉合，再正式压线；侧缝位要复查拉头方向。</span>
  `;
}

function renderIssues() {
  els.issueAreaSelect.value = state.issueDraftArea || "zipper";
  els.issueList.innerHTML = state.issues.length
    ? state.issues
        .map(
          (issue) => `
        <div class="issue-row">
          ${
            issue.photo
              ? `<img src="${issue.photo}" alt="${escapeHtml(issue.title)}" />`
              : `<span class="no-photo">${icon("image")}</span>`
          }
          <div>
            <span class="row-title">${escapeHtml(issue.title)}</span>
            <span class="row-sub">${componentLabel(issue.area)} · ${escapeHtml(issue.createdAt)}</span>
            <span class="row-sub">${escapeHtml(issue.fix)}</span>
          </div>
          <button class="icon-button mini-icon" type="button" data-issue-remove="${issue.id}" title="删除">
            ${icon("trash-2")}
          </button>
        </div>
      `
        )
        .join("")
    : `<div class="empty-state">还没有问题记录</div>`;
}

function portfolioText() {
  const project = state.project.name || "未命名作品";
  const assignment = state.school.assignment || "课程作业";
  const type = GARMENT_TYPES[state.project.type]?.label || state.project.type;
  const keywords = state.school.keywords || "结构、比例、工艺";
  const concept = state.school.concept || state.project.brief || "围绕课程要求完成从设计到成衣的制作过程。";
  const guide = currentMachineGuide();

  return `《${project}》是${state.school.course || "服装设计课程"}中的${assignment}。作品以${keywords}为关键词，选择${type}作为载体，重点记录廓形比例、纸样调整、面料小样和工艺控制。制作中使用${guide.label}工艺测试，机针/针距参考为${guide.needle}、${guide.stitch}。${concept}`;
}

function renderSchool() {
  const school = state.school;
  const progress = deliverableProgress();
  const average = rubricAverageScore();
  const machine = currentMachineGuide();
  const defect = currentDefectGuide();
  const before = Number(school.swatchBefore) || 0;
  const after = Number(school.swatchAfter) || 0;
  const shrink = before > 0 ? ((before - after) / before) * 100 : 0;

  els.courseInput.value = school.course || "";
  els.teacherInput.value = school.teacher || "";
  els.assignmentInput.value = school.assignment || "";
  els.keywordsInput.value = school.keywords || "";
  els.presentationSelect.value = school.presentation || "portfolio";
  els.conceptInput.value = school.concept || "";
  els.schoolProgressNumber.textContent = `${progress.percent}%`;
  els.rubricAverage.textContent = `${average.toFixed(1)}/5`;

  els.deliverableList.innerHTML = DELIVERABLES.map((item) => {
    const checked = Boolean(school.deliverables?.[item.id]);
    return `
      <label class="deliverable-row ${checked ? "checked" : ""}">
        <input type="checkbox" data-deliverable="${item.id}" ${checked ? "checked" : ""} />
        <span>
          <span class="row-title">${escapeHtml(item.label)}</span>
          <span class="row-sub">${escapeHtml(item.note)}</span>
        </span>
        <span class="status-pill ${checked ? "status-done" : "status-todo"}">${checked ? "完成" : "待做"}</span>
      </label>
    `;
  }).join("");

  els.rubricList.innerHTML = RUBRIC_ITEMS.map((item) => {
    const score = Number(school.rubric?.[item.id] || 0);
    return `
      <label class="rubric-row">
        <span class="row-title">${escapeHtml(item.label)}</span>
        <input type="range" min="1" max="5" step="1" value="${score}" data-rubric="${item.id}" />
        <span class="rubric-score">${score}</span>
      </label>
    `;
  }).join("");

  const text = portfolioText();
  els.portfolioCopy.innerHTML = escapeHtml(text);
  els.fabricGuideSelect.value = school.fabricGuide || "cotton";
  els.defectGuideSelect.value = school.defectGuide || "puckering";
  els.machineGuideResult.innerHTML = `
    <strong>${machine.label}</strong>
    <dl>
      <div><dt>机针</dt><dd>${escapeHtml(machine.needle)}</dd></div>
      <div><dt>针距</dt><dd>${escapeHtml(machine.stitch)}</dd></div>
      <div><dt>张力</dt><dd>${escapeHtml(machine.tension)}</dd></div>
      <div><dt>压脚</dt><dd>${escapeHtml(machine.foot)}</dd></div>
      <div><dt>整烫</dt><dd>${escapeHtml(machine.pressing)}</dd></div>
    </dl>
  `;
  els.defectGuideResult.innerHTML = `
    <strong>${defect.label}</strong>
    <dl>
      <div><dt>原因</dt><dd>${escapeHtml(defect.cause)}</dd></div>
      <div><dt>处理</dt><dd>${escapeHtml(defect.fix)}</dd></div>
    </dl>
  `;
  els.swatchBeforeInput.value = school.swatchBefore;
  els.swatchAfterInput.value = school.swatchAfter;
  els.swatchNoteInput.value = school.swatchNote || "";
  els.swatchResult.innerHTML = `
    <strong>${Math.abs(shrink).toFixed(2)}%</strong>
    <span>${shrink >= 0 ? "缩水率" : "拉伸率"}参考值。裁剪前可以把关键部位预留到纸样或工艺单里。</span>
    <span>${escapeHtml(school.swatchNote || "记录面料手感、厚薄、熨烫温度和是否起皱。")}</span>
  `;
}

function renderStudioTabs() {
  $$("[data-studio-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.studioTab === state.activeStudioTab);
  });
  $$("[data-studio-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.studioPanel === state.activeStudioTab);
  });
}

function renderViews() {
  document.body.dataset.activeView = state.activeView;
  $$("[data-view]").forEach((view) => view.classList.toggle("active", view.dataset.view === state.activeView));
  $$(".view-tabs [data-view-target]").forEach((tab) => {
    const active = tab.dataset.viewTarget === state.activeView;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-current", active ? "page" : "false");
  });
}

function renderAll() {
  renderViews();
  renderProjectForm();
  renderDashboard();
  renderSchool();
  renderFilters();
  renderChecks();
  renderFlow();
  renderStudioTabs();
  renderMeasurements();
  renderMaterials();
  renderCalculators();
  renderIssues();
  createIcons();
}

function updateProjectFromForm() {
  state.project.name = els.projectName.value.trim() || "新作品";
  state.project.type = els.garmentType.value;
  state.project.phase = els.phaseSelect.value;
  state.project.deadline = els.deadlineInput.value;
  state.project.complexity = els.complexitySelect.value;
  state.project.brief = els.briefInput.value;
  saveState();
  renderAll();
}

function updateSchoolFromForm() {
  state.school.course = els.courseInput.value.trim();
  state.school.teacher = els.teacherInput.value.trim();
  state.school.assignment = els.assignmentInput.value.trim();
  state.school.keywords = els.keywordsInput.value.trim();
  state.school.presentation = els.presentationSelect.value;
  state.school.concept = els.conceptInput.value;
  saveState();
  renderAll();
}

function updateSchoolTools() {
  state.school.fabricGuide = els.fabricGuideSelect.value;
  state.school.defectGuide = els.defectGuideSelect.value;
  state.school.swatchBefore = Number(els.swatchBeforeInput.value);
  state.school.swatchAfter = Number(els.swatchAfterInput.value);
  state.school.swatchNote = els.swatchNoteInput.value;
  saveState();
  renderAll();
}

function switchView(view, filter) {
  state.activeView = view;
  if (filter) state.activeFilter = filter;
  saveState();
  updateRoute();
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyRoute() {
  const route = window.location.hash.replace(/^#/, "");
  if (!route) return;
  const [view, studioTab] = route.split("/");
  if (VALID_VIEWS.has(view)) state.activeView = view;
  if (view === "studio" && VALID_STUDIO_TABS.has(studioTab)) state.activeStudioTab = studioTab;
}

function updateRoute() {
  const studioPart = state.activeView === "studio" ? `/${state.activeStudioTab}` : "";
  const next = `#${state.activeView}${studioPart}`;
  if (window.location.hash !== next) {
    window.history.replaceState(null, "", next);
  }
}

function setupEvents() {
  document.addEventListener("click", (event) => {
    const viewTarget = event.target.closest("[data-view-target]");
    if (viewTarget) {
      switchView(viewTarget.dataset.viewTarget, viewTarget.dataset.filter);
      return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton && filterButton.closest("#componentFilters")) {
      state.activeFilter = filterButton.dataset.filter;
      saveState();
      renderAll();
      return;
    }

    const studioTab = event.target.closest("[data-studio-tab]");
    if (studioTab) {
      state.activeStudioTab = studioTab.dataset.studioTab;
      saveState();
      updateRoute();
      renderAll();
      return;
    }

    const statusButton = event.target.closest("[data-step-status]");
    if (statusButton) {
      const step = state.steps.find((item) => item.id === statusButton.dataset.stepStatus);
      if (step) {
        step.status = step.status === "todo" ? "doing" : step.status === "doing" ? "done" : "todo";
        saveState();
        renderAll();
      }
      return;
    }

    const upButton = event.target.closest("[data-step-up]");
    if (upButton) {
      const index = state.steps.findIndex((item) => item.id === upButton.dataset.stepUp);
      if (index > 0) {
        [state.steps[index - 1], state.steps[index]] = [state.steps[index], state.steps[index - 1]];
        saveState();
        renderAll();
      }
      return;
    }

    const removeStepButton = event.target.closest("[data-step-remove]");
    if (removeStepButton) {
      state.steps = state.steps.filter((item) => item.id !== removeStepButton.dataset.stepRemove);
      saveState();
      renderAll();
      return;
    }

    const removeMaterialButton = event.target.closest("[data-material-remove]");
    if (removeMaterialButton) {
      state.materials.splice(Number(removeMaterialButton.dataset.materialRemove), 1);
      saveState();
      renderAll();
      return;
    }

    const removeIssueButton = event.target.closest("[data-issue-remove]");
    if (removeIssueButton) {
      state.issues = state.issues.filter((item) => item.id !== removeIssueButton.dataset.issueRemove);
      saveState();
      renderAll();
      return;
    }
  });

  els.projectForm.addEventListener("input", updateProjectFromForm);
  els.projectForm.addEventListener("change", updateProjectFromForm);

  els.componentGrid.addEventListener("change", (event) => {
    if (!event.target.matches("input[type='checkbox']")) return;
    const values = $$("#componentGrid input:checked").map((input) => input.value);
    state.project.components = values;
    saveState();
    renderAll();
  });

  $("#selectCommonButton").addEventListener("click", () => {
    state.project.components = clone(GARMENT_TYPES[state.project.type]?.defaults || GARMENT_TYPES.dress.defaults);
    saveState();
    renderAll();
  });

  els.schoolForm.addEventListener("input", updateSchoolFromForm);
  els.schoolForm.addEventListener("change", updateSchoolFromForm);

  els.deliverableList.addEventListener("change", (event) => {
    if (!event.target.matches("[data-deliverable]")) return;
    state.school.deliverables[event.target.dataset.deliverable] = event.target.checked;
    saveState();
    renderAll();
  });

  $("#resetDeliverablesButton").addEventListener("click", () => {
    state.school.deliverables = emptyDeliverables();
    saveState();
    renderAll();
    toast("交付清单已重置");
  });

  els.rubricList.addEventListener("input", (event) => {
    if (!event.target.matches("[data-rubric]")) return;
    state.school.rubric[event.target.dataset.rubric] = Number(event.target.value);
    saveState();
    renderAll();
  });

  els.fabricGuideSelect.addEventListener("change", updateSchoolTools);
  els.defectGuideSelect.addEventListener("change", updateSchoolTools);
  [els.swatchBeforeInput, els.swatchAfterInput, els.swatchNoteInput].forEach((input) => {
    input.addEventListener("input", updateSchoolTools);
    input.addEventListener("change", updateSchoolTools);
  });

  $("#copyPortfolioButton").addEventListener("click", copyPortfolioText);

  els.checkGroups.addEventListener("change", (event) => {
    if (!event.target.matches("[data-check-id]")) return;
    state.checks[event.target.dataset.checkId] = event.target.checked;
    saveState();
    renderAll();
  });

  $("#resetChecksButton").addEventListener("click", () => {
    state.checks = {};
    saveState();
    renderAll();
    toast("检查勾选已重置");
  });

  $("#addCheckToggle").addEventListener("click", () => {
    els.customCheckForm.classList.toggle("hidden");
  });

  els.customCheckForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = els.customCheckText.value.trim();
    if (!text) return toast("先写一个检查项");
    const id = `custom-${Date.now()}`;
    state.customChecks.push({
      id,
      component: els.customCheckComponent.value,
      title: text,
      detail: els.customCheckDetail.value.trim() || "自定义检查项",
      severity: "medium",
      applies: [els.customCheckComponent.value]
    });
    els.customCheckText.value = "";
    els.customCheckDetail.value = "";
    saveState();
    renderAll();
    toast("已添加检查项");
  });

  els.flowBoard.addEventListener("input", (event) => {
    if (!event.target.matches("[data-step-note]")) return;
    const step = state.steps.find((item) => item.id === event.target.dataset.stepNote);
    if (step) {
      step.note = event.target.value;
      saveState();
    }
  });

  $("#addStepButton").addEventListener("click", () => {
    const name = window.prompt("新工序名称");
    if (!name?.trim()) return;
    state.steps.push({
      id: `step-${Date.now()}`,
      name: name.trim(),
      note: "",
      status: "todo"
    });
    saveState();
    renderAll();
  });

  $("#loadTemplateStepsButton").addEventListener("click", () => {
    if (!window.confirm("用当前品类模板替换现有工序？")) return;
    state.steps = templateSteps(state.project.type);
    saveState();
    renderAll();
  });

  els.dailyNoteInput.addEventListener("input", () => {
    state.dailyNote = els.dailyNoteInput.value;
    saveState();
  });

  $("#timerToggleButton").addEventListener("click", () => {
    if (state.timer.running) {
      state.timer.seconds = elapsedSeconds();
      state.timer.running = false;
      state.timer.startedAt = null;
    } else {
      state.timer.running = true;
      state.timer.startedAt = Date.now();
    }
    saveState();
    renderTimer();
    syncTimerInterval();
  });

  $("#timerLapButton").addEventListener("click", () => {
    const activeStep = state.steps.find((step) => step.status === "doing") || state.steps.find((step) => step.status !== "done");
    state.timer.laps = state.timer.laps || [];
    state.timer.laps.push({
      time: formatTime(elapsedSeconds()),
      note: activeStep ? activeStep.name : "手动记录"
    });
    saveState();
    renderTimer();
  });

  $("#clearTimerButton").addEventListener("click", () => {
    state.timer = { seconds: 0, running: false, startedAt: null, laps: [] };
    saveState();
    renderTimer();
    syncTimerInterval();
  });

  els.measurementTable.addEventListener("input", (event) => {
    if (!event.target.matches("[data-measure]")) return;
    const id = event.target.dataset.measure;
    const field = event.target.dataset.field;
    state.measurements[id] = state.measurements[id] || {};
    state.measurements[id][field] = event.target.value;
    saveState();
  });

  $("#resetMeasurementsButton").addEventListener("click", () => {
    state.measurements = emptyMeasurements();
    saveState();
    renderAll();
  });

  $("#addMaterialButton").addEventListener("click", () => {
    state.materials.push({ name: "新辅料", amount: "1 件", status: "待确认" });
    saveState();
    renderAll();
  });

  els.materialList.addEventListener("input", updateMaterialFromEvent);
  els.materialList.addEventListener("change", updateMaterialFromEvent);

  [
    els.fabricWidthInput,
    els.garmentLengthInput,
    els.sleeveLengthInput,
    els.napSelect,
    els.cleanSizeInput,
    els.seamAllowanceInput,
    els.hemAllowanceInput,
    els.seamAreaSelect,
    els.openingLengthInput,
    els.zipStopInput,
    els.zipperTypeSelect,
    els.zipperPositionSelect
  ].forEach((input) => {
    input.addEventListener("input", updateCalcFromInputs);
    input.addEventListener("change", updateCalcFromInputs);
  });

  els.issuePhotoInput.addEventListener("change", async () => {
    const file = els.issuePhotoInput.files?.[0];
    if (!file) return;
    pendingIssuePhoto = await readFileAsDataUrl(file);
    els.photoLabel.textContent = file.name;
    toast("照片已选择");
  });

  $("#saveIssueButton").addEventListener("click", () => {
    const title = els.issueTitleInput.value.trim();
    if (!title) return toast("先写问题标题");
    state.issues.unshift({
      id: `issue-${Date.now()}`,
      area: els.issueAreaSelect.value,
      title,
      fix: els.issueFixInput.value.trim() || "待复盘",
      photo: pendingIssuePhoto,
      createdAt: new Date().toLocaleString("zh-CN", { hour12: false })
    });
    els.issueTitleInput.value = "";
    els.issueFixInput.value = "";
    els.issuePhotoInput.value = "";
    els.photoLabel.textContent = "选择或拍摄照片";
    pendingIssuePhoto = null;
    saveState();
    renderAll();
    toast("问题已保存");
  });

  $("#clearIssuesButton").addEventListener("click", () => {
    if (!state.issues.length) return;
    if (!window.confirm("清空所有问题记录？")) return;
    state.issues = [];
    saveState();
    renderAll();
  });

  $("#copySummaryButton").addEventListener("click", copySummary);
  $("#exportButton").addEventListener("click", exportState);
  els.importInput.addEventListener("change", importState);

  els.installButton.addEventListener("click", async () => {
    if (!pendingInstallEvent) return;
    pendingInstallEvent.prompt();
    await pendingInstallEvent.userChoice;
    pendingInstallEvent = null;
    els.installButton.hidden = true;
  });
}

function updateMaterialFromEvent(event) {
  if (!event.target.matches("[data-material]")) return;
  const index = Number(event.target.dataset.material);
  const field = event.target.dataset.field;
  state.materials[index][field] = event.target.value;
  saveState();
}

function updateCalcFromInputs() {
  state.calc.fabricWidth = Number(els.fabricWidthInput.value);
  state.calc.garmentLength = Number(els.garmentLengthInput.value);
  state.calc.sleeveLength = Number(els.sleeveLengthInput.value);
  state.calc.nap = els.napSelect.value;
  state.calc.cleanSize = Number(els.cleanSizeInput.value);
  state.calc.seamAllowance = Number(els.seamAllowanceInput.value);
  state.calc.hemAllowance = Number(els.hemAllowanceInput.value);
  state.calc.seamArea = els.seamAreaSelect.value;
  state.calc.openingLength = Number(els.openingLengthInput.value);
  state.calc.zipStop = Number(els.zipStopInput.value);
  state.calc.zipperType = els.zipperTypeSelect.value;
  state.calc.zipperPosition = els.zipperPositionSelect.value;
  saveState();
  renderCalculators();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function copySummary() {
  const check = checkProgress();
  const steps = stepProgress();
  const school = deliverableProgress();
  const pending = allChecks()
    .filter((item) => !state.checks[item.id] && item.severity === "high")
    .slice(0, 6)
    .map((item) => `- ${componentLabel(item.component)}：${item.title}`)
    .join("\n");

  const text = [
    `作品：${state.project.name}`,
    `品类：${GARMENT_TYPES[state.project.type]?.label || state.project.type}`,
    `阶段：${phaseLabel(state.project.phase)}`,
    `防错完成：${check.done}/${check.total}`,
    `工序完成：${steps.done}/${steps.total}`,
    `课业交付：${school.done}/${school.total}`,
    `作业题目：${state.school.assignment || "未填写"}`,
    `重点部件：${state.project.components.map(componentLabel).join("、")}`,
    pending ? `待处理高风险：\n${pending}` : "待处理高风险：无",
    state.dailyNote ? `今日复盘：${state.dailyNote}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await navigator.clipboard.writeText(text);
    toast("项目摘要已复制");
  } catch {
    window.prompt("复制下面的项目摘要", text);
  }
}

async function copyPortfolioText() {
  const text = portfolioText();
  try {
    await navigator.clipboard.writeText(text);
    toast("作品集文案已复制");
  } catch {
    window.prompt("复制下面的作品集文案", text);
  }
}

function exportState() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `atelier-companion-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importState() {
  const file = els.importInput.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const imported = JSON.parse(text);
    state = { ...defaultState(), ...imported };
    saveState();
    renderAll();
    toast("数据已导入");
  } catch {
    toast("导入失败，请检查 JSON 文件");
  } finally {
    els.importInput.value = "";
  }
}

function syncTimerInterval() {
  window.clearInterval(timerInterval);
  if (state.timer.running) {
    timerInterval = window.setInterval(renderTimer, 1000);
  }
}

function setupPwa() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    pendingInstallEvent = event;
    els.installButton.hidden = false;
  });
}

function boot() {
  populateStaticControls();
  applyRoute();
  setupEvents();
  renderAll();
  setupPwa();
  syncTimerInterval();
  window.addEventListener("hashchange", () => {
    applyRoute();
    saveState();
    renderAll();
  });
}

boot();
