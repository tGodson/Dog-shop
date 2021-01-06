import React, {
  useEffect, useRef, lazy, Suspense,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDog, resetDog } from './dogsSlice';

import temperamentImg from '../../assets/temperament.png';
import weightImg from '../../assets/weight.png';
import heightImg from '../../assets/height.png';
import lifeImg from '../../assets/life.png';
import groupImg from '../../assets/job.png';
import breedImg from '../../assets/breed.png';
import linkImg from '../../assets/link.png';
import styles from './Dog.module.css';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

const NextDogs = lazy(() => import('./NextDogs'));

const Dog = ({ match }) => {
  const mainDogArticleRef = useRef(null);

  const { id } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDog(id));
    window.scrollTo(0, mainDogArticleRef.current.offsetTop);
    return () => dispatch(resetDog());
  }, [dispatch, id]);

  const dog = useSelector(state => state.dogs.dog);
  const loadingDog = useSelector(state => state.dogs.loaders.loadingDog);
  const loadingDogError = useSelector(state => state.dogs.errors.loadingDog);

  const { url } = dog;
  const {
    name,
    height: { metric: heightCm },
    weight: { metric: weightKg },
    temperament,
    bred_for: bredFor,
    breed_group: breedGroup,
    life_span: lifeSpan,
  } = dog.breeds[0];

  const history = useHistory();

  const goBack = e => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className={styles.container}>
      <section className={styles.dog} ref={mainDogArticleRef}>
        {loadingDog && <Loading msg="Loading dog..." />}
        {loadingDogError && <Error msg={loadingDogError} />}
        <>
          <div className={styles.dogImgContainer}>
            <h3 className={styles.dogHeading}>{name}</h3>
            <img className={styles.dogImg} src={url} alt={name} />
            <button type="button" className={styles.backButton} onClick={goBack}>
              Go back
            </button>
          </div>
          <div className={styles.dogSkillsContainer}>
            <p className={styles.dogSubHeading}>Dog Super powers</p>
            <ul className={styles.dogSkills}>
              <li className={styles.dogSkill}>
                <span className={styles.dogSkillName}>
                  <img className={styles.dogSkillImg} src={temperamentImg} alt="Temperament" />
                  Temperament:
                  {' '}
                </span>
                <span className={styles.dogSkillValue}>{temperament}</span>
              </li>
              <li className={styles.dogSkill}>
                <span className={styles.dogSkillName}>
                  <img className={styles.dogSkillImg} src={lifeImg} alt="Life span" />
                  Life span:
                  {' '}
                </span>
                <span className={styles.dogSkillValue}>{lifeSpan}</span>
              </li>
              <li className={styles.dogSkill}>
                <span className={styles.dogSkillName}>
                  <img className={styles.dogSkillImg} src={groupImg} alt="Bred for" />
                  Raised for:
                  {' '}
                </span>
                <span className={styles.dogSkillValue}>{bredFor}</span>
              </li>
              <li className={styles.dogSkill}>
                <span className={styles.dogSkillName}>
                  <img className={styles.dogSkillImg} src={breedImg} alt="Breed group" />
                  Breed group:
                  {' '}
                </span>
                <span className={styles.dogSkillValue}>{breedGroup}</span>
              </li>
              <li className={styles.dogSkill}>
                <span className={styles.dogSkillName}>
                  <img className={styles.dogSkillImg} src={heightImg} alt="Height" />
                  Height(cm):
                  {' '}
                </span>
                <span className={styles.dogSkillValue}>{heightCm}</span>
              </li>

              <li className={styles.dogSkill}>
                <span className={styles.dogSkillName}>
                  <img className={styles.dogSkillImg} src={weightImg} alt="weight" />
                  Weight(kg):
                  {' '}
                </span>
                <span className={styles.dogSkillValue}>{weightKg}</span>
              </li>
              <li className={styles.dogSkill}>
                <a
                  href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(
                    name,
                  )}&go=Go&ns0=1`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.dogSkillLink}
                >
                  <img src={linkImg} alt="Link" className={styles.dogSkillImg} />
                  <span>
                    Check Wikipedia for more info about
                    {` ${name}`}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </>
      </section>
      <section className={styles.nextDogsContainer}>
        <Suspense fallback={<Loading msg="Loading next dogs" />}>
          <NextDogs />
        </Suspense>
      </section>
    </div>
  );
};

Dog.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Dog;
