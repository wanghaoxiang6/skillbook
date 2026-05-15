# Core Concepts

`memory/user_profile.md` 记录用户长期身份、长期目标、工作方式偏好和希望 AI 如何协助自己。

`memory/project_context.md` 记录当前项目画像，包括项目是什么、面向谁、当前阶段、技术栈、核心目标、限制和当前不做什么。

`memory/preferences.md` 记录稳定偏好，例如不要过度设计、一人开发优先、小步迭代、需要验收标准。

`memory/decisions.md` 记录用户已经确认过的重要决策，例如第一版先做 CLI、不做 Web UI、proposal 先于正式更新。

`memory/rejected_ideas.md` 记录被拒绝方向，让 AI 知道不想要什么。

`memory/current_focus.md` 记录用户当前阶段最重要的项目、产品方向和近期目标。

`memory/skill_gaps.md` 记录用户希望 AI 补足的能力短板，例如工程收敛、调试、增长、产品判断。

`memory/learning_goals.md` 记录用户希望自己或 AI 系统接下来学习、沉淀、进化的方向。

`memory/profile_history.md` 记录用户画像更新历史。只有用户确认后的 profile proposal 才能进入这里。

`memory/glossary.md` 记录项目专有词，如 SkillBook、需求之书、Intake Protocol、Update Proposal、Evolution Proposal、Skill Tree、Source Card。

`indexes/skill_tree.yaml` 是 Skill 的目录树，像一本书的目录。

`indexes/skill_index.yaml` 是 Skill 摘要索引。AI 先读这个，不要每次读完整 Skill。

`indexes/source_index.yaml` 记录外部资料来源、类型、状态、是否已吸收、吸收到哪里。

`indexes/vector_manifest.yaml` 是第一版占位文件，记录未来哪些内容适合向量化。

`sources/raw/` 存放用户投喂的原始资料。

`sources/cards/` 存放资料卡片 source_card。

`proposals/intake/` 存放外部资料入库建议 update_proposal。

`proposals/evolution/` 存放 Skill 使用后的进化建议 evolution_proposal。

`proposals/profile/` 存放用户画像、偏好、短板和当前重点的进化建议 profile_evolution_proposal。

`recommendations/libs/` 存放基于用户画像、当前目标和能力短板生成的开源库推荐。

`logs/usage/` 记录 Skill 使用日志。

`logs/failures/` 记录失败案例。

`logs/feedback/` 记录用户反馈。

`logs/corrections/` 记录用户纠正 AI 的地方。

`logs/repeated_requests/` 记录重复出现的需求模式。

`logs/user_feedback/` 记录对画像、Skill 和产品体验的显式反馈。

`skills/` 存放真正的 Skill 包。每个 Skill 包至少包含 `skill.yaml`、`SKILL.md`、`examples.md`、`evals.md`、`sources.md`。
