import React from 'react';
import HeroSlider from './HeroSlider';
import WhyLearningMatters from './WhyLearningMatters';
import FeaturedLessons from './FeaturedLessons';
import TopContributors from './TopContributors';
import MostFavorite from './MostFavorite';

const Home = () => {
    return (
        <div >
            <title>Home</title>
            <div className='mb-20'>
                <HeroSlider></HeroSlider>
            </div>

            <div className='mb-20'>
                <FeaturedLessons></FeaturedLessons>
            </div>

            <div className='mb-20'>
                <WhyLearningMatters></WhyLearningMatters>
            </div>

            <div className='mb-20'>
            <TopContributors></TopContributors>
            </div>

            <div className='mb-20'>
                <MostFavorite></MostFavorite> 
            </div>
        </div>
    );
};

export default Home;