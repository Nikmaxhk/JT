/*jslint browser: true*/
/*jslint jquery: true*/

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */

/*
 * One small change is: now keys are passed by object { keys: '...' }
 * Might be useful, when you want to pass some other data to your handler
 */

(function(jQuery) {

  jQuery.hotkeys = {
    version: "0.8",

    specialKeys: {
      8: "backspace",
      9: "tab",
      10: "return",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      59: ";",
      61: "=",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    },

    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": "\"",
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    },

    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: [
      "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
      "datetime-local", "search", "color", "tel"],

    options: {
      filterTextInputs: true
    }
  };

  function keyHandler(handleObj) {
    if (typeof handleObj.data === "string") {
      handleObj.data = {
        keys: handleObj.data
      };
    }

    // Only care when a possible input has been specified
    if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
      return;
    }

    var origHandler = handleObj.handler,
      keys = handleObj.data.keys.toLowerCase().split(" ");

    handleObj.handler = function(event) {
      //      Don't fire in text-accepting inputs that we didn't directly bind to
      if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) ||
          (jQuery.hotkeys.options.filterTextInputs &&
            jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) {
        return;
      }

      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
        character = String.fromCharCode(event.which).toLowerCase(),
        modif = "",
        possible = {};

      jQuery.each(["alt", "ctrl", "shift"], function(index, specialKey) {

        if (event[specialKey + 'Key'] && special !== specialKey) {
          modif += specialKey + '+';
        }
      });

      // metaKey is triggered off ctrlKey erronously
      if (event.metaKey && !event.ctrlKey && special !== "meta") {
        modif += "meta+";
      }

      if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
        modif = modif.replace("alt+ctrl+shift+", "hyper+");
      }

      if (special) {
        possible[modif + special] = true;
      }
      else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;

        // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
        if (modif === "shift+") {
          possible[jQuery.hotkeys.shiftNums[character]] = true;
        }
      }

      for (var i = 0, l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments);
        }
      }
    };
  }

  jQuery.each(["keydown", "keyup", "keypress"], function() {
    jQuery.event.special[this] = {
      add: keyHandler
    };
  });

})(jQuery || this.jQuery || window.jQuery);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Place v1.0
/// Date: 04-2015
/// by Nikmax  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///`1 Function - Replace Attr Val
function replaceAttrVal(thecss, targetId, changeAttr, newAttrVal, edited_parts){

	//Get the ID style's left px
	// var parts = thecss.split(targetId, 2);
	// 	console.log(parts[1]);
	// var parts_Attr = parts[1].split(changeAttr, 2);
	// 	console.log(parts_Attr[1]);
	// var parts_Attr_end = parts_Attr[1].indexOf(";");
	// 	console.log(parts_Attr_end);
	// var parts_Attr_val = parts_Attr[1].substring(0, parts_Attr_end);
	// 	console.log(parts_Attr_val);

	var parts = thecss.split(targetId, 2);
	var parts_end = parts[1].split('{', 2);

	if(parts_end[0].indexOf(changeAttr) == '-1'){
		//add attr if no that attr
		var edited_parts = parts[0]+targetId+changeAttr+newAttrVal+'; '+parts[1]; //.substring(1, parts[1].length)
	}else{
		//replace new attr val
		var parts_Attr = parts[1].split(changeAttr, 2);
		var parts_Attr_end = parts_Attr[1].indexOf(";");
		var parts_Attr_val = parts_Attr[1].substring(0, parts_Attr_end);
		var edited_parts = parts[0]+targetId+parts[1].replace(changeAttr+parts_Attr_val, changeAttr+newAttrVal);
	}

	return edited_parts;
	
}


function cleanInitial(e){
	if(e.css('top') == 'auto'){e.css({'bottom':'', 'top':'0'});}
	if(e.css('bottom') == 'auto'){e.css({'bottom':''});}
	if(e.css('left') == 'auto'){e.css({'right':'', 'left':'0'});}
	if(e.css('right') == 'auto'){e.css({'right':''});}
}


///////////////////////////////////////////////////////////////////////////////////
///`2 Keyboard ShortCut

$(document).bind('keydown', 'esc', function(event){
	$('.selectedobject').css('outline','');
	$('.selectedobject').removeClass('selectedobject');
});

//Show Preview
$(document).bind('keydown', 'shift+p', function(event){
	$('#p').fadeToggle();

	if($('#bg').css('opacity') < '1'){$('#bg').css('opacity','1')}
	else if($('#bg').css('opacity') == '1'){$('#bg').css('opacity','0.5')}
	else if($('#bg').css('opacity') == '0.5'){$('#bg').css('opacity','0')}
});


//Open UI
$(document).bind('keydown', 'shift+x', function(event){
	$('#nx_import').fadeToggle();
	$('#nx_export').fadeToggle();
	$('#nx_submit').fadeToggle();
	$('#nx_option1').fadeToggle();
});
$(document).bind('keydown', 'shift+a', function(event){
	$('#nx_import').fadeToggle();
	$('#nx_export').fadeToggle();
	$('#nx_submit').fadeToggle();
	$('#nx_option1').fadeToggle();
});


///`2b - Refresh or Leave page Remind
///////////////////////////////////////////////////////

$(window).bind('beforeunload', function() {
	if(/Firefox[\/\s](\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 4) {
		if(confirm("Are you sure want to leave? The data may not be saved!")) {
			history.go();
		} else {
			window.setTimeout(function() {
				window.stop();
			}, 1);
		}
	} else {
		return "The data may not be saved!";
	}
});	



//////////////////////////////////////////////////////////////////////////////////
///`3 Short form of Ready Function
$(function() {

	////////Add HTML////////////////////////////////
	$("html").append('<textarea name="" id="nx_import" class="nx_style1"></textarea><textarea name="" id="nx_export" class="nx_style1" ></textarea><input type="submit" id="nx_submit" value="Submit"><div id="nx_option1"><input type="checkbox" value="1" id="nx_checkbox_wnh">More attributes</div>');

	$('#nx_import').val('#b1{position: absolute; left: 0px; top:0; width: 300px;} \n#b2{position: absolute; left: 500px; top:0; width: 300px;} \n#b3{position: absolute; left: 200px; top:0; width: 300px;}');
	$('body').prepend('<img src="imgs/p.jpg" alt="" id="p">');
	

	////////Add CSS ////////////////////////////////
	$("#p").css({"position": "absolute", "left": "0px", "top": "0px", "opacity": "0.5", "display": "none"});
	$(".nx_style1").css({"color": "#808080", "font-family": "Arial, Helvetica, SimHei", "opacity": "0.9"});

	$("#nx_import").css({"position": "fixed", "display": "none",
	 "right": "0", "top": "100px", 
	 "width": "500px", "height": "120px", "border": "0", "padding": "10px"});

	$("#nx_export").css({"position": "fixed",  "display": "none",
	 "right": "0", "top": "248px", 
	 "width": "501px", "height": "120px", "color": "#ffffff", "background-color": "#000000", "padding": "10px", "border": "0", "height": "120px",});

	$("#nx_submit").css({"position": "fixed",  "display": "none",
	 "right": "301px", "top": "216px", "color": "#ffffff", "background-color": "#808080", "padding": "5px 13px" , "border": "0px", "cursor": "pointer"});

	$("#nx_option1").css({"position": "fixed", "font-family": "Arial, Helvetica, SimHei", "display": "none",
	 "right": "368px", "top": "216px", "width": "150px", "height": "24px", "color": "#808080", "background-color": "#fff", "z-index": "2"});

	$("textarea, input").css({"outline": "none" });


	/////////////////////////////////////////////////
	///`4 on click

	$( "#nx_submit" ).on( "click", function() {

		var thecss = $('#nx_import').val();

		$.each( $('.ui-draggable'), function() {
			if (($(this).css("position") == "absolute" || $(this).css("position") == "relative") && ($(this).css("left") != "auto" || $(this).css("top") != "auto")) {
			    //console.log($(this).attr('id')+'- left:'+$(this).css("left")+' top:'+$(this).css("top"));
			    var targetId = '#'+$(this).attr('id')+'{';

			    //Run edit function to replace the css attribute
			    //Sample: replaceAttrVal(thecss, targetId, changeAttr, newAttrVal);
				thecss = replaceAttrVal(thecss, targetId, 'top:', $(this).css("top"));
				thecss = replaceAttrVal(thecss, targetId, 'left:', $(this).css("left"));

				if($('#nx_checkbox_wnh').prop('checked')) {
					thecss = replaceAttrVal(thecss, targetId, 'height:', $(this).css("height"));
					thecss = replaceAttrVal(thecss, targetId, 'width:', $(this).css("width"));
					thecss = replaceAttrVal(thecss, targetId, 'padding:', $(this).css("padding"));
					thecss = replaceAttrVal(thecss, targetId, 'margin:', $(this).css("margin"));
				}

			}
		}); //End loop

		$('#nx_export').val(thecss);

		//SelectALL
		$('#nx_export').select();


	}); //End onClick
}); //End Ready


//==============================================================================//
//``Quick ~ JS Map
//==============================================================================//
///`1 Function - Replace Attr Val
///`2 Keyboard ShortCut
///`2b - Refresh or Leave page Remind
///`3 Short form of Ready Function
///`4 on click



