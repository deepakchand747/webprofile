
         window.onload = function() 
         { 
            if (window.location.hash) 
            { 
                var sectionId = window.location.hash.substring(1); 
                highlightHeading(sectionId); 
            } 
        }

