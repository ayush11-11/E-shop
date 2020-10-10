import React from "react";
import Menu from "./Menu";
import landing from './landing.png';
import second from './second.jpeg';
import third from './third.jpeg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children,
    logo=false
}) => (
    <div>

        <Menu />
       
            < div>
        <Carousel autoPlay interval="2000" className="carry" transitionTime="2000" style={{height:100}} infiniteLoop showStatus={false} showThumbs={false}>
                <div>
                    <img alt="intro" src={landing}  />
                   
                </div>
                <div>
                    <img alt="demo" src={second} />
                    
                </div>
                <div>
                    <img alt="final "src={third} />
                   
                </div>
            </Carousel>
            
        </div>
        <div className={className}>{children}</div>
    </div>


    

);

export default Layout;
