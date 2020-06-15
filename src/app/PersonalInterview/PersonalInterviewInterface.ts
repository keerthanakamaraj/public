export interface IGoNoGoQuestionnaire {
    ProductCode?: string;   
    CustTypeCode?: string;
    Questions?: IQuestion[];
}

export interface IQuestion {
    QuestionSeq?: string;
    QuestionnaireSeq?: string;
    QuestionText?: string;
    IsNegative?: string;
    DeviationLevel?:string;
    AnswerOptionList?: IAnswerOption[];
    selectedDecisionList?: IselectedAnswer[];
    radioOptionFormatList?: IRadioOptionFormat[];
    QuestionnaireCategory?: string;
    
}

export interface IAnswerOption {
    AnswerSeq?: string;
    AnswerValue?: string;
    AnswerScoreWeight?: string;
    AnswerText?: string;
    AnswerPriority?: string;
}

export interface IselectedAnswer {
    QuestionnaireSeq?: string;
    QuestionSeq?:string;
    AnswerSeq?: string;
    Remark?: string;
}

export interface IRadioOptionFormat {
    id: string;
    text: string;
}

export interface IFieldErrors {
    QuestionSeq?: string;
    errorText?: string;
}

export interface SaveGoNoGoReqObject {
    QuestionnaireSeq?: string;
    QuestionSeq?: string;
    ApplicationId?: string;
    AnswerSeq?: string;
    QuestionnaireCategory?: string;
    Remarks?: string;
    CreatedBy?: string;
    UpdatedBy?: string;

}