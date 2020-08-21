if('serviceWorker' in navigator){
	navigator.serviceWorker.register('sw.js')
		.then((reg) => console.log("serviceWorker registered successfully",reg))
		.catch((err) => console.log("failed successfully",err));
}