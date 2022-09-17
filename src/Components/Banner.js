import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel1 from '../asserts/Car1.png';
import Carousel2 from '../asserts/car2.jpg';
import Carousel3 from '../asserts/car3.jpg';

function Banner() {

    
    return (
        <Carousel>

            <Carousel.Item>
                <img
                    className="d-block mh-25 w-100"
                    src={Carousel1}
                    alt="First slide"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block mh-25 w-100"
                    src={Carousel2}
                    alt="Second slide"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block mh-25 w-100"
                    src={Carousel3}
                    alt="Third slide"
                />
            </Carousel.Item>
            
        </Carousel>


    )
}

export default Banner