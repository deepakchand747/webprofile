function highlightHeading(headingId) 
{ 
    var heading = document.getElementById(headingId); 
    heading.classList.add("highlightHeadling"); 
    setTimeout(function() 
    { 
        heading.classList.remove("highlightHeadling"); 
    }, 1000); 
};