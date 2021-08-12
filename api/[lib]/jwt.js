import { create, verify } from '../../deps.js';

const
    signJwt = async (data, secret) => await create(
        {
            alg: 'HS256',
            typ: 'JWT'
        },
        data,
        secret
    ),
    verifyJwt = async (jwt, secret) => await verify(
        jwt,
        secret,
        'HS256'
    );


export {
    signJwt,
    verifyJwt
};