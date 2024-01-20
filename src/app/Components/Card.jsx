'use client';
import React, { useState } from 'react';
import axios from 'axios';

const Card = ({ username, setUsername }) => {
  const [user, setUser] = useState();
  const [notFound, setNotFound] = useState(false);
  const fetchGithubInfo = async () => {
    try {
      await axios
        .get(`https://api.github.com/users/${username}`)
        .then((response) => {
          setUser(response.data);
        });
      setUsername('');
    } catch (error) {
      if (error.response.status == 404) {
        setNotFound(!notFound);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='flex flex-col '>
      <p className='text-center text-red-700'>
        {notFound && 'User not found!!!!!!!!!!'}
      </p>
      <button
        onClick={fetchGithubInfo}
        className='px-3 py-2 bg-blue-700 my-2 rounded-lg self-center hover:bg-blue-700/90'
      >
        Search
      </button>
      {user && (
        <div className='flex flex-col p-[40px] shadow-xl rounded-3xl bg-[#fff] border text-black'>
          <div className='relative block'>
            <img
              alt='profil'
              src={user?.avatar_url}
              className='mx-auto object-cover  rounded-full h-[150px] w-[150px] '
            />
          </div>
          <p className='text-sm mt-2 self-center text-slate-500'>
            Created at: {formatDate(user?.created_at)}
          </p>

          <p className='self-center my-1 font-bold uppercase text-2xl text-gray-800'>
            {user?.name}
          </p>

          <div className='flex flex-row mt-2 rounded justify-between'>
            <div className='flex flex-col mr-2 self-center'>
              <p>No. of Repos</p>
              <p className='self-center font-bold text-md text-blue-700'>
                {user?.public_repos}
              </p>
            </div>
            <div className='flex flex-col self-center'>
              <p>No. of Gists</p>
              <p className='self-center font-bold text-md text-blue-700'>
                {user?.public_gists}
              </p>
            </div>
          </div>
          <a
            className='text-blue-700 mt-2 underline text-center hover:text-blue-700/70'
            href={user?.html_url}
          >
            <p>{`@${user?.login}`}</p>
          </a>
          {/* <p className='text-sm self-center text-slate-500'>
            Created at: {formatDate(user?.created_at)}
          </p> */}
        </div>
      )}
    </div>
  );
};

export default Card;
