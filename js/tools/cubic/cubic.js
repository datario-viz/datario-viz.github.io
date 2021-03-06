var _error = document.getElementById("msg-error");
var _neutral = document.getElementById("msg-neutral");
(function() {
    var message = document.querySelectorAll("div[id|=\"msg\"]");
    for (let i = 0; i < message.length; i++) {
        message[i].style.display = "none";
    }
    _neutral.style.display = "block";
})();

function calculate() {
    // Initialization
    _error.style.display = "none";
    _neutral.style.display = "none";
    var a,b,c,d,start,end,step;
    a = Number(document.getElementById("a").value);
    b = Number(document.getElementById("b").value);
    c = Number(document.getElementById("c").value);
    d = Number(document.getElementById("d").value);
    start = Number(document.getElementById("start").value);
    end = Number(document.getElementById("end").value);
    step = Number(document.getElementById("step").value);
    var ul = "";
    var hresults = "";
    var vresults = "";
    try {
        // Test
        if (a == "" && b == "" && c == "" && d == "" && start == "" && end == "" && step == "") {
            throw "Please input your values."
        }
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(start) || isNaN(end) || isNaN(step)) {
            throw "All inputs must be a number."
        }
        if (a == "" && b == "" && c == "" && d == "") {
            throw "Why would you calculate a function with all coefficients equal to zero?"
        }
        if (step == "") {
            throw "<code>STEP</code> cannot be empty or zero."
        }
        if ((end - start) / step < 0) {
            throw "There is something wrong with the <code>STEP</code> value. \
            If you want <strong>increment</strong>, use <strong>positive</strong> value; \
            if you want <strong>decrement</strong>, use <strong>negative</strong> value."
        }
        // The function
        const f = (x) => { return a * Math.pow(x,3) + b * x * x + c * x + d; };
        // JS equivalent of range() in Python
        function range() {
            var arr = [];
            for (let i = 0; i < Math.floor((end - start) / step) + 1; i++) {
                arr.push(start + step * i);
            }
            return arr;
        }
        // Calculate
        for (let i = 0; i < range().length; i++) {
            ul += "<li><var>f</var>(" + range()[i] + ") = " + f(range()[i]) + "</li>";
            hresults += f(range()[i]) + "\t";
            vresults += f(range()[i]) + "\n";
        }
        document.getElementById("RESULTS").innerHTML = ul;
        document.getElementById("v-results").innerHTML = vresults;
        document.getElementById("h-results").innerHTML = hresults;
        //
    }
    catch (err) {
        document.getElementById("RESULTS").innerHTML = "";
        document.getElementById("v-results").innerHTML = "";
        document.getElementById("h-results").innerHTML = "";
        // Display the error
        document.getElementById("msg").innerHTML = err;
        _error.style.display = "block";
    }
}

function clear() {
    let btns = document.getElementsByClassName("copy");
    let i;
    for (i = 0; i < btns.length; i++) {
        btns[i].innerHTML = "Copy";
    }
}

function copyH() {
    let copyTxt = document.getElementById("h-results");
    copyTxt.select();
    copyTxt.setSelectionRange(0,99999999);
    document.execCommand("copy");
    document.getElementById("hbtn").innerHTML = "Copied!";
    setTimeout(clear, 1500);
}

function copyV() {
    let copyTxt = document.getElementById("v-results");
    copyTxt.select();
    copyTxt.setSelectionRange(0,99999999);
    document.execCommand("copy");
    document.getElementById("vbtn").innerHTML = "Copied!";
    setTimeout(clear, 1500);
}