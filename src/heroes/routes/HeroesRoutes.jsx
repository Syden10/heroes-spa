import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui';
import { Dc, Hero, Marvel, Search } from '../pages';

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/heroes-spa/marvel' element={<Marvel />} />
          <Route path='/heroes-spa/dc' element={<Dc />} />

          <Route path='/heroes-spa/search' element={<Search />} />
          <Route path='/heroes-spa/hero/:id' element={<Hero />} />

          <Route
            path='/heroes-spa/'
            element={<Navigate to='/heroes-spa/marvel' />}
          />
        </Routes>
      </div>
    </>
  );
};
