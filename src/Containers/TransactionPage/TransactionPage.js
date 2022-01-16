import {
  Grid,
  makeStyles,
  Modal
} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router';
import { fetchCurrentUser, fireAuth, getAllConsultants, getAllProducts, getConsultantsByName, getConsultationTransactionByCurrentUser, getProductsByQueries, getTransactionsByCurrentUser } from '../../firebase';
import qs from 'query-string';
import './TransactionPage.css';
import Pagination from '@material-ui/lab/Pagination';
import FilterModal from '../../Components/FilterModal/FilterModal';
import FilterListIcon from '@material-ui/icons/FilterList';
import ItemCard from '../../Components/ItemCard/ItemCard';
import { getAllCategories, getCategoriesByTopics } from '../../Constants/categories';
import { allMarketplaces } from '../../Constants/marketplaces';
import SortMenu from '../../Components/SortMenu/SortMenu';
import TransactionCard from '../../Components/TransactionCard/TransactionCard';

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

const TransactionPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      fireAuth.onAuthStateChanged(async user => {
        if (user) {
          const fetchedCurrentUserTransactions = await getTransactionsByCurrentUser();
          console.log('current user consultations:', fetchedCurrentUserTransactions);
          setTransactions(fetchedCurrentUserTransactions);
        }
      })
    }
    fetchData();
  }, [location, refresh]);

  const renderItemCards = () => {
    return transactions.length > 0 ? (
      <Grid container>
        { transactions[page-1].map(item => {
            return (
              <TransactionCard
                item={item}
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

  return (
    <div>
      <div className='transaction-banner-wrapper'>
        <div style={{color: 'black', fontFamily: 'Avenir-Next', fontSize: '64px'}}>
          Riwayat
        </div>
      </div>
      <div style={{padding: '40px 100px'}}>
        {renderItemCards()}
        <div className='pagination-container'>
          <Pagination
            count={Math.ceil(transactions.length)}
            shape="rounded"
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionPage;