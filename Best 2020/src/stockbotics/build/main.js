(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div style=\"text-align:center\">\r\n  <h1>\r\n    Welcome to {{ title }}!\r\n  </h1>\r\n  <img width=\"300\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\r\n</div>\r\n<h2>Here are some links to help you start: </h2>\r\n<ul>\r\n  <li>\r\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\">Tour of Heroes</a></h2>\r\n  </li>\r\n  <li>\r\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/cli\">CLI Documentation</a></h2>\r\n  </li>\r\n  <li>\r\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.angular.io/\">Angular blog</a></h2>\r\n  </li>\r\n</ul>\r\n<h1>Odgovor is strežnika: {{odgovor}}</h1>\r\n<button (click)=\"getNapovedi()\">Prikazi napovedi</button>\r\n<h1>Napoved:</h1>\r\n<ul>\r\n  <li *ngFor=\"let napoved of napovedi\">\r\n    High: {{napoved.high}}, Low: {{napoved.low}}\r\n  </li>\r\n</ul>\r\n\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storitve/streznik-podatki.service */ "./src/app/storitve/streznik-podatki.service.ts");



var AppComponent = /** @class */ (function () {
    function AppComponent(streznikPodatki) {
        this.streznikPodatki = streznikPodatki;
        this.title = 'stockbotics';
    }
    AppComponent.prototype.helloWorld = function () {
        var _this = this;
        this.streznikPodatki
            .helloWorld()
            .then(function (odgovor) { return _this.odgovor = odgovor["odgovor"]; });
    };
    AppComponent.prototype.getNapovedi = function () {
        var _this = this;
        this.streznikPodatki
            .vrniNapovedi()
            .then(function (napovedi) {
            console.log(typeof napovedi);
            console.log(napovedi);
            _this.napovedi = napovedi;
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.helloWorld();
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_2__["StreznikPodatkiService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _komponente_registracija_registracija_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./komponente/registracija/registracija.component */ "./src/app/komponente/registracija/registracija.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _komponente_ogrodje_ogrodje_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./komponente/ogrodje/ogrodje.component */ "./src/app/komponente/ogrodje/ogrodje.component.ts");
/* harmony import */ var _moduli_app_usmerjanje_app_usmerjanje_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./moduli/app-usmerjanje/app-usmerjanje.module */ "./src/app/moduli/app-usmerjanje/app-usmerjanje.module.ts");
/* harmony import */ var _komponente_prijava_prijava_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./komponente/prijava/prijava.component */ "./src/app/komponente/prijava/prijava.component.ts");
/* harmony import */ var _komponente_ogled_profila_ogled_profila_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./komponente/ogled-profila/ogled-profila.component */ "./src/app/komponente/ogled-profila/ogled-profila.component.ts");
/* harmony import */ var _komponente_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./komponente/footer/footer.component */ "./src/app/komponente/footer/footer.component.ts");
/* harmony import */ var _komponente_domaca_stran_domaca_stran_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./komponente/domaca-stran/domaca-stran.component */ "./src/app/komponente/domaca-stran/domaca-stran.component.ts");
/* harmony import */ var _komponente_uredi_profil_uredi_profil_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./komponente/uredi-profil/uredi-profil.component */ "./src/app/komponente/uredi-profil/uredi-profil.component.ts");
/* harmony import */ var _komponente_podrobnosti_uporabnika_podrobnosti_uporabnika_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component */ "./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.ts");
/* harmony import */ var _komponente_vsi_uporabniki_vsi_uporabniki_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./komponente/vsi-uporabniki/vsi-uporabniki.component */ "./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.ts");
/* harmony import */ var _komponente_db_db_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./komponente/db/db.component */ "./src/app/komponente/db/db.component.ts");

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _komponente_registracija_registracija_component__WEBPACK_IMPORTED_MODULE_5__["RegistracijaComponent"],
                _komponente_ogrodje_ogrodje_component__WEBPACK_IMPORTED_MODULE_7__["OgrodjeComponent"],
                _komponente_ogled_profila_ogled_profila_component__WEBPACK_IMPORTED_MODULE_10__["OgledProfilaComponent"],
                _komponente_prijava_prijava_component__WEBPACK_IMPORTED_MODULE_9__["PrijavaComponent"],
                _komponente_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__["FooterComponent"],
                _komponente_domaca_stran_domaca_stran_component__WEBPACK_IMPORTED_MODULE_12__["DomacaStranComponent"],
                _komponente_uredi_profil_uredi_profil_component__WEBPACK_IMPORTED_MODULE_13__["UrediProfilComponent"],
                _komponente_podrobnosti_uporabnika_podrobnosti_uporabnika_component__WEBPACK_IMPORTED_MODULE_14__["PodrobnostiUporabnikaComponent"],
                _komponente_vsi_uporabniki_vsi_uporabniki_component__WEBPACK_IMPORTED_MODULE_15__["VsiUporabnikiComponent"],
                _komponente_db_db_component__WEBPACK_IMPORTED_MODULE_16__["DbComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _moduli_app_usmerjanje_app_usmerjanje_module__WEBPACK_IMPORTED_MODULE_8__["AppUsmerjanjeModule"]
            ],
            providers: [],
            bootstrap: [_komponente_ogrodje_ogrodje_component__WEBPACK_IMPORTED_MODULE_7__["OgrodjeComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/komponente/db/db.component.css":
/*!************************************************!*\
  !*** ./src/app/komponente/db/db.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2tvbXBvbmVudGUvZGIvZGIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/komponente/db/db.component.html":
/*!*************************************************!*\
  !*** ./src/app/komponente/db/db.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"button\" (click)=\"click()\">\r\n  Vstavi\r\n</button>\r\n"

/***/ }),

/***/ "./src/app/komponente/db/db.component.ts":
/*!***********************************************!*\
  !*** ./src/app/komponente/db/db.component.ts ***!
  \***********************************************/
/*! exports provided: DbComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DbComponent", function() { return DbComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../storitve/streznik-podatki.service */ "./src/app/storitve/streznik-podatki.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");




var DbComponent = /** @class */ (function () {
    function DbComponent(streznikPodatki, title) {
        this.streznikPodatki = streznikPodatki;
        this.title = title;
        title.setTitle("Dodajanje v bazo");
    }
    DbComponent.prototype.ngOnInit = function () {
    };
    DbComponent.prototype.click = function () {
        this.streznikPodatki.vstaviDb();
    };
    DbComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-db',
            template: __webpack_require__(/*! ./db.component.html */ "./src/app/komponente/db/db.component.html"),
            styles: [__webpack_require__(/*! ./db.component.css */ "./src/app/komponente/db/db.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_2__["StreznikPodatkiService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["Title"]])
    ], DbComponent);
    return DbComponent;
}());



/***/ }),

/***/ "./src/app/komponente/domaca-stran/domaca-stran.component.css":
/*!********************************************************************!*\
  !*** ./src/app/komponente/domaca-stran/domaca-stran.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2tvbXBvbmVudGUvZG9tYWNhLXN0cmFuL2RvbWFjYS1zdHJhbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/komponente/domaca-stran/domaca-stran.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/komponente/domaca-stran/domaca-stran.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  domaca-stran works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/komponente/domaca-stran/domaca-stran.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/komponente/domaca-stran/domaca-stran.component.ts ***!
  \*******************************************************************/
/*! exports provided: DomacaStranComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomacaStranComponent", function() { return DomacaStranComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var DomacaStranComponent = /** @class */ (function () {
    function DomacaStranComponent(title) {
        this.title = title;
        title.setTitle("Stockbotics");
    }
    DomacaStranComponent.prototype.ngOnInit = function () {
    };
    DomacaStranComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-domaca-stran',
            template: __webpack_require__(/*! ./domaca-stran.component.html */ "./src/app/komponente/domaca-stran/domaca-stran.component.html"),
            styles: [__webpack_require__(/*! ./domaca-stran.component.css */ "./src/app/komponente/domaca-stran/domaca-stran.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"]])
    ], DomacaStranComponent);
    return DomacaStranComponent;
}());



/***/ }),

/***/ "./src/app/komponente/footer/footer.component.css":
/*!********************************************************!*\
  !*** ./src/app/komponente/footer/footer.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2tvbXBvbmVudGUvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/komponente/footer/footer.component.html":
/*!*********************************************************!*\
  !*** ./src/app/komponente/footer/footer.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer_area\">\r\n  <h5>Stockbotics</h5>\r\n  <ul style=\"list-style-type:none;\">\r\n    <li><a routerLink=\"\">Domača stran</a></li>\r\n    <li><a routerLink=\"o-nas\">O nas</a></li>\r\n    <li><a routerLink=\"kontakt\">Kontakt</a></li>\r\n<!--    TODO: socialna omrezja-->\r\n  </ul>\r\n</footer>\r\n"

/***/ }),

/***/ "./src/app/komponente/footer/footer.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/komponente/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/komponente/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/komponente/footer/footer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/komponente/ogled-profila/ogled-profila.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/komponente/ogled-profila/ogled-profila.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body{\r\n  padding-bottom: 30px;\r\n}\r\ninput {\r\n  padding:10px;\r\n  font-family: FontAwesome, \"Open Sans\", Verdana, sans-serif;\r\n  border-radius:3px;\r\n}\r\ninput[type='submit']{\r\n  color:white;\r\n  border: none;\r\n}\r\n.login-form, .signup-form{\r\n  margin-top: 20px;\r\n}\r\n#login{\r\n  padding: 50px 15px;\r\n  background: #527A78;\r\n  border-radius: 10px;\r\n  text-align: center;\r\n}\r\n#login_email_warning{\r\n  text-align: left;\r\n}\r\n#login_password_warning{\r\n  text-align: left;\r\n}\r\n#signin{\r\n  padding: 20px 30px;\r\n  background-color: rgb(248,248,255);/* Microsoft Edge */\r\n  background: rgba(248,248,255,0.65);\r\n  border-radius: 10px;\r\n}\r\n#naslov{\r\n  font-size: 4.0em;\r\n  margin-top: 30px;\r\n}\r\n#headline-p{\r\n  margin-bottom: 30px;\r\n  font-size: 1.5em;\r\n}\r\n#forgot_pass{\r\n  color: white;\r\n}\r\n#button-submit{\r\n  background-color: rgba(220,53,64,0.5);\r\n  color: white;\r\n}\r\n.information{\r\n  display: none;\r\n}\r\n.infos{\r\n  display: block;\r\n}\r\n.validate-warning{\r\n  color: red;\r\n}\r\n.validate-login-warning{\r\n  color: white;\r\n}\r\n@media (max-width: 415px){\r\n  #naslov{\r\n    font-size: 2.7em;\r\n    margin-top: 30px;\r\n  }\r\n  #headline-p{\r\n    margin-bottom: 30px;\r\n    font-size: 1.0em;\r\n  }\r\n  .instruction{\r\n    font-size: 0.7em;\r\n  }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva29tcG9uZW50ZS9vZ2xlZC1wcm9maWxhL29nbGVkLXByb2ZpbGEuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsWUFBWTtFQUNaLDBEQUEwRDtFQUMxRCxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtDQUFrQyxDQUFDLG1CQUFtQjtFQUN0RCxrQ0FBa0M7RUFDbEMsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLHFDQUFxQztFQUNyQyxZQUFZO0FBQ2Q7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFO0lBQ0UsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0UsbUJBQW1CO0lBQ25CLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0UsZ0JBQWdCO0VBQ2xCO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9rb21wb25lbnRlL29nbGVkLXByb2ZpbGEvb2dsZWQtcHJvZmlsYS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keXtcclxuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxufVxyXG5pbnB1dCB7XHJcbiAgcGFkZGluZzoxMHB4O1xyXG4gIGZvbnQtZmFtaWx5OiBGb250QXdlc29tZSwgXCJPcGVuIFNhbnNcIiwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBib3JkZXItcmFkaXVzOjNweDtcclxufVxyXG5pbnB1dFt0eXBlPSdzdWJtaXQnXXtcclxuICBjb2xvcjp3aGl0ZTtcclxuICBib3JkZXI6IG5vbmU7XHJcbn1cclxuLmxvZ2luLWZvcm0sIC5zaWdudXAtZm9ybXtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcbiNsb2dpbntcclxuICBwYWRkaW5nOiA1MHB4IDE1cHg7XHJcbiAgYmFja2dyb3VuZDogIzUyN0E3ODtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4jbG9naW5fZW1haWxfd2FybmluZ3tcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbiNsb2dpbl9wYXNzd29yZF93YXJuaW5ne1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuI3NpZ25pbntcclxuICBwYWRkaW5nOiAyMHB4IDMwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OCwyNDgsMjU1KTsvKiBNaWNyb3NvZnQgRWRnZSAqL1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjQ4LDI0OCwyNTUsMC42NSk7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxufVxyXG4jbmFzbG92e1xyXG4gIGZvbnQtc2l6ZTogNC4wZW07XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG4jaGVhZGxpbmUtcHtcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gIGZvbnQtc2l6ZTogMS41ZW07XHJcbn1cclxuI2ZvcmdvdF9wYXNze1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG4jYnV0dG9uLXN1Ym1pdHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIyMCw1Myw2NCwwLjUpO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG4uaW5mb3JtYXRpb257XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uaW5mb3N7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuLnZhbGlkYXRlLXdhcm5pbmd7XHJcbiAgY29sb3I6IHJlZDtcclxufVxyXG4udmFsaWRhdGUtbG9naW4td2FybmluZ3tcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDQxNXB4KXtcclxuICAjbmFzbG92e1xyXG4gICAgZm9udC1zaXplOiAyLjdlbTtcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgfVxyXG4gICNoZWFkbGluZS1we1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgIGZvbnQtc2l6ZTogMS4wZW07XHJcbiAgfVxyXG4gIC5pbnN0cnVjdGlvbntcclxuICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/komponente/ogled-profila/ogled-profila.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/komponente/ogled-profila/ogled-profila.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"uporabnik\" class=\"row\">\r\n  <div class=\"col-xl-12 col-lg-12 col-md-12\">\r\n    <div class=\"gap-100\"></div>\r\n    <h1 class=\"text-white\">Podatki o profilu</h1>\r\n    <h3 class=\"text-white text-center\">Ime: {{uporabnik.ime }}</h3>\r\n    <h3 class=\"text-white text-center\">Priimek: {{uporabnik.priimek }}</h3>\r\n    <h3 class=\"text-white text-center\">Uporabniško ime: {{uporabnik.uporabniskoIme}}</h3>\r\n    <h3 class=\"text-white text-center\">Elektronski naslov: {{uporabnik.email}}</h3>\r\n    <!-- Denar in ocena uporabnika -->\r\n    <h3 class=\"text-white text-center\">Denarna sredstva: 0</h3>\r\n    <h3 class=\"text-white text-center\">Ocena: NA</h3>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <a routerLink=\"{{uporabnik._id}}\"><button class=\"btn btn-success pull-right\" > Uredi profil</button></a>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<div *ngIf=\"!uporabnik\">\r\n  <h3 class=\"bg-warning text-white text-center\">Pridobivanje podatkov uporabnika...</h3>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/komponente/ogled-profila/ogled-profila.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/komponente/ogled-profila/ogled-profila.component.ts ***!
  \*********************************************************************/
/*! exports provided: OgledProfilaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OgledProfilaComponent", function() { return OgledProfilaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _storitve_avtentikacija_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../storitve/avtentikacija.service */ "./src/app/storitve/avtentikacija.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../storitve/streznik-podatki.service */ "./src/app/storitve/streznik-podatki.service.ts");







var OgledProfilaComponent = /** @class */ (function () {
    function OgledProfilaComponent(avtentikacijaService, pot, router, streznikPodatkiStoritev, title) {
        this.avtentikacijaService = avtentikacijaService;
        this.pot = pot;
        this.router = router;
        this.streznikPodatkiStoritev = streznikPodatkiStoritev;
        this.title = title;
        title.setTitle("Ogled profila");
    }
    OgledProfilaComponent.prototype.vrniUporabnika = function () {
        this.uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
        console.log(this.uporabnik._id);
        console.log(this.uporabnik.uporabniskoIme);
        // return uporabnik ? uporabnik.username : 'Gost';
    };
    OgledProfilaComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Vrni uporabnika za ogled profila");
        this.vrniUporabnika();
        this.pot.paramMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (params) {
            var id = params.get('idUporabnika');
            console.log("OnInit uredi profil " + id);
            return _this.streznikPodatkiStoritev.pridobiUporabnika(_this.uporabnik._id);
        }))
            .subscribe(function (uporabnik) {
            _this.uporabnik = uporabnik;
            console.log(uporabnik);
        });
    };
    OgledProfilaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ogled-profila',
            template: __webpack_require__(/*! ./ogled-profila.component.html */ "./src/app/komponente/ogled-profila/ogled-profila.component.html"),
            styles: [__webpack_require__(/*! ./ogled-profila.component.css */ "./src/app/komponente/ogled-profila/ogled-profila.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_avtentikacija_service__WEBPACK_IMPORTED_MODULE_2__["AvtentikacijaService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_6__["StreznikPodatkiService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"]])
    ], OgledProfilaComponent);
    return OgledProfilaComponent;
}());



/***/ }),

/***/ "./src/app/komponente/ogrodje/ogrodje.component.css":
/*!**********************************************************!*\
  !*** ./src/app/komponente/ogrodje/ogrodje.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\r\n  margin: 0 auto;\r\n  width: 80vw;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva29tcG9uZW50ZS9vZ3JvZGplL29ncm9kamUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0FBQ2IiLCJmaWxlIjoic3JjL2FwcC9rb21wb25lbnRlL29ncm9kamUvb2dyb2RqZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4ge1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIHdpZHRoOiA4MHZ3O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/komponente/ogrodje/ogrodje.component.html":
/*!***********************************************************!*\
  !*** ./src/app/komponente/ogrodje/ogrodje.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"main\">\r\n  <!-- Navbar -->\r\n  <nav id=\"navbar-section\" class=\"navbar navbar-expand-lg navbar-light sticky-top\">\r\n    <div class=\"container\">\r\n      <a class=\"navbar-brand\" routerLink=\"/\"><i class=\" mr-2 fas fa-robot\"></i> <span style=\"font-weight:700\">Stockbotics</span></a>\r\n      <!-- collaps button -->\r\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n        <span class=\"navbar-toggler-icon\"></span>\r\n      </button>\r\n\r\n      <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n        <ul class=\"navbar-nav ml-auto\">\r\n          <li class=\"nav-item active\">\r\n            <a class=\"nav-link mr-3\" routerLink=\"\">Domov</a>\r\n          </li>\r\n          <li class=\"nav-item active\">\r\n            <a class=\"nav-link mr-3\" routerLink=\"chart\">Trgovina</a>\r\n          </li>\r\n          <li class=\"nav-item active\">\r\n            <a class=\"nav-link mr-3\" routerLink=\"dogodek/nov\">Moji trgovalni boti</a>\r\n            <!--<a href=\"login.html\"><button>Go To Login</button></a> -->\r\n          </li>\r\n          <li>\r\n            <a class=\"nav-link mr-3\" routerLink=\"dogodek/nov\">Lestvica</a>\r\n          </li>\r\n          <li>\r\n            <a class=\"nav-link mr-3\" routerLink=\"uporabniki\">Vsi uporabniki</a>\r\n          </li>\r\n\r\n          <div *ngIf=\"jePrijavljen()\">\r\n            <li class=\"nav-item dropdown active\">\r\n              <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                <span id=\"username\" class=\"mr-2\"><strong>Moj profil</strong></span> <i class=\"fas fa-user\"></i>\r\n              </a>\r\n              <div id=\"dropdown-user\" class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n                <a class=\"dropdown-item\" routerLink=\"profil\">Ogled profila</a>\r\n                <div class=\"dropdown-divider\"></div>\r\n                <a class=\"dropdown-item\" (click)=\"odjava()\" routerLink=\"prijava\">Odjava</a>\r\n              </div>\r\n            </li>\r\n          </div>\r\n\r\n          <div *ngIf=\"!jePrijavljen()\">\r\n            <li class=\"nav-item active\">\r\n              <a class=\"nav-link mr-3\" routerLink=\"prijava\">Prijava</a>\r\n            </li>\r\n          </div>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </nav>\r\n\r\n    <router-outlet></router-outlet>\r\n\r\n  <!-- footer -->\r\n  <!--  <footer class=\"mt-3 mb-5 text-white\">Stockbotics Official site</footer>-->\r\n  <app-footer></app-footer>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/komponente/ogrodje/ogrodje.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/komponente/ogrodje/ogrodje.component.ts ***!
  \*********************************************************/
/*! exports provided: OgrodjeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OgrodjeComponent", function() { return OgrodjeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _storitve_avtentikacija_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../storitve/avtentikacija.service */ "./src/app/storitve/avtentikacija.service.ts");



var OgrodjeComponent = /** @class */ (function () {
    function OgrodjeComponent(avtentikacijaService) {
        this.avtentikacijaService = avtentikacijaService;
    }
    OgrodjeComponent.prototype.odjava = function () {
        this.avtentikacijaService.odjava();
    };
    OgrodjeComponent.prototype.jePrijavljen = function () {
        return this.avtentikacijaService.jePrijavljen();
    };
    OgrodjeComponent.prototype.vrniUporabnika = function () {
        var uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
        return uporabnik ? uporabnik.uporabniskoIme : 'Gost';
    };
    OgrodjeComponent.prototype.ngOnInit = function () {
    };
    OgrodjeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ogrodje',
            template: __webpack_require__(/*! ./ogrodje.component.html */ "./src/app/komponente/ogrodje/ogrodje.component.html"),
            styles: [__webpack_require__(/*! ./ogrodje.component.css */ "./src/app/komponente/ogrodje/ogrodje.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_avtentikacija_service__WEBPACK_IMPORTED_MODULE_2__["AvtentikacijaService"]])
    ], OgrodjeComponent);
    return OgrodjeComponent;
}());



/***/ }),

/***/ "./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".vrstica {\r\n  background-color: rgba(211,211,211,0.6);\r\n  margin-bottom: 10px;\r\n  height: 60px;\r\n  display: flex;\r\n  align-items: center;\r\n  overflow: hidden;\r\n}\r\n\r\n.imePriimekUporabnika, .datumZadnjePrijave {\r\n  text-align: center;\r\n  width: 30vw;\r\n  font-size: 16pt;\r\n  float: left;\r\n}\r\n\r\n.datumZadnjePrijave {\r\n  position: absolute;\r\n  margin-left: 30vw;\r\n}\r\n\r\n.izbrisUporabnika {\r\n  float: left;\r\n  font-size: 14pt;\r\n  position: absolute;\r\n  margin-left: 65vw;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva29tcG9uZW50ZS9wb2Ryb2Jub3N0aS11cG9yYWJuaWthL3BvZHJvYm5vc3RpLXVwb3JhYm5pa2EuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVDQUF1QztFQUN2QyxtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxlQUFlO0VBQ2YsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2tvbXBvbmVudGUvcG9kcm9ibm9zdGktdXBvcmFibmlrYS9wb2Ryb2Jub3N0aS11cG9yYWJuaWthLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudnJzdGljYSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMTEsMjExLDIxMSwwLjYpO1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4uaW1lUHJpaW1la1Vwb3JhYm5pa2EsIC5kYXR1bVphZG5qZVByaWphdmUge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB3aWR0aDogMzB2dztcclxuICBmb250LXNpemU6IDE2cHQ7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuXHJcbi5kYXR1bVphZG5qZVByaWphdmUge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBtYXJnaW4tbGVmdDogMzB2dztcclxufVxyXG5cclxuLml6YnJpc1Vwb3JhYm5pa2Ege1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG4gIGZvbnQtc2l6ZTogMTRwdDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luLWxlZnQ6IDY1dnc7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"vrstica\">\r\n  <div class=\"imePriimekUporabnika\">\r\n    {{uporabnik.ime}} {{uporabnik.priimek}}\r\n  </div>\r\n  <div class=\"datumZadnjePrijave\">\r\n    1.1.2020\r\n  </div>\r\n  <div class=\"izbrisUporabnika\">\r\n    <button class=\"btn btn-danger\" (click)=\"izbrisiUporabnika()\">Izbris uporabnika</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.ts ***!
  \***************************************************************************************/
/*! exports provided: PodrobnostiUporabnikaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PodrobnostiUporabnikaComponent", function() { return PodrobnostiUporabnikaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _razredi_uporabnik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../razredi/uporabnik */ "./src/app/razredi/uporabnik.ts");
/* harmony import */ var _storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../storitve/streznik-podatki.service */ "./src/app/storitve/streznik-podatki.service.ts");
/* harmony import */ var _vsi_uporabniki_vsi_uporabniki_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vsi-uporabniki/vsi-uporabniki.component */ "./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.ts");





var PodrobnostiUporabnikaComponent = /** @class */ (function () {
    function PodrobnostiUporabnikaComponent(streznikPodatki, vsiUporabniki) {
        this.streznikPodatki = streznikPodatki;
        this.vsiUporabniki = vsiUporabniki;
    }
    PodrobnostiUporabnikaComponent.prototype.izbrisiUporabnika = function () {
        this.streznikPodatki.izbrisiUporabnika(this.uporabnik._id);
        this.vsiUporabniki.getVsiUporabniki();
    };
    PodrobnostiUporabnikaComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _razredi_uporabnik__WEBPACK_IMPORTED_MODULE_2__["Uporabnik"])
    ], PodrobnostiUporabnikaComponent.prototype, "uporabnik", void 0);
    PodrobnostiUporabnikaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-podrobnosti-uporabnika',
            template: __webpack_require__(/*! ./podrobnosti-uporabnika.component.html */ "./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.html"),
            styles: [__webpack_require__(/*! ./podrobnosti-uporabnika.component.css */ "./src/app/komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_3__["StreznikPodatkiService"],
            _vsi_uporabniki_vsi_uporabniki_component__WEBPACK_IMPORTED_MODULE_4__["VsiUporabnikiComponent"]])
    ], PodrobnostiUporabnikaComponent);
    return PodrobnostiUporabnikaComponent;
}());



/***/ }),

/***/ "./src/app/komponente/prijava/prijava.component.css":
/*!**********************************************************!*\
  !*** ./src/app/komponente/prijava/prijava.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body{\r\n  padding-bottom: 30px;\r\n}\r\ninput {\r\n  padding:10px;\r\n  font-family: FontAwesome, \"Open Sans\", Verdana, sans-serif;\r\n  border-radius:3px;\r\n}\r\ninput[type='submit']{\r\n  color:white;\r\n  border: none;\r\n}\r\n.login-form, .signup-form{\r\n  margin-top: 20px;\r\n}\r\n#login{\r\n  padding: 50px 15px;\r\n  background: #527A78;\r\n  border-radius: 10px;\r\n  text-align: center;\r\n}\r\n#login_email_warning{\r\n  text-align: left;\r\n}\r\n#login_password_warning{\r\n  text-align: left;\r\n}\r\n#signin{\r\n  padding: 20px 30px;\r\n  background-color: rgb(248,248,255);/* Microsoft Edge */\r\n  background: rgba(248,248,255,0.65);\r\n  border-radius: 10px;\r\n}\r\n#naslov{\r\n  font-size: 4.0em;\r\n  margin-top: 30px;\r\n}\r\n#headline-p{\r\n  margin-bottom: 30px;\r\n  font-size: 1.5em;\r\n}\r\n#forgot_pass{\r\n  color: white;\r\n}\r\n#button-submit{\r\n  background-color: rgba(220,53,64,0.5);\r\n  color: white;\r\n}\r\n.information{\r\n  display: none;\r\n}\r\n.infos{\r\n  display: block;\r\n}\r\n.validate-warning{\r\n  color: red;\r\n}\r\n.validate-login-warning{\r\n  color: white;\r\n}\r\n@media (max-width: 415px){\r\n  #naslov{\r\n    font-size: 2.7em;\r\n    margin-top: 30px;\r\n  }\r\n  #headline-p{\r\n    margin-bottom: 30px;\r\n    font-size: 1.0em;\r\n  }\r\n  .instruction{\r\n    font-size: 0.7em;\r\n  }\r\n}\r\n.astext {\r\n  background: none;\r\n  border: none;\r\n  margin: 0;\r\n  padding: 0;\r\n  cursor: pointer;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva29tcG9uZW50ZS9wcmlqYXZhL3ByaWphdmEuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsWUFBWTtFQUNaLDBEQUEwRDtFQUMxRCxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtDQUFrQyxDQUFDLG1CQUFtQjtFQUN0RCxrQ0FBa0M7RUFDbEMsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLHFDQUFxQztFQUNyQyxZQUFZO0FBQ2Q7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFO0lBQ0UsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0UsbUJBQW1CO0lBQ25CLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0UsZ0JBQWdCO0VBQ2xCO0FBQ0Y7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osU0FBUztFQUNULFVBQVU7RUFDVixlQUFlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAva29tcG9uZW50ZS9wcmlqYXZhL3ByaWphdmEuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHl7XHJcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbn1cclxuaW5wdXQge1xyXG4gIHBhZGRpbmc6MTBweDtcclxuICBmb250LWZhbWlseTogRm9udEF3ZXNvbWUsIFwiT3BlbiBTYW5zXCIsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgYm9yZGVyLXJhZGl1czozcHg7XHJcbn1cclxuaW5wdXRbdHlwZT0nc3VibWl0J117XHJcbiAgY29sb3I6d2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG59XHJcbi5sb2dpbi1mb3JtLCAuc2lnbnVwLWZvcm17XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG4jbG9naW57XHJcbiAgcGFkZGluZzogNTBweCAxNXB4O1xyXG4gIGJhY2tncm91bmQ6ICM1MjdBNzg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuI2xvZ2luX2VtYWlsX3dhcm5pbmd7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG4jbG9naW5fcGFzc3dvcmRfd2FybmluZ3tcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbiNzaWduaW57XHJcbiAgcGFkZGluZzogMjBweCAzMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDgsMjQ4LDI1NSk7LyogTWljcm9zb2Z0IEVkZ2UgKi9cclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI0OCwyNDgsMjU1LDAuNjUpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbn1cclxuI25hc2xvdntcclxuICBmb250LXNpemU6IDQuMGVtO1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbn1cclxuI2hlYWRsaW5lLXB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICBmb250LXNpemU6IDEuNWVtO1xyXG59XHJcbiNmb3Jnb3RfcGFzc3tcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuI2J1dHRvbi1zdWJtaXR7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMjAsNTMsNjQsMC41KTtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuLmluZm9ybWF0aW9ue1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuLmluZm9ze1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbi52YWxpZGF0ZS13YXJuaW5ne1xyXG4gIGNvbG9yOiByZWQ7XHJcbn1cclxuLnZhbGlkYXRlLWxvZ2luLXdhcm5pbmd7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA0MTVweCl7XHJcbiAgI25hc2xvdntcclxuICAgIGZvbnQtc2l6ZTogMi43ZW07XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gIH1cclxuICAjaGVhZGxpbmUtcHtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgICBmb250LXNpemU6IDEuMGVtO1xyXG4gIH1cclxuICAuaW5zdHJ1Y3Rpb257XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gIH1cclxufVxyXG4uYXN0ZXh0IHtcclxuICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/komponente/prijava/prijava.component.html":
/*!***********************************************************!*\
  !*** ./src/app/komponente/prijava/prijava.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"box\" class=\"container\">\r\n  <div class=\"col-lg-5 col-md-5 col-sm-12 col-xs-12\" id=\"login\">\r\n\r\n    <h2 class=\"text-center text-white\">Login</h2>\r\n    <!-- LogIn -->\r\n    <div class=\"login-form\">\r\n      <form id=\"login-form\" (submit)=\"prijaviUporabnika()\">\r\n        <div class=\"form-group\">\r\n          <input class=\"form-control form-control-lg\" type=\"email\" [(ngModel)]=\"prijavljenUporabnik.email\" placeholder=\"&#xf0e0; Elektronski naslov\" name=\"email\">\r\n          <div *ngIf=\"submitedPrijava\">\r\n            <div *ngIf=\"prijavljenUporabnik.email== '' \" class=\"text-danger\">Prosim napišite elektronski naslov!</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <input type=\"password\" class=\"form-control form-control-lg\" [(ngModel)]=\"prijavljenUporabnik.geslo\" placeholder=\"&#xf023; Geslo\" name=\"geslo\">\r\n          <div *ngIf=\"submitedPrijava\">\r\n            <div *ngIf=\"prijavljenUporabnik.geslo== '' \" class=\"text-danger\">Prosim napišite elektronski naslov!</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <button type=\"submit\" class=\"form-control form-control-lg bg-danger\">Prijava</button>\r\n        </div>\r\n        <div *ngIf=\"napakaPriPrijavi\" class=\"alert alert-danger\">{{napakaPriPrijavi}}</div>\r\n      </form>\r\n      <button class=\"astext\" (click)=\"router.navigate(['registracija'])\">Nimate računa? Registrirajte se!</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/komponente/prijava/prijava.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/komponente/prijava/prijava.component.ts ***!
  \*********************************************************/
/*! exports provided: PrijavaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrijavaComponent", function() { return PrijavaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _storitve_avtentikacija_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../storitve/avtentikacija.service */ "./src/app/storitve/avtentikacija.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");





var PrijavaComponent = /** @class */ (function () {
    function PrijavaComponent(avtentikacijaService, router, title) {
        this.avtentikacijaService = avtentikacijaService;
        this.router = router;
        this.title = title;
        this.prijavljenUporabnik = {
            email: '',
            geslo: ''
        };
        this.submitedPrijava = false;
        this.napakaPriPrijavi = '';
        title.setTitle("Prijava");
    }
    PrijavaComponent.prototype.validacijaPrijava = function () {
        // tslint:disable-next-line:max-line-length
        if (this.prijavljenUporabnik.geslo && this.prijavljenUporabnik.email) {
            return true;
        }
        else {
            this.submitedPrijava = true;
            return false;
        }
    };
    PrijavaComponent.prototype.prijaviUporabnika = function () {
        var _this = this;
        this.napakaPriPrijavi = '';
        if (this.validacijaPrijava()) {
            //log uporabnika
            console.log(this.prijavljenUporabnik);
            this.avtentikacijaService.prijava(this.prijavljenUporabnik).then(function () {
                //this.avtentikacijaService.posodobiDatumPrijave();
                _this.router.navigateByUrl('/');
            }).catch(function (sporocilo) { _this.napakaPriPrijavi = 'Napačno geslo!'; });
        }
    };
    PrijavaComponent.prototype.ngOnInit = function () {
    };
    PrijavaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-prijava',
            template: __webpack_require__(/*! ./prijava.component.html */ "./src/app/komponente/prijava/prijava.component.html"),
            styles: [__webpack_require__(/*! ./prijava.component.css */ "./src/app/komponente/prijava/prijava.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_avtentikacija_service__WEBPACK_IMPORTED_MODULE_3__["AvtentikacijaService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Title"]])
    ], PrijavaComponent);
    return PrijavaComponent;
}());



/***/ }),

/***/ "./src/app/komponente/registracija/registracija.component.css":
/*!********************************************************************!*\
  !*** ./src/app/komponente/registracija/registracija.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body{\r\n  padding-bottom: 30px;\r\n}\r\ninput {\r\n  padding:10px;\r\n  font-family: FontAwesome, \"Open Sans\", Verdana, sans-serif;\r\n  border-radius:3px;\r\n}\r\ninput[type='submit']{\r\n  color:white;\r\n  border: none;\r\n}\r\n.login-form, .signup-form{\r\n  margin-top: 20px;\r\n}\r\n#login{\r\n  padding: 50px 15px;\r\n  background: #527A78;\r\n  border-radius: 10px;\r\n  text-align: center;\r\n}\r\n#login_email_warning{\r\n  text-align: left;\r\n}\r\n#login_password_warning{\r\n  text-align: left;\r\n}\r\n#signin{\r\n  padding: 20px 30px;\r\n  background-color: rgb(248,248,255);/* Microsoft Edge */\r\n  background: rgba(248,248,255,0.65);\r\n  border-radius: 10px;\r\n}\r\n#naslov{\r\n  font-size: 4.0em;\r\n  margin-top: 30px;\r\n}\r\n#headline-p{\r\n  margin-bottom: 30px;\r\n  font-size: 1.5em;\r\n}\r\n#forgot_pass{\r\n  color: white;\r\n}\r\n#button-submit{\r\n  background-color: rgba(220,53,64,0.5);\r\n  color: white;\r\n}\r\n.information{\r\n  display: none;\r\n}\r\n.infos{\r\n  display: block;\r\n}\r\n.validate-warning{\r\n  color: red;\r\n}\r\n.validate-login-warning{\r\n  color: white;\r\n}\r\n@media (max-width: 415px){\r\n  #naslov{\r\n    font-size: 2.7em;\r\n    margin-top: 30px;\r\n  }\r\n  #headline-p{\r\n    margin-bottom: 30px;\r\n    font-size: 1.0em;\r\n  }\r\n  .instruction{\r\n    font-size: 0.7em;\r\n  }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva29tcG9uZW50ZS9yZWdpc3RyYWNpamEvcmVnaXN0cmFjaWphLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLFlBQVk7RUFDWiwwREFBMEQ7RUFDMUQsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixrQ0FBa0MsQ0FBQyxtQkFBbUI7RUFDdEQsa0NBQWtDO0VBQ2xDLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxxQ0FBcUM7RUFDckMsWUFBWTtBQUNkO0FBQ0E7RUFDRSxhQUFhO0FBQ2Y7QUFDQTtFQUNFLGNBQWM7QUFDaEI7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRTtJQUNFLGdCQUFnQjtJQUNoQixnQkFBZ0I7RUFDbEI7RUFDQTtJQUNFLG1CQUFtQjtJQUNuQixnQkFBZ0I7RUFDbEI7RUFDQTtJQUNFLGdCQUFnQjtFQUNsQjtBQUNGIiwiZmlsZSI6InNyYy9hcHAva29tcG9uZW50ZS9yZWdpc3RyYWNpamEvcmVnaXN0cmFjaWphLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5e1xyXG4gIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG59XHJcbmlucHV0IHtcclxuICBwYWRkaW5nOjEwcHg7XHJcbiAgZm9udC1mYW1pbHk6IEZvbnRBd2Vzb21lLCBcIk9wZW4gU2Fuc1wiLCBWZXJkYW5hLCBzYW5zLXNlcmlmO1xyXG4gIGJvcmRlci1yYWRpdXM6M3B4O1xyXG59XHJcbmlucHV0W3R5cGU9J3N1Ym1pdCdde1xyXG4gIGNvbG9yOndoaXRlO1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG4ubG9naW4tZm9ybSwgLnNpZ251cC1mb3Jte1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuI2xvZ2lue1xyXG4gIHBhZGRpbmc6IDUwcHggMTVweDtcclxuICBiYWNrZ3JvdW5kOiAjNTI3QTc4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbiNsb2dpbl9lbWFpbF93YXJuaW5ne1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuI2xvZ2luX3Bhc3N3b3JkX3dhcm5pbmd7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG4jc2lnbmlue1xyXG4gIHBhZGRpbmc6IDIwcHggMzBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LDI0OCwyNTUpOy8qIE1pY3Jvc29mdCBFZGdlICovXHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNDgsMjQ4LDI1NSwwLjY1KTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59XHJcbiNuYXNsb3Z7XHJcbiAgZm9udC1zaXplOiA0LjBlbTtcclxuICBtYXJnaW4tdG9wOiAzMHB4O1xyXG59XHJcbiNoZWFkbGluZS1we1xyXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgZm9udC1zaXplOiAxLjVlbTtcclxufVxyXG4jZm9yZ290X3Bhc3N7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbiNidXR0b24tc3VibWl0e1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjIwLDUzLDY0LDAuNSk7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbi5pbmZvcm1hdGlvbntcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcbi5pbmZvc3tcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4udmFsaWRhdGUtd2FybmluZ3tcclxuICBjb2xvcjogcmVkO1xyXG59XHJcbi52YWxpZGF0ZS1sb2dpbi13YXJuaW5ne1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDogNDE1cHgpe1xyXG4gICNuYXNsb3Z7XHJcbiAgICBmb250LXNpemU6IDIuN2VtO1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICB9XHJcbiAgI2hlYWRsaW5lLXB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gICAgZm9udC1zaXplOiAxLjBlbTtcclxuICB9XHJcbiAgLmluc3RydWN0aW9ue1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/komponente/registracija/registracija.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/komponente/registracija/registracija.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"box\" class=\"container\">\r\n  <div class=\"col-lg-7 col-md-7 col-sm-12 col-xs-12\" id=\"signin\">\r\n    <h2 class=\"text-center\">Sign Up</h2>\r\n    <!-- Sign Up -->\r\n    <div class=\"signup-form\">\r\n      <form (submit)=\"izvediRegistracijo()\" id=\"signup-form\" autocomplete=\"off\">\r\n        <div class=\"form-group\">\r\n          <input type=\"text\" [(ngModel)]=\"novUporabnik.ime\" (keyup)=\"OnInputIme($event)\" class=\"form-control form-control-lg\" placeholder=\"&#xf007; Ime \" name=\"ime\">\r\n          <div *ngIf=\"submited\">\r\n            <div *ngIf=\"novUporabnik.ime== '' \" class=\"text-danger\">Prosim napišite ime uporabnika!</div>\r\n            <div *ngIf=\"niUstreznoIme == true && novUporabnik.ime != '' \" class=\"text-danger\">Neveljaven vnos imena! <br> Filter: Xxxxx Yyyyy</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <input type=\"text\" [(ngModel)]=\"novUporabnik.priimek\" (keyup)=\"OnInputPriimek($event)\" class=\"form-control form-control-lg\" placeholder=\"&#xf007; Priimek\" name=\"priimek\">\r\n          <div *ngIf=\"submited\">\r\n            <div *ngIf=\"novUporabnik.priimek== '' \" class=\"text-danger\">Prosim napišite priimek uporabnika!</div>\r\n            <div *ngIf=\"niUstrezenPriimek == true && novUporabnik.priimek != '' \" class=\"text-danger\">Neveljaven vnos priimka! <br> Filter: Xxxxx Yyyyy</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <input type=\"text\" [(ngModel)]=\"novUporabnik.uporabniskoIme\" class=\"form-control form-control-lg\" placeholder=\"&#xf2bd; Uporabniško ime\" name=\"username\">\r\n          <div *ngIf=\"submited\">\r\n            <div *ngIf=\"novUporabnik.uporabniskoIme== '' \" class=\"text-danger\">Prosim napišite uporabniško ime uporabnika!</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <input class=\"form-control form-control-lg\" type=\"email\" (keyup)=\"OnInputEmail($event)\" [(ngModel)]=\"novUporabnik.email\" placeholder=\"&#xf0e0; Elektronski naslov\" name=\"email\">\r\n          <div *ngIf=\"submited\">\r\n            <div *ngIf=\"novUporabnik.email== '' \" class=\"text-danger\">Prosim napišite elektronski naslov!</div>\r\n            <div *ngIf=\"niUstrezenEmail == true && novUporabnik.email != '' \" class=\"text-danger\">Neveljaven vnos elektronskega naslova!</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <input type=\"password\" [(ngModel)]=\"novUporabnik.geslo\"  (keyup)=\"OnInputGeslo($event)\"class=\"form-control form-control-lg\" placeholder=\"&#xf023; Geslo\" name=\"geslo\">\r\n          <div *ngIf=\"submited\">\r\n            <div *ngIf=\"novUporabnik.geslo== '' \" class=\"text-danger\">Prosim izberite geslo!</div>\r\n            <div *ngIf=\"niUstreznoGeslo == true && novUporabnik.geslo != '' \" class=\"text-danger\">Geslo mora biti dolgo vsaj 8 znakov!</div>\r\n            <div *ngIf=\"ponovljenoGeslo != novUporabnik.geslo\" class=\"text-danger\">Gesli se morata ujemati!</div>\r\n          </div>\r\n          <input type=\"password\" (keyup)=\"OnInput($event)\" class=\"form-control form-control-lg mt-3\" placeholder=\"&#xf023; Ponovi geslo\" name=\"ponovigeslo\">\r\n          <div *ngIf=\"submited\">\r\n            <div *ngIf=\"ponovljenoGeslo != novUporabnik.geslo\" class=\"text-danger\">Gesli se morata ujemati!</div>\r\n          </div>\r\n\r\n          <p class=\"mb-1\"><i class=\"far fa-question-circle\" id=\"info-circle\" class=\"text-info\"></i> password information.</p>\r\n          <div class=\"information\">\r\n            <p class=\" instruction text-muted mb-0\">Your password must contain at least 8 letters!</p>\r\n            <p class=\" instruction text-muted mt-1\">Your password must contain at least one Upper and Lower case letter and at least one number!</p>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <button id=\"button-submit\" type=\"submit\" class=\"form-control form-control-lg\">Registracija</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/komponente/registracija/registracija.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/komponente/registracija/registracija.component.ts ***!
  \*******************************************************************/
/*! exports provided: RegistracijaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistracijaComponent", function() { return RegistracijaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _storitve_avtentikacija_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../storitve/avtentikacija.service */ "./src/app/storitve/avtentikacija.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");





var RegistracijaComponent = /** @class */ (function () {
    function RegistracijaComponent(avtentikacijaService, router, title) {
        this.avtentikacijaService = avtentikacijaService;
        this.router = router;
        this.title = title;
        this.novUporabnik = {
            uporabniskoIme: '',
            ocena: '0',
            denar: 0,
            geslo: '',
            email: '',
            ime: '',
            priimek: '',
            datumPrijave: new Date()
        };
        this.submited = false;
        this.ponovljenoGeslo = '';
        this.niUstreznoIme = false;
        this.niUstrezenPriimek = false;
        this.niUstrezenEmail = false;
        this.niUstreznoGeslo = false;
        title.setTitle("Registracija");
    }
    RegistracijaComponent.prototype.validacijaRegistracija = function () {
        // tslint:disable-next-line:max-line-length
        // console.log('PONOVLJENO: ' + this.ponovljenoGeslo + ' || PRVOTNO: ' + this.novUporabnik.geslo);
        // tslint:disable-next-line:max-line-length
        if (this.novUporabnik.uporabniskoIme && this.novUporabnik.geslo && this.novUporabnik.email && this.novUporabnik.ime && this.novUporabnik.priimek && this.ponovljenoGeslo === this.novUporabnik.geslo
            && !this.niUstreznoGeslo && !this.niUstreznoIme && !this.niUstrezenPriimek && !this.niUstrezenEmail) {
            return true;
        }
        else {
            this.submited = true;
            return false;
        }
    };
    RegistracijaComponent.prototype.OnInput = function (event) {
        this.ponovljenoGeslo = event.target.value;
    };
    RegistracijaComponent.prototype.OnInputGeslo = function (event) {
        var gesloRegx = /^.{8,}$/;
        if (!gesloRegx.test(this.novUporabnik.geslo)) {
            this.niUstreznoGeslo = true;
        }
        else {
            this.niUstreznoGeslo = false;
        }
    };
    RegistracijaComponent.prototype.OnInputEmail = function (event) {
        // tslint:disable-next-line:max-line-length
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test(this.novUporabnik.email)) {
            this.niUstrezenEmail = true;
        }
        else {
            this.niUstrezenEmail = false;
        }
    };
    RegistracijaComponent.prototype.OnInputIme = function (event) {
        var validacijaIme = /^[A-Z][a-z]*$/;
        if (!validacijaIme.test(this.novUporabnik.ime)) {
            this.niUstreznoIme = true;
        }
        else {
            this.niUstreznoIme = false;
        }
    };
    RegistracijaComponent.prototype.OnInputPriimek = function (event) {
        var validacijaPriimek = /^[A-Z][a-z]*$/;
        if (!validacijaPriimek.test(this.novUporabnik.priimek)) {
            this.niUstreznoIme = true;
        }
        else {
            this.niUstreznoIme = false;
        }
    };
    RegistracijaComponent.prototype.izvediRegistracijo = function () {
        var _this = this;
        if (this.validacijaRegistracija()) {
            console.log(this.novUporabnik);
            this.avtentikacijaService.registracija(this.novUporabnik).then(function () {
                _this.router.navigateByUrl('/').catch(function (sporocilo) { return _this.napaka = sporocilo; });
            });
        }
    };
    RegistracijaComponent.prototype.ngOnInit = function () {
    };
    RegistracijaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-registracija',
            template: __webpack_require__(/*! ./registracija.component.html */ "./src/app/komponente/registracija/registracija.component.html"),
            styles: [__webpack_require__(/*! ./registracija.component.css */ "./src/app/komponente/registracija/registracija.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_avtentikacija_service__WEBPACK_IMPORTED_MODULE_3__["AvtentikacijaService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Title"]])
    ], RegistracijaComponent);
    return RegistracijaComponent;
}());



/***/ }),

/***/ "./src/app/komponente/uredi-profil/uredi-profil.component.css":
/*!********************************************************************!*\
  !*** ./src/app/komponente/uredi-profil/uredi-profil.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2tvbXBvbmVudGUvdXJlZGktcHJvZmlsL3VyZWRpLXByb2ZpbC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/komponente/uredi-profil/uredi-profil.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/komponente/uredi-profil/uredi-profil.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"uporabnik\">\r\n   <!-- form -->\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-md-12 col-12\">\r\n      <form (ngSubmit)=\"urediProfil()\">\r\n        <div id=\"form1\">\r\n          <div id=\"form\">\r\n            <div class=\"form-group\">\r\n              <h2 id=\"naslovUrejanjeDogodka\">Urejanje Profila</h2>\r\n              <label for=\"uporabniskoIme\">Spremeni Uporabniško ime:</label>\r\n              <input id=\"uporabniskoIme\" [(ngModel)]=\"editUporabnik.uporabniskoIme\" value=\"{{uporabnik.uporabniskoIme}}\" name=\"naslov\" type=\"text\" class=\"form-control\" placeholder=\"Uporabnisko ime\">\r\n              <div *ngIf=\"submited\">\r\n                <div *ngIf=\"editUporabnik.uporabniskoIme== '' \" class=\"text-danger\">Prosim vnesite uporabnisko ime!</div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\">\r\n              <label for=\"ime\">Imena ni mogoče spreminjati!</label>\r\n              <input type=\"text\" id=\"ime\" name=\"avtor\" value=\"{{uporabnik.ime}}\" class=\"form-control\" rows=\"1\" placeholder=\"Ime\" disabled>\r\n\r\n            </div>\r\n\r\n            <div class=\"form-group\">\r\n              <label for=\"priimek\">Priimka ni mogoče spreminjati!</label>\r\n              <input type=\"text\" id=\"priimek\" name=\"avtor\" value=\"{{uporabnik.priimek}}\" class=\"form-control\" rows=\"1\" placeholder=\"Priimek\" disabled>\r\n            </div>\r\n\r\n            <div class=\"form-group\">\r\n              <label for=\"email\">Spremeni Email:</label>\r\n              <input id=\"email\" [(ngModel)]=\"editUporabnik.email\" value=\"{{uporabnik.email}}\" name=\"email\" type=\"text\" class=\"form-control\" placeholder=\"Email\">\r\n              <div *ngIf=\"submited\">\r\n                <div *ngIf=\"editUporabnik.uporabniskoIme== '' \" class=\"text-danger\">Prosim vnesite email!</div>\r\n              </div>\r\n            </div>\r\n\r\n            <br>\r\n            <button id=\"shrSprBtn\" type=\"submit\" class=\"btn btn-warning\">Shrani Spremembe</button>\r\n            <!--<button id=\"pocistiBtn\" type=\"reset\" class=\"btn btn-secondary\" value=\"Reset\">Počisti</button> -->\r\n\r\n          </div>\r\n        </div>\r\n      </form>\r\n      <div>\r\n        <button id=\"nazajBtn\" class=\"btn btn-primary\"><a routerLink=\"profil\">Nazaj</a></button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/komponente/uredi-profil/uredi-profil.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/komponente/uredi-profil/uredi-profil.component.ts ***!
  \*******************************************************************/
/*! exports provided: UrediProfilComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrediProfilComponent", function() { return UrediProfilComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../storitve/streznik-podatki.service */ "./src/app/storitve/streznik-podatki.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");






var UrediProfilComponent = /** @class */ (function () {
    function UrediProfilComponent(streznikPodatkiService, pot, router, title) {
        this.streznikPodatkiService = streznikPodatkiService;
        this.pot = pot;
        this.router = router;
        this.title = title;
        this.submited = false;
        this.editUporabnik = {
            uporabniskoIme: '',
            email: ''
        };
        title.setTitle("Uredi profil");
    }
    UrediProfilComponent.prototype.validacija = function () {
        // ce so podatki obrazca prazni
        if (this.editUporabnik.uporabniskoIme && this.editUporabnik.email) {
            return true;
        }
        this.submited = true;
        return false;
    };
    //   if (this.validacija()) {
    //   this.sportyeetPodatkiService.posodobiDogodek(this.dogodek._id, this.editDogodek)
    // .then((dogodek: any) => {
    //   console.log('Dogodek posodobljen', dogodek);
    //   this.router.navigate(['/dogodek/' + this.dogodek._id]);
    // }
    // );
    // }
    //
    UrediProfilComponent.prototype.urediProfil = function () {
        var _this = this;
        if (this.validacija()) {
            console.log("Uredi profil ts: " + this.editUporabnik.uporabniskoIme);
            this.uporabnik.uporabniskoIme = this.editUporabnik.uporabniskoIme;
            this.uporabnik.email = this.editUporabnik.email;
            this.streznikPodatkiService.posodobiProfil(this.uporabnik._id, this.uporabnik)
                .then(function (uporabnik) {
                console.log('Uporabnik posodobljen', uporabnik);
                _this.router.navigate(['profil']);
            });
        }
    };
    UrediProfilComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pot.paramMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (params) {
            var id = params.get('idUporabnika');
            console.log("OnInit uredi profil " + id);
            return _this.streznikPodatkiService.pridobiUporabnika(id);
        }))
            .subscribe(function (uporabnik) {
            _this.uporabnik = uporabnik;
            console.log(uporabnik);
            _this.editUporabnik.uporabniskoIme = _this.uporabnik.uporabniskoIme;
            _this.editUporabnik.email = _this.uporabnik.email;
        });
    };
    UrediProfilComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-uredi-profil',
            template: __webpack_require__(/*! ./uredi-profil.component.html */ "./src/app/komponente/uredi-profil/uredi-profil.component.html"),
            styles: [__webpack_require__(/*! ./uredi-profil.component.css */ "./src/app/komponente/uredi-profil/uredi-profil.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_2__["StreznikPodatkiService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"]])
    ], UrediProfilComponent);
    return UrediProfilComponent;
}());



/***/ }),

/***/ "./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.css":
/*!************************************************************************!*\
  !*** ./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".headerRow {\r\n  background-color: rgba(211,211,211,0.8);\r\n  margin-top: 20px;\r\n  height: 60px;\r\n  display: flex;\r\n  align-items: center;\r\n  overflow: hidden;\r\n}\r\n\r\n.imePriimekUporabnika, .datumZadnjePrijave {\r\n  font-weight: bold;\r\n  text-align: center;\r\n  font-size: 16pt;\r\n  width: 30vw;\r\n  float: left;\r\n}\r\n\r\n.datumZadnjePrijave {\r\n  position: absolute;\r\n  margin-left: 30vw;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva29tcG9uZW50ZS92c2ktdXBvcmFibmlraS92c2ktdXBvcmFibmlraS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsdUNBQXVDO0VBQ3ZDLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixXQUFXO0VBQ1gsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2tvbXBvbmVudGUvdnNpLXVwb3JhYm5pa2kvdnNpLXVwb3JhYm5pa2kuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJSb3cge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjExLDIxMSwyMTEsMC44KTtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIGhlaWdodDogNjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmltZVByaWltZWtVcG9yYWJuaWthLCAuZGF0dW1aYWRuamVQcmlqYXZlIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxNnB0O1xyXG4gIHdpZHRoOiAzMHZ3O1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG59XHJcblxyXG4uZGF0dW1aYWRuamVQcmlqYXZlIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luLWxlZnQ6IDMwdnc7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n\r\n  <div *ngIf=\"uporabniki?.length > 0 else elseBlock\">\r\n    <div class=\"headerRow\">\r\n      <div class=\"imePriimekUporabnika\">Ime in priimek uporabnika</div>\r\n      <div class=\"datumZadnjePrijave\">Datum zadnje prijave</div>\r\n    </div>\r\n    <app-podrobnosti-uporabnika *ngFor=\"let uporabnik of uporabniki\"\r\n                                [uporabnik]=\"uporabnik\">\r\n    </app-podrobnosti-uporabnika>\r\n  </div>\r\n  <ng-template #elseBlock>Ni uporabnikov</ng-template>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.ts ***!
  \***********************************************************************/
/*! exports provided: VsiUporabnikiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VsiUporabnikiComponent", function() { return VsiUporabnikiComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../storitve/streznik-podatki.service */ "./src/app/storitve/streznik-podatki.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");






var VsiUporabnikiComponent = /** @class */ (function () {
    function VsiUporabnikiComponent(streznikPodatki, route, title) {
        this.streznikPodatki = streznikPodatki;
        this.route = route;
        this.title = title;
        title.setTitle("Vsi uporabniki");
    }
    VsiUporabnikiComponent.prototype.getVsiUporabniki = function () {
        var _this = this;
        this.route.paramMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (params) {
            return _this.streznikPodatki.vrniVseUporabnike();
        })).subscribe(function (najdeniUporabniki) {
            _this.uporabniki = najdeniUporabniki;
        });
    };
    VsiUporabnikiComponent.prototype.ngOnInit = function () {
        this.getVsiUporabniki();
    };
    VsiUporabnikiComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vsi-uporabniki',
            template: __webpack_require__(/*! ./vsi-uporabniki.component.html */ "./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.html"),
            styles: [__webpack_require__(/*! ./vsi-uporabniki.component.css */ "./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storitve_streznik_podatki_service__WEBPACK_IMPORTED_MODULE_2__["StreznikPodatkiService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"]])
    ], VsiUporabnikiComponent);
    return VsiUporabnikiComponent;
}());



/***/ }),

/***/ "./src/app/moduli/app-usmerjanje/app-usmerjanje.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/moduli/app-usmerjanje/app-usmerjanje.module.ts ***!
  \****************************************************************/
/*! exports provided: AppUsmerjanjeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppUsmerjanjeModule", function() { return AppUsmerjanjeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _komponente_registracija_registracija_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../komponente/registracija/registracija.component */ "./src/app/komponente/registracija/registracija.component.ts");
/* harmony import */ var _komponente_prijava_prijava_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../komponente/prijava/prijava.component */ "./src/app/komponente/prijava/prijava.component.ts");
/* harmony import */ var _komponente_ogled_profila_ogled_profila_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../komponente/ogled-profila/ogled-profila.component */ "./src/app/komponente/ogled-profila/ogled-profila.component.ts");
/* harmony import */ var _komponente_uredi_profil_uredi_profil_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../komponente/uredi-profil/uredi-profil.component */ "./src/app/komponente/uredi-profil/uredi-profil.component.ts");
/* harmony import */ var _komponente_vsi_uporabniki_vsi_uporabniki_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../komponente/vsi-uporabniki/vsi-uporabniki.component */ "./src/app/komponente/vsi-uporabniki/vsi-uporabniki.component.ts");
/* harmony import */ var _komponente_db_db_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../komponente/db/db.component */ "./src/app/komponente/db/db.component.ts");
/* harmony import */ var _komponente_domaca_stran_domaca_stran_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../komponente/domaca-stran/domaca-stran.component */ "./src/app/komponente/domaca-stran/domaca-stran.component.ts");











var poti = [
    {
        path: '',
        component: _komponente_domaca_stran_domaca_stran_component__WEBPACK_IMPORTED_MODULE_10__["DomacaStranComponent"]
    },
    {
        path: 'registracija',
        component: _komponente_registracija_registracija_component__WEBPACK_IMPORTED_MODULE_4__["RegistracijaComponent"]
    }, {
        path: 'prijava',
        component: _komponente_prijava_prijava_component__WEBPACK_IMPORTED_MODULE_5__["PrijavaComponent"]
    }, {
        path: 'profil',
        component: _komponente_ogled_profila_ogled_profila_component__WEBPACK_IMPORTED_MODULE_6__["OgledProfilaComponent"]
    }, {
        path: 'profil/:idUporabnika',
        component: _komponente_uredi_profil_uredi_profil_component__WEBPACK_IMPORTED_MODULE_7__["UrediProfilComponent"]
    }, {
        path: 'uporabniki',
        component: _komponente_vsi_uporabniki_vsi_uporabniki_component__WEBPACK_IMPORTED_MODULE_8__["VsiUporabnikiComponent"]
    }, {
        path: 'db',
        component: _komponente_db_db_component__WEBPACK_IMPORTED_MODULE_9__["DbComponent"]
    }
];
var AppUsmerjanjeModule = /** @class */ (function () {
    function AppUsmerjanjeModule() {
    }
    AppUsmerjanjeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(poti)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], AppUsmerjanjeModule);
    return AppUsmerjanjeModule;
}());



/***/ }),

/***/ "./src/app/razredi/shramba.ts":
/*!************************************!*\
  !*** ./src/app/razredi/shramba.ts ***!
  \************************************/
/*! exports provided: SHRAMBA_BRSKALNIKA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHRAMBA_BRSKALNIKA", function() { return SHRAMBA_BRSKALNIKA; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var SHRAMBA_BRSKALNIKA = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Shramba brskalnika', {
    providedIn: 'root',
    factory: function () { return localStorage; }
});


/***/ }),

/***/ "./src/app/razredi/uporabnik.ts":
/*!**************************************!*\
  !*** ./src/app/razredi/uporabnik.ts ***!
  \**************************************/
/*! exports provided: Uporabnik */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uporabnik", function() { return Uporabnik; });
var Uporabnik = /** @class */ (function () {
    function Uporabnik() {
    }
    return Uporabnik;
}());



/***/ }),

/***/ "./src/app/storitve/avtentikacija.service.ts":
/*!***************************************************!*\
  !*** ./src/app/storitve/avtentikacija.service.ts ***!
  \***************************************************/
/*! exports provided: AvtentikacijaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvtentikacijaService", function() { return AvtentikacijaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _razredi_shramba__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../razredi/shramba */ "./src/app/razredi/shramba.ts");
/* harmony import */ var _streznik_podatki_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./streznik-podatki.service */ "./src/app/storitve/streznik-podatki.service.ts");




var AvtentikacijaService = /** @class */ (function () {
    function AvtentikacijaService(shramba, streznikPodatkiStoritev) {
        this.shramba = shramba;
        this.streznikPodatkiStoritev = streznikPodatkiStoritev;
    }
    AvtentikacijaService.prototype.registracija = function (uporabnik) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // console.log(uporabnik);
                return [2 /*return*/, this.streznikPodatkiStoritev
                        .registracija(uporabnik)
                        .then(function (rezultatAvtentikacije) {
                        _this.shraniZeton(rezultatAvtentikacije["žeton"]);
                    })];
            });
        });
    };
    AvtentikacijaService.prototype.shraniZeton = function (zeton) {
        this.shramba.setItem('sportyeet-zeton', zeton);
    };
    //metode za prijavo
    AvtentikacijaService.prototype.prijava = function (uporabnik) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.streznikPodatkiStoritev
                        .prijava(uporabnik)
                        .then(function (rezultatAvtentikacije) {
                        _this.shraniZeton(rezultatAvtentikacije["žeton"]);
                    })];
            });
        });
    };
    AvtentikacijaService.prototype.odjava = function () {
        this.shramba.removeItem('sportyeet-zeton');
    };
    AvtentikacijaService.prototype.vrniZeton = function () {
        // console.log(this.shramba.getItem('sportyeet-zeton'));
        return this.shramba.getItem('sportyeet-zeton');
    };
    AvtentikacijaService.prototype.b64Utf8 = function (niz) {
        return decodeURIComponent(Array.prototype.map
            .call(atob(niz), function (znak) {
            return '%' + ('00' + znak.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
    };
    ;
    AvtentikacijaService.prototype.jePrijavljen = function () {
        var zeton = this.vrniZeton();
        // console.log(zeton);
        if (zeton) {
            var koristnaVsebina = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
            return koristnaVsebina.datumPoteka > (Date.now() / 1000);
        }
        else {
            return false;
        }
    };
    /*
    public posodobiDatumPrijave(): void {
      if (this.jePrijavljen()) {
        const zeton: string = this.vrniZeton();
        const {_id, uporabniskoIme, email, ime, priimek} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
        var pridobljen_id = _id;
        var datumPrijave = new Date();
        this.streznikPodatkiStoritev.posodobiDatumPrijave(pridobljen_id, datumPrijave);
      }
    }
    */
    AvtentikacijaService.prototype.vrniTrenutnegaUporabnika = function () {
        if (this.jePrijavljen()) {
            var zeton = this.vrniZeton();
            var _a = JSON.parse(this.b64Utf8(zeton.split('.')[1])), _id = _a._id, uporabniskoIme = _a.uporabniskoIme, email = _a.email, ime = _a.ime, priimek = _a.priimek;
            var pridobljen_id = _id;
            console.log("Pridobi id iz zetona: " + pridobljen_id);
            //return this.streznikPodatkiStoritev.pridobiUporabnika(pridobljen_id) as Uporabnik;
            // var uporabnik: Uporabnik;
            // uporabnik = this.streznikPodatkiStoritev.pridobiUporabnika(pridobljen_id);
            return { _id: _id, uporabniskoIme: uporabniskoIme, email: email, ime: ime, priimek: priimek };
            //return this.streznikPodatkiStoritev.pridobiUporabnika(pridobljen_id) as Promise<Uporabnik>
            // let uporabnik = this.streznikPodatkiStoritev.pridobiUporabnika(pridobljen_id) as Promise<Uporabnik>;
            // uporabnik.then(uporabnik => {return uporabnik});
            // return null;
        }
    };
    AvtentikacijaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_razredi_shramba__WEBPACK_IMPORTED_MODULE_2__["SHRAMBA_BRSKALNIKA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Storage,
            _streznik_podatki_service__WEBPACK_IMPORTED_MODULE_3__["StreznikPodatkiService"]])
    ], AvtentikacijaService);
    return AvtentikacijaService;
}());



/***/ }),

/***/ "./src/app/storitve/streznik-podatki.service.ts":
/*!******************************************************!*\
  !*** ./src/app/storitve/streznik-podatki.service.ts ***!
  \******************************************************/
/*! exports provided: StreznikPodatkiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreznikPodatkiService", function() { return StreznikPodatkiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var StreznikPodatkiService = /** @class */ (function () {
    function StreznikPodatkiService(http) {
        this.http = http;
        this.apiUrl = 'https://tpo-14-stockbotics.herokuapp.com/api';
    }
    // private returnHeader(): any {
    //   return {
    //     headers: new HttpHeaders({
    //       'Authorization'
    //     })
    //   }
    // }
    StreznikPodatkiService.prototype.helloWorld = function () {
        var url = this.apiUrl + "/hello-world";
        return this.http
            .get(url)
            .toPromise()
            .then(function (odgovor) { return odgovor; });
    };
    StreznikPodatkiService.prototype.vrniNapovedi = function () {
        var url = this.apiUrl + "/napovedi";
        return this.http
            .get(url)
            .toPromise()
            .then(function (napovedi) { return napovedi; });
    };
    StreznikPodatkiService.prototype.obdelajNapako = function (err) {
        console.error('Prišlo je do napake', err);
        return Promise.reject(err.message || err);
    };
    StreznikPodatkiService.prototype.registracija = function (uporabnik) {
        return this.avtentikacija('registracija', uporabnik);
    };
    StreznikPodatkiService.prototype.avtentikacija = function (urlNaslov, uporabnik) {
        var url = this.apiUrl + "/" + urlNaslov;
        // console.log(uporabnik);
        return this.http
            .post(url, uporabnik)
            .toPromise()
            .then(function (rezultat) { return rezultat; })
            .catch(this.obdelajNapako);
    };
    StreznikPodatkiService.prototype.prijava = function (uporabnik) {
        return this.avtentikacija('prijava', uporabnik);
    };
    StreznikPodatkiService.prototype.pridobiUporabnika = function (id) {
        var url = this.apiUrl + "/uporabniki/" + id;
        return this.http
            .get(url)
            .toPromise()
            .then(function (odgovor) { return odgovor; })
            .catch(this.obdelajNapako);
    };
    /*
    public posodobiDatumPrijave(idUporabnika: string, datum: any): Promise<any> {
      const url: string = `${this.apiUrl}/datum/${idUporabnika}`;
      console.log(datum);
      return this.http
        .put(url, datum)
        .toPromise()
        .then(odgovor => odgovor as any)
        .catch(this.obdelajNapako);
    }
    */
    StreznikPodatkiService.prototype.posodobiProfil = function (idUporabnika, podatkiObrazca) {
        var url = this.apiUrl + "/uporabniki/" + idUporabnika;
        console.log(podatkiObrazca);
        return this.http
            .put(url, podatkiObrazca)
            .toPromise()
            .then(function (odgovor) { return odgovor; })
            .catch(this.obdelajNapako);
    };
    StreznikPodatkiService.prototype.vrniVseUporabnike = function () {
        var url = this.apiUrl + "/uporabniki";
        return this.http
            .get(url)
            .toPromise();
    };
    StreznikPodatkiService.prototype.izbrisiUporabnika = function (idUporabnika) {
        var url = this.apiUrl + "/uporabniki/" + idUporabnika;
        return this.http
            .delete(url)
            .toPromise()
            .then(function (odgovor) { return odgovor; });
    };
    StreznikPodatkiService.prototype.vstaviDb = function () {
        var url = this.apiUrl + "/db/vstavi";
        return this.http
            .post(url, null)
            .toPromise();
    };
    StreznikPodatkiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], StreznikPodatkiService);
    return StreznikPodatkiService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    apiUrl: 'http://localhost:3000/api',
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\FRI\3. LETNIK\Poletni_semester\Tehnologija_programske_opreme\LP4-14\src\stockbotics\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map