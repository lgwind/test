/**ip地址*/
var ip;
/**
 * 获取ip地址
 * @param {Object} onNewIP
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
	//compatibility for firefox and chrome
	var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var pc = new myPeerConnection({
			iceServers: []
		}),
		noop = function() {},
		localIPs = {},
		ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
		key;

	function iterateIP(ip) {
		window.ip=ip;
		if(!localIPs[ip]) {
			if(onNewIP) {
				onNewIP(ip);
			}else{
				console.log(ip);
			}
		}
		localIPs[ip] = true;
	}

	//create a bogus data channel
	pc.createDataChannel("");

	// create offer and set local description
	pc.createOffer().then(function(sdp) {
		sdp.sdp.split('\n').forEach(function(line) {
			if(line.indexOf('candidate') < 0) return;
			line.match(ipRegex).forEach(iterateIP);
		});

		pc.setLocalDescription(sdp, noop, noop);
	}).catch(function(reason) {
		// An error occurred, so handle the failure to connect
	});

	//sten for candidate events
	pc.onicecandidate = function(ice) {
		if(!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
	};
}

/**
 * 给标签设置ip地址（根据id)
 * @param {Object} id
 */
function setIP(id) {
	getUserIP(function(ip) {
		//alert(ip);
		document.getElementById(id).innerHTML = ip;
	});
	//alert("优先");
}

// Usage
//			getUserIP(function(ip) {
//				alert("Got IP! :" + ip);
//			});