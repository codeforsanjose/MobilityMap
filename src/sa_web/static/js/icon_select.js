
// functions to simplify the code
var icon_selected_class = 'icon_selected';

function return_option(img){
  var id = $(img).attr('id');
  return 'select option#'+id;
}

function icon_select(img){
  var option_selector = return_option(img);
  $(img).addClass(icon_selected_class);
  $(option_selector).attr('selected','selected');
}

function icon_deselect(img){
  var option_selector = return_option(img);
  $(img).removeClass(icon_selected_class);
  $(option_selector).attr('selected','');
}

function apply_selected_img(){
  $('.icon_select_img').each(function(){
    var option_selector = return_option(this);
    if ($(option_selector).is(':selected')){
      icon_select(this);
    }  
  });
}

$('document').ready(function(){
  // apply selected img format on load
  apply_selected_img();

  $('.icon_select_img').click(function(){
    var option_selector = return_option(this);
    if (!$(this).hasClass('icon_selected')){
      $(this).parent().children('.icon_selected').each(function(){
        icon_deselect(this);
      });
      icon_select(this);
    }
  });
});
