function cargarDOM() {
    posDecimal = 0;
    num1 = 0;
    num2 = 0;
    ans = "";
    operacion = "";
    inputOp = document.getElementById("operacion");
}

function ponNumero(num) {
    if (posDecimal == 0) {
        if (operacion == "")
            num1 = num1*10 + num;
        else
            num2 = num2*10 + num;
    } else {
        if (operacion == "") {
            num1 += num/(Math.pow(10,posDecimal));
            num1 = Math.round(num1*Math.pow(10,posDecimal))/(Math.pow(10,posDecimal));
        } else {
            num2 += num/(Math.pow(10,posDecimal));
            num2 = Math.round(num2*Math.pow(10,posDecimal))/(Math.pow(10,posDecimal));
        }
        posDecimal++;
    }

    actualizaInput();
}

function tipoOperacion(tipOp) {
    if (operacion == "" && num1 != 0) {
        operacion = tipOp;
        posDecimal = 0;
        actualizaInput();
    }
}

function cambiaADecimales() {
    if (posDecimal == 0) {
        posDecimal = 1;
        inputOp.value += ".";
    }
}

function calcula() {
    if (operacion != "" && !(operacion == "/" && num2 == 0)) {
        switch (operacion) {
            case "+": ans = num1 + num2; break;
            case "-": ans = num1 - num2; break;
            case "*": ans = num1 * num2; break;
            case "/": ans = num1 / num2; break;
        }
        ans = Math.round(ans*Math.pow(10,5))/(Math.pow(10,5));
        reiniciaConResultado();
    }

}

function reinicia() {
    posDecimal = 0;
    num1 = 0;
    num2 = 0;
    operacion = "";
    inputOp.placeholder = "";
    actualizaInput();
}

function reiniciaConResultado() {
    posDecimal = 0;
    num1 = 0;
    num2 = 0;
    operacion = "";
    inputOp.value = "";
    inputOp.placeholder = ans;
}

function ponAns() {
    if (ans != "") {
        if (operacion == "")
            num1 = ans;
        else
            num2 = ans;
    }
    actualizaInput();
}

function actualizaInput() {
    num1 = Math.round(num1*Math.pow(10,5))/(Math.pow(10,5));
    num2 = Math.round(num2*Math.pow(10,5))/(Math.pow(10,5));

    if (num1 == 0)
        inputOp.value = "";
    else if (operacion == "")
        inputOp.value = num1;
    else if (num2 == 0)
        inputOp.value = num1 + operacion;
    else
        inputOp.value = num1 + operacion + num2;
}