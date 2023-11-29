/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div className="Homepage">
                <Link to="/blog">
                    Blog Page!
                </Link>
        </div>
  );
};

export default Index;