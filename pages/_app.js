import '@/styles/globals.css';
import { useState, useEffect } from 'react';
//import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';
import Login from './login';
import Loading from '@/components/Loading';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function App({ Component, pageProps }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection('users')
          .doc(authUser.uid)
          .set(
            {
              email: authUser.email,
              lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
              photoURL: authUser.photoURL,
            },
            { merge: true }
          );
        setUser(authUser);
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} user={user} />;
}
