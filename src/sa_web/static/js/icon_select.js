
// functions to simplify the code
function return_option(img){
  var id = $(img).attr('id')
  return 'select option#'+id;
}
function select_option(img){
  
//  $(return_checkbox(img)).click();
}
function unselect(img){
  var option_selector = return_option(img);
  if ($(option_selector).is(':selected')){
    console.log(option_selector+' de-selected');
    $(img).css('border','1px solid white');
  }

//  if ($(checkbox).is(':checked')){
//    click_checkbox(img);
//    $(img).css('border','1px solid white');
//  }
}
function select(img){
  var option_selector = return_option(img);
  if (!$(option_selector).is(':selected')){
    $(option_selector).attr('selected','selected');
    console.log(option_selector+' selected');
    $(img).css('border','1px solid black');
  }
//  if (!$(checkbox).is(':checked')){
//    click_checkbox(img);
//    $(img).css('border','1px solid black');
//  }
}

$('document').ready(function(){
  console.log('icon_select is here!');
  $('.icon_select_img').click(function(){
    var option_selector = return_option(this);
  
    if (!$(this).hasClass('icon_selected')){
      $(this).parent().children('.icon_selected').each(function(){
        $(this).removeClass('icon_selected');
      $(option_selector).attr('selected','');
      })
      $(this).addClass('icon_selected');
      $(option_selector).attr('selected','selected');
    }
  
    // unclick all other images
/*
    $(this).parent().children('.icon_select').each(function(){
      unselect(this);
    })

    if ($(option_selector).is(':selected')){
      unselect(this);
    } else {
      select(this);
    }
*/
  })
})
