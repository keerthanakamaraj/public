export class Tenant {
	id: number = 1;
	tenantName: string = "smartbankone";
	tenantDisplayName: string;
	defaultTheme = '';
	defaultLanguage: string = 'en-IN';
	currencyISOCode: string;
	currencySymbol: string;
	currencyFormat = 'en-IN';
	// Pattern represents minimum 1 number before decimal,
	// minimum 2 numbers after decimal and upto 2 numbers after decimal
	currencyDigitsInfo: string = '1.2-2';
	supportedLanguages: Array<string> = ['en-US', 'en-IN', 'hi-IN', 'ta-IN', 'ar-SA'];
	systemDate: Date = new Date();
	timeZone: string = '+0530';
	rtl: boolean = false;
	postalCodeCoupling: boolean;
	dateFormat: string = 'dd-MMM-yyyy';
	country: string;
	countryDisplay: string;
	currentDate: string;
	logoUrl: string = '';

	getMomentDateFormat() {
		return this.dateFormat.toUpperCase();
	}
	
	getMomentDateTimeFormat() {
		return (this.dateFormat.toUpperCase()) + ' HH:mm:ss';
	}

	getServiceDateTimeFormat() {
		return 'YYYY-MM-DDTHH:mm:ss.SSSSZ';
	}
	
	getCurrency() {
		if (this.currencySymbol) {
			return this.currencySymbol;
		}
		return this.currencyISOCode;
	}
}