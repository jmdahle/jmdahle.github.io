// Spotify API
// use to retrieve song information

$("#spotifyLogin").on("click", function() {
    // redirect to log in
    var url = "https://accounts.spotify.com/authorize?";
    var clientId = "4e35c64cd250438684608aa0aea8fd7a";
    var returnUrl = "https://jmdahle.github.io/testSpotify.html";
    returnUrl = location.href;
    var scopes = "user-read-private%20user-read-email%20playlist-modify-public";
    var combinedUrl = url + "client_id=" + clientId + "&redirect_uri=" + returnUrl + "&scope=" + scopes + "&response_type=token";
    console.log(combinedUrl);
    $("#linkhere").html("<a href='"+combinedUrl + "'>Login To Spotify</a>");
})

var responseSpotify = location.hash;
if (responseSpotify.length > 0) {
    var s = responseSpotify.indexOf("#access_token=") + "#access_token".length + 1;
    var e = responseSpotify.indexOf("&");
    var spotifyToken = responseSpotify.substring(s,e);
    console.log("token",spotifyToken);

    $.ajax({
        url: "https://api.spotify.com/v1/search?q=Ariana+Grande&type=playlist",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function(response) {
            console.log(response);
            for (var pl = 0; pl < response.playlists.items.length; pl++) {
                plName = response.playlists.items[pl].name;
                plLink = response.playlists.items[pl].external_urls.spotify;
                plImage = response.playlists.items[pl].images[0].url;
                var newPl = $("<div>");
                var newPlImage = $("<img>");
                var newPlName = $("<p>");
                newPlImage.attr("src",PlImage);
                newPlImage.attr("alt","PlayListImage");
                newPlImage.attr("class","playlist");
                newPlImage.attr("data-external-link",PlLink);
                newPlName.text(PlName);
                newPl.append(PlImage);
                newPl.append(PlName);
                $("#playlists").append(newPl);
            }
        }
    });
}
