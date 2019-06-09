// Spotify API
// use to retrieve song information

$("#spotifyLogin").on("click", function() {
    // opens the spotify login and returns with a token
    var url = "https://accounts.spotify.com/authorize?";
    var clientId = "4e35c64cd250438684608aa0aea8fd7a";
    var returnUrl = "https://jmdahle.github.io/testSpotify.html";
    returnUrl = location.href;
    var scopes = "user-read-private%20user-read-email%20playlist-modify-public";
    var combinedUrl = url + "client_id=" + clientId + "&redirect_uri=" + returnUrl + "&scope=" + scopes + "&response_type=token";
    window.open(combinedUrl, "_self");
})

var responseSpotify = location.hash;
if (responseSpotify.length > 0) { // there is only a "hash" if spotify login returned with an access token
    // parse the returned "hash" to extract the access token only
    var s = responseSpotify.indexOf("#access_token=") + "#access_token".length + 1;
    var e = responseSpotify.indexOf("&");
    var spotifyToken = responseSpotify.substring(s,e);
    console.log("token",spotifyToken);
    // use the token to get playlists for an artist
    $.ajax({
        url: "https://api.spotify.com/v1/search?q=Ariana+Grande&type=artist",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function(response) {
            // dynamically add the playlists to the page
            console.log(response);
/*            for (var pl = 0; pl < response.playlists.items.length; pl++) {
                plName = response.playlists.items[pl].name;
                plLink = response.playlists.items[pl].external_urls.spotify;
                plImage = response.playlists.items[pl].images[0].url;
                var newDiv = $("<div>");
                var newImg = $("<img>");
                var newP = $("<p>");
                newImg.attr("src",plImage);
                newImg.attr("alt","PlayListImage");
                newImg.attr("class","playlist");
                newImg.attr("data-external-link",plLink);
                newP.text(plName);
                newDiv.append(newImg);
                newDiv.append(newP);
                $("#playlists").append(newDiv);
            }
            // if any playlist is clicked, open it in a new page
            $(".playlist").on("click", function() {
                var url = $(this).attr("data-external-link");
                window.open(url, "_blank");
            });*/
        }
    });
}
