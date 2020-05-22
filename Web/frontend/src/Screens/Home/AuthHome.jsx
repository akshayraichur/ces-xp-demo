import React, { useEffect, useState } from "react";
import { getAllWorkshop } from "../../Helpers/Workshop";
import { getConf } from "../../Helpers/Conf";
import { getCourses } from "../../Helpers/Courses";
import Card from "../../Components/Card";
import { Link } from "react-router-dom";

export const AuthHome = () => {
  const [workshops, setWorkshops] = useState([]);
  const [conf, setConf] = useState([]);
  const [courses, setCourses] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState([]);

  useEffect(() => {
    getAllWorkshop().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        console.log(data);
        setWorkshops(data.workshops);
      }
    }).catch();

    getConf().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setConf(data.conferences);
      }
    }).catch();

    getCourses().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setCourses(data.Course);
      }
    }).catch((err) => console.log(err));
  }, []);

  console.log(workshops);

  return <div>
    <div className="container">
      <div className="d-flex justify-content-between my-4">
        <h1 className="d-flex justify-content-center">Workshops</h1>
        <p className="d-flex justify-content-end mt-3">
          <Link to="/workshops">
            View all..
          </Link>
        </p>
      </div>

      <div className="container">
        <div className="row">
          {workshops.map((w, index) => {
            if (index < 3) {
              return (<React.Fragment key={index}>
                <div className="col-md-4 my-3">
                  <Card
                    name={w.name}
                    description={w.description}
                    price={w.price}
                    date={w.dateOfWorkshop}
                    id={w._id}
                    image={w.image}
                  />
                </div>
              </React.Fragment>);
            } else {
              return (null);
            }
          } // return ();
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between my-4">
        <h1 className="d-flex justify-content-center">Conferences</h1>
        <p className="d-flex justify-content-end mt-3">
          <Link to="/conferences">
            View all..
          </Link>
        </p>
      </div>
      <div className="container">
        <div className="row">
          {conf.map((c, index) => {
            if (index < 3) {
              return (<React.Fragment key={index}>
                <div className="col-md-4 my-3">
                  <Card
                    name={c.name}
                    description={c.description}
                    price={c.price}
                    date={c.dateOfWorkshop}
                    id={c._id}
                    image={c.image}
                  />
                </div>
              </React.Fragment>);
            } else {
              return (null);
            }
          })}
        </div>
      </div>

      <div className="d-flex justify-content-between my-4">
        <h1 className="d-flex justify-content-center">Courses</h1>
        <p className="d-flex justify-content-end mt-3">
          <Link to="/courses">
            View all..
          </Link>
        </p>
      </div>
      <div className="container">
        <div className="row">
          {courses.map((co, index) => {
            if (index < 3) {
              return (
                <React.Fragment key={index}>
                  <div className="col-md-4 my-3">
                    <Card
                      name={co.name}
                      description={co.description}
                      price={co.price}
                      date={co.dateOfWorkshop}
                      id={co._id}
                      image={co.image}
                    />
                  </div>
                </React.Fragment>
              );
            } else {
              return (null);
            }
          })}
        </div>
      </div>
    </div>
  </div>;
};
