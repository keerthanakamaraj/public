export class NotepadDetailsFormModel {
ND_COMMENT_CAT: string;
ND_COMMENTS: string;
setValue(res){
if(res){
if(res['ND_COMMENT_CAT']){this.ND_COMMENT_CAT = res['ND_COMMENT_CAT'];}
if(res['ND_COMMENTS']){this.ND_COMMENTS = res['ND_COMMENTS'];}
}
}
}