import Footer from '../../components/footer/Footer';
import FAQ from './FAQ/FAQ';
import './Home.css'
import Features from './features/Features';
import Highlights from './highlights/Highlights';
import Testimonials from './testimonials/Testimonials';
import Header from './header/Header' 
const Home = () => {
  return (
    <>
      
    <Header></Header>
      <Features></Features>
      <Highlights></Highlights>

      <Testimonials></Testimonials>
      <FAQ></FAQ>
      <Footer />
    </>
  );
};

export default Home;
