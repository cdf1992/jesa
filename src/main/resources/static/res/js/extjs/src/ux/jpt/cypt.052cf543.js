var flag=0;$("#rightArrow").click(function(){1==flag?($("#floatDivBoxs").animate({right:"-315px"},300),$(this).animate({right:"-5px"},300),$(this).css("background-position","-45px 0"),flag=0):($("#floatDivBoxs").animate({right:"0"},300),$(this).animate({right:"310px"},300),$(this).css("background-position","0px 0"),flag=1)}),$(document).ready(function(){$("#floatDivBoxs").css("right","-310px"),$("#rightArrow").css({right:"0px","background-position":"-45px 0"}),flag=0});