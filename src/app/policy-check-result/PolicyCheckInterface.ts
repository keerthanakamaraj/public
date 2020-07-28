export interface IPolicy_old {
  RuleDescription?: string,
  RuleDecision?: string,
  PolicyResultSeq?: string,
  RuleSeq?: string,
  ActualValue?: string,
  ExpectedValue?: string,
  Stage?: string,
  RuleResult?: string,
  ApplicationId?: string
}
export interface IPolicy {
  RuleDescription: string,
  RuleDecision: string,
  PolicyResultSeq: string,
  ActualValue: string,
  ExpectedValue: string,
  Stage: string,
  RuleResult: string,
  ApplicationId: string,
  CustSeq: string
}
