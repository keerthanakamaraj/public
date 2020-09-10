
declare var jQuery: any;
export class ToolTipError {

    public isFieldVisible(id) {
        let allElem = jQuery("[name=" + id + "]");
        let elem = jQuery("[name=" + id + "]:visible:last");
        if (allElem.length > 1) {
            for (let i = 0; i <= allElem.length - 1; i++) {
                if (this.getFirstParentAppTag(allElem.get(i)) == this.getActiveElemTag()) {
                    elem = jQuery(allElem.get(i));
                    allElem = jQuery(allElem.get(i));
                    break;
                }
            }
        }
        if (allElem && allElem.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    public tooltiperrorshow(id, message) {

        let allElem = jQuery("[name=" + id + "]");
        let elem = jQuery("[name=" + id + "]:visible:last");
        if (allElem.length > 1) {
            for (let i = 0; i <= allElem.length - 1; i++) {
                if (this.getFirstParentAppTag(allElem.get(i)) == this.getActiveElemTag()) {
                    elem = jQuery(allElem.get(i));
                    allElem = jQuery(allElem.get(i));
                    break;
                }
            }
        }

        /*if (elem.attr("type") == "radio") {
            elem = jQuery(elem.parent());
        }*/
        let container = elem.parents(".greyborder");
        if (container.length <= 0) {
            container = jQuery("body");
        }
        let errorSpan = "<span class=\"error-message\" id=\"err-msg-" + id + "\">" + message + "</span>";
        //jQuery("#"+"err-msg-"+ id).remove();
        let errMsgElem = jQuery(elem).next(".error-message");
        while (errMsgElem.length > 0) {
            errMsgElem = jQuery(elem).next(".error-message");
            errMsgElem.remove();
        }
        if (jQuery("[name=" + id + "]").attr("role") == "listbox") {
            jQuery("[name=" + id + "] .ng-select-container").css("border", "1px solid red");
        } else if (jQuery("[name=" + id + "]").is("textarea")) {
            jQuery("[name=" + id + "]").css("border", "1px solid red");
        } else {
            let inputElem = allElem;
            if (inputElem.length > 0) {
                inputElem.css('border-color', 'red');
            } else {
                jQuery(".handleerror[name=" + id + "]").css('border', '1px solid red');
            }
        }
        /*if (elem.attr("type") == "radio") {
            jQuery(elem.parent()).append(errorSpan);
        } else {
            elem.after(errorSpan);
        }*/
        jQuery(elem.parent()).append(errorSpan);
        allElem.on("focusin", function () {
            jQuery("#err-msg-" + id + "").remove();
            if (jQuery("[name=" + id + "]").attr("role") == "listbox") {
                jQuery("[name=" + id + "] .ng-select-container").css("border", "1px solid #cccccc");
            } else if (jQuery("[name=" + id + "]").is("textarea")) {
                jQuery("[name=" + id + "]").css("border", "1px solid #cccccc");
            } else if (jQuery("[name=" + id + "]").is("select")) {
                jQuery("[name=" + id + "]").css("border", "1px solid #cccccc");
            } else {
                let inputElem = jQuery("input[name=" + id + "],textarea[name=" + id + "]");
                if (inputElem.length > 0) {
                    inputElem.css('border-color', '#cccccc');
                } else {
                    jQuery(".handleerror[name=" + id + "]").css('border', '1px solid #cccccc');
                }
            }

        });

    }

    public getFirstParentAppTag(elem) {
        let tagName = null;
        let parElems = jQuery(elem).parents();
        for (let i = 0; i <= parElems.length - 1; i++) {
            let ctagName = jQuery(parElems.get(i)).prop('tagName');
            if (ctagName.indexOf("APP-") == 0) {
                tagName = ctagName;
                break;
            }
        }
        return tagName;
    }

    public getActiveElemTag() {
        let elem = jQuery(":hover");
        let size = elem.length;
        return this.getFirstParentAppTag(jQuery(elem.get(size - 1)));
    }
    public tooltiphide() {
        jQuery(".error-message").remove();
    }

    public tooltiperrorhide(id) {
        jQuery("#err-msg-" + id + "").remove();
        if (jQuery("[name=" + id + "]").attr("role") == "listbox") {
            jQuery("[name=" + id + "] .ng-select-container").css("border", "1px solid #cccccc");
        } else if (jQuery("[name=" + id + "]").is("textarea")) {
            jQuery("[name=" + id + "]").css("border", "1px solid #cccccc");
        } else if (jQuery("[name=" + id + "]").is("select")) {
            jQuery("[name=" + id + "]").css("border", "1px solid #cccccc");
        } else {
            let inputElem = jQuery("input[name=" + id + "],textarea[name=" + id + "]");
            if (inputElem.length > 0) {
                inputElem.css('border-color', '#cccccc');
            } else {
                jQuery(".handleerror[name=" + id + "]").css('border', '1px solid #cccccc');
            }
        }
    }

    public tooltipdestroy() {
        jQuery(".error-message").remove();
        jQuery("input").css('border-color', '#cccccc');
        jQuery("textarea").css('border-color', '#cccccc');
        jQuery(".ng-select-container").css('border', '1px solid #cccccc');
        jQuery("select").css('border-color', '#cccccc');

    }
}
