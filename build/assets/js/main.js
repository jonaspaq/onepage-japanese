
$(document).ready(()=>{
    var status = false;
    
    $('#menu-button').click(() => {
        if(!status){
            $('#navCollapse').css("height", "100vh");
            $('body').css('overflow', 'hidden');         
        }
        else{
            $('#navCollapse').removeAttr("style");
            $('body').removeAttr('style');  
        }
        status = !status;
    })
})