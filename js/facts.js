var url = "http://en.wikipedia.org/wiki/Siamese_fighting_fish";
var title = url.split("/");
title = title[title.length - 1];

//Get Leading paragraphs (section=0)
var pText = '';
var arrFacts = [];

 $.ajax({
        url: "http://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=text&format=json&callback=?",
        dataType: "json",
        jsonp: "callback",
        success: function(data) {
        for (text in data.parse.text) {
            var text = data.parse.text[text].split("<p>");

            for (p in text) {
                //Remove html comment
                text[p] = text[p].split("<!--");
                if (text[p].length > 1) {
                    text[p][0] = text[p][0].split(/\r\n|\r|\n/);
                    text[p][0] = text[p][0][0];
                    text[p][0] += "</p> ";
                }
                text[p] = text[p][0];

                //Construct a string from paragraphs
                if (text[p].indexOf("</p>") == text[p].length - 5) {
                    var htmlStrip = text[p].replace(/<(?:.|\n)*?>/gm, '') //Remove HTML
                    var splitNewline = htmlStrip.split(/\r\n|\r|\n/); //Split on newlines
                    for (newline in splitNewline) {
                        if (splitNewline[newline].substring(0, 11) != "Cite error:") {
                            pText += splitNewline[newline];
                            pText += "\n";
                        }
                    }
                }
            }
            pText = pText.substring(0, pText.length - 2); //Remove extra newline
            pText = pText.replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)
            populateFacts(pText);
    }
             },//end of success func
             error: function(){
                //$('#error').css('visibility', 'visible');
             }

    })

function populateFacts(fullFacts){
    arrFacts = fullFacts.split(".");
    console.log(arrFacts[0]);
    //document.getElementById('facts').innerHTML = arrFacts[0];
}

console.log(arrFacts);