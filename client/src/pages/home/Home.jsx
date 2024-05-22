import FAQ from './FAQ/FAQ';
import './Home.css'
import Features from './features/Features';
import Hero from './hero/Hero';
import Highlights from './highlights/Highlights';
import Testimonials from './testimonials/Testimonials';

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <Features></Features>
      <Highlights></Highlights>

      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </>
  );
};

export default Home;
