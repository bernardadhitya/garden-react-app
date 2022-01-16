import {
  Grid,
  makeStyles,
  Modal
} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router';
import { getAllConsultants, getAllProducts, getConsultantsByName, getProductsByQueries } from '../../firebase';
import qs from 'query-string';
import './ConsultantPage.css';
import Pagination from '@material-ui/lab/Pagination';
import FilterModal from '../../Components/FilterModal/FilterModal';
import FilterListIcon from '@material-ui/icons/FilterList';
import ItemCard from '../../Components/ItemCard/ItemCard';
import { getAllCategories, getCategoriesByTopics } from '../../Constants/categories';
import { allMarketplaces } from '../../Constants/marketplaces';
import SortMenu from '../../Components/SortMenu/SortMenu';
import SearchBar from '../../Components/SearchBar/SearchBar';
import ConsultantCard from '../../Components/ConsultantCard/ConsultantCard';

var _ = require('lodash');

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ConsultantPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [consultants, setConsultants] = useState([]);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [anchorSortMenu, setAnchorSortMenu] = useState(null);

  const queries = qs.parse(location.search);

  const searchQuery = queries.query;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedConsultant = _.isEmpty(queries) ? 
        await getAllConsultants() : await getConsultantsByName(queries.query);
      console.log(fetchedConsultant);
      setConsultants(fetchedConsultant);
    }
    fetchData();
  }, [location, refresh]);

  const renderItemCards = () => {
    return consultants.length > 0 ? (
      <Grid container>
        { consultants[page-1].map(item => {
            const { id, nama, harga, picture } = item;
            return (
              <ConsultantCard
                image={picture}
                name={nama}
                price={harga}
                rating={4.9}
                consultantId={id}
                verbose={true}
              />
            )
        })}
      </Grid>
    ) : (
      <div style={{margin: '40px 0 0 40px'}}>
        <h3>Tidak menemukan barang yang anda cari</h3>
      </div>
    )
  }

  const handleSearch = (searchString) => {
    history.push({
      search: `?query=${searchString.replace('&', '%26')}`,
      pathname: '/consultant/'
    });
  }

  return (
    <div>
      <div className='consultant-banner-wrapper'>
        <div style={{color: 'black', fontFamily: 'Avenir-Next', fontSize: '64px'}}>
          Konsultasi
        </div>
        <p style={{color: 'black', fontSize: '18px'}}>
          Ajukan pertanyaanmu ke praktisi berpengalaman dalam berkebun
        </p>
      </div>
      <div style={{padding: '40px 100px'}}>
        <Grid container>
          <Grid item xs={6}>
            <SearchBar handleSearch={(value) => handleSearch(value)}/>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={8}>
            {
              !!searchQuery &&
              <p style={{margin: '60px 0 0 20px'}}>
                Menampilkan hasil pencarian untuk <span style={{color: '#57946C'}}>{`"${searchQuery}"`}</span>
              </p>
            }
          </Grid>
        </Grid>
        {renderItemCards()}
        <div className='pagination-container'>
          <Pagination
            count={Math.ceil(consultants.length)}
            shape="rounded"
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default ConsultantPage;