export interface IPolicy2 {
  PolicySeq?: string;
  PolicyResultSeq?: string;
  PolicyText?: string;
  RuleSeq?: string;
  RuleResult?: string;
  RuleDecision?: string;
  ActualValue?: string;
  ExpectedValue?: string;
  Stage?: string;

}

export interface IPolicy {
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
