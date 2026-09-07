# 小一校网数据库（2027/28）— 数据来源与核对记录

> 最后更新：2026-09-07

## 数据资产

- `src/content/p1-nets.json` — 36 个校网 × 433 所官立及资助小学（权威名单）
- `src/content/nets.json` — 36 网涵盖范围（教育局《填表须知》附录二概览表全量版）
- `src/content/schools.json` — 669 所小学增加 `p1_2027` 标记，`school_net` 以名册为准修正（99 条）

## 官方来源

1. 名册（网上版，36 份单网 PDF，官方注明「以网上版为准」）：
   https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/index.html
   - `SchoolLists.pdf`（总册，印刷版）
   - `Net11.pdf … Net99.pdf`（每网一份，网上版）
2. 校网范围：《二〇二七年度小一入学申请表填表须知》附录二「2027 年 9 月小一学校网概览表」
   https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/index.html

## 编制时间

- 名册：2026 年 8 月编制（2027/28 学年）
- 只收录 2027/28 学年开办小一班级的**官立及资助**学校；直资/私立/英基及特殊学校不在此列

## 解析与验证流程

1. `pdftotext -layout` 提取总册与 36 份单网 PDF 文本
2. 按列解析：学校编号 / 中英校名 / 类别 / 资助 / 宗教 / 自行分配学额 / 地址 / 备注（S 小班、P 无障碍、U1 一条龙等）
3. 处理长校名折行（如「千禧小 + 學」）、名称与类别粘连
4. 交叉核对：
   - 总册 vs 网上版：433 所、编号集合与名称完全一致（0 差异）
   - 名册 vs schools.json：433 所全部匹配；`school_net` 不一致 99 条，已按名册修正
   - 非官津混入：0
5. 校网范围：概览表 vs 名册目录 36 网一致，采用概览表全量版

## 已知边界（如实标注）

- 统一派位阶段部分学校亦供其他校网选择（「暂定统一派位学额」），名册列的是**自行分配阶段所属校网**
- 个别学校多校区共用学校编号（如香港红十字会医院学校 14 个分部），仅名册内对应条目标记 `p1_2027=true`
- 名册每年 9 月更新：下一年度重新下载官方 PDF，重复上述流程

## 页面

- `/tools/p1-school-net` — 校网数据库（选网看名单）
- `/tools/p1-self-check` — 交表自查（计分器 + 清单 + 结果卡）
