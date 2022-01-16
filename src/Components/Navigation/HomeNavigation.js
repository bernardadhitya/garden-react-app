import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../../Containers/Login/Login';
import SearchPage from '../../Containers/SearchPage/SearchPage';
import ProductDetailPage from '../../Containers/ProductDetailPage/ProductDetailPage';
import WishlistPage from '../../Containers/WishlishPage/WishlistPage';
import PublicRoute from './PublicRoute';
import Register from '../../Containers/Register/Register';
import HomePage from '../../Containers/HomePage/HomePage';
import NewsPage from '../../Containers/NewsPage/NewsPage';
import ConsultantPage from '../../Containers/ConsultantPage/ConsultantPage';
import ConsultantDetailPage from '../../Containers/ConsultantDetailPage/ConsultantDetailPage';
import TransactionPage from '../../Containers/TransactionPage/TransactionPage';

const UserNavigation = ({match}) => {
  return (
    <Switch>
      <PrivateRoute path={`${match.url}/wishlist`} component={WishlistPage}/>
    </Switch>
  )
}

const HomeNavigation = () => {
  return (
    <Switch>
      <Route exact path='/'><Redirect to='/home'/></Route>
      <PublicRoute path='/home' component={HomePage}/>
      <PublicRoute path='/product/:id' component={ProductDetailPage}/>
      <PublicRoute path='/product' component={SearchPage}/>
      <PublicRoute path='/news' component={NewsPage}/>
      <PublicRoute path='/consultant/:id' component={ConsultantDetailPage}/>
      <PublicRoute path='/consultant' component={ConsultantPage}/>
      <PublicRoute path='/transaction' component={TransactionPage}/>
      <PublicRoute path='/login' component={Login}/>
      <PublicRoute path='/register' component={Register}/>
      <Route path='/user' component={UserNavigation}/>
    </Switch>
  );
};

export default HomeNavigation;