/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div className="Homepage">
            <h1>Welcome To My Blog!</h1>
            <h2>About me:</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. At volutpat diam ut venenatis tellus. Turpis egestas pretium aenean pharetra magna ac. Erat nam at lectus urna duis. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Nisi lacus sed viverra tellus. Amet purus gravida quis blandit turpis cursus in. Placerat orci nulla pellentesque dignissim enim. Aliquam sem fringilla ut morbi. Et tortor consequat id porta nibh venenatis cras sed. Volutpat odio facilisis mauris sit amet massa. Eget felis eget nunc lobortis mattis aliquam faucibus. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Euismod quis viverra nibh cras. Bibendum neque egestas congue quisque egestas diam in. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Tellus pellentesque eu tincidunt tortor aliquam nulla.</p>
                <Link to="/posts">
                    Blog Page!
                </Link>
        </div>
  );
};

export default Index;