import React, { useState, useEffect } from "react";
import { getConf } from "../../Helpers/Conf";
import Card from "../../Components/Card";

export const Conferences = () => {
  const [conf, setConf] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState([]);
  useEffect(() => {
    getConf().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setConf(data.conferences);
      }
    }).catch();
  }, []);
  return (
    <div>
      <div className="container">
        <h1>Conferences</h1>
        <div className="row">
          {conf.map((c, index) => (
            (<React.Fragment key={index}>
              <div className="col-md-4 my-3">
                <Card
                  name={c.name}
                  description={c.description}
                  price={c.price}
                  date={c.dateOfWorkshop}
                  id={c._id}
                  image={c.image}
                  link={`/conferences/${c._id}`}
                />
              </div>
            </React.Fragment>)
          ))}
        </div>
      </div>
    </div>
  );
};
