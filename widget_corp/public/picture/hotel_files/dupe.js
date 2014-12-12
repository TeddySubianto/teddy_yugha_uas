	// duplicate share this 
	function dupeShareThis(myId,pinUrl,bookMark) {
           var stw1 = document.getElementById('stw1');
           if (stw1 != null) {
            var myph = document.getElementById(myId);
            if (myph != null) {
                myph.innerHTML = stw1.outerHTML;
                var eles = myph.getElementsByTagName('*');
                if (pinUrl != '') {
                   for(var i=0;i<eles.length;i++) {
                        if (eles[i].getAttribute('class') == 'share clickable') { eles[i].setAttribute('class', 'share'); }
                        if (eles[i].getAttribute('addthis:url') != null) { eles[i].setAttribute('addthis:url', bookMark); }
                        if (eles[i].getAttribute('id') == 'pinterest-button') { eles[i].setAttribute('pi:pinit:media', pinUrl); }
                   }
                }
            } 
           } 
     	}