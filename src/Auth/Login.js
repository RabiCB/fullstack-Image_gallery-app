import React,{useState} from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Login = () => {
    const supabase=useSupabaseClient();
    const [email,setEmail]=useState("")
    const [loading,setLoading]=useState(false)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          setLoading(true)
         const {error} =await supabase.auth.signInWithOtp({email})
         if(error) throw error
         alert("check your email for login")
        }catch(e){
          console.log(e.message)
        }
        finally{
          setLoading(false)
        }
    }
  return (
    <div className='border-none w-screen h-screen flex pt-16   justify-center'>
      {loading?<div><p className='text-blue-500'>sending link on your email please check......</p></div>:<form className='flex border-2 bg-slate-100 rounded-md gap-6 h-64 w-72 flex-col justify-center items-center ' onSubmit={handleSubmit}>
      <p className='text-xs text-white rounded-md p-1'>we are going to send you login link on email<br>
      </br>so, please Enter valid email</p>
      <input className="border-2 text-white rounded-md outline-none h-10 w-60 pl-3" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder=" enter your email"></input>
      <button className='border-none p-2 rounded-md bg-blue-500 text-white' type="submit">Get magic link</button>
      </form>}
     </div>
  )
}

export default Login