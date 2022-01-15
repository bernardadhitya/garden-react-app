import { Grid } from '@material-ui/core';
import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import './ConsultantCard.css';
import { useHistory } from 'react-router-dom';
import {} from '../../firebase';

const ConsultantCard = (props) => {
  const {
    image,
    name,
    rating,
    productId
  } = props;

  const history = useHistory();

  const handleClick = async () => {
    history.push(`/${productId}`);
  }

  return (
    <Grid item xs={3}>
      <div className='consultant-card' onClick={() => handleClick()}>
        <Grid container>
          <Grid xs={1}/>
          <Grid xs={4}>
            <div className='consultant-image'>
              <img
                src={image || require('../../Assets/images/logo-bw.png')}
                className={image ? 'image-thumbnail' : 'image-thumbnail-empty'}
                alt=''
              />
            </div>
          </Grid>
          <Grid xs={6}>
            <div className='consultant-content'>
              <div className='consultant-name'>{name}</div>
              <div className='consultant-rating'>
                <StarIcon style={{color: '#FFC107'}}/>
                {`${rating}/5`}
              </div>
            </div>
          </Grid>
          <Grid xs={1}/>
        </Grid>
      </div>
    </Grid>
  )
}

export default ConsultantCard;