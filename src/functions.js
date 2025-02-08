import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function show_alert(mensaje, icono, foco = "") {
    onfocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: mensaje,
        icon: icono
    });
}

function onfocus(foco) {
    if (foco !== '') {
        document.getElementById(foco).focus();
    }
}

export function searchFunction() {
    console.log("ENTRA A LA FUNCION");
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    console.log(filter);
    table = document.getElementById("myTable");
    console.log(table);
    tr = table.getElementsByTagName("tr");
    console.log(tr);

    for (i = 0; i < tr.length; i++) {
        for (j = 0; j < tr.length; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                console.log("txtValue", txtValue);
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}