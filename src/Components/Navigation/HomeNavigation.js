import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../../Containers/Login/Login';
import SearchPage from '../../Containers/SearchPage/SearchPage';
import DetailPage from '../../Containers/DetailPage/DetailPage';
import WishlistPage from '../../Containers/WishlishPage/WishlistPage';
import PublicRoute from './PublicRoute';
import Register from '../../Containers/Register/Register';
import HomePage from '../../Containers/HomePage/HomePage';
import NewsPage from '../../Containers/NewsPage/NewsPage';
import ConsultantPage from '../../Containers/ConsultantPage/ConsultantPage';

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
      <PublicRoute path='/product' component={SearchPage}/>
      <PublicRoute path='/news' component={NewsPage}/>
      <PublicRoute path='/consultant' component={ConsultantPage}/>
      <PublicRoute path='/login' component={Login}/>
      <PublicRoute path='/register' component={Register}/>
      <Route path='/user' component={UserNavigation}/>
      <PublicRoute path='/:id' component={DetailPage}/>
    </Switch>
  );
};

export default HomeNavigation;