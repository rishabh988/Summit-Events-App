$(document).ready(function() {
    var dateP = $('.datepicker ').datepicker().attr("placeholder", "MM/DD/YYYY");
    dateP.datepicker('setDate', new Date());
    horzSelectedRadio();
    $(".horzRadioTable input:radio").change(function() { horzSelectedRadio();})
    tcounterDefaults.max = 10000;
    $('.limit10000').textcounter(tcounterDefaults);
    tcounterDefaults.max = 3000;
    $('.limit3000').textcounter(tcounterDefaults);
});

function horzSelectedRadio() {
    $.each($(".horzRadioTable input:radio"), function() {
        horzTD = $(this).closest("td");
        if($(this).is(':checked')) {
            horzTD.addClass("selected");
        } else {
            horzTD.removeClass("selected");
        }
    });
}

var tcounterDefaults = ({
    type                     : "character",   
	max                      : 3000,
	countContainerClass      : "text-count-wrapper",  
	maximumErrorText         : "Maximum exceeded",
	displayErrorText         : true,
	stopInputAtMaximum       : true,
	countSpaces              : true, 
	countDown                : true, 
	countDownText            : "Characters remaining: %d", 
	countExtendedCharacters  : true
});




/*!
* jQuery Text Counter Plugin v0.7.0
* https://github.com/ractoon/jQuery-Text-Counter
*
* Copyright 2014 ractoon
* Released under the MIT license
*/
!function(t){t.textcounter=function(n,o){var e=this;e.$el=t(n),e.el=n,e.$el.data("textcounter",e),e.init=function(){e.options=t.extend({},t.textcounter.defaultOptions,o);var n=e.options.countDown?e.options.countDownText:e.options.counterText,r=e.options.countDown?e.options.max:0,s=t("<div/>").addClass(e.options.textCountMessageClass).html(n.replace("%d",'<span class="'+e.options.textCountClass+'">'+r+"</span>")),i=t("<div/>").addClass(e.options.countOverflowContainerClass);e.hideMessage(i),e.$container=t("<"+e.options.countContainerElement+"/>").addClass(e.options.countContainerClass).append(s).append(i),e.$text_counter=e.$container.find("span"),e.$el.after(e.$container),e.$el.bind("keyup.textcounter click.textcounter blur.textcounter focus.textcounter change.textcounter paste.textcounter",e.checkLimits).trigger("click.textcounter"),e.options.init(e.el)},e.checkLimits=function(n){var o=e.$el,r=(e.$container,o.val()),s=0,i=0,a=void 0!==n.originalEvent;if(t.isEmptyObject(r)||(s=e.textCount(r)),"auto"==e.options.max){var u=e.$el.attr("maxlength");void 0!==u&&!1!==u?e.options.max=u:e.$container.text("error: [maxlength] attribute not set")}if(i=e.options.countDown?e.options.max-s:s,e.setCount(i),e.options.min>0&&a&&(s<e.options.min?(e.setErrors("min"),e.options.minunder(e.el)):s>=e.options.min&&(e.options.mincount(e.el),e.clearErrors("min"))),-1!==e.options.max)if(s===e.options.max&&0!==e.options.max)e.options.maxcount(e.el),e.clearErrors("max");else if(s>e.options.max&&0!==e.options.max)if(e.options.stopInputAtMaximum){var c="";if("word"==e.options.type)for(var l=r.split(/[^\S\n]/g),p=0;p<l.length&&!(p>=e.options.max);)void 0!==l[p]&&(c+=l[p]+" ",p++);else{var x=e.options.twoCharCarriageReturn?e.options.max-e.twoCharCarriageReturnCount(r):e.options.max;if(e.options.countSpaces)c=r.substring(0,x);else for(var m=r.split(""),C=m.length,d=0,p=0;d<x&&p<C;)" "!==m[p]&&d++,c+=m[p++]}o.val(c.trim()),s=e.textCount(o.val()),i=e.options.countDown?e.options.max-s:s,e.setCount(i)}else e.setErrors("max");else e.options.maxunder(e.el),e.clearErrors("max")},e.textCount=function(t){return"word"==e.options.type?e.wordCount(t):e.characterCount(t)},e.wordCount=function(t){return t.trim().replace(/\s+/gi," ").split(" ").length},e.characterCount=function(t){var n=0,o=0;if(e.options.twoCharCarriageReturn&&(o=e.twoCharCarriageReturnCount(t)),n=e.options.countSpaces?t.replace(/[^\S\n|\r|\r\n]/g," ").length:t.replace(/\s/g,"").length,e.options.countExtendedCharacters){var r=t.match(/[^\x00-\xff]/gi);n=null==r?t.length:t.length+r.length}return e.options.twoCharCarriageReturn&&(n+=o),n},e.twoCharCarriageReturnCount=function(t){var n=t.match(/(\r\n|\n|\r)/g),o=0;return null!==n&&(o=n.length),o},e.setCount=function(t){e.$text_counter.text(t)},e.setErrors=function(t){var n=e.$el,o=e.$container,r="";switch(n.addClass(e.options.inputErrorClass),o.addClass(e.options.counterErrorClass),t){case"min":r=e.options.minimumErrorText;break;case"max":r=e.options.maximumErrorText,e.options.countOverflow&&e.setOverflowMessage()}e.options.displayErrorText&&(o.children(".error-text-"+t).length||o.append("<"+e.options.errorTextElement+' class="error-text error-text-'+t+'">'+r+"</"+e.options.errorTextElement+">"))},e.setOverflowMessage=function(){e.hideMessage(e.$container.find("."+e.options.textCountMessageClass)),e.removeOverflowMessage();var t=e.options.countOverflowText.replace("%d",e.textCount(e.$el.val())-e.options.max).replace("%type",e.options.type+"s"),n=e.$container.find("."+e.options.countOverflowContainerClass).append(t);e.showMessage(n)},e.removeOverflowMessage=function(){e.$container.find("."+e.options.countOverflowContainerClass).empty()},e.showMessage=function(t){t.css("display","inline")},e.hideMessage=function(t){t.css("display","none")},e.clearErrors=function(t){var n=e.$el,o=e.$container;o.children(".error-text-"+t).remove(),0==o.children(".error-text").length&&(e.removeOverflowMessage(),e.showMessage(e.$container.find("."+e.options.textCountMessageClass)),n.removeClass(e.options.inputErrorClass),o.removeClass(e.options.counterErrorClass))},e.init()},t.textcounter.defaultOptions={type:"character",min:0,max:200,countContainerElement:"div",countContainerClass:"text-count-wrapper",textCountMessageClass:"text-count-message",textCountClass:"text-count",inputErrorClass:"error",counterErrorClass:"error",counterText:"Total Count: %d",errorTextElement:"div",minimumErrorText:"Minimum not met",maximumErrorText:"Maximum exceeded",displayErrorText:!0,stopInputAtMaximum:!0,countSpaces:!1,countDown:!1,countDownText:"Remaining: %d",countExtendedCharacters:!1,twoCharCarriageReturn:!1,countOverflow:!1,countOverflowText:"Maximum %type exceeded by %d",countOverflowContainerClass:"text-count-overflow-wrapper",maxunder:function(t){},minunder:function(t){},maxcount:function(t){},mincount:function(t){},init:function(t){}},t.fn.textcounter=function(n){return this.each(function(){new t.textcounter(this,n)})}}(jQuery);

