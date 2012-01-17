if ('jQuery') { // None of this works without jQuery

/* Global initialization script */

$(document).ready(function() {

  // Provide an extra style hook when JavaScript is available
  $("body").addClass("js");

	$("li.menu").mouseover( function() {
		$(this).addClass('sfhover');
	});
	$("li.menu").mouseout( function() {
		$(this).removeClass('sfhover');
	});

  // Set up the superfish menus	
	$("#nav, #tools, #utility .user-state").superfish({
    delay:       200,
    animation:   {height:'show'}, 
    speed:       100,
    autoArrows:  false, 
    dropShadows: false
	});
	
	$(".menu .toggle").click(function(){
    return false;
	})
  
/*
  $(document).click(function(e) {
    var node = e.target;
    while (node && !node.id) {
      node = node.offsetParent;
    };
    if (!node || (node.id != 'nav' )) {
      $("#nav-main").slideUp(100);
    };
  });
*/

  // Set up input placeholders.
  $('input[placeholder]').placeholder();

  // replace no-JS search with our built-in one
  var search = $('#site-search,#doc-search');
  search.attr('action', search.attr('data-url'))
        .removeAttr('data-url')
        .children('input[name=sitesearch]').remove();
});

/* Fake the placeholder attribute since Firefox doesn't support it. */
jQuery.fn.placeholder = function(new_value) {
  if (new_value) {
    this.attr('placeholder', new_value);
  }

  /* Bail early if we have built-in placeholder support. */
  if ('placeholder' in document.createElement('input')) {
    return this;
  }

  if (new_value && this.hasClass('placeholder')) {
    this.val('').blur();
  }

  return this.focus(function() {
    var $this = $(this),
         text = $this.attr('placeholder');  
    if ($this.val() == text) {
      $this.val('').removeClass('placeholder');
    }
  }).blur(function() {
    var $this = $(this),
         text = $this.attr('placeholder');
    if ($this.val() == '') {
      $this.val(text).addClass('placeholder');
    }
  }).each(function(){
    /* Remove the placeholder text before submitting the form. */
    var self = $(this);
    self.closest('form').submit(function() {
      if (self.hasClass('placeholder')) {
          self.val('');
      }
    });
  }).blur();
};

}
