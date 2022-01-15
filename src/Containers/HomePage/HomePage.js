import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ItemCard from '../../Components/ItemCard/ItemCard';
import ConsultantCard from '../../Components/ConsultantCard/ConsultantCard';
import { allMarketplaces } from '../../Constants/marketplaces';
import { getNews, getRecommendedProducts } from '../../firebase';
import './HomePage.css';

const HomePage = () => {

  const history = useHistory();

  const [consultants, setConsultants] = useState([]);
  const [items, setItems] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await getRecommendedProducts();
      const fetchedNews = await getNews();
      setItems(fetchedItems);
      setNews(fetchedNews);
    }
    fetchData();
  }, []);

  const renderNewsCard = (article) => {
    const { title, url, urlToImage, source: { name: sourceName } } = article;
    return (
      <Grid item xs={3}>
        <a style={{textDecoration: 'none', color: '#000000'}} href={url}>
          <div className='news-card'>
            <div className='news-image'>
              <img
                src={urlToImage || require('../../Assets/images/logo-bw.png')}
                className={urlToImage ? 'news-thumbnail' : 'news-thumbnail-empty'}
                alt=''
              />
            </div>
            <div className='news-content'>
              <div className='news-title'>{title}</div>
              <p>{sourceName}</p>
            </div>
          </div>
        </a>
      </Grid>
    )
  }

  const renderNewsCards = () => {
    const dummyItems = [
      {
        'title': '8 Tanaman Sayur yang Bisa ditanam dalam Ruangan Menggunakan Pot',
        'url': 'https://www.kompas.com/homey/read/2021/11/29/132200576/8-tanaman-sayur-yang-bisa-ditanam-dalam-ruangan-menggunakan-pot?page=all',
        'urlToImage': 'https://asset.kompas.com/crops/xekrEQL__pElJjLvQ4lNvyYxXwM=/0x48:726x532/750x500/data/photo/2021/11/29/61a459d05dbcd.jpg',
        'source': {
          'name': 'Ersa Dopita Maret'
        }
      }
    ]
    if (news.length === 0) setNews(dummyItems);
    return news.splice(0,4).map(article => renderNewsCard(article));
  }

  const renderRecommendedItemCards = () => {
    const dummyItems = [
      {
        'image': 'https://images.tokopedia.net/img/cache/900/product-1/2020/8/27/83777980/83777980_981f0e8f-de39-4d8c-ba7b-19020902a542_2000_2000',
        'title': 'Pestisida Tanaman Obat Hama Kutu Putih',
        'price': '60000',
        'source': '',
        'rating': '',
        'productId': ''
      }
    ]
    if (items.length === 0) setItems(dummyItems);
    return items.map(item => {
      const { image, title, price, source, rating, product_id} = item;
      return (
        <ItemCard
          image={image}
          title={title}
          price={price}
          source={source}
          rating={rating}
          productId={product_id}
        />
      )
    })
  }

  const handleClick = async (link) => {
    history.push(`/${link}`);
  }

  const renderSectionThumbnails = () => {
    return <div style={{display: 'flex'}} onClick={() => handleClick('product')}>
      <div class='section-thumbnail-konsultasi'>
        <h3 style={{textAlign: 'center', color: 'white', fontFamily: 'Avenir-Next', fontSize: '24px'}}>Konsultasi</h3>
      </div>
      <div class='section-thumbnail-artikel' onClick={() => handleClick('news')}>
        <h3 style={{textAlign: 'center', color: 'white', fontFamily: 'Avenir-Next', fontSize: '24px'}}>Artikel</h3>
      </div>
      <div class='section-thumbnail-belanja'>
        <h3 style={{textAlign: 'center', color: 'white', fontFamily: 'Avenir-Next', fontSize: '24px'}}>Belanja</h3>
      </div>
    </div>
  }

  const renderConsultantsCards = () => {
    const dummyItems = [
      {
        'image': 'https://images.tokopedia.net/img/cache/900/product-1/2020/8/27/83777980/83777980_981f0e8f-de39-4d8c-ba7b-19020902a542_2000_2000',
        'name': 'Mary Jane',
        'rating': '4.9',
        'productId': ''
      }
    ]
    if (consultants.length === 0) setConsultants(dummyItems);
    return consultants.map(consultant => {
      const { image, name, rating, product_id} = consultant;
      return (
        <ConsultantCard
          image={image}
          name={name}
          rating={rating}
          productId={product_id}
        />
      )
    })
  }
  
  return (
    <div className='home-page-wrapper'>
      <div className='home-banner-wrapper'>
        <p style={{color: 'black', fontFamily: 'Avenir-Next', fontSize: '24px'}}>
          Selamat datang di
        </p>
        <div style={{color: 'black', fontFamily: 'Avenir-Next', fontSize: '64px'}}>
          Good Gardener
        </div>
        <p style={{color: 'black', fontSize: '18px'}}>
          Konsultasi, informasi dan belanja alat berkebun, semuanya disini
        </p>
        {renderSectionThumbnails()}
      </div>
      <div style={{margin: '40px'}}>
        <h1>Konsultasi</h1>
        <p>Ajukan pertanyaanmu ke praktisi berpengalaman dalam berkebun</p>
        <Grid container>
          {renderConsultantsCards()}
        </Grid>
      </div>
      <div style={{margin: '40px'}}>
        <h1>Artikel</h1>
        <p>Lihat artikel terbaru kami untuk tips dan pengetahuan berkebun</p>
        <Grid container>
          {renderNewsCards()}
        </Grid>
      </div>
      <div style={{margin: '40px'}}>
        <h1>Produk</h1>
        <p>Temukan produk menarik untuk menemani kegiatan berkebunmnu</p>
        <Grid container>
          {renderRecommendedItemCards()}
        </Grid>
      </div>
    </div>
  )
}

export default HomePage;