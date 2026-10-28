
function debounce(fn, delay) {
    let timer = null;
    return function (str) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, str);
            timer = null;
        }, delay);
    }

}

const betterFn = debounce(function (str) {
    console.log(str);
}, 2000);
// betterFn('p1');
// betterFn('p2');

function throttle(fn, delay) {
    let timer = null;
    return function (str) {
        if (timer) return;

        fn.call(this, str);
        timer = setTimeout(() => {
            timer = null;
        }, delay);


    }
}

const p = throttle(function log(str) {
    console.log(str)
}, 2000);

p('p1');
p('p2');


