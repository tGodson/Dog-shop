import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  changeBreedGroupFilter,
  changeSearchFilter,
  getDogs,
  setCurrentPage,
} from './dogsSlice';
import styles from '../css/Dogs.module.css';

const Filter = () => {
  const dispatch = useDispatch();

  const handlePageChange = e => {
    dispatch(setCurrentPage(e.target.value));
    dispatch(getDogs(e.target.value));
  };

  const breedGroupFilter = useSelector(state => state.dogs.filters.breedGroupFilter);
  const breedGroupCategories = useSelector(state => state.dogs.data.map(dog => {
    const { breed_group: breedGroup } = dog.breeds[0];
    return breedGroup;
  }));
  const uniqBreedGroupsArray = [...new Set(breedGroupCategories)];
  const breedGroupOptions = uniqBreedGroupsArray.map(category => (
    <option key={category} value={category}>
      {category}
    </option>
  ));

  const currentPage = useSelector(state => state.dogs.currentPage);
  const pagesOptions = [...Array(9).keys()].map(el => (
    <option key={`Option${el}`} value={el}>
      Current page
      {` ${el + 1}`}
    </option>
  ));

  return (
    <div className={styles.filter}>
      <p className={styles.filterLabel}>Filter by</p>
      <div>
        <select
          className={styles.filterSelect}
          id="pageCategory"
          name="pageCategory"
          onChange={handlePageChange}
          value={currentPage}
        >
          {pagesOptions}
        </select>

        <select
          className={styles.filterSelect}
          id="bredCategory"
          name="bredCategory"
          onChange={e => dispatch(changeBreedGroupFilter(e.target.value))}
          value={breedGroupFilter}
        >
          <option value="">Breed group (all)</option>
          {breedGroupOptions}
        </select>

        <input
          className={styles.filterSelect}
          type="search"
          id="search"
          name="search"
          placeholder="Searh by breed"
          onChange={e => dispatch(changeSearchFilter(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Filter;
