/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
    Drupal.behaviors.googlesearchajax = {
        attach:function (context) {
            $( ".gsearch_results" ).hide();
            var num_calls = $( "#num_calls" ).val(0);
            var cacheVar = $( "#cache_var" ).val();
            if(cacheVar==='0'){
                setTimeout(google_search_ajax, 1500);
            }
        }
    };
function google_search_ajax() {
    var output = [];
    var i=1;
    var nid = $('#nid').val();
    var params={'node_id':nid};
    output.push(params);
    $(".gs-webResult table a.gs-title").each(function() {    
        var params={};
        if(i<21){
            params['full_url']=$(this).attr('href');
            var url = params['full_url'];
            var urlParts = url.replace('http://','').replace('https://','').split(/[/?#]/);
            params['short_url']=urlParts[0];
            output.push(params);
        }
        i++;
    }); 
    $.ajax({
        url: '/ajax/searchgoogle',
        type: 'POST',
        data: {output:output}, 
        dataType: "html",  
        success: function(data) {
             $('#ajax-result').html(data); 
        }
    });

}
})(jQuery);

function gcseCallback() {
    var cacheVar = document.getElementById("cache_var").value;
    if(cacheVar==='0'){
        var itemDescription = document.getElementById("itemDescription").value;
        var brandName = document.getElementById("brand_name").value;
        var countryCode =document.getElementById("country_code").value;
        if (document.readyState !== 'complete'){
            return google.setOnLoadCallback(gcseCallback, true);
        }
        if(brandName !== 'null'){
            google.search.cse.element.render({gname:'gsearch1', div:'gsearch_results_1', tag:'searchresults-only', attributes:{linkTarget:'',filter:"0",webSearchResultSetSize:'1',webSearchSafesearch:'active'}});
            var element = google.search.cse.element.getElement('gsearch1');
            element.execute(itemDescription+ ' '+brandName+ ' '+countryCode);
            google.search.cse.element.render({gname:'gsearch2', div:'gsearch_results_2', tag:'searchresults-only', attributes:{linkTarget:'',filter:"0",webSearchResultSetSize:'19',webSearchSafesearch:'active'}});
            var element = google.search.cse.element.getElement('gsearch2');
            element.execute(itemDescription+ ' '+countryCode);
        }else{
            google.search.cse.element.render({gname:'gsearch', div:'gsearch_results_1', tag:'searchresults-only', attributes:{linkTarget:'',filter:"0",webSearchResultSetSize:'20',webSearchSafesearch:'active'}});
            var element = google.search.cse.element.getElement('gsearch');
            element.execute(itemDescription+ ' '+countryCode);  
        }
    }
};
window.__gcse = {
  parsetags: 'explicit',
  callback: gcseCallback
  
};
     
(function() {
    
  var cx = '008160570044726239591:h1_gdofdhda';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
    '//www.google.com/cse/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);

})();
