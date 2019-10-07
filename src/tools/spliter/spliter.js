const splitToken = authString => authString.replace(/\W*(Bearer)\W/, '');

export { splitToken };
