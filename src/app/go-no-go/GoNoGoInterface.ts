export interface IGoNoGoQuestionnaire {
    ProductCode?: string;
    QuestionnaireCategory?: string;
    CustTypeCode?: string;
    Questions?: IQuestion[];

}

export interface IQuestion {
    QuestionSeq?: string;
    QuestionText?: string;
    IsNegative?: string;
    AnswerOptionList?: IAnswerOption[];
    selectedDecisionList?: IselectedAnswer[];
    radioOptionFormatList?: IRadioOptionFormat[];
}

export interface IAnswerOption {
    AnswerSeq?: string;
    AnswerValue?: string;
    AnswerScoreWeight?: string;
    AnswerText?: string;
    AnswerPriority?: string;
}

export interface IselectedAnswer {
    QuestionairSeq?: string;
    AnswerSeq?: string;
    Remark?: string;
}

export interface IRadioOptionFormat {
    id: string;
    text: string;
}