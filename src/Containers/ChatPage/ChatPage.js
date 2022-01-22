import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getConsultantById, getProductById, startNewConsultation, fetchCurrentUser, getLatestConsultationByClientId, fireAuth, getConsultationChat, sendChat } from '../../firebase';
import './ChatPage.css';
import StarIcon from '@material-ui/icons/Star';
import { Grid, Snackbar, TextField } from '@material-ui/core';
import { formattedCurrency } from '../../Constants/format';
import IconPrice from '../../Assets/icons/IconPrice';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import IconNext from '../../Assets/icons/IconNext';

const ChatPage = () => {
  const [item, setItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [clientId, setClientId] = useState(null);
  const [consultantId, setConsultantId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fireAuth.onAuthStateChanged(async user => {
        if (user) {
          const fetchedCurrentUser = await fetchCurrentUser();
          const fetchedLatestConsultation = await getLatestConsultationByClientId(fetchedCurrentUser.id);
          const { klien_id, konsultan_id } = fetchedLatestConsultation;
          const fetchedItem = await getConsultantById(konsultan_id)
          const fetchedChats = await getConsultationChat(klien_id, konsultan_id);
          
          setCurrentUser(fetchedCurrentUser);
          setItem(fetchedItem);
          setChats(fetchedChats);
          setClientId(klien_id);
          setConsultantId(konsultan_id);

          console.log(fetchedChats);
        }
      })
    }
    fetchData();
  }, [refresh]);

  const renderChats = () => {
    return chats.map(chat => {
      const { pengirim, pesan } = chat;
      return (
        <div className={pengirim === 'klien' ? 'chat-bubble-mine' : 'chat-bubble-others'}>
          {pesan}
        </div>
      )
    })
  }

  const handleSendChat = async () => {
    await sendChat(message, 'klien', clientId, consultantId);
    setMessage('')
    setRefresh(refresh + 1);
  }

  const renderItemDetails = () => {
    if (item === null) return;
    return (
      <div className='consultant-detail-wrapper'>
        <div style={{marginTop: '20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{display: 'flex', marginBottom: '40px', padding: '0 40px 40px 40px', borderBottom: '1px solid #E5E5E5'}}>
                <img
                  src={item.picture || require('../../Assets/images/logo-bw.png')}
                  className={item.picture ? 'consultant-detail-image' : 'consultant-detail-image-empty'}
                  alt=''
                />
                <div style={{marginLeft: '20px'}}>
                  <h2 className='consultant-detail-title'>{item.nama}</h2>
                  <div className='consultant-rating'>
                    <StarIcon style={{color: '#FFC107'}}/>
                    {`4.9/5`}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{maxHeight: '600px', overflow: 'scroll'}}>
                {renderChats()}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  width: '100%',
                  border: '1px solid #E5E5E5'
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{display: 'flex'}}>
                <div style={{marginLeft: '20px', padding: '40px', width: '85%'}}>
                  <TextField
                    fullWidth
                    id="chat"
                    placeholder="Tulis pesanmu disini"
                    value={message}
                    onChange={(e) => {setMessage(e.target.value)}}
                  />
                </div>
                <div
                  className='chat-detail-redirect-button'
                  onClick={() => handleSendChat()}
                >
                  <IconNext />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderItemDetails()}
    </>
  )

}
export default ChatPage;