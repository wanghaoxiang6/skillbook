# Intake Protocol

当用户提供外部资料时，系统执行：

1. 识别资料类型
2. 读取当前项目画像
3. 读取用户需求之书
4. 读取 Skill 树索引
5. 生成 source_card
6. 判断相关性
7. 判断可执行性
8. 判断新颖度
9. 判断污染风险
10. 判断 Skill 退化风险
11. 匹配目标 Skill
12. 区分吸收类型
13. 找出不适合吸收的内容
14. 生成 update_proposal
15. 在用户确认前，不修改正式 Skill

原则：

- 用户不需要知道资料属于哪个 Skill
- 用户只负责提供资料和表达意图
- 系统负责路由、判断、提案
- 系统必须允许输出“不建议吸收”
- 系统不能默认所有资料都有价值
- 外部资料不能压过用户当前项目目标
- 用户本次明确指令 > 用户长期偏好 > 当前项目 context > 已确认 decisions > active Skill > 使用日志 > 外部资料 > AI 推断

防脑雾设计：

- 分层记忆，不要一锅炖
- 使用 `skill_index.yaml`，不要每次读取所有 Skill
- 使用 source_card，不要直接从长文生成 Skill
- 区分 FACT / PREFERENCE / RULE / PATTERN / CASE / EVAL / WARNING / DRAFT / REJECTED
- 保留 `rejected_ideas.md`
- 使用 context packer，只给 AI 当前任务需要的信息
