import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs } from './dogsSlice';

import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Filter from './Filter';
import styles from './Dogs.module.css';

const Dogs = () => {
  const dispatch = useDispatch();

  let dogs = useSelector(state => state.dogs.data);
  useEffect(() => {
    if (dogs.length === 0) {
      dispatch(getDogs());
    }
  }, [dispatch]);

  const lifeSpanFilter = useSelector(state => state.dogs.filters.lifeSpanFilter);
  if (lifeSpanFilter) {
    dogs = dogs.filter(dog => dog.breeds[0].life_span === lifeSpanFilter);
  }
  const breedGroupFilter = useSelector(state => state.dogs.filters.breedGroupFilter);
  if (breedGroupFilter) {
    dogs = dogs.filter(dog => dog.breeds[0].breed_group === breedGroupFilter);
  }
  const searchFilter = useSelector(state => state.dogs.filters.search);
  if (searchFilter) {
    dogs = dogs.filter(dog => {
      const { name } = dog.breeds[0];
      return name.toLowerCase().includes(searchFilter.toLowerCase().trim());
    });
  }

  const dogsElements = dogs.map(dog => (
    <article key={dog.id} className={styles.dogArticle}>
      <Link to={`/${dog.id}`} dog={dog}>
        <img className={styles.dogArticleImg} src={dog.url} alt={dog.id} />
        <span className={styles.dogArticleImgBadge}>{dog.breeds[0].name}</span>
      </Link>
    </article>
  ));

  const currentPage = useSelector(state => state.dogs.currentPage);
  const loadingDogs = useSelector(state => state.dogs.loaders.loadingDogs);
  const loadingDogsError = useSelector(state => state.dogs.errors.loadingDogs);
  const dogsLoaded = useSelector(state => state.dogs.success.loadingDogs);

  if (loadingDogs) return <Loading msg={`Loading dogs for page ${+currentPage + 1}`} />;
  if (loadingDogsError) return <Error msg={loadingDogsError} />;
  return (
    <section className={styles.dogsContainer}>
      <Filter className={styles.filter} />
      <div className={styles.dogs}>
        {dogsLoaded && (
          <div>
            <h3 className={styles.dogsHeading} data-testid="dogsHeading">
              Dogs on page
              <span>
                {' '}
                (
                {dogs.length}
                )
              </span>
            </h3>
            <div className={styles.dogsGridContainer}>{dogsElements}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dogs;
