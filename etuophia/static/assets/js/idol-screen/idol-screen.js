window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "nowember", "december"];

var IOSBack = function() {
    this.time = 0;
    this.blobs = [];
    this.interval = Math.round(Math.random() * 50) + 100;
    this.idolcontainer = $('.back');
    this.maxOpacity = .3;
    this.startBlobs = 7;
    this.colors = ["#9EE4F0","#E1CFE8", "#B8E6F7"];
    this.xOffset = 0;
    
    this.init = function() {
        var self = this;
        
        this.addMouseEvents();
        
        this.generateStartDots();
        
        (function animloop(){
            requestAnimFrame(animloop);
            self.tick();
        })();
    }
    
    this.addMouseEvents = function() {
        var self = this;
        $('.idolcontainer').on('mousemove', function(e) {
            var mouseX = e.clientX;
            self.xOffset = (mouseX - 277) / 200;
        });
    }
    
    this.generateStartDots = function() {
        for (var i = 0; i < this.startBlobs ; i++) {
            this.addBlob();
        }
    }
    
    this.tick = function() {
    	this.updateClock();

        this.time++;
        if(this.time % this.interval == 0) {
            this.interval = Math.round(Math.random() * 100) + 100;
            this.addBlob();
        }
        
        this.animateBlobs();
    }

    this.updateClock = function() {
    	var date = new Date();
    	var hours = date.getHours();
    	var minutes = date.getMinutes();
    	var day = date.getDay();
    	var curDate = date.getDate();
    	var month = date.getMonth();
    	hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;

    	$('.hours').text(hours);
    	$('.minutes').text(minutes);

    	if( month == 4 && curDate == 5) {
    		$('.date').text("Holy crap it's cinqo de Mayo!");
    	} else {
    		$('.date').text(days[day - 1] + " " + curDate + " " + months[month]);
    	}
    	
    	
    }
    
    this.addBlob = function() {
        var self = this;
        var newSpan = $('<span />');
        
        var blob = {
            $element: newSpan,
            size: Math.round(Math.random() * 150) + 20,
            posX: Math.round(Math.random() * $(window).width()),
            posY: Math.round(Math.random() * 985),
            speedX: Math.random() * .5 - .25,
            speedY: Math.random() *.5 - .25,
            opacity: 0,
            hold: Math.round(Math.random() * 500),
            currentHold: 0,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            fading: true
        }
        
        newSpan.css(self.setStyles({
            top: blob.posX,
            left: blob.posY,
            width: blob.size,
            height: blob.size,
            background: blob.color,
            blur: blob.size / 10,
            opacity: blob.opacity
        }));
        
        this.idolcontainer.append(newSpan);

        this.blobs.push(blob);        
        
    }
    
    this.animateBlobs = function() {
        
        for ( var i = 0, l = this.blobs.length ; i < l ; i++ ) {
            var currentBlob = this.blobs[i];
            
            if(currentBlob) {
                currentBlob.posX += currentBlob.speedX;
                currentBlob.posY += currentBlob.speedY;

                if (currentBlob.opacity < 0) {
                    this.removeBlob( i );   
                } else {
                    if (currentBlob.opacity > this.maxOpacity) {
                      currentBlob.currentHold++;
                      currentBlob.fading = !(currentBlob.fading);

                        if(currentBlob.currentHold >= currentBlob.hold ) {
                            currentBlob.opacity = this.maxOpacity - .01;
                            currentBlob.fading = false;
                        }
                
                    } else {
                        if (!(currentBlob.fading)) {
                            currentBlob.opacity -= .003; 
                    
                        } else {
                            currentBlob.opacity += .003;   
                        }
                    }
            
                    currentBlob.$element.css(this.setStyles({
                        top: currentBlob.posX + ( this.xOffset * (currentBlob.size - (currentBlob.size / 10)) / 10),
                        left: currentBlob.posY,
                        width: currentBlob.size,
                        height: currentBlob.size,
                        background: currentBlob.color,
                        opacity: currentBlob.opacity
                    }));
                }
            }
        }
    }
    
    this.setStyles = function( params ) {
        return {
            "-webkit-transform": "translateX(" + params.top + "px)" + "translateY(" + params.left + "px)" + "translateZ(" + 2 + "px)",
          "-moz-transform": "translateX(" + params.top + "px)" + "translateY(" + params.left + "px)" + "translateZ(" + 2 + "px)",
          "-o-transform": "translateX(" + params.top + "px)" + "translateY(" + params.left + "px)" + "translateZ(" + 2 + "px)",
          "-ms-transform": "translateX(" + params.top + "px)" + "translateY(" + params.left + "px)" + "translateZ(" + 2 + "px)",
          "transform": "translateX(" + params.top + "px)" + "translateY(" + params.left + "px)" + "translateZ(" + 2 + "px)",
            width: params.width,
            height: params.height,
            background: params.background,
            "-webkit-filter" : "blur(" + ( 15 - params.blur) + "px)",
          "-moz-filter" : "blur(" + ( 15 - params.blur) + "px)",
          "-o-filter" : "blur(" + ( 15 - params.blur) + "px)",
          "-ms-filter" : "blur(" + ( 15 - params.blur) + "px)",
          "filter" : "blur(" + ( 15 - params.blur) + "px)",
            opacity: params.opacity
        }
    }
    
    this.removeBlob = function( index ) {
       
       this.blobs[index].$element.remove();
       this.blobs.splice(index, 1);
       
    }
    
    this.init();
    
}

var iOsBack = new IOSBack();