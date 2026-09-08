#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""小红书可售资料包 PDF 生成器（港学荟）
包1：《2027/28 小一填表急救包》 包2：《高才通子女插班路线图》
数据依据：教育局 2027/28 官方文件（本站已核实），仅供个人参考。
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, PageBreak)

# 嵌入式中文字体（避免查看器缺字体导致空白）
_FONT_CANDIDATES = [
    ("Songti", "/System/Library/Fonts/Supplemental/Songti.ttc"),
    ("STHeiti", "/System/Library/Fonts/STHeiti Light.ttc"),
    ("ArialUni", "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"),
]
FONT_NAME = "Songti"
for name, path in _FONT_CANDIDATES:
    try:
        pdfmetrics.registerFont(TTFont(name, path, subfontIndex=0))
        FONT_NAME = name
        break
    except Exception:
        continue
print("embedded font:", FONT_NAME)

INK = colors.HexColor("#1C1C1C")
CREAM = colors.HexColor("#F7F1E5")
TEAL = colors.HexColor("#0F766E")
ACCENT = colors.HexColor("#C2410C")
YELLOW = colors.HexColor("#E6A817")
MUTED = colors.HexColor("#57534E")
LINE = colors.HexColor("#E4E0D8")
WHITE = colors.white

PAGE_W, PAGE_H = A4
MARGIN = 16 * mm
USABLE = PAGE_W - 2 * MARGIN

OUT = "/Users/maxjia/hkschool.guide/output/pdf"
TMP = "/Users/maxjia/hkschool.guide/tmp/pdfs"
os.makedirs(OUT, exist_ok=True)
os.makedirs(TMP, exist_ok=True)


def mkstyle(name, **kw):
    base = dict(fontName=FONT_NAME, fontSize=10.5, leading=16,
                textColor=INK, alignment=TA_LEFT, spaceAfter=4, wordWrap="CJK")
    base.update(kw)
    return ParagraphStyle(name, **base)


S_COVER_KICK = mkstyle("kick", fontSize=12, leading=18, textColor=CREAM, alignment=TA_CENTER)
S_COVER_TITLE = mkstyle("ctitle", fontSize=27, leading=38, textColor=CREAM, alignment=TA_CENTER)
S_COVER_SUB = mkstyle("csub", fontSize=13, leading=20, textColor=CREAM, alignment=TA_CENTER)
S_COVER_META = mkstyle("cmeta", fontSize=9.5, leading=14, textColor=CREAM, alignment=TA_CENTER)
S_H1 = mkstyle("h1", fontSize=16, leading=22, textColor=TEAL, spaceAfter=8)
S_H2 = mkstyle("h2", fontSize=12.5, leading=18, textColor=INK, spaceBefore=8, spaceAfter=4)
S_BODY = mkstyle("body", fontSize=10.5, leading=16)
S_SMALL = mkstyle("small", fontSize=8.5, leading=13, textColor=MUTED)
S_NOTE = mkstyle("note", fontSize=9.5, leading=14, textColor=MUTED)
S_CELL = mkstyle("cell", fontSize=9.5, leading=13.5, spaceAfter=0)
S_CENTER = mkstyle("center", fontSize=10.5, leading=16, alignment=TA_CENTER)


def P(text, style=S_BODY):
    return Paragraph(text, style)


def cover_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    canvas.setStrokeColor(INK)
    canvas.setLineWidth(2)
    canvas.rect(8 * mm, 8 * mm, PAGE_W - 16 * mm, PAGE_H - 16 * mm, stroke=1, fill=0)
    canvas.setFillColor(INK)
    canvas.setFont(FONT_NAME, 9)
    canvas.drawCentredString(PAGE_W / 2, 18 * mm, "港学荟 hkschool.guide - 数据可核实")
    canvas.restoreState()


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont(FONT_NAME, 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, 10 * mm, "港学荟 hkschool.guide - 内容仅供参考")
    canvas.drawRightString(PAGE_W - MARGIN, 10 * mm, "第 %d 页" % doc.page)
    canvas.restoreState()


def cover(title, sub, meta):
    el = []
    el.append(Spacer(1, 62))
    el.append(P("港 学 荟", S_COVER_KICK))
    el.append(Spacer(1, 30))
    el.append(P(title, S_COVER_TITLE))
    el.append(Spacer(1, 12))
    el.append(P(sub, S_COVER_SUB))
    el.append(Spacer(1, 46))
    for line in meta:
        el.append(P(line, S_COVER_META))
        el.append(Spacer(1, 8))
    el.append(PageBreak())
    return el


def T(data, widths):
    """表格：单元格用 Paragraph 自动换行，避免溢出"""
    rows = []
    for r in data:
        rows.append([Paragraph(str(c), S_CELL) if c != "" else "" for c in r])
    t = Table(rows, colWidths=[w * mm for w in widths], hAlign="LEFT")
    style = [
        ("FONTNAME", (0, 0), (-1, -1), FONT_NAME),
        ("FONTSIZE", (0, 0), (-1, -1), 9.5),
        ("TEXTCOLOR", (0, 0), (-1, -1), INK),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("GRID", (0, 0), (-1, -1), 0.6, LINE),
        ("BACKGROUND", (0, 0), (-1, 0), YELLOW),
    ]
    t.setStyle(TableStyle(style))
    return t


def bullets(items, style=S_BODY):
    return [P("- " + x, style) for x in items]


def build_pack1():
    path = os.path.join(OUT, "2027-28-p1-application-survival-kit.pdf")
    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=MARGIN, rightMargin=MARGIN,
                            topMargin=MARGIN, bottomMargin=16 * mm,
                            title="2027/28 小一填表急救包 | 港学荟",
                            author="港学荟 hkschool.guide")
    el = cover("2027/28 小一填表急救包",
               "自行分配 + 统一派位，一包讲清",
               ["时间表 | 计分表 | 交表前自查清单 | 志愿表模板 | 叩门信模板",
                "数据依据：教育局 2027 年度小一入学官方文件"])

    # 一、官方时间表
    el.append(P("一、2027/28 官方时间表（收藏这张就够）", S_H1))
    el.append(P("日期出自教育局《申请二〇二七年九月小一入学》资料单张（2026 年 8 月出版）。错过一项就是一年。", S_BODY))
    el.append(T([
        ["阶段", "日期", "要做什么"],
        ["自行分配 - 索取申请表", "09-01 至 09-25", "幼稚园 / 民政谘询中心 / 教育局区域教育服务处"],
        ["自行分配 - 电子递交", "09-17 至 09-25", "小一入学电子平台 epoa.edb.gov.hk（截止当晚 23:59）"],
        ["自行分配 - 纸本递交", "09-21 至 09-25", "直接交回申请学校（学校办公时间内）"],
        ["自行分配 - 放榜", "11-23", "上午 10 时起，电子平台查阅结果"],
        ["自行分配 - 注册", "11-25 至 11-26", "获录取儿童到校注册，逾期视为放弃"],
        ["统一派位 - 填表", "01-18 至 01-24", "电子平台递交《选择学校表格》；01-23 至 01-24 亦可到统一派位中心"],
        ["统一派位 - 放榜", "06-02 至 06-03", "06-02 上午 10 时起电子平台查阅；邮递方式派发"],
        ["叩门窗口", "06 至 07 月", "派位不理想，直接向心仪学校申请剩余学额"],
    ], [38, 34, 98]))
    el.append(Spacer(1, 6))
    el.append(P("注意：自行分配只能申请一间官津小学，多报全部作废；未获派位会自动进入统一派位，无需重新申请。", S_NOTE))
    el.append(Spacer(1, 8))
    el.append(P("◆ 内行提示 1：获自行分配录取后，未在 11-25 至 11-26 到校注册，会被视为放弃学位（官方明文）。", S_NOTE))
    el.append(P("◆ 内行提示 2：电子平台递交截止为 9-25 当晚 23:59；只申请统一派位的家庭，在 1-22 前向教育局递交即可。", S_NOTE))
    el.append(PageBreak())

    # 二、计分表
    el.append(P("二、乙类计分表（官方 2027/28 计分办法准则）", S_H1))
    el.append(P("自行分配分甲类（兄姊在读 / 父母任职，必收）与乙类（计分）。乙类关系项与办学团体项各只可拣选一项，最高 35 分。", S_BODY))
    el.append(T([
        ["关系项（5 项只可选一项，最高 20 分）", "分数"],
        ["父 / 母全职在与该小学同一校址的幼稚园或中学部工作", "20"],
        ["兄 / 姊在与该小学同一校址的中学部就读", "20"],
        ["父 / 母为该小学的校董", "20"],
        ["父 / 母或兄 / 姊为该小学的毕业生", "10"],
        ["首名出生子女（家庭中最年长的孩子）", "5"],
    ], [128, 22]))
    el.append(Spacer(1, 6))
    el.append(T([
        ["办学团体项（2 项只可选一项，最高 5 分）", "分数"],
        ["与该校办学团体有相同宗教信仰", "5"],
        ["父 / 母为该小学主办社团的成员", "5"],
    ], [128, 22]))
    el.append(Spacer(1, 6))
    el.append(P("适龄儿童（翌年 9 月年满 5 岁 8 个月至 7 岁）：固定 +10 分，即乙类合计最高 20 + 5 + 10 = 35 分。", S_BODY))
    el.append(Spacer(1, 8))
    el.append(P("分数段解读：", S_H2))
    el += bullets([
        "30-35 分：底牌很硬，一般学校机会很高；顶级名校同分仍要抽签。",
        "25 分：校友 / 强关系 + 宗教 + 适龄的典型组合，一般学校机会不错。",
        "20 分：新来港家庭最常见组合（宗教 + 首名 + 适龄），热门学校要靠抽签。",
        "15 分：底牌偏弱，自行阶段机会有限，重点放统一派位。",
        "10 分：只有适龄分，全力准备统一派位 + 叩门预案。",
    ])
    el.append(Spacer(1, 4))
    el.append(P("记住：同分要抽签，分数只是入场券，不是录取保证。", S_NOTE))
    el.append(Spacer(1, 8))
    el.append(P("◆ 内行提示 3：官津小学自行分配阶段不可进行任何形式的笔试或面试（官方明文）——不需要为「自行分配面试」付费。", S_NOTE))
    el.append(P("◆ 内行提示 4：首名出生子女只需在申请表声明，无需法定声明；若家中长子女已入读特殊学校，下一个申请官津小学的孩子仍可获 5 分（先到学位分配组取得证明）。", S_NOTE))
    el.append(PageBreak())

    # 三、自查清单
    el.append(P("志愿金字塔：给整张表铺安全垫", S_H1))
    el.append(P("统一派位按志愿顺序 + 随机编号派位：先处理甲部，再按乙部志愿顺序逐一分派。志愿顺序排错，可能一路滑到很后的学校。", S_BODY))
    el.append(T([
        ["档位", "怎么判断", "志愿表角色"],
        ["冲刺", "第一志愿申请远超学额，只有小概率命中", "放 1-2 间，接受落空"],
        ["匹配", "供需大致相当，命中率中等", "中段主力，占大头"],
        ["保底", "学额相对充裕、派到也满意", "至少 2 间，整张表的安全垫"],
    ], [30, 70, 50]))
    el.append(Spacer(1, 6))
    el.append(P("为什么「乙二宜守不宜攻」：热门学校学额大多在乙一就用尽，乙二仍填名校，很可能一路落空到最后才被派位，徒增叩门压力。（升学专家观点，综合自 SchoolHub 2026 填表攻略）", S_BODY))
    el.append(Spacer(1, 6))
    el.append(P("常见错误：", S_H2))
    el += bullets([
        "乙部全填名校：学额在乙一用尽，等于志愿表后半段作废",
        "只填一两间：空位不用，等于放弃选择权",
        "同一间学校填两次：重复不会提高命中率，只浪费志愿",
        "没有保底：派位结果只能被动接受",
    ])
    el.append(PageBreak())

    el.append(P("三、交表前 5 条自查清单", S_H1))
    for i, item in enumerate([
        "已对照官方计分表算过分（用上一页的分数段核对）",
        "已确认所属校网（以住址证明为准，租住同样适用）",
        "关键日期已写入日历（09-17 至 09-25、11-23、01-18 至 01-24）",
        "志愿表有明确梯度：冲刺 / 匹配 / 保底，至少 1 间保底校",
        "叩门材料已备齐（出生证明、住址证明、成绩、奖项、自荐信）",
    ]):
        el.append(P("[ ]  %d. %s" % (i + 1, item), S_BODY))
        el.append(Spacer(1, 8))
    el.append(Spacer(1, 12))
    el.append(P("填表 3 个不要：", S_H2))
    el += bullets([
        "不要多报自行分配（只能 1 间，多报全作废）",
        "不要乙部全填名校（全名校 = 自杀式填表，乙二宜守不宜攻）",
        "不要用虚假住址（申请作废、学位取消，涉虚假文书可被检控）",
    ])
    el.append(Spacer(1, 10))
    el.append(P("配套免费工具：小一派位自查（计分器 + 清单）- hkschool.guide/tools/p1-self-check", S_NOTE))
    el.append(Spacer(1, 8))
    el.append(P("◆ 内行提示 5：住址证明有红线 - 银行信件、法庭传票、税单常被视为「通讯地址」，教育局不接受；建议用已盖章租约、差饷单、水电网账单。无法提供可接受证明时，可致电学位分配组 2832 7700 查询。", S_NOTE))
    el.append(PageBreak())

    # 四、志愿表模板
    el.append(P("四、志愿表模板（可打印填写）", S_H1))
    el.append(P("甲部：不受校网限制，全港任选，最多 3 间，建议填满。", S_H2))
    rows_a = [["甲部志愿", "学校名称", "档位（冲刺/匹配/保底）"]]
    for i in range(3):
        rows_a.append(["甲部第 %d" % (i + 1), "", ""])
    el.append(T(rows_a, [30, 88, 52]))
    el.append(Spacer(1, 12))
    el.append(P("乙部：所属校网内，最多 30 个志愿，建议填满、每间只填一次。", S_H2))
    rows_b = [["乙部志愿", "学校名称", "档位（冲刺/匹配/保底）"]]
    for i in range(14):
        rows_b.append(["乙部第 %d" % (i + 1), "", ""])
    el.append(T(rows_b, [30, 88, 52]))
    el.append(P("（乙部第 15-30 行见下页）", S_SMALL))
    el.append(PageBreak())
    rows_b2 = [["乙部志愿", "学校名称", "档位（冲刺/匹配/保底）"]]
    for i in range(14, 30):
        rows_b2.append(["乙部第 %d" % (i + 1), "", ""])
    el.append(P("乙部志愿（续）第 15-30 行", S_H2))
    el.append(T(rows_b2, [30, 88, 52]))
    el.append(Spacer(1, 8))
    el.append(P("志愿结构提示：冲刺 1-2 间 / 匹配主力 / 保底至少 2 间；想检查整张表有没有硬伤，可用志愿结构模拟器 - hkschool.guide/tools/p1-simulator", S_NOTE))
    el.append(Spacer(1, 8))
    el.append(P("◆ 内行提示 6：41 网首志愿命中率约 55% 全港最低，但首三志愿获派率 79.6% 全港第三（本站根据教育局派位数据整理）——「名网」不等于「稳进」，志愿梯度比校网名气更重要。", S_NOTE))
    el.append(P("◆ 内行提示 7：名册中部分学校在统一派位阶段会供其他校网选择（暂定统一派位学额），小校网家长别只盯着本网名单。", S_NOTE))
    el.append(PageBreak())

    # 五、叩门信模板
    el.append(P("四大名校网速查（官方名册数据）", S_H1))
    el.append(P("以下为代表学校（类别 / 学额来自教育局 2027/28 名册），完整 433 校清单见 hkschool.guide/tools/p1-school-net。", S_NOTE))
    el.append(P("11 网 - 中西区（共 16 所）", S_H2))
    el.append(T([
        ["学校", "类别", "学额"], ["聖嘉祿學校", "资助", "25"], ["聖士提反女子中學附屬小學", "资助", "50"],
        ["李陞小學", "官立", "25"], ["天主教總堂區學校", "资助", "38"], ["香港潮商學校", "资助", "50"],
        ["英皇書院同學會小學", "资助", "25"], ["聖公會基恩小學", "资助", "38"], ["聖公會呂明才紀念小學", "资助", "50"],
    ], [78, 28, 20]))
    el.append(P("12 网 - 湾仔（共 14 所）", S_H2))
    el.append(T([
        ["学校", "类别", "学额"], ["聖保祿天主教小學", "资助", "50"], ["嘉諾撒聖方濟各學校", "资助", "50"],
        ["聖若瑟小學", "资助", "63"], ["軒尼詩道官立小學", "官立", "63"], ["官立嘉道理爵士小學", "官立", "50"],
        ["東華三院李賜豪小學", "资助", "38"], ["保良局金銀業貿易場張凝文學校", "资助", "38"], ["佛教黃焯菴小學", "资助", "25"],
    ], [78, 28, 20]))
    el.append(PageBreak())
    el.append(P("34 网 - 何文田/土瓜灣/啟德（共 18 所）", S_H2))
    el.append(T([
        ["学校", "类别", "学额"], ["保良局何壽南小學", "资助", "63"], ["九龍靈光小學", "资助", "25"],
        ["農圃道官立小學", "官立", "50"], ["馬頭涌官立小學", "官立", "63"], ["聖公會聖十架小學", "资助", "63"],
        ["浸信會孔憲紹天虹小學", "资助", "63"], ["陳瑞祺（喇沙）小學", "资助", "63"], ["聖公會牧愛小學", "资助", "25"],
    ], [78, 28, 20]))
    el.append(P("41 网 - 九龍城/九龍塘（共 10 所）", S_H2))
    el.append(T([
        ["学校", "类别", "学额"], ["喇沙小學", "资助", "90"], ["瑪利諾修院學校（小學部）", "资助", "75"],
        ["拔萃小學", "资助", "30"], ["嘉諾撒聖家學校", "资助", "45"], ["嘉諾撒聖家學校（九龍塘）", "资助", "60"],
        ["九龍塘官立小學", "官立", "50"], ["華德學校", "资助", "50"], ["耀山學校", "资助", "13"],
    ], [78, 28, 20]))
    el.append(Spacer(1, 6))
    el.append(P("提醒：名网不等于稳进。41 网首志愿命中率约 55% 全港最低，但首三志愿获派率 79.6% 全港第三（本站根据教育局派位数据整理）。", S_NOTE))
    el.append(PageBreak())

    el.append(P("五、叩门信模板（复制改名字就能用）", S_H1))
    el.append(P("标题：叩门申请信 - [学生姓名] [年级] 学位申请", S_BODY))
    el.append(Spacer(1, 8))
    letter = [
        "尊敬的[校长姓名]校长：",
        "本人[家长姓名]，现居[所属校网/地址]。小儿/小女[学生姓名]，[出生年份]年出生，现就读[学校名称][年级]。",
        "2027/28 学年[小一/小X]派位结果已于[日期]公布，获派[派位结果]。我们十分仰慕贵校[办学理念/特色]，希望申请贵校[年级]学位。",
        "孩子[性格/兴趣/特长]，曾在[竞赛/活动]中获[奖项]。本人承诺遵守学校收生程序，所需材料（出生证明、住址证明、成绩表等）已备齐。",
        "恳请贵校给予考虑，期待您的回复。",
        "此致",
        "[家长姓名]　[联系电话]　[日期]",
    ]
    for line in letter:
        el.append(P(line, S_BODY))
        el.append(Spacer(1, 6))
    el.append(Spacer(1, 8))
    el.append(P("叩门 3 个要点：", S_H2))
    el += bullets([
        "放榜后立即行动（6 月初），别等通知。",
        "材料一次备齐：出生证明、住址证明、成绩表、奖项、自荐信。",
        "可以同时叩多间，语气诚恳、简明，不写空洞赞美。",
    ])
    el.append(Spacer(1, 6))
    el.append(P("◆ 内行提示 8：叩门不是教育局统一流程，由学校自主、无统一表格——所以「放榜后立即行动 + 材料齐」比模板更重要；可同时叩多间。", S_NOTE))
    el.append(PageBreak())

    # 六、来源与免责
    el.append(P("叩门 72 小时行动表", S_H1))
    el.append(T([
        ["时间", "做什么"],
        ["D0 放榜日", "查结果 - 确认派位不理想 - 立即列叩门名单（建议 3 间）"],
        ["D1", "电话 / 邮件问目标校叩门安排 - 备齐材料（出生证明 / 住址证明 / 成绩 / 奖项 / 自荐信）"],
        ["D2", "递交叩门申请 + 求位信（可同时叩多间）"],
        ["D3 起", "跟进 + 面试准备（如有）"],
    ], [26, 124]))
    el.append(Spacer(1, 10))
    el.append(P("叩门信完整范文（示例，请按实际情况修改）", S_H2))
    letter_full = [
        "尊敬的陈校长：",
        "您好。本人张伟明，现居九龙塘（41 校网）。小儿张家乐，2016 年出生，现就读启思幼稚园 K3。",
        "2027/28 学年小一派位结果已于 6 月 2 日公布，获派与期望不符的学校。我们一直仰慕贵校「全人教育、重视品格」的办学理念，孩子性格开朗、喜爱阅读，曾在校内故事比赛获一等奖，希望申请贵校小一学位。",
        "我们理解并遵守贵校收生程序，出生证明、住址证明、成绩表及获奖证书等材料已备齐，随时可以提交。恳请贵校给予考虑，期待您的回复。",
        "此致",
        "张伟明 敬上　电话：9XXX XXXX　2027 年 6 月 2 日",
    ]
    for line in letter_full:
        el.append(P(line, S_BODY))
        el.append(Spacer(1, 5))
    el.append(PageBreak())

    el.append(P("六、数据来源与使用说明", S_H1))
    el.append(P("本资料包内容依据以下官方文件整理（本站 2026-09 核实）：", S_BODY))
    el += bullets([
        "教育局《申请二〇二七年九月小一入学》资料单张（2026 年 8 月出版）",
        "教育局《二〇二七年度小一入学申请表填表须知》附录二",
        "教育局《2027 年度小一入学 · 各小一学校网小学名册》",
        "教育局小一入学统筹办法：edb.gov.hk",
    ])
    el.append(Spacer(1, 10))
    el.append(P("免责声明：本资料仅供个人参考，不构成入学建议，不预测录取结果。正式交表请以教育局及各校公布为准。", S_NOTE))
    el.append(Spacer(1, 10))
    el.append(P("更新说明：2026-09 版，适用于 2027/28 学年；每年 9 月官方数据公布后更新。", S_NOTE))
    el.append(Spacer(1, 10))
    el.append(PageBreak())
    el.append(P("高频 FAQ（答案出自官方 FAQ 或本站已核实内容）", S_H1))
    faq_items = [
        ("Q1：计分 20 分有没有机会进名校？", "A：同分要抽签。热门学校 20 分撞 20 分很常见，机会取决于学额与竞争，别把宝全押在自行阶段。"),
        ("Q2：租房住，校网怎么算？", "A：以申请时的真实居住地址为准，需提交住址证明（已盖章租约、差饷单、水电网账单等）。"),
        ("Q3：自行分配没中，影响统一派位吗？", "A：不影响。未获自行分配会自动进入统一派位，无需重新申请。"),
        ("Q4：直资学校能同时申请吗？", "A：可以，直资自主招生、不限校网；但接受直资小一学位后，不能再经统筹办法获派官津学位。"),
        ("Q5：校网每年会变吗？", "A：学校名单每年由教育局公布，校网划分基本稳定但会微调，以当年官方名册为准。"),
        ("Q6：派位结果不理想怎么办？", "A：两条路：叩门（直接向心仪学校申请剩余学额）或入读后再申请转校。"),
        ("Q7：新来港儿童可以参加派位吗？", "A：符合资格（本港居民、适龄、未入读小学）即可；错过申请时间可联系教育局区域教育服务处。"),
        ("Q8：住址证明不齐怎么办？", "A：可致电学位分配组 2832 7700 查询，切勿用银行信、税单等通讯地址类证明。"),
    ]
    for q, a in faq_items:
        el.append(P(q, S_H2))
        el.append(P(a, S_BODY))
        el.append(Spacer(1, 4))
    el.append(PageBreak())
    el.append(P("家长年度行动日历（2026-09 至 2027-08）", S_H1))
    el.append(T([
        ["月份", "关键动作"],
        ["2026-09", "索取申请表 - 9/17-25 递交自行分配 - 电子平台登记智方便+"],
        ["2026-10", "核对材料 - 准备叩门预案"],
        ["2026-11", "11/23 放榜 - 11/25-26 注册（逾期视为放弃）"],
        ["2026-12", "统一派位选校准备 - 列志愿草稿"],
        ["2027-01", "1/18-24 递交《选择学校表格》"],
        ["2027-02-05", "整理叩门材料 - 关注直资/私立插班公告"],
        ["2027-06", "6/2-3 放榜 - 叩门窗口（按 72 小时行动表执行）"],
        ["2027-07-08", "转校 / 插班跟进 - 新学期准备"],
    ], [26, 124]))
    el.append(PageBreak())

    el.append(P("附录：内行才知道的 12 个细节（每条附出处，可核实）", S_H1))
    facts = [
    "1. 自行分配阶段，官津学校不可进行任何形式的笔试或面试。（出处：教育局 FAQ 第 12 问）",
    "2. 获派自行分配学位后，未按期注册即视为放弃学位。（出处：教育局《小一入学资料单张》）",
    "3. 首名出生子女只需在申请表声明，无需法定声明；长子女已入读特殊学校者，次子仍可获 5 分。（出处：《填表须知》註五）",
    "4. 住址证明：银行信件、法庭传票、税单常被视为通讯地址而不被接受。（出处：《填表须知》附件一）",
    "5. 1-18 仍未收到选校通知书，应尽快致电教育局学位分配组。（出处：《小一入学资料单张》）",
    "6. 已接受直资小一学位者，不能再经统筹办法获派官津小一学位。（出处：教育局 2026-08-28 新闻公布）",
    "7. 新来港儿童可参加教育局免费全日制「启动课程」，适应中文 / 英文学习环境。（出处：教育局新来港儿童教育及支援服务）",
    "8. 计划跨境到港上学的儿童，毋须填写住址所属校网编号。（出处：《填表须知》）",
    "9. 41 网首志愿命中率约 55% 全港最低，首三志愿获派率 79.6% 全港第三。（出处：本站根据教育局派位数据整理）",
    "10. 乙类计分上限是 35 分（20 + 5 + 10），不是网上流传的 40 分。（出处：教育局 2027/28 计分办法准则）",
    "11. 实施小班教学的学校，基本每班派位名额为 25 人。（出处：教育局校网名册备注 S）",
    "12. 若学校最终未开班，教育局会为已录取学生另行安排学位。（出处：教育局校网名册首页注意事项）",
]
    for f in facts:
        el.append(P(f, S_BODY))
        el.append(Spacer(1, 5))
    el.append(Spacer(1, 8))
    el.append(P("以上每一条都可以到教育局官网核对原文（edb.gov.hk - 小一入学统筹办法）。", S_NOTE))
    el.append(PageBreak())
    el.append(P("港学荟 - 帮助内地来港家庭解决香港升学信息不对称。", S_CENTER))

    doc.build(el, onFirstPage=cover_bg, onLaterPages=footer)
    return path


def build_pack2():
    path = os.path.join(OUT, "ttps-insertion-roadmap.pdf")
    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=MARGIN, rightMargin=MARGIN,
                            topMargin=MARGIN, bottomMargin=16 * mm,
                            title="高才通子女香港插班路线图 | 港学荟",
                            author="港学荟 hkschool.guide")
    el = cover("高才通子女香港插班路线图",
               "从身份确认到成功插班，一张图走完",
               ["身份 | 校网 | 插班窗口 | 直资/私立通道 | 材料清单",
                "面向高才通 / 优才 / 专才家庭 · 2026 版"])

    # 一、身份与资格
    el.append(P("一、先确认三件事（身份是地基）", S_H1))
    el += bullets([
        "有效在港居留身份：受养人子女须持有效签证/居留许可，这是入读公营学校的硬前提。",
        "年龄与年级：插班没有唯一节点，全年有空位；但年级越高越难（详见第三节窗口期）。",
        "小一派位 vs 插班：小一走官方派位（流程固定）；插班是直接向学校申请（自主招生）。",
    ])
    el.append(Spacer(1, 8))
    el.append(P("◆ 内行提示 1：新来港儿童可参加教育局免费全日制「启动课程」，适应中文 / 英文学习环境（出处：教育局新来港儿童教育及支援服务）。", S_NOTE))
    el.append(Spacer(1, 8))
    el.append(T([
        ["对比", "小一派位", "插班"],
        ["流程", "教育局统一统筹（自行分配 + 统一派位）", "直接向目标学校申请"],
        ["时间", "每年 9 月 / 1 月固定", "全年可申请，4-6 月与开学前是高峰"],
        ["范围", "官立 / 资助小学", "官津 + 直资 + 私立 + 国际均可"],
        ["资格", "适龄（5 岁 8 个月起）且从未入读", "视学校空缺，通常要求在读证明"],
    ], [26, 72, 72]))
    el.append(PageBreak())

    # 二、校网与选校
    el.append(P("二、校网与选校（住哪决定能报哪些官津）", S_H1))
    el += bullets([
        "全港小学派位分 36 个校网，统一派位乙部按居住地址所属校网分配。",
        "四大名校网：11 中西区、12 湾仔、34 何文田/土瓜湾/启德、41 九龙城/九龙塘。",
        "住址证明：已盖章租约、差饷单、水电网账单等；租住同样适用。",
        "直资 / 私立 / 国际不限校网，全港申请，适合作为插班主力目标。",
    ])
    el.append(Spacer(1, 8))
    el.append(T([
        ["类型", "学费", "收生方式", "适合"],
        ["官立 / 资助", "免费", "派位 + 插班申请", "预算有限、重视稳定性"],
        ["直资", "约 0.7 万-7 万/年", "自主招生 + 面试", "内地插班主力，两文三语"],
        ["私立", "约 2 万-15 万/年", "自主招生 + 面试", "重视课程灵活度"],
        ["国际", "约 10 万-20 万/年", "自主招生 + 评估", "计划出国、走 IB/A-Level"],
    ], [28, 40, 46, 56]))
    el.append(Spacer(1, 8))
    el.append(P("◆ 内行提示 2：计划跨境到港上学的儿童，毋须填写住址所属校网编号（出处：《填表须知》）；住址证明注意：银行信件、税单常不被接受。", S_NOTE))
    el.append(PageBreak())

    # 三、插班窗口
    el.append(P("三、插班窗口时间线（错过这个会后悔）", S_H1))
    el += bullets([
        "插班没有唯一节点，全年有空位，但有两个规律：4-6 月春季插班、开学前秋季插班。",
        "呈分试红线：小五下学期起呈分试成绩计入升中，最佳插班时机是四年级或之前。",
        "小五上学期还有机会；小五下学期之后基本错过呈分试，插班意义大减。",
        "名校插班录取率被媒体报道约 2%（非官方统计，趋势属实）。",
    ])
    el.append(Spacer(1, 8))
    el.append(T([
        ["月份", "升学季动作"],
        ["09-10 月", "新学年开学；部分学校公布春季插班名额"],
        ["11-12 月", "递交春季插班申请；准备笔试面试"],
        ["01-03 月", "春季插班笔试 / 面试 / 录取"],
        ["04-06 月", "秋季插班申请高峰；小一统一派位放榜 + 叩门"],
        ["07-08 月", "秋季插班录取；暑假预备开学"],
    ], [40, 130]))
    el.append(Spacer(1, 8))
    el.append(P("◆ 内行提示 3：错过申请时间的新来港儿童，可联系教育局区域教育服务处申请「学位安排支援服务」（出处：教育局新来港儿童入学安排）。", S_NOTE))
    el.append(PageBreak())

    # 四、直资 = 内地插班主力赛道
    el.append(P("四、为什么直资是内地插班主力赛道", S_H1))
    el += bullets([
        "两文三语（粤 / 普 / 英）教学，插班生适应成本低。",
        "自主招生，不受校网限制，全港申请，不用等派位。",
        "面试为主，不只看笔试；准备方向明确（英语 + 表达能力）。",
        "学费相对国际学校低，内地中产家庭负担得起。",
    ])
    el.append(Spacer(1, 8))
    el.append(P("行动建议：把目标校分成两列 - 官津（校网内）+ 直资/私立（全港），同时准备，互为对冲。", S_NOTE))
    el.append(Spacer(1, 8))
    el.append(P("◆ 内行提示 4：直资可同时向多间申请（不占官津志愿），但一旦接受直资小一学位，不能再经统筹办法获派官津小一学位（出处：教育局 2026-08-28 新闻公布）。", S_NOTE))
    el.append(PageBreak())

    # 五、材料与行动清单
    el.append(P("直资小学速查（全港 22 所）", S_H1))
    el.append(P("直资自主招生、不限校网，是内地插班主力。名单来自本站学校数据库；学费为参考值，以学校公布为准，每年或有调整。", S_NOTE))
    el.append(T([
        ["学校", "地区", "学费参考"],
        ["保良局林文燦英文小學", "九龍城", "$14,140/年"],
        ["拔萃男書院", "九龍城", "约 $5.5万/年"],
        ["聖保羅男女中學附屬小學", "南區", "约 $8.2万/年"],
        ["聖保羅書院小學", "南區", "约 $3.2万/年"],
        ["基督教香港信義會宏信書院", "元朗", "$77,390/年"],
        ["和富慈善基金李宗德小學", "元朗", "$16,800/年"],
        ["培僑書院", "沙田", "$25,980/年"],
        ["香港浸會大學附屬學校王錦輝中小學", "沙田", "$40,960/年"],
        ["保良局陳守仁小學", "油尖旺", "直资收费（见官网）"],
        ["優才（楊殷有娣）書院", "油尖旺/西貢", "$34,100/年"],
        ["英華小學", "深水埗", "约 $1.9万/年"],
        ["聖瑪加利男女英文中小學", "深水埗", "$53,570/年"],
    ], [62, 30, 58]))
    el.append(PageBreak())
    el.append(P("直资小学速查（续）", S_H1))
    el.append(T([
        ["学校", "地区", "学费参考"],
        ["嶺南大學香港同學會小學", "深水埗", "$17,380/年"],
        ["保良局香港道教聯合會圓玄小學", "屯門", "$13,150/年"],
        ["港大同學會小學", "東區", "直资收费（见官网）"],
        ["漢華中學（小學部）", "東區", "见官网"],
        ["地利亞（閩僑）英文小學", "葵青", "$7,370/年"],
        ["播道書院", "西貢", "$21,800/年"],
        ["保良局陸慶濤小學", "西貢", "$13,000/年"],
        ["香港華人基督教聯會真道書院", "西貢", "$28,600/年"],
        ["福建中學附屬學校", "觀塘", "$35,750/年"],
    ], [62, 30, 58]))
    el.append(Spacer(1, 8))
    el.append(P("提醒：直资可同时申请多间，但接受一间直资小一学位后，不能再经统筹办法获派官津小一学位。完整学费与收生资料请以各校官网公布为准。", S_NOTE))
    el.append(PageBreak())

    el.append(P("五、材料清单 + 行动清单", S_H1))
    el.append(P("材料清单（提前备齐，随申随交）：", S_H2))
    el += bullets([
        "出生证明（翻译公证视学校要求）",
        "有效身份 / 居留证明（护照、签证、入境标签）",
        "住址证明（租约、差饷单、水电账单等）",
        "成绩表（近两年，部分学校要求翻译）",
        "获奖证明、推荐信（如有）",
        "自荐信 / 家长陈述（视学校要求）",
    ])
    el.append(Spacer(1, 10))
    el.append(P("行动清单（按顺序做）：", S_H2))
    el += bullets([
        "确认受养人身份与居留状态",
        "定校网（官津候选）+ 列直资 / 私立目标校",
        "查目标校官网收生公告（插班时间 / 材料）",
        "备齐材料 + 翻译公证",
        "递交申请 + 准备笔试面试（英语为主）",
        "同步准备派位志愿（官津对冲）",
    ])
    el.append(PageBreak())

    # 六、来源与工具
    el.append(P("插班全流程 8 步", S_H1))
    el.append(T([
        ["步骤", "做什么"],
        ["1", "确认受养人身份与居留状态"],
        ["2", "定目标校：官津（校网内）+ 直资/私立（全港）"],
        ["3", "查目标校官网收生公告：插班时间、名额、材料"],
        ["4", "备齐材料 + 翻译公证（成绩表、出生证明等）"],
        ["5", "递交申请（留意截止日期）"],
        ["6", "笔试（部分学校设笔试，以英语/中英数为主）"],
        ["7", "面试（学生 + 家长，直资/私立常见）"],
        ["8", "录取注册（确认前保留原校学位）"],
    ], [18, 132]))
    el.append(Spacer(1, 10))
    el.append(P("面试准备清单（一般方向，视学校而定）", S_H2))
    el += bullets([
        "英语听说为主：内地孩子通常需要优先补英语（本地调研显示英语差距约 3 个年级）",
        "自我介绍：孩子能介绍自己、家庭与兴趣",
        "自理与表达：孩子能独立完成简单任务并表达想法",
        "家长问卷 / 面谈：了解学校理念，想清楚为什么选这间",
        "提前问清：笔试范围、面试语言、结果公布时间",
    ])
    el.append(PageBreak())
    el.append(P("新来港家庭官方支援资源", S_H1))
    el.append(T([
        ["资源", "是什么", "哪里申请"],
        ["全日制启动课程（免费）", "帮助新来港儿童适应中文 / 英文学习环境", "教育局新来港儿童教育及支援服务"],
        ["学位安排支援服务", "错过申请时间 / 需学位支援的儿童", "联系教育局区域教育服务处"],
        ["适应课程", "短期中文 / 英文适应课程", "教育局新来港儿童教育及支援服务"],
        ["小一入学电子平台", "全程网上递交与查结果", "epoa.edb.gov.hk（需智方便+）"],
        ["区域教育服务处", "入学与学位查询", "教育局各区域办事处"],
    ], [36, 60, 54]))
    el.append(Spacer(1, 10))
    el.append(P("高频 FAQ", S_H2))
    faq2 = [
        ("Q1：插班什么时候最好？", "A：四年级或之前最佳（呈分试前）；小五下学期之后基本错过呈分试，插班意义大减。"),
        ("Q2：插班要考试吗？", "A：视学校而定。直资/私立多设笔试面试；官津插班由学校自定安排。"),
        ("Q3：插班能同时申请多间吗？", "A：可以，各校独立申请；确认接受一间后，通知其他学校取消即可。"),
        ("Q4：没有香港身份能插班吗？", "A：受养人子女须持有效居留身份；跨境学童另有安排，建议先确认签证状态。"),
        ("Q5：插班学费大概多少？", "A：官津免费；直资约 0.7 万-7 万/年；私立约 2 万-15 万/年（以学校公布为准）。"),
        ("Q6：孩子英语跟不上怎么办？", "A：教育局提供免费启动课程 / 适应课程；部分直资设有语言支援，申请时可主动询问。"),
    ]
    for q, a in faq2:
        el.append(P(q, S_H2))
        el.append(P(a, S_BODY))
        el.append(Spacer(1, 4))
    el.append(PageBreak())

    el.append(P("六、来源与使用说明", S_H1))
    el += bullets([
        "教育局《小一入学统筹办法》及 2027/28 官方文件",
        "入境处：受养人签证 / 居留安排",
        "各校官网插班公告（以学校公布为准）",
        "媒体报道：高才通家庭插班趋势（非官方统计口径）",
    ])
    el.append(Spacer(1, 8))
    el.append(P("免责声明：本资料仅供个人参考，不构成入学建议；录取概率无法预测，请以学校官方信息为准。", S_NOTE))
    el.append(Spacer(1, 10))
    el.append(P("配套免费工具：", S_H2))
    el += bullets([
        "36 校网数据库：hkschool.guide/tools/p1-school-net",
        "小一派位自查（计分器 + 清单）：hkschool.guide/tools/p1-self-check",
        "志愿结构模拟器：hkschool.guide/tools/p1-simulator",
    ])
    el.append(Spacer(1, 10))
    el.append(PageBreak())
    el.append(P("附录：新来港家庭容易忽略的 5 个官方渠道（附出处）", S_H1))
    facts2 = [
    "1. 全日制「启动课程」（免费）：为新来港儿童提供的中文 / 英文适应课程，可联系教育局区域教育服务处了解。（出处：教育局新来港儿童教育及支援服务）",
    "2. 「学位安排支援服务」：错过申请时间或需学位支援的新来港儿童，可联系教育局区域教育服务处。（出处：教育局新来港儿童入学安排）",
    "3. 小一入学电子平台 + 智方便+：2027 学年全面电子化，可全程网上递交与查结果，提前登记更省心。（出处：教育局小一入学统筹办法）",
    "4. 直资可同时申请多间，但接受直资小一学位后不能再经统筹获派官津学位。（出处：教育局 2026-08-28 新闻公布）",
    "5. 幼稚园阶段提前布局：参加幼稚园教育计划的本地非牟利幼稚园半日制学费全免；2026/27 就学开支津贴最高约 $4,650 / 年（本站已核实）。",
]
    for f in facts2:
        el.append(P(f, S_BODY))
        el.append(Spacer(1, 5))
    el.append(Spacer(1, 8))
    el.append(P("另：本站调研显示，内地来港孩子英语水平通常比内地同龄高约 3 个年级，插班前建议优先补英语。（仅供参考）", S_NOTE))
    el.append(PageBreak())
    el.append(P("港学荟 - 帮助内地来港家庭解决香港升学信息不对称。", S_CENTER))

    doc.build(el, onFirstPage=cover_bg, onLaterPages=footer)
    return path


if __name__ == "__main__":
    p1 = build_pack1()
    p2 = build_pack2()
    print("OK:", p1)
    print("OK:", p2)



