import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Home = () => {
  const title = "Spring Boot - React Application";
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card bg-dark my-5">
            <div className="card-body">
              <h2 className="card-title text-center text-white py-3">
                {title}
              </h2>
              <ul className="text-center list-inline py-3">
                <li className="list-inline-item">
                  <Link to="users" className="btn btn-info">
                    List Users
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="users/add_user" className="btn btn-info">
                    Add User
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
