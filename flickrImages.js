// Global variables
var photosArrayGlobal; // this will be a global array of PhotoMetadata objects
var photosIndexGlobal; // global variable indicating index of currently displayed photo

window.onload = init();

// Initialization function
function init() {
    
    // Set up event handlers
    document.getElementById("next").onclick = next;
    document.getElementById("previous").onclick = previous;

    document.getElementById("loadGallery").onclick = loadGallery;
    document.getElementById("saveChanges").onclick = saveChanges;
}

// Call this function if you want to load a flickr gallery. For the assignment,
// the only line of this function you should change is:
//      var galleryId = "35550258-72157623121371509";
// so the gallery id is extracted from a text box on the HTML page.
function loadGallery() {
    
    // You need to add your own API key in here. Get one from: http://www.flickr.com/services/api/
    var apiKey = "f024f1fb99205fee4d41446467397df3";

    var galleryId = document.getElementById("galleryId").value;

    // Set up the URL for the JSONP request to get photos from the given gallery. For more 
    // available APIs, visit: http://www.flickr.com/services/api/
    //
    // The callback function specified in this URL is "loadFlickrPictures", which appears 
    // below this function.
    var url = "http://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=" + apiKey + "&format=json&gallery_id=" + galleryId + "&jsoncallback=loadFlickrPictures";
    
    var script = document.createElement("script");
    script.src = url;

    document.body.appendChild(script);
}


// This function takes the response from the flickr request, processes it to add the photo locations to the
// global array of photos, and displays the first photo.
// For the assignment, modify this function so that instead of storing the URL for each picture in the
// photosArrayGlobal, the function creates a PhotoMetadata object and stores that in photosArrayGlobal
// Creates a PhotMetadata object and stores that in photosArrayGlobal
function loadFlickrPictures(response) { 
    var parsedData = response;   
    var photo;
    var url;
    photosArrayGlobal = [];
    
    // Build the location URL for each photo in the response
    for (var i=0; i < parsedData.photos.photo.length; i++) {
        photo = parsedData.photos.photo[i]; 
        
        // Do not change how the image URL is constructed. URL form for location of a flickr image:
        // http://farm{id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
        url = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
        
      photosIndexGlobal = i;
      photosArrayGlobal[photosIndexGlobal] = new PhotoMetadata(url);
    }   

    photosIndexGlobal = 0;
    displayCurrentPhoto();
}

// Click event handler for next button
// You do not need to change this function
function next() {
    if(photosIndexGlobal < photosArrayGlobal.length - 1) {
        photosIndexGlobal++;
    } else {
        photosIndexGlobal = 0;
    }
    
    displayCurrentPhoto();
}

// Do not change above function

// Click event handler for previous button
// You do not need to change this function
function previous() {
    if(photosIndexGlobal > 0) {
        photosIndexGlobal--;
    } else {
        photosIndexGlobal = photosArrayGlobal.length - 1;
    }
    
    displayCurrentPhoto();
   
}

// Do not change above function

// Displays the photo at photosIndexGlobal in the photosArrayGlobal array. For the assignment
// you'll need to change how this function works.
function displayCurrentPhoto() {
    document.getElementById("mainImage").src = photosArrayGlobal[photosIndexGlobal].url;
    document.getElementById("comment").value = photosArrayGlobal[photosIndexGlobal].comment;
    document.getElementById("tags").value = photosArrayGlobal[photosIndexGlobal].tags;
}
    


// PhotoMetadata object
function PhotoMetadata(url) {
    this.url = url;
    this.comment = "";
    this.rating = 3;
    this.tags = [];
}

