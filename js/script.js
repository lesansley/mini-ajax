
function loadData() {

    
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetAddress = $('#street').val();
    var cityAddress = $('#city').val();

    var loadBackground = function(street, city) {
        var $body = $('body'),
            $greeting = $('#greeting'),
            address = street + ', ' + city,
            image = document.body.getElementsByClassName('bgimg');
            
            console.log(image.length);

        if(image.length !== 0) {
            //for(var i =0; i<=image.length; i+0) {
                //image[0].parentNode.removeChild(image[0]);
            //}​

            console.log('in the loop');
        }
        $greeting.text('So you want to live at: ' + address + '?');
        address = address.replace(/ /g,'%');
        var googleMapString = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
        image = '<img class="bgimg" src=' + googleMapString + '>'
        $body.append(image);
    };

    
    
    var loadNyTimes = function(city) {
        var api = '1b0ceaaeec115e90157424c76cbfc592:3:72773086',
            url = 'http://api.nytimes.com/svc/search/v2/articlesearch.',
            format = 'json',
            query = city.trim().replace(/ /, '+'),
            sortOrder = 'newest';

            var queryUrl = url + format + '?q=' + query + '&sort=' + sortOrder + '&api-key=' + api;
            
            var jqxhr = $.ajax(queryUrl)
              .done(function() {
                var timesArticles = jqxhr.responseJSON.response.docs;
                var newsArticles = addNewsArticles(timesArticles);
                $nytElem.append(newsArticles);
              })
              .fail(function() {
                $('#nytimes-header').text("New York Times articles could not be loaded");;
              });
    };

    function addNewsArticles(articles) {
        var HTMLnytArticle = '<li><a href=%url% target="_blank"><h3 class="head-line">%header%</h3></a></li><p class="snippet">%body%</p>';
        var allArticles = '';
        
        console.log(articles);
        for(var article in articles) {
            var headLine = articles[article].headline.main;
            var snippet = articles[article].snippet;
            var link = articles[article].web_url;

            var nytArticle = HTMLnytArticle.replace('%header%', headLine);
            nytArticle = nytArticle.replace('%body%', snippet);
            nytArticle = nytArticle.replace('%url%', link);
            allArticles += nytArticle;
        }
        
        return(allArticles);

    }

    var loadWiki = function(city) {
        var wikiRequestTimeout = setTimeout(function() {
            $wikiElem.text("Wikipedia articles could not be loaded");
        }, 8000);

        $.ajax({
            url: '//en.wikipedia.org/w/api.php',
            data: { action: 'opensearch', search: city, format: 'json', redirects: 'resolve'},
            dataType: 'jsonp',
            success: function (e) {
                var wikiArticles = addWikiArticles(e[1], e[3]);
                $wikiElem.append(wikiArticles);
                clearTimeout(wikiRequestTimeout);
            }
        });
        
    };

    function addWikiArticles(title, url) {
        var HTMLwikiArticle = '<li><a href=%url% target="_blank"><h3 class="head-line">%header%</h3></a></li>';
        var allArticles = '';
        
        for(var entry in title) {
            var wikiEntry = HTMLwikiArticle.replace('%header%', title[entry]);
            wikiEntry = wikiEntry.replace('%url%',url[entry]);
            allArticles += wikiEntry;
        }
        return allArticles;
    }

    loadBackground(streetAddress, cityAddress);
    loadNyTimes(cityAddress);
    loadWiki(cityAddress);

    
    console.log(document.body.getElementsByClassName('bgimg'));
    if(document.body.getElementsByClassName('bgimg'))
        console.log('test2');
    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
