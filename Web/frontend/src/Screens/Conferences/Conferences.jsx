import React, { useState, useEffect, useContext } from "react";
import { getConf } from "../../Helpers/Conf";
import Card from "../../Components/Card";
import { AuthContext } from "../../Context/AuthContext";

export const Conferences = () => {
  const [conf, setConf] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getConf()
      .then((data) => {
        if (data.err) {
          setError(data.err);
        } else {
          setConf(data.conferences);
        }
      })
      .catch();
  }, []);
  return (
    <div>
      <div className="container" data-aos="fade-up">
        <h1>Conferences</h1>
        <div className="row">
          {conf.map((c, index) => (
            <React.Fragment key={index}>
              <div className="col-md-4 my-3">
                <Card
                  name={c.name}
                  description={c.description}
                  price={c.price}
                  date={c.dateOfWorkshop}
                  id={c._id}
                  image={c.image}
                  link={`/conferences/${c._id}`}
                  disable={isAuthenticated ? false : true}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
