import { useEffect, useState } from 'react';
import type { ProfileProps } from '../types/types';
import cosmon from '../../public/avatar/cosmon.png';
import UserFavorites from './UserFavorites';
import Follow from './Follow';
import BackButton from './BackButton';
import Spinner from './Spinner';

const BACK_API = import.meta.env.VITE_BACKEND_API;

const ProfileComponent = ({ id }: ProfileProps) => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BACK_API}/user`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: Number(id),
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setName(data.userProfile.name);
        setImage(data.userProfile.image || null);
        setProfileLoaded(true);
      } catch (error) {
        console.error(error);
        setImage(null);
      }
    };
    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (image === null) {
      const timer = setTimeout(() => setLoadingImage(false), 500);
      return () => clearTimeout(timer);
    }
  }, [image]);

  return (
    <div className="w-full max-w-8xl mx-auto my-22">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-12">
        <div className="flex-shrink-0 w-24 h-24 sm:w-72 sm:h-72 relative flex items-center justify-center">
          {loadingImage && <Spinner />}
          {!profileLoaded ? null : image ? (
            <img
              className={`w-24 h-24 sm:w-72 sm:h-72 rounded-full border-4 border-cyan-500 
        shadow-[0_0_10px_#0ff] object-cover 
        ${loadingImage ? 'hidden' : 'block'}`}
              src={image}
              alt="Profile avatar"
              onLoad={() => setLoadingImage(false)}
              onError={() => {
                setImage(null);
                setLoadingImage(false);
              }}
            />
          ) : (
            !loadingImage && (
              <img
                className="w-24 h-24 sm:w-72 sm:h-72 rounded-full border-4 border-cyan-500 
        shadow-[0_0_10px_#0ff] object-cover"
                src={cosmon}
                alt="Default avatar"
              />
            )
          )}
        </div>

        <h1
          className="font-orbitron uppercase text-4xl sm:text-2xl font-bold text-cyan-400 tracking-widest
               [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] text-center sm:text-left flex-1 mt-4 sm:mt-0"
        >
          {name}
        </h1>
        <Follow id={id} />
      </div>

      <h1
        className="font-orbitron uppercase text-4xl sm:text-2xl font-bold text-start text-cyan-400 tracking-widest 
                    [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] py-12"
      >
        Favorites's of {name}:
      </h1>

      <UserFavorites id={id} />
      <BackButton />
    </div>
  );
};

export default ProfileComponent;
