import React, { useState, useEffect } from "react";
import { getCourses } from "../../Helpers/Courses";
import Card from "../../Components/Card";
// import { Link } from "react-router-dom";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState([]);

  useEffect(() => {
    getCourses().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setCourses(data.Course);
      }
    }).catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="container">
        <h1 className="mt-3">Courses</h1>
        <div className="row">
          {courses.map((co, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};
