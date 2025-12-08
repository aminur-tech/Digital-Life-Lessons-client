import React from 'react';
import HeroSlider from './HeroSlider';
import WhyLearningMatters from './WhyLearningMatters';

const Home = () => {
    return (
        <div >
            <div className='mb-20'>
                <HeroSlider></HeroSlider>
            </div>
            <div className='mb-20'>
                <WhyLearningMatters></WhyLearningMatters>
            </div>
        </div>
    );
};

export default Home;