'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* Author: Sampo Virmasalo
* Author URL: svirmasalo.fi
* Author email: info@svirmasalo.fi
* ---
* Plugin name: Lightbox anything
* Plugin description: Select element(s) to show in a lightbox and the plugin does the rest. 
* Plugin version: 0.5.0
* Date: January 13, 2017
**/

console.log('Lightbox anything: https://github.com/svirmasalo/Lightbox-anything');

/**
  If things are not working - you might be using outdated safari or 
  some other browser that is not supporting const and/or let. 
  If that happens to be the situation, just replace any const and let with var.
**/
/*Some variables*/
function init(extraObjects, extraTriggers) {

  var lightboxAnythingStates = {
    'objects': false,
    'triggers': false
  };
  var isKeyDown = false;
  var selectedElements = [];
  var globalSettings = {
    'highlightColor': 'red'
  };

  /**
  * SELECT OBJECTS TO SHOW IN A LIGHTBOX
  */
  var objectsToLightbox = [$('#a1'), $('#a2'), $('#a3'), $('#a4')];
  var triggerElements = [$('*[data-target="authorInfo"]')];

  /**
  * Add extra elements
  */
  function pushExtra(extra, array) {
    if (Array.isArray(extra)) {
      $(extra).each(function () {
        array.push(this);
      });
    } else {
      array.push(extra);
    }

    return array;
  }

  if ((typeof extraObjects === 'undefined' ? 'undefined' : _typeof(extraObjects)) === 'object') {
    pushExtra(extraObjects, objectsToLightbox);
  }
  if ((typeof extraTriggers === 'undefined' ? 'undefined' : _typeof(extraTriggers)) === 'object') {
    pushExtra(extraTriggers, triggerElements);
  }
  /**
  * Test if any of selected objects/triggers exists
  */

  function testSelected(testList, testListState) {
    $(testList).each(function () {
      if ($(this).length > 0) {
        lightboxAnythingStates[testListState] = true;
      }
      //return lightboxAnythingStates;
    });
  }

  testSelected(objectsToLightbox, 'objects');
  testSelected(triggerElements, 'triggers');

  /*The "main" function starts*/
  function lightboxAnything(singleElement, multipleElements) {
    var isMultiselect = false;

    if (multipleElements.length != 0) {
      isMultiselect = true;
    }

    var LIGHTBOX_STYLES = {
      'position': 'fixed',
      'opacity': 0,
      'top': 0,
      'left': 0,
      'bottom': 0,
      'right': 0,
      'background-color': 'rgba(3,3,3,.8)',
      'z-index': '200'
    };

    var LIGHTBOX_WRAP_ELEMENT_STYLES = {
      'position': 'absolute',
      'top': '50%',
      'left': '50%',
      'transform': 'translate(-50%,-50%)',
      'display': 'flex',
      'flex-flow': 'row wrap',
      'justify-content': 'space-around',
      'align-items': 'stretch',
      'max-height': '90%',
      'max-width': '90%',
      'background-color': 'transparent'
    };
    var ELEMENT_STYLES = {
      'position': 'absolute',
      'top': '50%',
      'left': '50%',
      'transform': 'translate(-50%,-50%)',
      'display': 'initial',
      'opacity': 0,
      'background-color': 'white',
      'padding': '1em'
    };
    var ELEMENT_STYLES_MULTISELECT = {
      'display': 'initial',
      'margin': '0 0 16px',
      'width': 'auto',
      'max-width': '45%',
      'opacity': 0,
      'background-color': 'white',
      'padding': '1em'
    };
    var CLOSE_BUTTON_STYLES = {
      'position': 'absolute',
      'top': '1rem',
      'right': '1rem'
    };
    var CLOSE_BUTTON_ATTRIBUTES = {
      'id': 'closeLightbox',
      'fontAwesome': false // If you are using Font Awesome, you might aswell set this to true.
    };

    var closeButtonText = 'X';

    if (CLOSE_BUTTON_ATTRIBUTES.fontAwesome === true) {
      closeButtonText = '<i class="fa fa-close fa-lg"></i>';
    }

    var lightboxElement = document.createElement("secondary");
    var multiselectWrapElement = document.createElement("div");
    var closeButton = document.createElement("button");

    var LIGHTBOX_ANIMATIONS = {
      opacity: 1
    };

    $(lightboxElement).appendTo("body").css(LIGHTBOX_STYLES).animate(LIGHTBOX_ANIMATIONS, 800);

    $(closeButton).appendTo(lightboxElement).css(CLOSE_BUTTON_STYLES).attr(CLOSE_BUTTON_ATTRIBUTES).html(closeButtonText);
    if (isMultiselect) {
      /**
      * append wrap to lightbox
      **/
      $(multiselectWrapElement).css(LIGHTBOX_WRAP_ELEMENT_STYLES).appendTo(lightboxElement);
      /**
      * append selected elements to lightbox
      **/
      $(multipleElements).each(function () {
        $(this).clone().appendTo(multiselectWrapElement).css(ELEMENT_STYLES_MULTISELECT).animate(LIGHTBOX_ANIMATIONS, 900);
        /*Clear box shadow*/
        $(this).css('box-shadow', '');
      });
    } else {
      $(singleElement).clone().appendTo(lightboxElement).css(ELEMENT_STYLES).animate(LIGHTBOX_ANIMATIONS, 900);
    }

    /**
    * Clear lightbox and element array
    */
    $("#closeLightbox").click(function () {
      console.log("close");
      lightboxElement.remove();
      multipleElements.length = 0;
    });
  }
  function addEventListenersToObjects() {
    if (objectsToLightbox.length != 0 && lightboxAnythingStates.objects === true) {

      $(objectsToLightbox).each(function (key, value) {

        var elementObject = value;
        /**
        * in case of previous listeners...
        */

        if (elementObject.attr('lba-event-listener') != 'true') {

          elementObject.attr('lba-event-listener', 'true');

          elementObject[0].addEventListener("click", function () {

            if (isKeyDown) {
              /*
              * Highlight selected
              */
              value.css("box-shadow", "1px 1px 5px " + globalSettings.highlightColor);
              /*
              * Send selected element to array of selected e
              */
              multiselectElements(elementObject);
            } else {
              lightboxAnything(elementObject, []);
            }
          }, false);
        }
      });
    }
  }
  addEventListenersToObjects();

  /**
  * Bind event handlers to triggers
  */

  function addEventListenersToTriggers() {
    if (triggerElements.length != 0 && lightboxAnythingStates.triggers === true) {

      $(triggerElements).each(function (key, value) {
        var _this = this;

        if ($(this).attr('lba-event-listener') != 'true') {
          (function () {

            $(_this).attr('lba-event-listener', 'true');
            /**
            * Add cursor pointer to trigger element
            */
            $(_this).css('cursor', 'pointer');
            /**
            * Bind event listener to trigger
            */
            var targetElementString = $(_this).attr("data-target");
            var targetElementObject = $('#' + targetElementString);

            value[0].addEventListener("click", function () {

              lightboxAnything(targetElementObject, []);
            });
          })();
        }
      });
    }
  }
  addEventListenersToTriggers();

  function multiselectElements(selectedElement) {
    selectedElements.push(selectedElement);
  }
  /**
  * Triggers
  */

  $(document).on("keydown", function (e) {
    if (e.originalEvent.keyCode === 17) {
      $('body').addClass("multiselect");
      isKeyDown = true;
    } else {
      void 0;
    }
  });

  $(document).on("keyup", function (e) {
    $('body').removeClass("multiselect");
    if (e.originalEvent.keyCode === 17 && selectedElements.length == 0) {
      isKeyDown = false;
    } else if (e.originalEvent.keyCode === 17 && selectedElements.length != 0) {
      lightboxAnything('', selectedElements);
      selectedElements.length = 0;
      isKeyDown = false;
    }
  });
} //! init

function addStuffToLightbox(type, stuff) {
  if (type == 'trigger') {
    init('', stuff);
  }
  if (type == 'object') {
    init(stuff, '');
  }
  console.log('extra objects or triggers added');
}

init('', '');