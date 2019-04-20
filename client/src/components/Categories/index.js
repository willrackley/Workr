import React from 'react';


// Temp export class to make it work without calling Googlemaps react 
export class CategoriesContainer extends React.Component {
    render() {
        return (
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" href= "/dashboard">
                            <i className='fas fa-clipboard-list fa-fw' style={{ fontSize : 20 }}></i>
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/jobsByCategory">
                            <i className='fas fa-tree fa-fw' style={{ fontSize : 20 }}> </i>
                            Landscaping
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            <i className='fas fa-home fa-fw' style={{ fontSize : 20 }}></i>
                            House Work
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            <i className='fas fa-car fa-fw' style={{ fontSize : 20 }}></i>
                            Car Cleaning
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            <i className='fas fa-tools fa-fw' style={{ fontSize : 20 }}></i>
                            Miscellaneous
                        </a>
                    </li>
                </ul>
            </div>
        );
    };
}

export default CategoriesContainer;
