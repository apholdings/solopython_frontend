'use client';

import { ToastError } from '@/components/toast/ToastError';
import { ToastSuccess } from '@/components/toast/ToastSuccess';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

export default function Activation() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [uid, setUID] = useState('');

  const [effectRegister, setEffectRegister] = useState(false);
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const uidParam = searchParams.get('uid');

    if (tokenParam !== null) {
      setToken(tokenParam);
    }

    if (uidParam !== null) {
      setUID(uidParam);
    }
  }, [searchParams]);

  const activateAccount = async () => {
    setLoading(true);
    const res = await fetch('/api/activation', {
      // Esta es la ruta de tu manejador de registro
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        token,
      }),
    });

    // We will parse the response only if status is not 204
    if (res.status !== 204) {
      const data = await res.json();
      ToastError('No pudimos activar este pedido, verifica si la cuenta ya esta activa.');
      console.log(data.error);
    } else {
      // Procesar la respuesta de registro exitoso
      ToastSuccess('Tu cuenta ha sido activada, ahora puedes hacer login!');
      setActivated(true);
    }
    setLoading(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (activated) {
      router.push('/?login=True');
    }
  }, [activated]);

  return (
    <div>
      {loading ? (
        <div className="text-md relative inline-flex items-center border border-transparent bg-palm-leaf-500 px-4 py-2 font-bold text-white shadow-sm hover:bg-palm-leaf-600 focus:outline-none focus:ring-2 focus:ring-palm-leaf-400 focus:ring-offset-2">
          <CircleLoader loading={loading} size={25} color="#ffffff" />
        </div>
      ) : (
        <button
          type="button"
          onClick={activateAccount}
          onMouseDown={() => {
            setEffectRegister(true);
          }}
          onMouseUp={() => setEffectRegister(false)}
          className={`${
            effectRegister &&
            'duration-400 animate-click hover:translate-x-0.5  hover:translate-y-0.5 hover:shadow-neubrutalism-sm'
          }
                text-md 
                relative
                inline-flex
                w-full 
                items-center
                justify-center 
                border 
                border-dark-bg border-transparent
                bg-green-500  px-4  py-2  text-sm
                font-bold
                text-white shadow-neubrutalism-md transition duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-green-600  hover:shadow-neubrutalism-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
            `}
        >
          Activate account
        </button>
      )}
    </div>
  );
}
