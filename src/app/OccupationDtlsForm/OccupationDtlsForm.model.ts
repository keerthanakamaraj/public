export class OccupationDtlsFormModel {
OD_OCCUPATION: string;
OD_EMPLT_TYPE: string;
OD_SELF_EMPLD_TYPE: string;
OD_SELF_EMPLD_PROF: string;
OD_EMPLOYEE_ID: string;
OD_DEPARTMENT: string;
OD_DESIGNATION: string;
OD_DATE_OF_JOINING: string;
OD_DT_OF_INCPTN: string;
OD_INDUSTRY: string;
OD_NTR_OF_BUSS: string;
OD_COMPANY_CODE: string;
OD_COMP_CAT: string;
OD_COMP_NAME: string;
OD_LENGTH_OF_EXST: string;
OD_INC_DOC_TYPE: string;
OD_NET_INCOME: string;
OD_INCOME_FREQ: string;
OD_EMP_STATUS: string;
OD_INCOME_TYPE: string;
OD_WRK_PERMIT_NO: string;
OD_RES_PRT_NO: string;
OD_CURRENCY: string;
OD_LOC_CURR_EQ: string;
setValue(res){
if(res){
if(res['OD_OCCUPATION']){this.OD_OCCUPATION = res['OD_OCCUPATION'];}
if(res['OD_EMPLT_TYPE']){this.OD_EMPLT_TYPE = res['OD_EMPLT_TYPE'];}
if(res['OD_SELF_EMPLD_TYPE']){this.OD_SELF_EMPLD_TYPE = res['OD_SELF_EMPLD_TYPE'];}
if(res['OD_SELF_EMPLD_PROF']){this.OD_SELF_EMPLD_PROF = res['OD_SELF_EMPLD_PROF'];}
if(res['OD_EMPLOYEE_ID']){this.OD_EMPLOYEE_ID = res['OD_EMPLOYEE_ID'];}
if(res['OD_DEPARTMENT']){this.OD_DEPARTMENT = res['OD_DEPARTMENT'];}
if(res['OD_DESIGNATION']){this.OD_DESIGNATION = res['OD_DESIGNATION'];}
if(res['OD_DATE_OF_JOINING']){this.OD_DATE_OF_JOINING = res['OD_DATE_OF_JOINING'];}
if(res['OD_DT_OF_INCPTN']){this.OD_DT_OF_INCPTN = res['OD_DT_OF_INCPTN'];}
if(res['OD_INDUSTRY']){this.OD_INDUSTRY = res['OD_INDUSTRY'];}
if(res['OD_NTR_OF_BUSS']){this.OD_NTR_OF_BUSS = res['OD_NTR_OF_BUSS'];}
if(res['OD_COMPANY_CODE']){this.OD_COMPANY_CODE = res['OD_COMPANY_CODE'];}
if(res['OD_COMP_CAT']){this.OD_COMP_CAT = res['OD_COMP_CAT'];}
if(res['OD_COMP_NAME']){this.OD_COMP_NAME = res['OD_COMP_NAME'];}
if(res['OD_LENGTH_OF_EXST']){this.OD_LENGTH_OF_EXST = res['OD_LENGTH_OF_EXST'];}
if(res['OD_INC_DOC_TYPE']){this.OD_INC_DOC_TYPE = res['OD_INC_DOC_TYPE'];}
if(res['OD_NET_INCOME']){this.OD_NET_INCOME = res['OD_NET_INCOME'];}
if(res['OD_INCOME_FREQ']){this.OD_INCOME_FREQ = res['OD_INCOME_FREQ'];}
if(res['OD_EMP_STATUS']){this.OD_EMP_STATUS = res['OD_EMP_STATUS'];}
if(res['OD_INCOME_TYPE']){this.OD_INCOME_TYPE = res['OD_INCOME_TYPE'];}
if(res['OD_WRK_PERMIT_NO']){this.OD_WRK_PERMIT_NO = res['OD_WRK_PERMIT_NO'];}
if(res['OD_RES_PRT_NO']){this.OD_RES_PRT_NO = res['OD_RES_PRT_NO'];}
if(res['OD_CURRENCY']){this.OD_CURRENCY = res['OD_CURRENCY'];}
if(res['OD_LOC_CURR_EQ']){this.OD_LOC_CURR_EQ = res['OD_LOC_CURR_EQ'];}
}
}
}
