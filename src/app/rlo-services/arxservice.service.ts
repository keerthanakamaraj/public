import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ARXService {

  constructor(private httpClient: HttpClient) { 
    console.log('-------- ARX Service ----- ', httpClient);
  }

  getUserInfo(){
    console.log('get user info');

    let url = environment.baseURL + environment.serviceMap['/initiation'] + '/getUserInfo' ;

    return this.httpClient.get(url);

    // const http = require("http");

    // const options = {
    //   "method": "GET",
    //   "hostname": "10.11.12.53",
    //   "port": "9090",
    //   "path": "/olive/publisher/getUserInfo",
    //   "headers": {
    //     "Cookie": "JSESSIONID=vrgAaQdrmASrH8ZvVOwQOptoDCcIB0juT2Gua4F5.master:RLO_ARX; LtpaToken2=OqhX71uURSbIrtACxclshC7easw6c/Xv3+5XbQP31MbNhqb1u7Xu4h8H1F+reUBpB8AG0LQR+gBDWOQEqzGwua6E1HDlnlxQsB85C26jYsj8/B1oXv0nwFDsgQARoaROgLHt+flN0cA38AyjfqtBpunOxwssXHdMJ7DsfdbUYYyZ4bkROkeM8okLjqiclTaTALac5JNw9B75FuUoxdfp5Q8ncxSthUGoskEGB/k1w/AX2wLLeLSoRrx4Eu59yFA7u5w4yWRFaHf9/XEz0lI7XfpCisr/l7ytrIinimi/wSlraByzbttpewepLJ5WYuHoS6QfAhZJLqSQ4M6HS9Vx51Fl0kzhTQ4U+fN9GYjrS2jmhYsqXfwGoTo6a2V4YzDxeyWS8v5DjHhfj5p3PHz+jiS+7ym+lTTFy7R6LU59FJaeQwgmbSZ0or2O1BMKe0LA+h/8jGiSHuiQhIcXyEc42bqV8RM48deMG/ahcQrGSTQTVKnCJLTZkOhkJVI+HlNSsp5iAoYxNjqOypv6U4qQ+ysRaebBot2PMZq6rKQ+YqzkghxuZ4cwWJtE8GWx94E4+jgkZKtiRr/RXb+TVZH8jf9uPahCXWaoDBVVlik+r8RNt5BK7DMDq3Jkl4bqF7ouiHioI4wzLo2MP0dxwoakh47Ivh+JmmGep3r2j9LUjIDokCr8gtnmoKrSHf3KAPFmCMlBgJjKocW6ZXH5FxxxOXI9Tey4yvmryxG4PF64RdljsX7zfA63g1iPzvzDPAT7s5B562kKZL4sp8cticzeHg==; OL_SSOAvail=False; CurrentAuthType=1; ArmorTicket=%26%3Adeuser1%3Adeuser1%3ARLODIT%3A1%3A655697b068425aa56da442afd3569745be981d5d%7Eo1P14nwo3EArhI7Sikea7L3uQ431QlpgMZXWdxfRCBcdO5tm%2F1Cet4Juxdoumm%2BcKDNp7M0ppSZ78ymgjRVkD6u9xbYWcbH1EUk07FyqwFdeXBPVCgLa%2FoxsdnRDie4AuY%2FzYD%2Fpgx8YYOyXmKdZEDzq%2BKISiiL8zErkobxvNpA%3D; att_inv=0; ArmorAALLanguage=en_US; ArmorAALTicket=%26%3Adeuser1%3A1608372771806%3A1608372771806%3A1608372771806%3A19800000%7EgJKoxU9tt6TeCHKY6MgmNsQx78arU%2Fjq69ODvTFAsqAGXQo2%2BBEJ0BCoMkjc1CdqRchYwFJT5Cj%2BjOQ1%2FpPzbRkvnyemjy7QgQziFOcoRjWkdBC9Ac90dhqDuW5CD9ZK9ZyOJVuSvEsQLM5q3DjQAGDPouT%2FEoOcyumomUiW70s%3D"
    //   }
    // };

    // const req = http.request(options, function (res) {
    //   const chunks = [];

    //   res.on("data", function (chunk) {
    //     chunks.push(chunk);
    //   });

    //   res.on("end", function () {
    //     const body = Buffer.concat(chunks);
    //     console.log(body.toString());
    //   });
    // });

    // req.end();
  }
}
