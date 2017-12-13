document.addEventListener("click", function (e) {
	if (!e.target.classList.contains("page-choice")) {
		return;
	}

	function onExecuted(result) {
		//	alert("REUSLT IS " + (typeof result));
		//	document.body.innerHTML = "SUCCESS: " + result;
		try {
			download(result.toString().split(","));
		} catch (error) {
			document.body.innerHTML += "SOME ERROR: " + error.message;
		}
	}

	function onError(error) {
		alert(error);
		document.body.innerHTML = "FAILURE: " + result;
		console.log(`Error: ${error}`);
	}

	function onStartedDownload(itemId) {
		//document.body.innerHTML += `Started downloading: ${itemId}`;
		console.log(`Started downloading: ${itemId}`);
	}

	function onFailed(error) {
		document.body.innerHTML += `Download failed: ${error}`
		console.log(`Download failed: ${error}`);
	};


	function download(files) {

		for (index in files) {
			try {
				var downloading = browser.downloads.download({
					url: files[index]
				});

				downloading.then(onStartedDownload, onFailed);

			} catch (e) {
				document.body.innerHTML += "  ERROR: " + e.message;
			}
		}
	}

	var downloadItems = {};

	function handleCreated(item) {
		downloadItems[item.id] = item;	
		document.body.innerHTML = "";	
		for (i in downloadItems) {
			document.body.innerHTML += `<BR>Started downloading: ` + downloadItems[i].url;
		}
	}

	function handleChanged(item) {		
		document.body.innerHTML = "";	
		downloadItems[item.id].state = item.state;
		for (i in downloadItems) {
			if (downloadItems[i].state.current === "complete")
				document.body.innerHTML += `<BR>Completed downloading: ` + downloadItems[i].url;
			else
				document.body.innerHTML += `<BR>Downloading...: ` + downloadItems[i].url;		
		}
	}
	
	browser.downloads.onCreated.addListener(handleCreated);
	browser.downloads.onChanged.addListener(handleChanged);

	var executing = browser.tabs.executeScript({
		file: "/js/findfiles.js",
		allFrames: true
	});
	executing.then(onExecuted, onError);
});