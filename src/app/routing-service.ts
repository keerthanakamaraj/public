import { Injectable, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ProvidehttpService } from "./providehttp.service";
import { Data } from "./DataService";

@Injectable()
export class RoutingService {

    currOutlet: string = undefined;
    currModal = 0;
    outletsCreated = new Array<any>();
    ignorePathList = new Array<String>();

    constructor(private router: Router, private dataService: ProvidehttpService, private data: Data) {
        this.ignorePathList.push('result');
        this.ignorePathList.push('remarks');
        this.ignorePathList.push('favorites');
        this.ignorePathList.push('alpha');
        this.ignorePathList.push('VIEWIMG');
        this.ignorePathList.push('message');
        //this.ignorePathList.push('SRVHIST');
        this.ignorePathList.push('VIEWSSTAGES');
        this.ignorePathList.push('AUTHWB');
        this.ignorePathList.push('CUSTPROFILE');
        this.ignorePathList.push('ACCOPEN');
    }

    setnewOutlet(): boolean {
        this.currModal++;
        this.currOutlet = 'popUp' + this.currModal;
        if (this.outletsCreated.indexOf(this.currModal) == -1) {
            this.outletsCreated.push(this.currModal);
            return true;
        } else {
            return false;
        }
    }

    async removeOutlet() {

        let outletJson = {};
        outletJson[this.currOutlet] = null;
        await this.router.navigate([{ outlets: outletJson }]);

        this.data.setData(this.currModal, undefined);
        // let outletJson = {};
        // outletJson[this.currOutlet] = null;

        // this.router.navigate([{ outlets: outletJson }], { skipLocationChange: true });
        // this.router.dispose();
        this.currModal--;
        this.currOutlet = 'popUp' + this.currModal;
        if (this.currModal == 0) {
            this.currOutlet = undefined;
        }
    }

    async navigateToComponent(path: string, mode = 'E') {
        let allow = true;
        // if (this.ignorePathList.indexOf(path) != -1) {
        //     allow = true;
        // } else {
        //     let res = await this.dataService.resetForm(path, mode);
        //     if (res['Status'] == 'S') {
        //         this.data.formGenericData = res;
        //     } else {
        //         allow = false;
        //         let map = new Map();
        //         map.set("component", "message");
        //         map.set("Message", res['ErrorMessage']);
        //         map.set("error", res['ErrorCode']);
        //         return map;
        //     }
        // }
        this.dataService.showSpinner();
        if (allow) {
            if (!this.currOutlet) {
                this.router.navigate(['home', path]);
            } else {
                let outletJson = {};
                outletJson[this.currOutlet] = [path,"popup"];
                await this.router.navigate([{ outlets: outletJson }],{skipLocationChange: true});
            }
        }
        this.dataService.hideSpinner();
        return undefined; // added because Form reset call is commented
    }

    async removeAllOutlets(){
        for(var i = 1; i <= this.currModal; i++){
            await this.removeOutlet();
        }
    }
}