export interface IScoreCard {
  Score?: number,
  ScoreSection?: string,
  // ScorecardSeq?: string,
  // ScoreID?: string,
  // ApplicationId?: string,
  BorrowerSeq?: string
  MaxSectionScore?: number,
  MinGreenScore?: number,
  MinOrangeScore?: number,
  MinRedScore?: number,
  colorCode: string,
  Weightage?: number
}

export interface IScoreColor {
  colorId?: string,
  colorCode?: string,
  description?: string

}
