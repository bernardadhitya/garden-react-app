import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig, newsApiConfig, supabaseConfig } from './env';
import { createClient } from '@supabase/supabase-js'
import axios from 'axios';

firebase.initializeApp(firebaseConfig);
const fireAuth = firebase.auth();

const supabase = createClient(supabaseConfig.url, supabaseConfig.key)

export const signUp = async (email, password, username) => {
  let userData = {};
  fireAuth.createUserWithEmailAndPassword(email, password)
    .then(async data => {
      userData = await createUser({username, email});
      console.log('SUCCESS SIGN UP');
    })
    .catch(error => console.log('FAILED SIGNUP'));
  return userData;
}

export const signIn = async (email, password) => {
  let userData = {};
  fireAuth.signInWithEmailAndPassword(email, password)
    .then(async () => {
      userData = await getUserByEmail(email);
      console.log('SUCCESS SIGN IN');
    })
    .catch(error => console.log('FAILED SIGNIN'))
  return userData;
}

export const signOut = async () => {
  fireAuth.signOut();
}

export const fetchCurrentUser = async () => {
  const isLoggedIn = fireAuth.currentUser;
  return !!isLoggedIn ? await getUserByEmail(isLoggedIn.email) : null;
}

export const getUserByEmail = async (email) => {
  const userRole = await getUserRole(email);
  if (userRole === 'client') {
    return await getClientByEmail(email);
  } else {
    return await getConsultantByEmail(email);
  }
}

export const createUser = async (userData, userRole) => {
  const { data: users } = await supabase
  .from(userRole === 'client' ? 'klien' : 'konsultan')
  .insert([
    userData,
  ])

  return users[0];
}

export const getAllProducts = async () => {

  let { data: barang } = await supabase
  .from('barang')
  .select('*')

  let groupedProducts = []

  while (barang.length > 0) {
    groupedProducts.push(barang.splice(0,20))
  }

  return groupedProducts;
}

export const getProductsByTitle = async (searchString) => {

  let { data: barang } = await supabase
  .from('barang')
  .select('*')
  .ilike('nama', `%${searchString}%`)

  let groupedProducts = []

  while (barang.length > 0) {
    groupedProducts.push(barang.splice(0,20))
  }

  return groupedProducts;
}

export const getProductById = async (productId) => {
  let { data: barang } = await supabase
  .from('barang')
  .select('*')
  .eq('id', productId)

  return barang[0];
}

export const getUserRole = async (userEmail) => {
  let { data: clients } = await supabase
  .from('klien')
  .select('*')
  .eq('email', userEmail)

  return clients.length > 0 ? 'client' : 'consultant';
}

export const getClientByEmail = async (email) => {
  let { data: clients } = await supabase
  .from('klien')
  .select('*')
  .eq('email', email)

  return clients[0];
}

export const getConsultantByEmail = async (email) => {
  let { data: consultants } = await supabase
  .from('konsultan')
  .select('*')
  .eq('email', email)

  return consultants[0];
}

export const getAllConsultants = async () => {
  let { data: consultants } = await supabase
  .from('konsultan')
  .select('*')

  return consultants;
}

export const getClientChatListByConsultantId = async (consultantId) => {
  let { data: clientList } = await supabase
  .from('chat')
  .select(`
    klien (
      nama
    )
  `)
  .eq('konsultan_id', consultantId)

  return clientList;
}

export const getConsultationChat = async (clientId, consultantId) => {
  let { data: chats } = await supabase
  .from('chat')
  .select(`
    pesan,
    klien (
      nama
    ),
    konsultan (
      nama
    )
  `)
  .eq('klien_id', clientId)
  .eq('konsultan_id', consultantId)

  return chats;
}

export const getProductTransactionByClientId = async (clientId) => {
  let { data: productTransactions } = await supabase
  .from('transaksi_barang')
  .select('*')
  .eq('klien_id', clientId)

  return productTransactions
}

export const getConsultationTransactionByClientId = async (clientId) => {
  let { data: consultationTransactions } = await supabase
  .from('transaksi_konsultasi')
  .select('*')
  .eq('klien_id', clientId)

  return consultationTransactions
}

export const getNews = async (query) => {
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiConfig.key}&sortBy=popularity&pageSize=100`
  const response = await axios.get(url)
  const data = response.data

  const articles = data.articles

  return articles;
}