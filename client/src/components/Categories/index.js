import React from 'react';
import "./style.css";

// Temp export class to make it work without calling Googlemaps react 
 //    
export class CategoriesContainer extends React.Component {
        
    render() {
        return (
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <button as="input" type="submit" value="Dashboard" className='fas fa-clipboard-list fa-2x' />
                        {/* <a className="nav-link active" href= "/dashboard"> 
                            <i className='fas fa-clipboard-list fa-3x'> Dashboard</i>                            
                        </a> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/jobsByCategory">
                            <i className='fas fa-tree fa-2x'> Landscaping </i>
                            
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            <i className='fas fa-home fa-2x'> House Work</i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            <i className='fas fa-car fa-2x'> Car Cleaning </i>                            
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            <i className='fas fa-tools fa-2x'> Miscellaneous</i>                            
                        </a>
                    </li>
                </ul>
            </div>
        );
    };
}

export default CategoriesContainer;
