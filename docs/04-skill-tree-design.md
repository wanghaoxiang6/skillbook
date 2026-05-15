# Skill Tree Design

Skill Tree 是一本 SkillBook 的目录。第一版使用 YAML 表达分类和 Skill id。

Skill Index 是摘要表，包含 id、名称、分类、路径、摘要、关键词和状态。路由时优先读 Skill Index，只有生成 proposal 或 review 时才读取具体 Skill 包。

Skill 包结构：

```txt
skill.yaml
SKILL.md
examples.md
evals.md
sources.md
```
