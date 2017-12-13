
document.body.style.border = "5px solid red";
var allLinks = document.querySelectorAll("a");
var pdfLinks = [];
for (let link of allLinks) {
	if (link.href.endsWith("pdf")) {
		pdfLinks.push(link.href);
	}
}

//document.body.textContent = "downloadingsdfaf";


pdfLinks;

//document.body.textContent = {pdfLinks}


