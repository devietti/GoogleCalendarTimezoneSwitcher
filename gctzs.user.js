// ==UserScript==
// @name           Google Calendar Timezone Switcher
// @namespace      gctzs
// @description    Allows faster switching of the alternate timezone displayed in Google Calendar
// @match          https://www.google.com/calendar/render*
// ==/UserScript==



// hat tip to http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function load(url, onLoad, onError) {
    e = document.createElement("script");
    e.setAttribute("src", url);

    if (onLoad != null) { e.addEventListener("load", onLoad); }
    if (onError != null) { e.addEventListener("error", onError); }

    document.body.appendChild(e);

    return e;
}
function execute(functionOrCode) {
    if (typeof functionOrCode === "function") {
        code = "(" + functionOrCode + ")();";
    } else {
        code = functionOrCode;
    }

    e = document.createElement("script");
    e.textContent = code;

    document.body.appendChild(e);

    return e;
}
function loadAndExecute(url, functionOrCode) {
    load(url, function() { execute(functionOrCode); });
}

/** selectedTZ is the previously-selected timezone, if there was one. This enabled persistence across page redraws, as redraws discard our modifications. */
function gctzsMain(selectedTZ) {

// http://momentjs.com/downloads/moment-timezone.min.js v0.0.1
(function(){function t(t){function n(t){t+="";var e=t.split(":"),n=~t.indexOf("-")?-1:1,s=Math.abs(+e[0]),r=parseInt(e[1],10)||0,i=parseInt(e[2],10)||0;return n*(60*s+r+i/60)}function s(t,e,s,r,i,u,a,o,h,f){this.name=t,this.startYear=+e,this.endYear=+s,this.month=+r,this.day=+i,this.dayRule=+u,this.time=n(a),this.timeRule=+o,this.offset=n(h),this.letters=f||""}function r(t,e){this.rule=e,this.start=e.start(t)}function i(t,e){return t.isLast?-1:e.isLast?1:e.start-t.start}function u(t){this.name=t,this.rules=[]}function a(e,s,r,i,u,a){var o,h="string"==typeof u?u.split("_"):[9999];for(this.name=e,this.offset=n(s),this.ruleSet=r,this.letters=i,o=0;h.length>o;o++)h[o]=+h[o];this.until=t.utc(h).subtract("m",n(a))}function o(t,e){return t.until-e.until}function h(t){this.name=d(t),this.displayName=t,this.zones=[]}function f(t){var e,n,s;for(e in t)for(s=t[e],n=0;s.length>n;n++)l(e+"	"+s[n])}function l(t){if(g[t])return g[t];var e=t.split(/\s/),n=d(e[0]),r=new s(n,e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10]);return g[t]=r,z(n).add(r),r}function d(t){return(t||"").toLowerCase().replace(/\//g,"_")}function c(t){var e,n,s;for(e in t)for(s=t[e],n=0;s.length>n;n++)p(e+"	"+s[n])}function m(t){var e;for(e in t)A[d(e)]=d(t[e])}function p(t){if(b[t])return b[t];var e=t.split(/\s/),n=d(e[0]),s=new a(n,e[1],z(e[2]),e[3],e[4],e[5]);return b[t]=s,y(e[0]).add(s),s}function z(t){return t=d(t),Y[t]||(Y[t]=new u(t)),Y[t]}function y(t){var e=d(t);return A[e]&&(e=A[e]),M[e]||(M[e]=new h(t)),M[e]}function v(t){t&&(t.zones&&c(t.zones),t.rules&&f(t.rules),t.links&&m(t.links))}var R,w=t.fn.zoneName,_=t.fn.zoneAbbr,g={},Y={},b={},M={},A={},k=1,L=2,N=7,q=8;return s.prototype={contains:function(t){return t>=this.startYear&&this.endYear>=t},start:function(e){return e=Math.min(Math.max(e,this.startYear),this.endYear),t.utc([e,this.month,this.date(e),0,this.time])},date:function(t){return this.dayRule===N?this.day:this.dayRule===q?this.lastWeekday(t):this.weekdayAfter(t)},weekdayAfter:function(e){for(var n=this.day,s=t([e,this.month,1]).day(),r=this.dayRule+1-s;n>r;)r+=7;return r},lastWeekday:function(e){var n=this.day,s=n%7,r=t([e,this.month+1,1]).day(),i=t([e,this.month,1]).daysInMonth(),u=i+(s-(r-1))-7*~~(n/7);return s>=r&&(u-=7),u}},r.prototype={equals:function(t){return t&&t.rule===this.rule?864e5>Math.abs(t.start-this.start):!1}},u.prototype={add:function(t){this.rules.push(t)},ruleYears:function(t,e){var n,s,u,a=t.year(),o=[];for(n=0;this.rules.length>n;n++)s=this.rules[n],s.contains(a)?o.push(new r(a,s)):s.contains(a+1)&&o.push(new r(a+1,s));return o.push(new r(a-1,this.lastYearRule(a-1))),e&&(u=new r(a-1,e.lastRule()),u.start=e.until.clone().utc(),u.isLast=e.ruleSet!==this,o.push(u)),o.sort(i),o},rule:function(t,e,n){var s,r,i,u,a,o=this.ruleYears(t,n),h=0;for(n&&(r=n.offset+n.lastRule().offset,i=9e4*Math.abs(r)),a=o.length-1;a>-1;a--)u=s,s=o[a],s.equals(u)||(n&&!s.isLast&&i>=Math.abs(s.start-n.until)&&(h+=r-e),s.rule.timeRule===L&&(h=e),s.rule.timeRule!==k&&s.start.add("m",-h),h=s.rule.offset+e);for(a=0;o.length>a;a++)if(s=o[a],t>=s.start&&!s.isLast)return s.rule;return R},lastYearRule:function(t){var e,n,s,r=R,i=-1e30;for(e=0;this.rules.length>e;e++)n=this.rules[e],t>=n.startYear&&(s=n.start(t),s>i&&(i=s,r=n));return r}},a.prototype={rule:function(t,e){return this.ruleSet.rule(t,this.offset,e)},lastRule:function(){return this._lastRule||(this._lastRule=this.rule(this.until)),this._lastRule},format:function(t){return this.letters.replace("%s",t.letters)}},h.prototype={zoneAndRule:function(t){var e,n,s;for(t=t.clone().utc(),e=0;this.zones.length>e&&(n=this.zones[e],!(n.until>t));e++)s=n;return[n,n.rule(t,s)]},add:function(t){this.zones.push(t),this.zones.sort(o)},format:function(t){var e=this.zoneAndRule(t);return e[0].format(e[1])},offset:function(t){var e=this.zoneAndRule(t);return-(e[0].offset+e[1].offset)}},t.updateOffset=function(t){var e;t._z&&(e=t._z.offset(t),16>Math.abs(e)&&(e/=60),t.zone(e))},t.fn.tz=function(e){return e?(this._z=y(e),this._z&&t.updateOffset(this),this):this._z?this._z.displayName:void 0},t.fn.zoneName=function(){return this._z?this._z.format(this):w.call(this)},t.fn.zoneAbbr=function(){return this._z?this._z.format(this):_.call(this)},t.tz=function(){var e,n=[],s=arguments.length-1;for(e=0;s>e;e++)n[e]=arguments[e];return t.apply(null,n).tz(arguments[s])},t.tz.add=v,t.tz.addRule=l,t.tz.addZone=p,t.tz.version=e,R=l("- 0 9999 0 0 0 0 0 0"),t}var e="0.0.1";"function"==typeof define&&define.amd?define("moment-timezone",["moment"],t):"undefined"!=typeof window&&window.moment?t(window.moment):"undefined"!=typeof module&&(module.exports=t(require("./moment")))}).apply(this);

// timezone data from http://momentjs.com/timezone/data/
// EDITING STEP 1: replace this if you are changing timezones
    moment.tz.add({zones:{"America/Chicago":["-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36","-6 US C%sT 1920 -6","-6 Chicago C%sT 1936_2_1_2 -6","-5 - EST 1936_10_15_2 -5","-6 Chicago C%sT 1942 -6","-6 US C%sT 1946 -6","-6 Chicago C%sT 1967 -6","-6 US C%sT"],"America/Los_Angeles":["-7:52:58 - LMT 1883_10_18_12_7_2 -7:52:58","-8 US P%sT 1946 -8","-8 CA P%sT 1967 -8","-8 US P%sT"],"America/New_York":["-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2","-5 US E%sT 1920 -5","-5 NYC E%sT 1942 -5","-5 US E%sT 1946 -5","-5 NYC E%sT 1967 -5","-5 US E%sT"]},rules:{US:["1918 1919 2 0 8 2 0 1 D","1918 1919 9 0 8 2 0 0 S","1942 1942 1 9 7 2 0 1 W","1945 1945 7 14 7 23 1 1 P","1945 1945 8 30 7 2 0 0 S","1967 2006 9 0 8 2 0 0 S","1967 1973 3 0 8 2 0 1 D","1974 1974 0 6 7 2 0 1 D","1975 1975 1 23 7 2 0 1 D","1976 1986 3 0 8 2 0 1 D","1987 2006 3 1 0 2 0 1 D","2007 9999 2 8 0 2 0 1 D","2007 9999 10 1 0 2 0 0 S"],Chicago:["1920 1920 5 13 7 2 0 1 D","1920 1921 9 0 8 2 0 0 S","1921 1921 2 0 8 2 0 1 D","1922 1966 3 0 8 2 0 1 D","1922 1954 8 0 8 2 0 0 S","1955 1966 9 0 8 2 0 0 S"],CA:["1948 1948 2 14 7 2 0 1 D","1949 1949 0 1 7 2 0 0 S","1950 1966 3 0 8 2 0 1 D","1950 1961 8 0 8 2 0 0 S","1962 1966 9 0 8 2 0 0 S"],NYC:["1920 1920 2 0 8 2 0 1 D","1920 1920 9 0 8 2 0 0 S","1921 1966 3 0 8 2 0 1 D","1921 1954 8 0 8 2 0 0 S","1955 1966 9 0 8 2 0 0 S"]},links:{}});

    const PRIMARY_TZ = /'timezone','([^']*)'/.exec(renderBody.toString())[1];

    /* EDITING STEP 2: this is the list of entries in the dropdown box. Each
    entry is of the form "abbreviation" : "timezone". The "abbreviation" strings
    are what get displayed in the dropdown box, and should be short strings <6
    characters. The default timezone to display is the first one in the list. */
    const TZ_OF_LABEL = {
        "sea"   :"America/Los_Angeles", 
        "chi"   :"America/Chicago",
    };

    function tzSwitch() {
        // get selected tz
        const choice = document.getElementById("tzSelect").value;
        const choiceTZ = TZ_OF_LABEL[choice];

        const tgTable = document.getElementById("tgTable");
        const primaryTZs = tgTable.getElementsByClassName("tg-time-pri");
        const secondTZs = tgTable.getElementsByClassName("tg-time-sec");
        
        if ( primaryTZs.length != secondTZs.length ) {
            alert( "TZ string arrays don't match" );
            return;
        }

        // rewrite the secondary TZ column appropriately
        for (var i = 0; i < primaryTZs.length; i++) {
            var pri = moment( primaryTZs[i].innerHTML, "ha" );
            pri.tz( PRIMARY_TZ ); // interpret time in primary tz
            var terStr = pri.tz( choiceTZ ).format( "ha" ); // compute 2nd tz
            secondTZs[i].innerHTML = terStr;
        }
    }

    var topCont = document.getElementById("topcontainerwk");
    var tzLabels = topCont.getElementsByClassName("wk-tzlabel");

    // create select
    var select = document.createElement("select");
    select.setAttribute("name", "tzSelect");
    select.setAttribute("id", "tzSelect");
    select.setAttribute("style", "-webkit-appearance:none; -moz-appearance:none; appearance:none; padding: 2px 2px 2px 2px;");
    // set an onchange handler
    select.onchange = function() { tzSwitch() };
    // create options
    for (var k in TZ_OF_LABEL) {
        var option = document.createElement("option");
        option.setAttribute("value", k);
        option.innerHTML = k;
        select.appendChild(option);
    }
    tzLabels[0].innerHTML = "";
    tzLabels[0].appendChild(select);

    /* Our additions get removed whenever the calendar gets redrawn (e.g., when
     * moving to the next day/week/month). This listener re-adds our alt tz
     * info after it gets removed. */
    select.addEventListener ("DOMNodeRemovedFromDocument", function() {
        var prev = document.getElementById("tzSelect").value;
        window.setTimeout( function(){ gctzsMain(prev); },500);
    }, false);

    // change the select to reflect the previously-selected tz if our select gets removed
    NodeList.prototype.forEach = Array.prototype.forEach;
    if (typeof selectedTZ !== "undefined") {
        select.childNodes.forEach(function(element, index){
            if ( element.value === selectedTZ ) {
                select.selectedIndex = index
            }
        });
    }
    
    // re-display tz info; changing selectedIndex doesn't trigger onchange() for us
    tzSwitch();
}

window.setTimeout( function() {
    // NB: we have to wait a little while because the 
    loadAndExecute( "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js", gctzsMain );
}, 3000 );
