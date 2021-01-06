import React, { useEffect, useState } from "react";
import axios from "axios";

function FavoritePage() {
  let variables = { userFrom: localStorage.getItem("userId") };
  const [FavoritedLocation, setFavoritedLocation] = useState([]);

  useEffect(() => {
    fetchFavoredLocation();
  }, []);
  const fetchFavoredLocation = () => {
    axios
      .post("http://localhost:5000/api/favorite/getFavoredMovie", variables)
      .then((response) => {
        if (response.data.success) {
          setFavoritedLocation(response.data.favorites);
        } else {
          alert("Failed to get fav location");
        }
      });
  };
  const onClickRemove = (entryId) => {
    const variable = {
      entryId: entryId,
      userFrom: localStorage.getItem("userId"),
    };

    axios
      .post("http://localhost:5000/api/favorite/removeFromFavorite", variable)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredLocation();
        } else {
          alert("Failed to remove to FAV");
        }
      });
  };

  const renderTable = FavoritedLocation.map((entry, index) => {
    return (
      <tr className="table" key={index}>

        <td><b>{entry.title}</b><br />{entry.comment}</td>
        <td>
          <button
            className="profile-button"
            onClick={() => onClickRemove(entry.entryId)}
          >
            <b>X</b>
          </button>
        </td>

      </tr>
    );
  });
  return (
    <div className="container">
      <table className="centered">
        <thead>
          <td>{renderTable}</td>
        </thead>
      </table>
    </div>
  );
}

export default FavoritePage;