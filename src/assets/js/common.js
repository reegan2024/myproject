function forforgot()
{
  Window.alert("hi i am forgot in common js");
}


Window.alert("dddd");


$(document).ready(function(){
    $('.graduated').on('change', function() {
      if ( this.value == 'yes')
      {
        $(".grad").show();
		$(".prof").hide();
      }
      if ( this.value == 'no')
      {
        $(".grad").hide();
		$(".prof").show();
      }
	  if ( this.value == 'none')
      {
        $(".grad").hide();
		$(".prof").hide();
      }
    });
});

$("#forgot").click(function(){
  $(".forgot-section").show();
  $(".login-section").hide();
  $(".password-section").hide();
});
$("#backLogin").click(function(){
  $(".forgot-section").hide();
  $(".login-section").show();
  $(".password-section").hide();
});
$("#forgotSubmit").click(function(){
  $(".forgot-section").hide();
  $(".login-section").hide();
  $(".password-section").show();
});
$("#passwordSubmit").click(function(){
  $(".forgot-section").hide();
  $(".login-section").show();
  $(".password-section").hide();
});

  $('#eye').click(function(){
       
        if($(this).hasClass('la-eye-slash')){
           
          $(this).removeClass('la-eye-slash');
          
          $(this).addClass('la-eye');
          
          $('#password').attr('type','text');
            
        }else{
         
          $(this).removeClass('la-eye');
          
          $(this).addClass('la-eye-slash');  
          
          $('#password').attr('type','password');
        }
    });












