# Evolution Engine

Skill 应该在真实使用中进化。进化来源包括 usage logs、failure cards、feedback、用户明确纠正、重复问题、规则失效、新方法成功、可泛化模式。

满足以下任意条件，才生成 evolution_proposal：

1. 同类问题出现 >= 3 次
2. 用户连续纠正同一类问题 >= 2 次
3. 某个规则导致失败 >= 2 次
4. 某个新方法成功解决问题 >= 2 次
5. 出现明显可泛化模式
6. 用户明确说“以后记住 / 加进 Skill / 这个要写进规则”

原则：

- AI 可以自动发现进化机会
- AI 可以自动生成 evolution_proposal
- AI 不要自动合并正式 Skill
- 每次进化必须有证据
- 进化包括增加、删除、降级、拆分、合并
- 每次进化都要考虑 Skill 是否越来越长、越来越糊
