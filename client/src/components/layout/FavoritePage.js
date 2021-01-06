import React, { useEffect, useState } from "react";
import axios from "axios";


function Favorite(props) {


  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  const variable = {
    userFrom: props.userFrom,
    entryId: props.entryId,
  };
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/favorite/favoriteNumber", variable)
      .then((response) => {
        if (response.data.success) {
          setFavoriteNumber(response.data.favorite);
        } else {
          alert("Fail cannot to get favoriteNumber");
        }
      });

    axios
      .post("http://localhost:5000/api/favorite/favorited", variable)
      .then((response) => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert("Failed to get Fav info");
        }
      });
  }, []);

  const onClickFavorite = () => {
  
    if (Favorited) {
      // already added
      axios
        .post("http://localhost:5000/api/favorite/removeFromFavorite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to remove from FAV");
          }
        });
    } else {
      // when not adding yest
      axios
        .post("http://localhost:5000/api/favorite/addToFavorite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to add to FAV");
          }
        });
    }
  };
  return (
    <div className="container">
      <button
        className="popup-button"
        onClick={onClickFavorite}
      >
        {Favorited ? "REMOVE" : "SAVE"}
      </button>
    </div>
  );
}

export default Favorite;