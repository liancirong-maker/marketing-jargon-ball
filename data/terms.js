/**
 * 预置词库：广告投放 / 营销指标 / 内容种草 / 用户增长 / 职场黑话
 * 字段：term 词条 · termEn 英文 · category 分类 · definition 释义 · examples 例句
 * 释义为通用行业口径，具体以各平台官方定义为准。
 */
window.__MJB_DATA__ = {
  categories: {
    ad: '广告投放',
    metric: '营销指标',
    content: '内容种草',
    growth: '用户增长',
    work: '职场黑话'
  },
  terms: [
    // ── 广告投放 ─────────────────────────────
    { term: '投放', termEn: 'Ad Delivery', category: 'ad', definition: '花预算把广告推送给目标用户的整个过程，包括建计划、定人群、出价、上素材和看数据调整。', examples: ['这周投放预算加到 5 万，重点放搜索。'] },
    { term: '信息流广告', termEn: 'Feed Ads', category: 'ad', definition: '穿插在内容流中展示、外观接近普通内容的广告，适合种草和拉新。', examples: ['信息流负责扩大曝光，搜索负责承接需求。'] },
    { term: '搜索广告', termEn: 'Search Ads', category: 'ad', definition: '用户搜索关键词时出现的广告。用户主动搜索、意图明确，转化率通常高于信息流。', examples: ['「婚纱摄影」这个词的搜索广告竞争很激烈。'] },
    { term: '定向', termEn: 'Targeting', category: 'ad', definition: '按年龄、性别、地域、兴趣、行为等条件圈定广告展示给哪些人。', examples: ['定向太窄会导致计划跑不出量。'] },
    { term: '人群包', termEn: 'Audience Package', category: 'ad', definition: '预先圈定的一批目标用户，可直接用于定向投放，也可用于排除已转化人群。', examples: ['把近 30 天互动过的用户做成人群包再投一轮。'] },
    { term: '竞价', termEn: 'Bidding', category: 'ad', definition: '多个广告主为同一流量出价，平台综合出价和预估效果决定展示谁的广告。', examples: ['节假日竞价激烈，CPM 普遍上涨。'] },
    { term: '出价', termEn: 'Bid', category: 'ad', definition: '广告主愿意为一次曝光、点击或转化支付的价格，直接影响拿量能力和成本。', examples: ['出价压太低，系统不给量。'] },
    { term: '起量', termEn: 'Scale Up', category: 'ad', definition: '广告计划开始稳定获得大量曝光和消耗，说明系统找到了合适人群。', examples: ['新计划两天还没起量，先提一点出价试试。'] },
    { term: '冷启动', termEn: 'Cold Start', category: 'ad', definition: '新计划、新账号或新内容上线初期，系统还在缺数据、探索人群的阶段，数据波动大。', examples: ['冷启动期别频繁改计划，会打断系统学习。'] },
    { term: '消耗', termEn: 'Spend', category: 'ad', definition: '广告实际花掉的钱，是衡量客户投放规模和活跃度的核心数据。', examples: ['这个客户近 30 天消耗明显下滑，要跟进一下。'] },
    { term: '素材', termEn: 'Creative', category: 'ad', definition: '广告中使用的图片、视频、标题和文案等内容，是影响点击率的关键因素。', examples: ['素材跑疲了，CTR 掉得厉害，得换一批。'] },
    { term: '自投', termEn: 'Self-serve', category: 'ad', definition: '广告主自己开户、自己操作投放，不经过代理商。', examples: ['小商家起步时大多是自投。'] },
    { term: '代投', termEn: 'Managed Service', category: 'ad', definition: '由代理商或服务商代替广告主开户并操作投放，广告主主要负责出预算和提需求。', examples: ['客户没精力优化，想转成代投。'] },
    { term: '服务商', termEn: 'Service Provider / Agency', category: 'ad', definition: '获得平台授权、为广告主提供开户、代投、内容制作等服务的公司，也常叫代理商。', examples: ['这个客户已经挂了服务商，不能再分配。'] },
    { term: '品效合一', termEn: 'Brand + Performance', category: 'ad', definition: '一次投放同时兼顾品牌曝光和销售转化，不再把品牌广告和效果广告割裂开。', examples: ['今年的预算要求品效合一，不能只看曝光。'] },
    { term: '硬广', termEn: 'Display Ad', category: 'ad', definition: '一眼就能看出是广告的直接推广形式，比如开屏和横幅。', examples: ['硬广曝光大，但用户越来越免疫。'] },
    { term: '软广', termEn: 'Native Ad', category: 'ad', definition: '把推广信息融入内容中的广告，比如达人测评和植入，用户接受度更高。', examples: ['软广要自然，太生硬会被骂「恰饭」。'] },

    // ── 营销指标 ─────────────────────────────
    { term: 'CPM', termEn: 'Cost Per Mille', category: 'metric', definition: '千次展示成本 = 广告花费 ÷ 曝光量 × 1000，衡量买曝光的贵贱。', examples: ['大促期间 CPM 涨了将近一倍。'] },
    { term: 'CPC', termEn: 'Cost Per Click', category: 'metric', definition: '单次点击成本 = 广告花费 ÷ 点击数。', examples: ['优化素材后 CPC 从 2 元降到 1.3 元。'] },
    { term: 'CPA', termEn: 'Cost Per Action', category: 'metric', definition: '单次转化成本，即每获得一次目标行为（留资、下单、下载等）要花多少钱。', examples: ['老板只看 CPA，曝光多少不重要。'] },
    { term: 'CPE', termEn: 'Cost Per Engagement', category: 'metric', definition: '单次互动成本，即每获得一次点赞、收藏、评论等互动要花多少钱，常用于内容种草。', examples: ['种草笔记主要看 CPE 和互动率。'] },
    { term: 'CTR', termEn: 'Click-Through Rate', category: 'metric', definition: '点击率 = 点击数 ÷ 曝光量，反映素材和标题的吸引力。', examples: ['封面换成真人出镜后，CTR 提升了 30%。'] },
    { term: 'CVR', termEn: 'Conversion Rate', category: 'metric', definition: '转化率 = 转化数 ÷ 点击数，反映落地页和产品的承接能力。', examples: ['点击不少但 CVR 很低，先查落地页。'] },
    { term: 'ROI', termEn: 'Return on Investment', category: 'metric', definition: '投资回报率。广告场景常用「带来的营收 ÷ 投入花费」，具体口径因公司而异，用之前要先对齐。', examples: ['这波投放 ROI 做到了 1:4。'] },
    { term: 'ROAS', termEn: 'Return on Ad Spend', category: 'metric', definition: '广告支出回报 = 广告带来的营收 ÷ 广告花费，只算广告本身，不含其他成本。', examples: ['ROAS 低于 2 就不赚钱了。'] },
    { term: 'GMV', termEn: 'Gross Merchandise Volume', category: 'metric', definition: '成交总额。是否扣除未付款、退款，各平台口径不同。', examples: ['大促 GMV 好看，退款率也要一起看。'] },
    { term: 'ARPU', termEn: 'Average Revenue Per User', category: 'metric', definition: '每用户平均收入 = 总收入 ÷ 用户数。', examples: ['腰部客户的 ARPU 还有提升空间。'] },
    { term: 'LTV', termEn: 'Lifetime Value', category: 'metric', definition: '用户生命周期价值，即一个用户从首次付费到流失，总共能贡献多少收入。', examples: ['只要 LTV 大于 CAC，获客就值得做。'] },
    { term: 'CAC', termEn: 'Customer Acquisition Cost', category: 'metric', definition: '获客成本，即平均获得一个新客户要花多少钱。', examples: ['渠道越来越贵，CAC 一直在涨。'] },
    { term: 'DAU / MAU', termEn: 'Daily / Monthly Active Users', category: 'metric', definition: '日活跃用户数和月活跃用户数。DAU ÷ MAU 可以反映用户黏性。', examples: ['DAU/MAU 超过 40% 算黏性不错。'] },
    { term: 'UV / PV', termEn: 'Unique Visitors / Page Views', category: 'metric', definition: 'UV 是访问的独立用户数，PV 是页面被浏览的总次数。一个人看 3 次，记 1 个 UV、3 个 PV。', examples: ['活动页 PV 很高，但 UV 不多，说明是老用户反复刷。'] },
    { term: '留存率', termEn: 'Retention Rate', category: 'metric', definition: '一段时间后仍在使用产品的用户占比，常看次日、7 日、30 日留存。', examples: ['新版本次留提升了 5 个点。'] },

    // ── 内容种草 ─────────────────────────────
    { term: '种草', termEn: 'Seeding', category: 'content', definition: '通过真实分享和体验内容激发别人的购买欲，让对方「想要」。', examples: ['这篇笔记把我种草了。'] },
    { term: '拔草', termEn: 'Purchase / Turn-off', category: 'content', definition: '有两种意思：把种草的东西买到手；或者被劝退，不想买了。', examples: ['看完差评直接拔草。'] },
    { term: 'KOL', termEn: 'Key Opinion Leader', category: 'content', definition: '关键意见领袖，粉丝多、影响力大的头部达人，适合打声量。', examples: ['新品上市先找几个 KOL 造势。'] },
    { term: 'KOC', termEn: 'Key Opinion Consumer', category: 'content', definition: '关键意见消费者，粉丝不多但内容真实、信任度高的普通用户型创作者，性价比高。', examples: ['预算有限就多铺 KOC，做口碑。'] },
    { term: 'KOS', termEn: 'Key Opinion Sales', category: 'content', definition: '关键意见销售，即品牌员工或导购以个人身份发专业内容，兼顾种草和转化。', examples: ['让门店导购做 KOS 账号，直接承接到店。'] },
    { term: '达人', termEn: 'Creator / Influencer', category: 'content', definition: '在某个领域持续产出内容、有一定粉丝的创作者，按粉丝量常分为头部、腰部和尾部。', examples: ['这次合作 20 个腰部达人。'] },
    { term: '素人', termEn: 'Ordinary User', category: 'content', definition: '非达人的普通用户。素人铺量常用于营造「大家都在用」的氛围。', examples: ['素人笔记看着更真实。'] },
    { term: '爆文', termEn: 'Viral Post', category: 'content', definition: '数据远超平均水平的内容，常以点赞、收藏量破千或破万来衡量。', examples: ['这篇爆文带来了 300 多条私信。'] },
    { term: '笔记', termEn: 'Note / Post', category: 'content', definition: '内容平台上一条图文或视频内容的单位。', examples: ['先发 10 篇笔记测一下哪个方向数据好。'] },
    { term: '选题', termEn: 'Topic', category: 'content', definition: '内容要讲什么。好选题往往贴近用户的真实痛点和搜索需求。', examples: ['选题对了，内容就成功了一半。'] },
    { term: '互动率', termEn: 'Engagement Rate', category: 'content', definition: '（点赞 + 收藏 + 评论 + 分享）÷ 曝光或阅读，反映内容引发共鸣的程度。', examples: ['收藏远多于点赞，说明干货属性强。'] },

    // ── 用户增长 ─────────────────────────────
    { term: '私域', termEn: 'Private Traffic', category: 'growth', definition: '品牌能自主、反复、免费触达的用户池，比如企业微信、社群和会员体系。', examples: ['把公域流量沉淀到私域做复购。'] },
    { term: '公域', termEn: 'Public Traffic', category: 'growth', definition: '平台的公共流量，要靠内容或付费广告争取，难以反复免费触达。', examples: ['公域越来越贵，要想办法转私域。'] },
    { term: '获客', termEn: 'Acquisition', category: 'growth', definition: '获取新客户的过程和手段。', examples: ['我们主要靠搜索广告获客。'] },
    { term: '拉新', termEn: 'New User Acquisition', category: 'growth', definition: '吸引从没用过产品的新用户，常与「促活」「留存」并提。', examples: ['这个活动主要是为了拉新。'] },
    { term: '促活', termEn: 'Activation', category: 'growth', definition: '让已有用户更活跃，比如更常打开、更常使用。', examples: ['签到和积分是常见的促活手段。'] },
    { term: '留资', termEn: 'Lead Capture', category: 'growth', definition: '用户主动留下手机号、微信等联系方式，常见于本地生活、教育、家装等行业。', examples: ['这条计划留资成本 80 元。'] },
    { term: '线索', termEn: 'Sales Lead', category: 'growth', definition: '有潜在购买意向、可供销售跟进的客户信息。', examples: ['线索拿到后 24 小时内必须回访。'] },
    { term: '客资', termEn: 'Customer Lead Info', category: 'growth', definition: '客户资料，通常指留资获得的客户联系方式和需求信息，基本等同于线索。', examples: ['同行冒充客户留资，把客资位都占了。'] },
    { term: '转化漏斗', termEn: 'Conversion Funnel', category: 'growth', definition: '把用户从曝光到成交拆成多个环节，看每一步流失多少，从而定位问题。', examples: ['漏斗里点击到留资这一步掉得最厉害。'] },
    { term: '复购', termEn: 'Repurchase', category: 'growth', definition: '老客户再次购买。复购率高说明产品和服务留得住人。', examples: ['食品类目最看复购。'] },
    { term: 'A/B 测试', termEn: 'A/B Testing', category: 'growth', definition: '把用户随机分组，给出不同版本，用数据判断哪个版本更好。', examples: ['两版封面先 A/B 测试一下再全量。'] },
    { term: '归因', termEn: 'Attribution', category: 'growth', definition: '判断一次转化应该算到哪个渠道或哪次触达的功劳上。', examples: ['用户看了笔记、又搜了词才下单，归因要怎么算？'] },
    { term: 'SPU / SKU', termEn: 'Standard Product Unit / Stock Keeping Unit', category: 'growth', definition: 'SPU 是一类商品（如某款手机），SKU 是具体到规格的最小库存单位（如这款手机的黑色 256G）。', examples: ['这个 SPU 下有 6 个 SKU。'] },

    // ── 职场黑话 ─────────────────────────────
    { term: '抓手', termEn: 'Lever', category: 'work', definition: '推动事情落地的切入点或关键手段。', examples: ['这个季度的增长抓手是什么？'] },
    { term: '闭环', termEn: 'Closed Loop', category: 'work', definition: '事情从发起、执行、反馈到改进全流程跑通，有结果、有回音。', examples: ['这个问题要跟到闭环，别只提不解。'] },
    { term: '赋能', termEn: 'Empower', category: 'work', definition: '给团队或伙伴提供工具、方法和资源，让他们能自己把事做成。', examples: ['我们要赋能服务商，而不是替他们干活。'] },
    { term: '对齐', termEn: 'Align', category: 'work', definition: '让相关方在目标、口径、时间点上达成一致，常用来代替「沟通、确认」。', examples: ['数据口径先跟财务对齐一下。'] },
    { term: '颗粒度', termEn: 'Granularity', category: 'work', definition: '信息或方案的细致程度。颗粒度粗是概要，颗粒度细是明细。', examples: ['你这个方案颗粒度太粗了，落不了地。'] },
    { term: '复盘', termEn: 'Retrospective', category: 'work', definition: '事后回顾目标、结果、原因和改进点，沉淀经验。原是围棋术语。', examples: ['大促结束后周三开复盘会。'] },
    { term: '打法', termEn: 'Playbook', category: 'work', definition: '做成某件事的具体策略和套路。', examples: ['腰部客户和头部客户的打法不一样。'] },
    { term: '心智', termEn: 'Mindshare', category: 'work', definition: '用户想到某个需求时第一个想到你的程度，也就是用户认知中的位置。', examples: ['我们要占领「做攻略先搜一下」的用户心智。'] },
    { term: '赛道', termEn: 'Track / Vertical', category: 'work', definition: '一个细分行业或市场方向。', examples: ['宠物赛道今年增长很快。'] },
    { term: '沉淀', termEn: 'Codify / Accumulate', category: 'work', definition: '把经验、数据或用户积累下来，变成可复用的资产，比如 SOP、模板和私域。', examples: ['把这次的处理方法沉淀成 SOP。'] },
    { term: '拉通', termEn: 'Cross-team Sync', category: 'work', definition: '把多个团队或部门拉到一起，统一信息和目标。', examples: ['这事得拉通产品、销售和运营一起看。'] },
    { term: '兜底', termEn: 'Fallback', category: 'work', definition: '其他方案都失效时，保证结果不会太差的最后方案。', examples: ['自动流程失败时由人工兜底。'] },
    { term: '落地', termEn: 'Execute / Implement', category: 'work', definition: '把想法和方案变成实际执行并产生结果。', examples: ['方案不错，关键是怎么落地。'] },
    { term: 'Owner', termEn: 'Owner', category: 'work', definition: '对某件事负全责的人，不只是执行者，还要对结果负责。', examples: ['这个项目你来当 owner。'] },
    { term: 'SOP', termEn: 'Standard Operating Procedure', category: 'work', definition: '标准作业流程，把一件事的标准做法写下来，让任何人照着做都能做对。', examples: ['新人照着 SOP 就能独立开户。'] }
  ]
}
