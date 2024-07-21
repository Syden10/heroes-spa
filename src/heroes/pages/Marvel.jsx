import { HeroList } from '../components';

export const Marvel = () => {
  return (
    <>
      <h1 className='mt-4'>Marvel</h1>
      <hr />

      <HeroList publisher='Marvel Comics' />
    </>
  );
};
