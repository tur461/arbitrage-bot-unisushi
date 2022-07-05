const ADDRESS = {
    ZERO: '0x' + '0'.repeat(40),
}

function isAddr(addr) {
    if(
        addr &&
        addr.length && 
        addr.length === 42 && 
        addr.substring(0,2) === '0x' && 
        addr !== ADDRESS.ZERO
    ) return !0;
    return !1;
}

module.exports = {
    isAddr,
}