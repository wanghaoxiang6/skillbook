export type SkillStatus = "draft" | "active" | "experimental" | "deprecated" | "archived";
export type SourceType = "article" | "repo" | "readme" | "transcript" | "case" | "doc" | "unknown";
export type IntakeDecision = "accept" | "partial_accept" | "reference_only" | "reject" | "needs_user_decision";
export type RiskLevel = "low" | "medium" | "high";
export type TargetAction =
  | "update_existing"
  | "create_new"
  | "add_example"
  | "add_eval"
  | "add_warning"
  | "add_reference";

export interface SkillMetrics {
  usage_count: number;
  success_count: number;
  failure_count: number;
  user_corrections: number;
  accepted_evolutions: number;
  rejected_evolutions: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  version: string;
  status: SkillStatus;
  purpose: string;
  target_users: string[];
  trigger_scenarios: string[];
  required_inputs: string[];
  process: string[];
  constraints: string[];
  outputs: string[];
  quality_checks: string[];
  sources: string[];
  metrics: SkillMetrics;
}

export interface SourceCard {
  id: string;
  title: string;
  source_type: SourceType;
  source_path_or_url: string;
  created_at: string;
  summary: string;
  problem_solved: string;
  core_methods: string[];
  reusable_patterns: string[];
  technical_stack: string[];
  thinking_patterns: string[];
  applicable_contexts: string[];
  non_applicable_contexts: string[];
  extractable_items: {
    rules: string[];
    examples: string[];
    evals: string[];
    warnings: string[];
    references: string[];
  };
  risk_notes: string[];
}

export interface UpdateProposal {
  id: string;
  source_card_id: string;
  created_at: string;
  project_understanding: string;
  decision: IntakeDecision;
  relevance_score: number;
  novelty_score: number;
  actionability_score: number;
  pollution_risk: RiskLevel;
  degradation_risk: RiskLevel;
  recommended_targets: Array<{
    skill_id: string;
    action: TargetAction;
    reason: string;
  }>;
  accepted_items: SourceCard["extractable_items"];
  rejected_items: Array<{
    item: string;
    reason: string;
  }>;
  conflicts: Array<{
    existing_rule: string;
    new_suggestion: string;
    recommendation: string;
  }>;
  questions_for_user: string[];
}

export interface EvolutionProposal {
  id: string;
  skill_id: string;
  created_at: string;
  trigger_reason: string;
  evidence_logs: string[];
  observed_pattern: string;
  suggested_change_type:
    | "add_rule"
    | "modify_rule"
    | "remove_rule"
    | "add_example"
    | "add_eval"
    | "add_warning"
    | "split_skill"
    | "merge_skill";
  suggested_changes: string[];
  risk: RiskLevel;
  requires_user_confirmation: boolean;
}

export interface ProfileEvolutionProposal {
  id: string;
  created_at: string;
  trigger_reason: string;
  evidence: Array<{
    source: string;
    observation: string;
  }>;
  suggested_updates: {
    user_profile: string[];
    preferences: string[];
    current_focus: string[];
    skill_gaps: string[];
    learning_goals: string[];
    rejected_ideas: string[];
  };
  risks: string[];
  questions_for_user: string[];
  requires_user_confirmation: boolean;
}

export interface InterviewAnswers {
  role?: string;
  currentProjects?: string;
  goals?: string;
  aiUseCases?: string;
  frustrations?: string;
  strengths?: string;
  gaps?: string;
  preferences?: string;
  avoid?: string;
}

export interface LibraryCandidate {
  name: string;
  repo: string;
  description: string;
  stars?: number;
  license?: string;
  last_updated?: string;
  open_issues?: number;
  topics: string[];
  source: "github" | "curated";
}

export interface LibraryRecommendation {
  id: string;
  created_at: string;
  goal: string;
  input_sources: string[];
  privacy_boundary: string[];
  recommendations: Array<{
    name: string;
    repo: string;
    why_it_fits: string;
    suggested_stage: "use_now" | "study_first" | "later" | "avoid_for_now";
    complexity: RiskLevel;
    stars: number | null;
    license: string;
    last_updated: string;
    adoption_signal: string;
    risks: string[];
    next_step: string;
  }>;
  rejected_or_later: Array<{
    name: string;
    repo: string;
    reason: string;
  }>;
  questions_for_user: string[];
}

export interface SkillIndexEntry {
  id: string;
  name: string;
  category: string;
  path: string;
  summary: string;
  keywords: string[];
  status: SkillStatus;
}
