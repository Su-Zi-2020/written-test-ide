function myinstanceof(p, type) {

    if (p === null || (typeof p !== 'object' && typeof p !== 'function')) {
        return false;
    }

    let proto = p.__proto__;
    while (proto !== null) {
        console.log('proto', proto);
        if (proto === type.prototype) {
            return true;
        }
        proto = proto.__proto__;
    };
    return false;
};


console.log(myinstanceof([], Array))
