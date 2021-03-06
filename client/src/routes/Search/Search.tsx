import React, { useState, useRef } from 'react';
import { SEARCH_USER, ADD_FRIEND } from './SearchQueries';
import { useLazyQuery, useMutation } from '@apollo/client';
import Alert from '@components/Alert';
import Loader from '@components/Loader';
import PrevButton from '@components/PrevButton'
import Default from '@assets/images/default.png';

interface IProps {}

const Search: React.FC<IProps> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState({ message: '', type: ''});
  const [searchUser, { loading, data }] = useLazyQuery(SEARCH_USER, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      if (data && data.SearchUser) {
        const { ok, error, user } = data.SearchUser;

        if (ok && user) {
          setAlert({ message: '', type: '' });
        } else {
          setAlert({ message: error, type: 'error'});
        }
      }
    },
  });

  const [addFriend] = useMutation(ADD_FRIEND, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      if (data && data.AddFriend) {
        const { ok, error } = data.AddFriend;

        if (ok) {
          setAlert({ message: 'Friend Added', type: 'success' });
        } else {
          setAlert({ message: error, type: 'error'});
        }
      }
    },
  });

  const showAlert = () => {
    return <Alert message={alert.message} type={alert.type} />;
  };

  const onClickSearch = () => {
    if (emailRef.current) {
      const email = emailRef.current.value;
      searchUser({ variables: { email } });
    }
  };

  const onClickAddFriend = (email: string) => {
    addFriend({ variables: { email } });
  };

  return (
    <div className="container mx-auto px-10 h-screen flex flex-col items-center">
      <div className="flex flex-row w-full text-center my-10">
        <div className="absolute">
          <PrevButton />
        </div>
        <div className="flex-1">
          <span>FREINDS</span>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center py-10 w-full">
        <input
          type="text"
          className="text-primary text-center text-sm placeholder-gray-300 bg-gradient-to-r from-purple-700 to-pink-600 rounded w-full py-4 px-6 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="EMAIL"
          ref={emailRef}
        />
        <div className="mt-5">
          <button
            className="px-10 py-3 rounded-full text-base bg-gradient-to-r from-pink-600 bg-pink-500 outline-none focus:outline-none"
            onClick={() => onClickSearch()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center pl-6">
        {loading && <Loader />}
      </div>
      <div className="flex flex-col justify-center text-center">
        {data && data.SearchUser && data.SearchUser.user && (
          <div>
            <img
              src={Default}
              alt={data.SearchUser.user.name}
              className="rounded-full w-20 h-20 content-center m-auto"
            />
            <div className="text-xl">{data.SearchUser.user.name}</div>
            <div
              className="mt-5 px-10 py-3 rounded-full text-base bg-gradient-to-r from-pink-600 bg-pink-500 outline-none focus:outline-none"
              onClick={() => onClickAddFriend(data.SearchUser.user.email)}
            >
              Add Friend
            </div>
          </div>
        )}
      </div>
      {alert.type && showAlert()}
    </div>
  );
};

export default Search;
