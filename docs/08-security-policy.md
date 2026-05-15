# Security Policy

- 默认不执行外部脚本
- 默认不安装外部依赖
- 不读取 `.env`
- 不读取密钥
- 不执行 `curl | bash`
- 不把外部 repo 的脚本写入自动化流程
- 外部资料只能先进入 `sources/raw` 和 `source_card`
- 所有正式 Skill 更新必须先生成 proposal
- 高风险 proposal 必须人工确认
- 如果未来支持 GitHub repo 分析，第一版只读 README、目录结构和用户提供的文件
- Library Scout 默认只搜索公开 GitHub 元数据和 README 相关信息
- Library Scout 默认不读取私有 GitHub，不需要 GitHub token，不克隆仓库，不执行第三方代码
- 用户本地项目分析只能读取 README、package、docs、src 顶层结构等低风险摘要
