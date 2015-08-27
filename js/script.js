
function loadData() {

    
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetAddress = $('#street').val();
    var cityAddress = $('#city').val();

    console.log(document.body.getElementsByClassName('bgimg'));
    if(document.body.getElementsByClassName('bgimg'))
        console.log('test');

    var loadBackground = function(street, city) {
        var $body = $('body'),
            $greeting = $('#greeting'),
            address = street + ', ' + city,
            image = document.body.getElementsByClassName('bgimg');
            
            console.log(image.length);

        if(image.length !== 0) {
            while(image[0]) {
                //image[0].parentNode.removeChild(image[0]);
            }​

            console.log('in the loop');
        }
        
        $greeting.text('So you want to live at: ' + address + '?');
        
        address = address.replace(/ /g,'%');
        
        var googleMapString = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
        image = '<img class="bgimg" src=' + googleMapString + '>'

        $body.append(image);
    };

    loadBackground(streetAddress, cityAddress);
    
    var loadNyTimes = function() {

    };

    loadNyTimes();

    var loadWiki = function() {

    };

    loadWiki();

    
    console.log(document.body.getElementsByClassName('bgimg'));
    if(document.body.getElementsByClassName('bgimg'))
        console.log('test2');
    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
