const timeout = function (delay, id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(id)
            } catch (e) {
                reject(0)
            }
        }, delay);
    })
};
module.exports = timeout