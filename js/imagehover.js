$(document).ready(function()
{
    $("#imgDino").hover(
        function()
        {
            $(this).attr("src", "https://res.cloudinary.com/duufhvbhi/image/upload/v1657571543/front/dallegif_y3eyyp.gif");
        },
        function()
        {
            $(this).attr("src", "https://res.cloudinary.com/duufhvbhi/image/upload/v1657569107/front/a9_vyxexa.png");
        }                         
    );                  
});