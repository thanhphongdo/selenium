(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-834c58f2"],{2638:function(t,e,i){"use strict";function c(){return c=Object.assign||function(t){for(var e,i=1;i<arguments.length;i++)for(var c in e=arguments[i],e)Object.prototype.hasOwnProperty.call(e,c)&&(t[c]=e[c]);return t},c.apply(this,arguments)}var o=["attrs","props","domProps"],r=["class","style","directives"],n=["on","nativeOn"],a=function(t){return t.reduce((function(t,e){for(var i in e)if(t[i])if(-1!==o.indexOf(i))t[i]=c({},t[i],e[i]);else if(-1!==r.indexOf(i)){var a=t[i]instanceof Array?t[i]:[t[i]],d=e[i]instanceof Array?e[i]:[e[i]];t[i]=a.concat(d)}else if(-1!==n.indexOf(i))for(var l in e[i])if(t[i][l]){var u=t[i][l]instanceof Array?t[i][l]:[t[i][l]],p=e[i][l]instanceof Array?e[i][l]:[e[i][l]];t[i][l]=u.concat(p)}else t[i][l]=e[i][l];else if("hook"==i)for(var f in e[i])t[i][f]=t[i][f]?s(t[i][f],e[i][f]):e[i][f];else t[i]=e[i];else t[i]=e[i];return t}),{})},s=function(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}};t.exports=a},3863:function(t,e,i){"use strict";i.r(e);i("d81d");var c=i("d4ec"),o=i("bee2"),r=i("262e"),n=i("2caf"),a=i("9ab4"),s=i("60a3"),d=i("2fe1"),l=i("2f62"),u=f("computed",l["e"]),p=(f("computed",l["c"]),f("methods",l["b"]));f("methods",l["d"]);function f(t,e){function i(i,c){return Object(d["a"])((function(o,r){o[t]||(o[t]={});var n,a=(n={},n[r]=i,n);o[t][r]=void 0!==c?e(c,a)[r]:e(a)[r]}))}function c(t,e){if("string"===typeof e){var c=e,o=t;return i(c,void 0)(o,c)}var r=j(e),n=t;return i(n,r)}return c}function j(t){var e=t&&t.namespace;if("string"===typeof e)return"/"!==e[e.length-1]?e+"/":e}var h=i("df74"),b=i("b501"),v=i("c46e"),m=function(t){Object(r["a"])(i,t);var e=Object(n["a"])(i);function i(){var t;return Object(c["a"])(this,i),t=e.apply(this,arguments),t.test="Test Project",t}return Object(o["a"])(i,[{key:"mounted",value:function(){var t=this;this.showLoading(),this.getProjects().then((function(){return t.hideLoading()})).catch((function(){return t.hideLoading()}))}},{key:"render",value:function(){var t=this,e=arguments[0];return e("div",{class:"ui grid"},[e(v["a"],{attrs:{id:"create-edit-project"},on:{addRef:function(e){return t.createEditProject=e}}}),e("div",{class:"sixteen wide column tw-pb-2"},[e("div",{class:"ui grid"},[e("div",{class:"eight wide column"},[e("div",{class:"ui icon input"},[e("input",{attrs:{type:"text",placeholder:"Search..."}}),e("i",{class:"circular search link icon"})])]),e("div",{class:"eight wide column tw-text-right"},[e("button",{class:"ui blue basic button",on:{click:function(){return t.createEditProject.create()}}},["New project"])])])]),e("div",{class:"sixteen wide column tw-pb-2"},[e("div",{class:"ui grid"},[e("div",{class:"three column row"},[this.projectList.map((function(i){return e("div",{class:"column"},[e(b["a"],{attrs:{projectData:i},on:{edit:function(e){return t.createEditProject.edit(e)}}})])}))])])]),e("div",{class:"sixteen wide column tw-pb-2 tw-flex tw-justify-end tw-pt-0"},[e("div",{class:"ui pagination small menu"},[e("span",{class:"active item"},["<"]),e("span",{class:"active item"},["1"]),e("span",{class:"item"},["2"]),e("span",{class:"item"},["3"]),e("span",{class:"item"},["4"]),e("span",{class:"item"},["5"]),e("span",{class:"item"},[">"])])])])}}]),i}(h["a"]);Object(a["a"])([u("projectList")],m.prototype,"projectList",void 0),Object(a["a"])([p("getProjects")],m.prototype,"getProjects",void 0),m=Object(a["a"])([Object(s["a"])({components:{ProjectItem:b["a"],CreateEditProject:v["a"]}})],m);e["default"]=m},5530:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));i("a4d3"),i("4de4"),i("4160"),i("e439"),i("dbb4"),i("b64b"),i("159b");function c(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function o(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);e&&(c=c.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,c)}return i}function r(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?o(Object(i),!0).forEach((function(e){c(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}},b501:function(t,e,i){"use strict";var c=i("d4ec"),o=i("bee2"),r=i("262e"),n=i("2caf"),a=i("9ab4"),s=i("60a3"),d=function(t){Object(r["a"])(i,t);var e=Object(n["a"])(i);function i(){return Object(c["a"])(this,i),e.call(this)}return Object(o["a"])(i,[{key:"render",value:function(){var t=this,e=arguments[0];return e("div",{class:"tw-mb-8 tw-p-4 tw-bg-blue-200 tw-rounded-md"},[e("div",{class:"tw-text-blue-700 tw-mb-2"},[this.projectData.projectTitle]),e("div",{style:"height: 120px",class:"tw-text-blue-700 tw-p-2 tw-mb-2 tw-rounded-md tw-border tw-border-solid tw-border-blue-400 tw-italic"},[e("div",[this.projectData.projectDesc])]),e("div",{class:"tw-mb-2 tw-flex"},[e("div",{class:"tw-flex-1"},[e("button",{class:"ui icon teal basic mini button",on:{click:function(){t.$emit("edit",t.projectData)}}},[e("i",{class:"save icon"})])]),e("div",{class:"tw-flex-1 tw-text-right"},[e("button",{class:"ui icon brown basic mini button"},[e("i",{class:"trash icon"})]),e("button",{class:"ui icon teal basic mini button tw-mr-0"},[e("i",{class:"arrow alternate circle right outline icon"})])])])])}}]),i}(s["c"]);Object(a["a"])([Object(s["b"])(Object)],d.prototype,"projectData",void 0),d=Object(a["a"])([s["a"]],d),e["a"]=d},c46e:function(t,e,i){"use strict";var c=i("5530"),o=i("2638"),r=i.n(o),n=i("d4ec"),a=i("bee2"),s=i("262e"),d=i("2caf"),l=i("9ab4"),u=i("60a3"),p=i("2f62"),f=i("df74"),j=function(t){Object(s["a"])(i,t);var e=Object(d["a"])(i);function i(){return Object(n["a"])(this,i),e.call(this)}return Object(a["a"])(i,[{key:"mounted",value:function(){this.element=$("#"+this.id),this.modalSettings=this.settings||{},this.$emit("addRef",this)}},{key:"set",value:function(t){this.modalSettings=t||{}}},{key:"show",value:function(){this.element.modal(this.modalSettings).modal("show")}},{key:"hide",value:function(){this.element.modal(this.modalSettings).modal("hide")}},{key:"toggle",value:function(){this.element.modal(this.modalSettings).modal("toggle")}},{key:"call",value:function(t){this.element.modal(this.modalSettings).modal(t)}},{key:"render",value:function(){var t=arguments[0];return t("div",{attrs:{id:"modal-"+this.id}},[t("div",{attrs:{id:this.id},class:"ui modal"},[t("i",{class:"close icon"}),t("div",{class:"header"},[this.$scopedSlots.modalHeader?this.$scopedSlots.modalHeader():null]),t("div",{class:"content"},[this.$scopedSlots.modalContent?this.$scopedSlots.modalContent():null]),t("div",{class:"actions"},[this.$scopedSlots.modalActions?this.$scopedSlots.modalActions():null])])])}}]),i}(u["c"]);Object(l["a"])([Object(u["b"])(String)],j.prototype,"id",void 0),Object(l["a"])([Object(u["b"])(Object)],j.prototype,"settings",void 0),j=Object(l["a"])([u["a"]],j);var h,b=j;(function(t){t[t["CREATE"]=1]="CREATE",t[t["EDIT"]=2]="EDIT"})(h||(h={}));var v=function(t){Object(s["a"])(i,t);var e=Object(d["a"])(i);function i(){var t;return Object(n["a"])(this,i),t=e.call(this),t.projectModel={projectId:"",projectTitle:"",projectDesc:""},t}return Object(a["a"])(i,[{key:"mounted",value:function(){this.$emit("addRef",this)}},{key:"clearProjectModel",value:function(){this.currentProjectId="",this.projectModel={projectId:"",projectTitle:"",projectDesc:""}}},{key:"create",value:function(){this.clearProjectModel(),this.mode=h.CREATE,this.createProjectModal.show()}},{key:"edit",value:function(t){this.clearProjectModel(),this.mode=h.EDIT,this.currentProjectId=t.projectId,this.projectModel=t,this.createProjectModal.show()}},{key:"save",value:function(){var t=this;this.showLoading(),this.mode==h.CREATE&&this.createProject(this.projectModel).then((function(){return t.hideLoading()})).catch((function(){return t.hideLoading()})),this.mode==h.EDIT&&this.editProject({currentProjectId:this.currentProjectId,projectData:this.projectModel}).then((function(){return t.hideLoading()})).catch((function(){return t.hideLoading()})),this.clearProjectModel(),this.createProjectModal.hide()}},{key:"render",value:function(){var t=this,e=arguments[0];return e("div",[e(b,r()([{attrs:{id:"create-project",settings:{duration:500}},on:{addRef:function(e){return t.createProjectModal=e}}},{scopedSlots:{modalHeader:function(){return e("div",[t.mode==h.CREATE?"Create new":"Edit"," Project"])},modalContent:function(){return e("div",[e("form",{class:"ui form"},[e("div",{class:"field"},[e("label",["Project ID"]),e("input",r()([{on:{input:function(e){e.target.composing||t.$set(t.projectModel,"projectId",e.target.value)}},attrs:{type:"text",required:!0,name:"project-id",placeholder:"Project ID"},domProps:{value:t.projectModel.projectId}},{directives:[{name:"model",value:t.projectModel.projectId,modifiers:{}}]}]))]),e("div",{class:"field"},[e("label",["Project title"]),e("input",r()([{on:{input:function(e){e.target.composing||t.$set(t.projectModel,"projectTitle",e.target.value)}},attrs:{type:"text",name:"project-title",placeholder:"Project title"},domProps:{value:t.projectModel.projectTitle}},{directives:[{name:"model",value:t.projectModel.projectTitle,modifiers:{}}]}]))]),e("div",{class:"field"},[e("label",["Project description"]),e("textarea",r()([{on:{input:function(e){e.target.composing||t.$set(t.projectModel,"projectDesc",e.target.value)}},attrs:{type:"text",name:"project-description",placeholder:"Project description"},domProps:{value:t.projectModel.projectDesc}},{directives:[{name:"model",value:t.projectModel.projectDesc,modifiers:{}}]}]))])])])},modalActions:function(){return e("div",[e("div",{class:"ui primary button",on:{click:t.save}},["Save"]),e("div",{class:"ui cancel button",on:{click:t.clearProjectModel}},["Cancel"])])}}}]))])}}]),i}(f["a"]);v=Object(l["a"])([Object(u["a"])({components:{Modal:b},methods:Object(c["a"])({},Object(p["b"])(["createProject","editProject"]))})],v);e["a"]=v},dbb4:function(t,e,i){var c=i("23e7"),o=i("83ab"),r=i("56ef"),n=i("fc6a"),a=i("06cf"),s=i("8418");c({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var e,i,c=n(t),o=a.f,d=r(c),l={},u=0;while(d.length>u)i=o(c,e=d[u++]),void 0!==i&&s(l,e,i);return l}})},df74:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var c=i("d4ec"),o=i("bee2"),r=i("262e"),n=i("2caf"),a=i("60a3"),s=function(t){Object(r["a"])(i,t);var e=Object(n["a"])(i);function i(){return Object(c["a"])(this,i),e.apply(this,arguments)}return Object(o["a"])(i,[{key:"showLoading",value:function(){window.showLoading()}},{key:"hideLoading",value:function(){window.hideLoading()}}]),i}(a["c"])},e439:function(t,e,i){var c=i("23e7"),o=i("d039"),r=i("fc6a"),n=i("06cf").f,a=i("83ab"),s=o((function(){n(1)})),d=!a||s;c({target:"Object",stat:!0,forced:d,sham:!a},{getOwnPropertyDescriptor:function(t,e){return n(r(t),e)}})}}]);
//# sourceMappingURL=chunk-834c58f2.237db72b.js.map