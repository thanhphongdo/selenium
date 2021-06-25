(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-embed-embed-module"],{

/***/ "Bmfp":
/*!*********************************************!*\
  !*** ./src/app/pages/embed/embed.module.ts ***!
  \*********************************************/
/*! exports provided: EmbedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmbedModule", function() { return EmbedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _embed_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./embed.component */ "tA4K");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    {
        path: 'embed',
        component: _embed_component__WEBPACK_IMPORTED_MODULE_2__["EmbedComponent"]
    }
];
class EmbedModule {
}
EmbedModule.ɵfac = function EmbedModule_Factory(t) { return new (t || EmbedModule)(); };
EmbedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: EmbedModule });
EmbedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](EmbedModule, { declarations: [_embed_component__WEBPACK_IMPORTED_MODULE_2__["EmbedComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();


/***/ }),

/***/ "tA4K":
/*!************************************************!*\
  !*** ./src/app/pages/embed/embed.component.ts ***!
  \************************************************/
/*! exports provided: EmbedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmbedComponent", function() { return EmbedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class EmbedComponent {
    constructor() { }
    ngOnInit() {
    }
}
EmbedComponent.ɵfac = function EmbedComponent_Factory(t) { return new (t || EmbedComponent)(); };
EmbedComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EmbedComponent, selectors: [["app-embed"]], decls: 2, vars: 0, template: function EmbedComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "embed works! 222");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlbWJlZC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=pages-embed-embed-module.js.map