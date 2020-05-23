import React, { useState, useEffect } from "react";
import { getAllWorkshop } from "../../Helpers/Workshop";
import Card from "../../Components/Card";

export const Workshop = () => {
  const [workshops, setWorkshops] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState([]);

  useEffect(() => {
    getAllWorkshop().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setWorkshops(data.workshops);
      }
    }).catch();
  }, []);
  return (
    <div>
      <div className="container">
        <h1 className="mt-3">Workshops</h1>
        <div className="row">
          {workshops.map((w, index) => (
            <React.Fragment key={index}>
              <div className="col-md-4 my-3">
                <Card
                  name={w.name}
                  description={w.description}
                  price={w.price}
                  date={w.dateOfWorkshop}
                  id={w._id}
                  image={w.image}
                  link={`/workshops/${w._id}`}
                />
              </div>
            </React.Fragment>
          ) // return ();
          )}
        </div>
      </div>
    </div>
  );
};
