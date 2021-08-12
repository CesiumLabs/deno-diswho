import { create, verify, Payload } from '../../deps.ts';

const
    signJwt = async (data: Payload, secret: string) => await create(
        {
            alg: 'HS256',
            typ: 'JWT'
        },
        data,
        secret
    ),
    verifyJwt = async (jwt: string, secret: string) => await verify(
        jwt,
        secret,
        'HS256'
    );


export {
    signJwt,
    verifyJwt
};