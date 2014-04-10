var FontsLoaded=function(t){var e=this,n={fonts:[],complete:null,error:null,timeout:1e4};this.settings=this.extend(n,t),this.fontList=[],this.loadedFonts=0,this.timer=0,this.createElements(function(){e.loadingTimeout=window.setInterval(e.checkElementWidth,10,e)})};FontsLoaded.prototype.createElements=function(t){var e,n,o;for(e=0;e<this.settings.fonts.length;++e)o=this.settings.fonts[e],fontId=o.toCamelCase(),n=document.createElement("span"),n.className="fonts-loaded",n.id=fontId+"-webfont",n.style.fontFamily=o,n.style.position="absolute",n.style.left="-9999px",n.innerHTML=o+" is loading",document.body.appendChild(n),n=document.createElement("span"),n.className="fonts-loaded",n.id=fontId+"-basefont",n.style.fontFamily="Arial",n.style.position="absolute",n.style.left="-9999px",n.innerHTML=o+" is loading",document.body.appendChild(n),this.fontList.push({font:fontId,width:n.offsetWidth,loaded:!1});"function"==typeof t&&t()},FontsLoaded.prototype.checkElementWidth=function(t){var e;for(e=0;e<t.fontList.length;++e){var n=t.fontList[e],o=document.getElementById(n.font);o.offsetWidth!==n.width&&(n.loaded=!0,t.trigger("fonts."+n.font,document.body),document.body.removeChild(o),++t.loadedFonts)}t.loadedFonts===t.fontList.length&&(window.clearInterval(t.loadingTimeout),t.trigger("fonts.all",document.body),"function"==typeof t.settings.complete&&t.settings.complete(t)),t.timer=t.timer+10,t.timer>=t.settings.timeout&&(window.clearInterval(t.loadingTimeout),"function"==typeof t.settings.error&&t.settings.error(t,"timeout"))},FontsLoaded.prototype.trigger=function(t,e){var n;document.createEvent?(n=document.createEvent("HTMLEvents"),n.initEvent(t,!0,!0)):(n=document.createEventObject(),n.eventType=t),n.eventName=t,document.createEvent?e.dispatchEvent(n):e.fireEvent("on"+n.eventType,n)},FontsLoaded.prototype.extend=function(t,e){var n,o={};for(n in t)o[n]=t[n];for(n in e)o[n]=e[n];return o},String.prototype.toCamelCase=function(){return this.toLowerCase().replace(/\s/g,"-").replace(/-(.)/g,function(t,e){return e.toUpperCase()}),this};