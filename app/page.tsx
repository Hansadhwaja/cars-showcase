

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import index from 'next/image'



export default async function Home({searchParams}) {
  const allCars = await fetchCars({
    manufacturer:searchParams.manufacturer || '',
    year:searchParams.year,
    fuel:searchParams.fuel || '',
    limit:searchParams.limit || 10,
    model:searchParams.model || ''
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;


  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y
     max-width' id="discover">
        <div className='home__text-contaier'>
          <h1 className='text-4xl font-extrabold'>
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ?(
        <section>
          <div className='home__cars-wrapper'>
            {allCars?.map((car)=>( 
            <CarCard car={car} />
            ))}
          </div>
          <ShowMore
          pageNumber={( searchParams.pageNumber || 10 ) /10}
          isNext={( searchParams.limit || 10 ) < allCars.length}
          />
        </section>):(
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Ooops, no results</h2>
          </div>
        )}


      </div>
    </main>
  )
}
