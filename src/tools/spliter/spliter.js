const splitToken = authString => authString.replace(/\W*(Bearer)\W/, '');

const getRemoteFileName = (i, n) => `${i}_${n}.pdf`;

export { splitToken, getRemoteFileName };
