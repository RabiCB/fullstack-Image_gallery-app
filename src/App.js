import logo from './logo.svg';
import './App.css';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Login from './Auth/Login';
import Dashboard from './Components/Dashboard'

function App() {
  const  user=useUser();
  

  const supabase=useSupabaseClient();

  return (
    <>
    {
      user===null?
      <Login/>
      :
      <Dashboard/>
     
    }

    </>
  );
}

export default App;
